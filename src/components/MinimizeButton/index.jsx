import React from 'react';
//import * as FlexWebChat from "@twilio/flex-webchat-ui";

export default class MinimizeButton extends React.Component {
 /**
  * onClick handler, invokes the minimize action
  */
  handleClick() {
    Twilio.FlexWebChat.Actions.invokeAction("MinimizeChat");
  }

  /**
   * Builtin React method called to render this component
   */
  render() {
    let style = {
      cursor: "pointer"
    }
    return <span style={style} onClick={this.handleClick.bind(this)}>
      <Twilio.FlexWebChat.Icon icon="ArrowDown" />
    </span>
  }
}
// import React from 'react';
// //import * as FlexWebChat from "@twilio/flex-webchat-ui";

// export default class MinimizeButton extends React.Component {
//  /**
//   * onClick handler, invokes the minimize action
//   */
//   handleClick() {
//     Twilio.FlexWebChat.Actions.invokeAction("MinimizeChat");
//   }

//   /**
//    * Builtin React method called to render this component
//    */
//   render() {
//     let style = {
//       cursor: "pointer"
//     }
//     return <span style={style} onClick={this.handleClick.bind(this)}>
//       <Twilio.FlexWebChat.Icon icon="ArrowDown" />
//     </span>
//   }
// }