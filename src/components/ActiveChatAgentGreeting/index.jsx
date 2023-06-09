import { Grid } from '@mui/material';
import './activeChatAgentGreeting.css';
import React, { Component } from 'react';
import { getPredefinedMessage } from '../../config/sample/proactive-chat';
import { findLastIndexOf } from '../../utils/helpers/input-helpers';
import { AgentHelpers, UtagHelpers } from '../../utils/helpers';

class ActiveChatAgentGreeting extends Component {
  constructor(props) {
    super(props);
    const { flex } = props.manager.store.getState();

    this.isCustomerServ = flex.session.activeEngagmentType?.isCustomerServ;

    this.state = {
      hasTransitionedToBrandWebchatQueue: false,
      formType: 'Customer',
      title: 'Customer Service',
      specialistName: 'Agent',
      conversationStatus: undefined,
      emails: [],
      agentName: '',
      agentAvatar: undefined,
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { flex } = this.props.manager.store.getState();
    console.log('flex:', flex);
    const channels = Object.keys(flex.chat.channels);

    if (channels && channels.length > 0) {
      let taskStatus = flex.chat.channels[channels[0]].source.channelState.attributes.status;
      const convStatus = flex.chat.channels[channels[0]].source.channelState.attributes.conversationStatus;

      if (convStatus !== undefined && (convStatus === 'Active' || convStatus === 'Reassigned')) {
        let enablePostChatReactive = flex.chat.channels[channels[0]].source.channelState.attributes?.enablePostChatReactive;
        let enablePostChatProactive = flex.chat.channels[channels[0]].source.channelState.attributes?.enablePostChatProactive;
        console.log('enablePostChatReactive:', enablePostChatReactive)
        console.log('enablePostChatProactive:', enablePostChatProactive)
        if (enablePostChatReactive && flex.session.enablePostChatReactive ==='') {
          flex.session.enablePostChatReactive = enablePostChatReactive;
        }
        if (enablePostChatProactive && flex.session.enablePostChatProactive ==='') {
          flex.session.enablePostChatProactive = enablePostChatProactive;
        }
      }
    }
  }

  getSellerProfileDetails(associatePin) {
    const { flex } = this.props.manager.store.getState();

    AgentHelpers.getSellerProfileDetails(associatePin)
      .then((res) => {
        console.log('res', res);
        flex.session.sellerProfileDetails = res;
      })
      .catch((error) => console.error('error:', error))
  }

  componentDidMount() {
    Twilio.FlexWebChat.Actions.invokeAction('BrowserClose', {});
  }

  render() {
    const { flex } = this.props.manager.store.getState();

    let formType = 'Customer';
    let title = 'Customer Service';
    let specialistName = 'Agent';
    let agentName = '';
    let agentAvatar = undefined;
    let conversationStatus2 = undefined;
    let queueName = undefined;

    if (this.isCustomerServ) {
      title = 'Customer Service';
      specialistName = 'Agent';
      formType = 'Customer';
    }
    //Logic to retrieve agent name from twilio flex API to display it on the Active Chat screen

    const channels = Object.keys(flex.chat.channels);
    //console.log("flex.chat.channels: ", flex.chat.channels);
    if (channels && channels.length > 0) {
      const members = flex.chat.channels[channels[0]].members;
      conversationStatus2 = flex.chat.channels[channels[0]].source.channelState.attributes.conversationStatus;
      queueName = flex.chat.channels[channels[0]].source.channelState.attributes.taskQueueName;
      const workFlowName = flex.chat.channels[channels[0]].source.channelState.attributes.workFlowName;
      console.log('queueName = ', queueName, ', workFlow = ', workFlowName);
      if (flex.session.isFailoverMessageSent === false && queueName == 'Brand Webchat' && workFlowName == 'Specialist Reactive Webchat Workflow') {
        flex.session.isFailoverMessageSent = true;
        this.isCustomerServ = true;
        Twilio.FlexWebChat.Actions.invokeAction('SendMessage', {
          body: 'Thank you for reaching out! Our beauty advisor is currently unavailable, but we’ll transfer you to Customer Service for assistance.',
          channelSid: flex.session.channelSid,
          authorName: flex.session.channelSid
        })
      }
      const friendlyNames = [];
      const fullNames = [];
      const attributes = [];
      let authorNameFromMessage;
      const messages = flex.chat.channels[channels[0]].messages;
      if (messages && messages.length > 0) {
        const agentIndex = findLastIndexOf(messages, "isFromMe", false);
        if (agentIndex > -1) {
          authorNameFromMessage = messages[agentIndex].authorName;
        }
      }
      if (members) {
        members.forEach(x => {
          friendlyNames.push(x.friendlyName);
          attributes.push(x.source.state.attributes);
          //Retrieving Agent's full name from his email address, which comes in as part of twilio flex API
          fullNames.push(x.source.state.identity.split("_40")[0].split("_5F").join(" "));
          if (x.source.state.identity.includes('_2Ecom')) {
            let decodedEmail = x.source.state.identity.replace("_2E", '.').replace('_5F', '_').replace('_40', '@');
            if (!flex.session.agentEmails.includes(decodedEmail)) {
              flex.session.agentEmails.push(decodedEmail);
            }
          }
        });

        let agentIndex = findLastIndexOf(attributes, "member_type", "agent");
        const adminIndex = findLastIndexOf(attributes, "member_type", "admin");
        if (adminIndex > agentIndex) {
          agentIndex = adminIndex;
        }
        if (agentIndex >= 0) {
          const agentFullName = fullNames[agentIndex];
          // flex.session.agentFullName = agentFullName;
          agentAvatar = `${agentFullName?.replaceAll(' ', '')}.png`;
        }

        if (friendlyNames[agentIndex]) {

          agentName = friendlyNames[agentIndex];
          if (authorNameFromMessage && authorNameFromMessage != agentName) {
            agentName = authorNameFromMessage;

            if (authorNameFromMessage.endsWith('.')) {
              authorNameFromMessage = authorNameFromMessage.slice(0, -1);
            }
            const fullName = fullNames.filter(fullName => {
              if (fullName.includes(authorNameFromMessage)) {
                return fullName;
              }
            });
            if (fullName && fullName.length > 0) {
              agentAvatar = `${fullName[0]?.replaceAll(' ', '')}.png`;
            }
          }
          if (flex.session.sellerProfileDetails.pictureUrl !== undefined &&
            flex.session.sellerProfileDetails.pictureUrl !== '') {

            agentAvatar = flex.session.sellerProfileDetails.pictureUrl;

          }

          if (queueName === 'Brand Webchat') {
            agentName = agentName + ', Agent';
            title = 'Customer Service';
          }
          else if (formType === 'Style') {
            agentName = agentName + ', Style Advisor';
          }
          else if (formType === 'Beauty') {
            agentName = agentName + ', Beauty Advisor';
          }
          else if (this.isCustomerServ) {
            agentName = agentName + ', Agent';
          }
        }
      }
    }
    return (
      <div>
        <h2 style={{ margin: 0, paddingLeft: 10 }}>{title}</h2>
      </div>
    );
  }
}

export default ActiveChatAgentGreeting;