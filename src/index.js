import React from "react";
import "./global.css";
import ChatInput from "./components/ChatInput";
import BubbleAttachment from "./components/BubbleAttachment";
import {
  DEFAULT_STYLIST_RATING,
  EngagementStage,
  PostchatTransferQueues,
} from "./utils/constants";
import { Config } from "./config";
import { managerStrings } from "./config/sample/manager-strings";
import { isMobile } from "react-device-detect";
import MinimizeButton from "./components/MinimizeButton";
import EndChatModal from "./components/endChatModal";
import ActiveChatAgentGreeting from "./components/ActiveChatAgentGreeting";
import { AgentHelpers, AttachmentHelpers, UtagHelpers } from "./utils/helpers";
import CustomerServicePreEngagementForm from "./components/CustomerServicePreEngagementForm";

const { TWILIO_ACCOUNT_SID, TWILIO_FLEX_FLOW_SID } = process.env;

// This setup uses the "CDN Option 2" method (CDN script in <head>, this bundle at end of <body>)
// https://www.twilio.com/docs/flex/installing-and-using-flex-webchat

class SampleWebChatWidget {
  constructor() {
    this.manager = undefined;
    this.brand = undefined;
    this.chatInputRef = React.createRef();
    this.engagementTypeForStartNewChat = { activeEngagementType: "" };
  }
  // Page that wants webchat needs to call this function to get it going: SampleWebchat.init('Brand Here')
  // Webpack puts the instance of this class on the window object as a global variable
  async init(brand) {
    console.log("in init() method of WebChat... ", brand);
    if (!!this.manager && this.manager._initialized) {
      return;
    }

    if (
      typeof Twilio === "undefined" ||
      typeof Twilio.FlexWebChat === "undefined"
    ) {
      console.error("Twilio Web Chat script missing");
    } else {
      if (!!Config[brand].widgetConfig) {
        // If displayed on a desktop display, elevate the widget by padding it from the bottom, leave it to default values on a mobile or a tablet.
        if (!isMobile) {
          if (!Config[brand].widgetConfig.colorTheme.overrides.MainContainer) {
            Config[brand].widgetConfig.colorTheme.overrides.MainContainer = {};
          }
          if (
            !Config[brand].widgetConfig.colorTheme.overrides.MainContainer
              .bottom
          ) {
            Config[
              brand
            ].widgetConfig.colorTheme.overrides.MainContainer.bottom = "0px";
          }
          if (
            !Config[brand].widgetConfig.colorTheme.overrides.MainContainer
              .right
          ) {
            Config[
              brand
            ].widgetConfig.colorTheme.overrides.MainContainer.right = "0px";
          }
          if (!Config[brand].widgetConfig.colorTheme.overrides.EntryPoint) {
            Config[brand].widgetConfig.colorTheme.overrides.EntryPoint = {};
          }
          if (
            !Config[brand].widgetConfig.colorTheme.overrides.EntryPoint
              .Container
          ) {
            Config[
              brand
            ].widgetConfig.colorTheme.overrides.EntryPoint.Container = {};
          }
        }

        const instance = await Twilio.FlexWebChat.createWebChat({
          ...Config[brand].widgetConfig,
          accountSid: TWILIO_ACCOUNT_SID,
          flexFlowSid: TWILIO_FLEX_FLOW_SID,
        });
        this.manager = instance.manager;
        this.brand = brand;
        this._customizeUI();
        this._customizeActions();

        // If a chat channel is open and the customer refreshes, default behavior is to reopen widget & restore state
        // But...That doesn't handle resetting customized strings, so re-apply strings based on channel attributes

        this._restoreStringsForOpenChannel();
        //We need to call a lambda to return our Current Hours set in the console. This point is the earliest we can call that lambda as we
        // Need a token to make that call and the manager instance inits here.
        const hoop = await Config[brand].hoursOfOperation.checkHours();
        console.log('hoop = ', hoop);
        if (!hoop) {
          console.log("We are outside of the Current Hours of Operations")
          return;
        }
        instance.init();
      }
    }
  }

  setCurrentUrl(url) {
    this.manager.updateConfig({
      context: { ...this.manager.configuration.context, location: url },
    });
  }

  setCustomerData(data) {
    if (!this.manager || !this.manager._initialized) {
      return;
    }
    if (
      typeof Twilio === "undefined" ||
      typeof Twilio.FlexWebChat === "undefined"
    ) {
      console.error("Twilio Web Chat script missing");
    } else {
      if (data) {
        const { firstName, emailAddr, message } = data;
        this.manager.updateConfig({
          context: { firstName, emailAddr, message },
          preEngagementConfig: Config[this.brand].preFillPreEngagementForm(
            {
              firstName,
              emailAddr,
              message,
            },
            Config[this.brand].widgetConfig
          ),
        });
      } else {
        // NOTE: manager.updateConfig seems to be only additive...will not remove properties, so lets be abusive
        delete this.manager.configuration.context.firstName;
        delete this.manager.configuration.context.emailAddr;
        delete this.manager.configuration.context.message;
        this.manager.updateConfig({
          preEngagementConfig:
            Config[this.brand].widgetConfig.preEngagementConfig,
        });
      }
    }
  }

  async closeChat(manager) {
    const { flex } = manager.store.getState();
    const channelId = Object.keys(flex.chat.channels);
    let taskQueue =
      flex.chat.channels[channelId[0]].source.channelState.attributes
        .taskQueueName;
    console.log("taskQueue:", taskQueue);
    let workFlowName =
      flex.chat.channels[channelId[0]].source.channelState.attributes
        .workFlowName;
    let holidayQueue = "Holiday Webchat";
    let taskSid =
      flex.chat.channels[channelId[0]].source.channelState.attributes.taskSid;
    console.log("inside closeChat");
    if (
      (taskQueue &&
        (taskQueue.toLowerCase() ===
          PostchatTransferQueues.DIGITAL_STYLIST_QUEUE.toLowerCase() ||
          taskQueue.toLowerCase() ===
            PostchatTransferQueues.HOLIDAY_QUEUE.toLowerCase()) &&
        flex.session.enablePostChatReactive === "true" &&
        !flex.session.isProactiveChat) ||
      (flex.session.enablePostChatReactive === "true" &&
        workFlowName &&
        workFlowName.toLowerCase() ===
          PostchatTransferQueues.TRASNFER_WORKFLOW.toLowerCase() &&
        (taskQueue.toLowerCase() ===
          PostchatTransferQueues.DIGITAL_STYLIST_QUEUE.toLowerCase() ||
          taskQueue.toLowerCase() ===
            PostchatTransferQueues.AGENT_TRANSFER_QUEUE_NAME.toLowerCase()))
    ) {
      //console.log('reactive', flex.session.enablePostChatReactive);
      flex.session.showPostChat = true;
      const { channelSid } = manager.store.getState().flex.session;
      await flex.chat.channels[channelSid].source.sendMessage(
        "Customer closed the chat."
      );
      Twilio.FlexWebChat.Actions.invokeAction("ShowPostChat", {});
      await AgentHelpers.initiatePostChat(taskSid);
    } else if (
      (taskQueue &&
        (taskQueue.toLowerCase() ===
          PostchatTransferQueues.DIGITAL_STYLIST_QUEUE.toLowerCase() ||
          taskQueue.toLowerCase() ===
            PostchatTransferQueues.HOLIDAY_QUEUE.toLowerCase()) &&
        flex.session.enablePostChatProactive === "true" &&
        flex.session.isProactiveChat) ||
      (flex.session.enablePostChatProactive === "true" &&
        workFlowName &&
        workFlowName.toLowerCase() ===
          PostchatTransferQueues.TRASNFER_WORKFLOW.toLowerCase() &&
        (taskQueue.toLowerCase() ===
          PostchatTransferQueues.DIGITAL_STYLIST_QUEUE.toLowerCase() ||
          taskQueue.toLowerCase() ===
            PostchatTransferQueues.AGENT_TRANSFER_QUEUE_NAME.toLowerCase()))
    ) {
      //console.log('Proactive:', flex.session.isProactiveChat);
      flex.session.showPostChat = true;
      const { channelSid } = manager.store.getState().flex.session;
      await flex.chat.channels[channelSid].source.sendMessage(
        "Customer closed the chat."
      );
      Twilio.FlexWebChat.Actions.invokeAction("ShowPostChat", {});
      await AgentHelpers.initiatePostChat(taskSid);
    } else {
      flex.session.showPostChat = false;
      Twilio.FlexWebChat.Actions.invokeAction("CloseChat", {});
    }
  }

  _customizeUI() {
    this._setManagerStrings();
    const { flex } = this.manager.store.getState();
    flex.session.showModal = false;
    flex.session.showPostChat = false;
    flex.session.isProactiveChat = false;
    flex.session.isHolidayChat = false;
    flex.session.AATags = { fabLoad: "initialLoad" };

    Twilio.FlexWebChat.PreEngagementCanvas.Content.replace(
      <CustomerServicePreEngagementForm
        key="customer-service-pre-engagement-form"
        manager={this.manager}
        onSubmit={this.submitPreEngagementForm}
      />,
      { sortOrder: -1 }
    );

    Twilio.FlexWebChat.MainHeader.Content.add(
      <MinimizeButton key="mimize-chat" />,
      { sortOrder: -1, align: "end" }
    );
    Twilio.FlexWebChat.MessageInput.Content.replace(
      <ChatInput
        key="chat-input"
        chatInputRef={this.chatInputRef}
        manager={this.manager}
        showEndChatButton={true}
        endChatAction={this.closeChat}
      />
    );
    if (this.brand === "Sample") {
      Twilio.FlexWebChat.MessagingCanvas.Content.add(
        <ActiveChatAgentGreeting key="agent-greeting" manager={this.manager} />,
        { sortOrder: -1 }
      );
    }
    Twilio.FlexWebChat.MessageBubble.Content.add(
      <BubbleAttachment key="custom-message-bubble" />,
      {
        if: (props) => {
          const { source } = props.message;
          return source && source.attributes
            ? source.attributes.attachments
            : false;
        },
      }
    );
  }

  submitPreEngagementForm(formData) {
    Twilio.FlexWebChat.Actions.invokeAction("StartEngagement", { formData });
  }

  submitPreEnagementFormProactive =
    (aaTags, proactiveData, isSpecialistAvailable, brand) => (formData) => {
      let updatedFormData = {
        ...formData,
        tags: aaTags,
      };
      if (proactiveData.eventType === "HolidayEventType") {
        Twilio.FlexWebChat.Actions.invokeAction("StartEngagement", {
          formData: {
            isProactive: true,
            firstName: updatedFormData.firstName,
            emailAddr: updatedFormData.emailAddr,
            message: updatedFormData.message,
            proactiveData: updatedFormData.proactiveData,
            specialistName: isSpecialistAvailable.name[0],
            tags: updatedFormData.tags,
          },
        });
      } else {
        Twilio.FlexWebChat.Actions.invokeAction("StartEngagement", {
          formData: updatedFormData,
        });
      }
    };

  getChatClient() {
    return new Promise((resolve, reject) => {
      let maxTries = 50;
      let interval = setInterval(() => {
        if (this.manager && this.manager.chatClient) {
          clearInterval(interval);
          resolve(this.manager.chatClient);
        }
        maxTries--;
        if (maxTries < 0) {
          clearInterval(interval);
          reject("Could not initialize the chat client.");
        }
      }, 500);
    });
  }

  checkSpecialist = async (engagementType, beautyBrand) => {
    const isSpecialistAvailable = await AgentHelpers.isSpecialistAvailable(
      engagementType === "style" ? "WomensDressesCategory" : beautyBrand
    );
    return isSpecialistAvailable.available;
  };

  _customizeActions() {
    Twilio.FlexWebChat.Actions.registerAction("CloseChat", (payload) => {
      //console.log('CloseChat...');
      const { flex } = this.manager.store.getState();
      const { engagementStage } = flex.session;
      if (engagementStage === EngagementStage.PreEngagement) {
        //console.log('before invoking MinimizeChat');
        Twilio.FlexWebChat.Actions.invokeAction("MinimizeChat"); //for pre-engagement close button
        flex.session.AATags = { fabLoad: "endChat" };
        Twilio.FlexWebChat.PreEngagementCanvas.Content.replace(
          <CustomerServicePreEngagementForm
            key="customer-service-pre-engagement-form"
            manager={this.manager}
            onSubmit={this.submitPreEngagementForm}
          />,
          { sortOrder: -1 }
        );
      } else {
        flex.session.showModal = true;
        Twilio.FlexWebChat.Actions.invokeAction("SetInputText", {
          body: " ",
          channelSid: flex.session.channelSid,
        });
      }
      return true;
    });

    Twilio.FlexWebChat.Actions.registerAction("AgentEndedChat", (payload) => {
      //console.log('AgentEndedChat...');
      const { flex } = this.manager.store.getState();
      const channels = Object.keys(flex.chat.channels);
      let taskStatus =
        flex.chat.channels[channels[0]].source.channelState.attributes.status;
      let members = flex.chat.channels[channels[0]].members;
      console.log("flex:", flex);
      console.log("taskStatus:", taskStatus);
      //console.log('members:', members);
      //console.log('members length:', members.size);
      if (taskStatus === "INACTIVE")
        if (
          (!flex.session.isProactiveChat &&
            flex.session.enablePostChatReactive === "true") ||
          (flex.session.isProactiveChat &&
            flex.session.enablePostChatProactive === "true")
        ) {
          if (this.shouldShowPostChat()) {
            flex.session.showPostChat = true;
            Twilio.FlexWebChat.Actions.invokeAction("ShowPostChat", {});
          }
        }
    });

    Twilio.FlexWebChat.Actions.registerAction("BrowserClose", (payload) => {
      //console.log('BrowserClose...');
      const { flex } = this.manager.store.getState();
      console.log("flex:", flex);
      const channels = Object.keys(flex.chat.channels);
      console.log("channels:", channels);
      if (channels && channels.length > 0) {
        window.addEventListener("unload", () => {
          const convStatus =
            flex.chat.channels[channels[0]].source.channelState.attributes
              .conversationStatus;

          if (
            convStatus !== undefined &&
            (convStatus === "Active" || convStatus === "Reassigned")
          ) {
            Twilio.FlexWebChat.Actions.invokeAction("SendMessage", {
              body: "The customer has left the website and the chat was ended.",
              channelSid: flex.session.channelSid,
              authorName: flex.session.channelSid,
            });
          }
        });
      }
    });

    Twilio.FlexWebChat.Actions.addListener(
      "beforeRestartEngagement",
      async (payload) => {
        //console.log('beforeRestartEngagement...');
        /** Check for Proactive chat
         * In proactice chat, the engagementType is accurately stored in flex session,
         * but for reactive it is not. So we rely on the variable engagementTypeForStartNewChat instead of flex session,
         * for identifying the active engagement.
         */
        if (payload === undefined) {
          let engagementTypeForStartNewChat =
            this.engagementTypeForStartNewChat.activeEngagementType;
          const { flex } = this.manager.store.getState();
          const { channels } = flex.chat;

          if (
            engagementTypeForStartNewChat === undefined ||
            engagementTypeForStartNewChat === ""
          ) {
            engagementTypeForStartNewChat =
              flex.session.activeEngagmentType.engagementType;
          }

          const { engagementType, beautyBrand } =
            UtagHelpers.getBrandInfoFromNMO();
          const isBrandAdvisorOffHours =
            Config[this.brand].hoursOfOperation.checkBrandAdvisorOffHours();
          const isStyleAdvisorOffHours =
            Config[this.brand].hoursOfOperation.checkStyleAdvisorOffHours();
          let isSpecialistAvailable = false;

          if (
            isBrandAdvisorOffHours &&
            engagementTypeForStartNewChat === "beauty"
          ) {
            isSpecialistAvailable = await this.checkSpecialist(
              engagementType,
              beautyBrand
            );
            console.log(
              "isBrandAdvisor Available during off hours >>> ",
              isSpecialistAvailable
            );
          }
          if (
            isStyleAdvisorOffHours &&
            engagementTypeForStartNewChat === "style"
          ) {
            isSpecialistAvailable = await this.checkSpecialist(
              engagementType,
              beautyBrand
            );
            console.log(
              "isStyleAdvisor Available during off hours >>> ",
              isSpecialistAvailable
            );
          }
          
          Twilio.FlexWebChat.PreEngagementCanvas.Content.replace(
            <CustomerServicePreEngagementForm
              key="customer-service-pre-engagement-form"
              manager={this.manager}
              onSubmit={this.submitPreEngagementForm}
            />,
            { sortOrder: -1 }
          );

          // resetting the engagementTypeForStartNewChat variable
          this.engagementTypeForStartNewChat.activeEngagementType = "";
          
        } else {
          const { flex } = this.manager.store.getState();
          flex.session.AATags = { fabLoad: "restart" };
          Twilio.FlexWebChat.PreEngagementCanvas.Content.replace(
            <CustomerServicePreEngagementForm
              key="customer-service-pre-engagement-form"
              manager={this.manager}
              onSubmit={this.submitPreEngagementForm}
            />,
            { sortOrder: -1 }
          );
        }
      }
    );

    Twilio.FlexWebChat.Actions.addListener("afterMinimizeChat", (payload) => {
      //console.log('afterMinimizeChat...');
      const { flex } = this.manager.store.getState();

      /** For Ticket : CCC - 2316
       * If agent has ended chat from twilio flex console before customer ends,
       * checking chat channels length and restarting engagement.
       */
      if (Object.keys(flex.chat.channels).length === 0) {
        //console.log("before invoking RestartEngagement");
        Twilio.FlexWebChat.Actions.invokeAction("RestartEngagement", {
          inAfterMinimizeChat: true,
        });
        flex.session.AATags = { fabLoad: "initialLoad" };
      }
    });

    Twilio.FlexWebChat.Actions.addListener(
      "beforeCloseChat",
      async (payload) => {
        //console.log('beforeCloseChat...');
        const { flex } = this.manager.store.getState();
        const { channels } = flex.chat;
        const channelObject = Object.keys(flex.chat.channels);
        const {
          taskSid,
          channelSid,
          rating = DEFAULT_STYLIST_RATING,
        } = flex.session;
        const { associatePin } =
          flex.chat.channels[channelObject[0]]?.source.channelState.attributes;
        const aaTagsEventName = flex.session.AATags?.event_name;

        if (flex.session.showPostChat) {
          flex.session.showPostChat = false;
          AgentHelpers.saveSARating({
            taskSid,
            channelSid,
            rating,
            associatePin,
            aaTagsEventName,
          });
          flex.session.rating = DEFAULT_STYLIST_RATING;
          Twilio.FlexWebChat.Actions.invokeAction("RestartEngagement", {
            inBeforeCloseChatShowPostChat: true,
          });

          if (flex.chat.channels[channelObject[0]] !== undefined) {
            const { isProactiveChat } = flex.session;
            if (isProactiveChat && isProactiveChat !== undefined) {
              if (window && window.localStorage) {
                window.localStorage.setItem("proactiveChatEndedAt", Date.now());
              }
              //ccc-1592 proactiveChatEndedAt only for proactive chat
            }
          }
        } else {
          /** For Ticket - CCC-2339
           * Commenting EndChatModal Rendering logic for the ticket.
           * uncomment between Start-1 & End-1, if EndChatModal needs to be displayed in the future.
           */

          //DO NOT REMOVE THIS COMMENTED CODE as we might needed in the
          //Start-1
          // Twilio.FlexWebChat.MessagingCanvas.Content.add(
          //   <EndChatModal key="end-chat-modal" manager={this.manager} />
          // );
          //End-1

          // Logic for closing chat on either clicking end chat button or close button
          // Remove between Start-2 & End-2, if in future, EndChatModal needs to be displayed.

          //Start-2
          if (Object.keys(channels).length) {
            const { isProactiveChat } = flex.session;
            if (isProactiveChat && isProactiveChat !== undefined) {
              if (window && window.localStorage) {
                window.localStorage.setItem("proactiveChatEndedAt", Date.now());
              }
              //ccc-1592 proactiveChatEndedAt only for proactive chat
            }

            // Assumes there's only one chat channel for webchat widget
            const { messages } = channels[Object.keys(channels)[0]];

            const isAgentClosed = await AgentHelpers.isAgentEndChat(channelSid); // check task not closed by agent (no task sid)
            if (isAgentClosed === "customerClosed" && messages.length > 0) {
              //check if  task created, if customer having conversation with agent then task will get created
              await channels[channelSid].source.sendMessage(
                "Customer closed the chat."
              );
              console.warn(
                "customer closed chat Still in Task Routing Queue....."
              );
            }
            if (isAgentClosed === "agentClosed") {
              console.warn("Agent Already closed the Task.....");
            }
          }
          Twilio.FlexWebChat.Actions.invokeAction("RestartEngagement", {
            inBeforeCloseChatShowPostChat: false,
          });
          //End-2
        }
      }
    );

    Twilio.FlexWebChat.Actions.replaceAction(
      "StartEngagement",
      (payload, original) => {
        const { flex } = this.manager.store.getState();
        flex.session.showPostChat = false;
        const { formData } = payload;

        flex.session.tempAttachment = formData.attachment;
        let newFormData = formData;
        delete newFormData.attachment;

        const {
          isProactive,
          proactiveData,
          firstName,
          specialistName,
          emailAddr,
          message,
          inputCategory,
          orderNumber,
        } = newFormData;
        const eventType = isProactive ? proactiveData.eventType : undefined;
        const friendlyName =
          isProactive && !firstName ? "Anonymous" : `${firstName}`;

        let deviceType;
        if (!isMobile) {
          console.log("In the Desktop Browser");
          deviceType = "desktop";
        } else {
          console.log("In the Mobile Browser");
          deviceType = "mobile";
        }
        let predefinedMessage;

        if (inputCategory) {
          const isDigitalOffHours =
            Config[this.brand].hoursOfOperation.checkStyleAdvisorOffHours();
          if (!isDigitalOffHours) {
            if (this.brand === "Sample" && message != "") {
              predefinedMessage = null;
            } else {
              predefinedMessage =
                Config[this.brand].getPredefinedMessageForProactiveChat(
                  eventType
                );
            }
          } else {
            predefinedMessage = {
              isFromMe: false,
              authorName: "Customer Service",
              body: managerStrings.StyleAdvisorOffHoursPredefinedChatMessageBody,
            };
            Twilio.FlexWebChat.MessageInput.Content.remove("chat-input");
          }
        } else {
          // Proactive changes predefined messages, so be sure to set them to appropriate values each time
          const isOffHours = Config[this.brand].hoursOfOperation.checkHours(); //Uncommented OffHours
          console.log("is Customer Service OffHours? = ", isOffHours);
          if (!isOffHours) {
            if (this.brand === "Sample" && message != "") {
              predefinedMessage = null;
            } else {
              predefinedMessage =
                Config[this.brand].getPredefinedMessageForProactiveChat(
                  eventType
                );
              if (specialistName && specialistName !== undefined) {
                console.log("specialistName: ", specialistName);
                predefinedMessage.authorName = specialistName;
              }
            }
          } else {
            predefinedMessage = {
              isFromMe: false,
              authorName: "Customer Service",
              body: managerStrings.OffHoursPredefinedChatMessageBody,
            };
          }
        }
        Twilio.FlexWebChat.MessagingCanvas.defaultProps.predefinedMessage =
          predefinedMessage;

        original({
          ...payload,
          formData: {
            ...newFormData,
            brand: this.brand,
            friendlyName,
            deviceType: deviceType,
          },
        });
      }
    );

    Twilio.FlexWebChat.Actions.addListener(
      "afterStartEngagement",
      (payload) => {
        //console.log('afterStartEngagement...');

        const { flex } = this.manager.store.getState();
        const { isEntryPointExpanded } = flex.session;
        const { isProactive, message } = payload.formData;
        const attachment = flex.session.tempAttachment;
        flex.session.showPostChat = false;
        let attachments = null;
        flex.session.isFailoverMessageSent = false;
        flex.session.agentEmails = [];

        flex.session.sellerProfileDetails = {};
        flex.session.styleAdvPostChatSurveyShown = false;
        flex.session.AgentEndedChatInvoked = false;
        flex.session.workerName = "";
        flex.session.enablePostChatReactive = "";
        flex.session.enablePostChatProactive = "";
        flex.session.preEngagementUserData = payload.formData;

        this.getChatClient().then(async (client) => {
          const { channelSid } = this.manager.store.getState().flex.session;
          console.log("channelSid:", channelSid);
          if (attachment) {
            try {
              const response = await AttachmentHelpers.upload(
                channelSid,
                attachment
              );
              attachments = [{ name: attachment.name, s3Key: response.s3Key }];
              flex.session.tempAttachment = null;
            } catch (e) {
              console.error("Error occurred in getChatClient()", e);
            }
          }
          client.getChannelBySid(channelSid).then((channel) => {
            if (message !== undefined) {
              if (attachments !== null) {
                channel.sendMessage(message, { attachments });
              } else {
                channel.sendMessage(message);
              }
            }
          });
        });

        if (isProactive && !isEntryPointExpanded) {
          Twilio.FlexWebChat.Actions.invokeAction("ToggleChatVisibility");
        }
      }
    );
  }

  _restoreStringsForOpenChannel() {
    const { flex } = this.manager.store.getState();
    const { channels } = flex.chat;
    const { isEntryPointExpanded } = flex.session;
    const currentlocation = flex.config.context.location;
    console.log("current URL", currentlocation);
    if (Object.keys(channels).length) {
      // Assumes there's only one chat channel for webchat widget
      const { source } = channels[Object.keys(channels)[0]];
      const { pre_engagement_data } = source.attributes;
      const { isProactive, proactiveData, location } = pre_engagement_data;
      console.log("channel produt page", location);
      if (currentlocation === location) {
        const eventType = isProactive ? proactiveData.eventType : undefined;
        const predefinedMessage =
          Config[this.brand].getPredefinedMessageForProactiveChat(eventType);
        Twilio.FlexWebChat.MessagingCanvas.defaultProps.predefinedMessage =
          predefinedMessage;
      } else {
        if (isProactive && isEntryPointExpanded) {
          Twilio.FlexWebChat.Actions.invokeAction("ToggleChatVisibility");
        }
      }
    }
  }

  _setManagerStrings() {
    const config = Config[this.brand].managerStrings;
    Object.keys(config).forEach(
      (key) => (this.manager.strings[key] = config[key])
    );
  }
}

export default new SampleWebChatWidget();
