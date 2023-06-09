import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import {
  FileHelpers,
  InputHelpers,
  AttachmentHelpers,
} from '../../utils/helpers';
import NMInput from '../NMInput';
import NMIconButton from '../NMIconButton';
import AttachmentItem from '../AttachmentItem';
import AttachmentPicker from '../AttachmentPicker';
import SendIcon from '../../assets/SendIcon';
import styles from './styles';
import defaultTheme from '../../themes/default-theme';

class ChatInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      inputText: '',
      typingActionPending: false,
      attachment: undefined,
      disabled: false,
      errorMsg: { message: '' },
    };
    this.inputRef = props.chatInputRef;
  }

  handleEmojiSelected = emoji => {
    const { current: inputEl } = this.inputRef;

    const insertResult = InputHelpers.insertEmoji(inputEl, emoji);
    const { newValue, selectionStart, selectionEnd } = insertResult;
    this.setState({ inputText: newValue });
    // Small hack to focus input after render and restore the cursor position
    setTimeout(() => {
      inputEl.focus();
      inputEl.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  handleAttachmentSelected = async file => {
    const data = await FileHelpers.getDataURL(file);
    const attachment = { name: file.name, data };
    this.setState({ attachment });
  };

  handleClearAttachment = () => {
    this.setState({ attachment: undefined });
    this.setState({ errorMsg: { message: '' } })
  };

  handleInputChange = event => {
    const { channelSid, channel } = this.props;
    const { typingActionPending } = this.state;
    if (!typingActionPending && channel?.members.size > 1) {
      this.setState({
        typingActionPending: true,
        inputText: event.target.value
      });
      Twilio.FlexWebChat.Actions.invokeAction('SendTyping', {
        channelSid
      }).then(() => {
        this.setState({ typingActionPending: false });
      });
    } else {
      this.setState({ inputText: event.target.value });
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSendMessage();
      this.setState({ errorMsg: { message: '' } })

    }
  };

  handleSendMessage = async () => {
    const { channel, channelSid } = this.props;
    let { inputText, attachment } = this.state;
    let {isProactive, proactiveData} = channel.source.attributes.pre_engagement_data;
    const pattern = /\b(?:\d[ -]*?){15,16}\b/g;
    const shouldMaskText = pattern.test(inputText);

    if (shouldMaskText) {
      inputText = inputText.replace(pattern, '************');
    }
    this.setState({ uploading: true, disabled: true });
    try {
      if (attachment) {
        let attachments;
        try {
          const response = await AttachmentHelpers.upload(
            channelSid,
            attachment
          );
          attachments = [{ name: attachment.name, s3Key: response.s3Key }];
        } catch (e) {
          console.error('Error occurred in ChatInput.handleSendMessage() 1 ', e);
          // Maybe do something if upload fails?
        }
        await channel.source.sendMessage(inputText, { attachments });

      } else {
        await channel.source.sendMessage(inputText);
      }
    } catch (e) {
      console.error('Error occurred in ChatInput.handleSendMessage() 2 ', e);
      this.setState({ disabled: false });
      // Maybe do something if message fails to send?
    }
    this.setState({ inputText: '', attachment: undefined, uploading: false });
    this.setState({ errorMsg: { message: '' } })
    setTimeout(() => {
      this.setState({ disabled: false });
    }, 400);
  };

  canSubmit = () => {
    return this.state.errorMsg.message === '';
  }

  render() {
    const { classes, showEndChatButton, endChatAction, manager } = this.props;
    const { inputText, attachment, uploading, disabled, errorMsg } = this.state;
    const canSendMessage =
      (attachment && inputText.length > 0) ||
      (inputText.length > 0 && !uploading);

    return (
      <ThemeProvider theme={defaultTheme}>
        <div className={classes.twcChatInputRoot}>
          <Grid container item xs={12}>
            <NMInput
              fullWidth
              multiline
              rowsMax="2"
              value={inputText}
              onChange={this.handleInputChange}
              onKeyPress={this.canSubmit() ? this.handleKeyPress : null}
              disabled={uploading || disabled}
              inputRef={this.inputRef}
              className={classes.twcChatInputNmInput}
              InputProps={{ className: classes.twcChatInputTextArea }}
              key="custom-chat-input"
            />
          </Grid>
          {attachment && (
            <Grid
              container
              item
              xs={12}
              direction="column"
              className={classes.attachmentContainer}
            >
              <AttachmentItem
                key={attachment.name}
                attachment={attachment}
                canDelete={!uploading}
                isUploading={uploading}
                onClearAttachment={this.handleClearAttachment}
              />
            </Grid>
          )}
          <div className={classes.twcChatInputBtnContainer}>
            <div className={classes.pickerButtons}>
              <AttachmentPicker
                onAttachmentSelected={this.handleAttachmentSelected}
                onClearAttachment={this.handleClearAttachment}
                disabled={uploading}
                errorMsg={errorMsg}
              />
            </div>
            <div className={classes.sendBtnContainer}>
              <NMIconButton
                icon={
                  <SendIcon
                    variant="SendMessage"
                    className={classes.twcChatInputSendIcon}
                  />
                }
                variant="SendMessage"
                className={classes.twcChatInputSendBtn}
                disabled={!(canSendMessage && this.canSubmit())}
                onClick={this.canSubmit() ? this.handleSendMessage : null}
              />
            </div>
          </div>
          <p className={classes.twcChatInputErrorMessage}>{errorMsg.message}</p>
          {showEndChatButton && (
            <div className={classes.sendBtnContainer}>
              <button
                className={classes.twcChatInputEndChatBtn}
                onClick={() => endChatAction(manager)}
                fullWidth
              >
                End Chat
              </button>
            </div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(ChatInput);
