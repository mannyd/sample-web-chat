import React from 'react';
import { AgentHelpers } from '../../utils/helpers';
import './styles.css';

// const center = {
//   textAlign: 'center',
//   position: 'absolute',
//   paddingTop: '50%',
//   top: '0px',
//   bottom: '0px',
//   left: '0px',
//   right: '0px',
//   background: 'rgba(255, 255, 255, 1)'
// };

class EndChatModal extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.State = this.props.manager.store.getState();
  }

  async handleClick() {
    const { flex } = this.props.manager.store.getState();
    flex.session.showModal = false;

    if (this.props.channel != undefined) {
      const { isProactive, proactiveData } = this.props.channel.source.attributes.pre_engagement_data;
      if (isProactive) {
        if (window && window.localStorage) {
          window.localStorage.setItem('proactiveChatEndedAt', Date.now());
        }
        //ccc-1592 proactiveChatEndedAt only for proactive chat 
      }
      if (flex.session.activeEngagmentType.isCustomerServ || flex.session.activeEngagmentType.engagementType === 'beauty') {
        Twilio.FlexWebChat.Actions.invokeAction('MinimizeChat');
      } else {
        /**
         * minimizing chat on click of end chat button, instead of showing post chat screen.
         * Remove this line, when style advisor post chat screen needs to be showed
         */
        Twilio.FlexWebChat.Actions.invokeAction('MinimizeChat');

        /** For Ticket - CCC-2319 (Suppress the Style Advisor Post Chat Screen)
         * uncomment between Start-1 and End-1, when style advisor post chat screen needs to be showed
         */
        //Start-1

        // flex.session.showPostChat = true;
        // Twilio.FlexWebChat.Actions.invokeAction('ShowPostChat', {});

        //End-1


      }
      const { channels } = flex.chat;
      
      if (Object.keys(channels).length) {
        // Assumes there's only one chat channel for webchat widget
        const { messages } = channels[Object.keys(channels)[0]];
        const isAgentClosed = await AgentHelpers.isAgentEndChat(this.props.sid); // check task not closed by agent (no task sid)
        if (isAgentClosed === "customerClosed" && messages.length > 0) {
          //check if  task created, if customer having conversation with agent then task will get created
          await this.props.channel.source.sendMessage("Customer closed the chat.");
          console.error("customer closed chat Still in Task Routing Queue.....");
        }
        if (isAgentClosed === "agentClosed") {
          console.error("Agent Already closed the Task.....");

        }
      }
    }

    // Added extra or condition for Style to restart engagement after endchat
    // remove condition for style, when style advisor post chat screen needs to be showed
    if (flex.session.activeEngagmentType.isCustomerServ || flex.session.activeEngagmentType.engagementType === 'beauty' || flex.session.activeEngagmentType.engagementType === 'style') {
      Twilio.FlexWebChat.Actions.invokeAction('RestartEngagement', { isCustomerEndedTheChat: true });
    }
  }

  render() {

    return (
      this.State.flex.session.showModal ?
        <div className='twcEndChatCenter'>
          <p>Are you sure you want to end the chat?</p>
          <Twilio.FlexWebChat.Button onClick={this.handleClick.bind(this)}>Yes</Twilio.FlexWebChat.Button>
          <Twilio.FlexWebChat.Button onClick={
            () => {
              this.State.flex.session.showModal = false;
              Twilio.FlexWebChat.Actions.invokeAction("SetInputText", { body: " ", channelSid: this.props.sid });
            }
          }>No</Twilio.FlexWebChat.Button>
        </div> : null
    )

  }
}


export default EndChatModal;