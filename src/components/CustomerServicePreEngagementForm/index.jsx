import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import AttachmentPicker from '../AttachmentPicker';
import AttachmentItem from '../AttachmentItem';
import styles from './styles';
import { FileHelpers, InputHelpers, UtagHelpers } from '../../utils/helpers';
import { Grid, TextField } from '@mui/material';

class CustomerServicePreEngagementForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      inputText: '',
      inputName: '',
      inputEmail: '',
      isValidEmail: true,
      inputOrderNumber: '',
      typingActionPending: false,
      attachment: undefined,
      disabled: false,
      errorMsg: { message: '' },
    };
    this.msgRef = React.createRef();
    this.scrollRef = React.createRef();
  }

  handleInputChange = (event, field) => {
    const { typingActionPending } = this.state;

    if (field === 'name') {
      let filteredName = event.target.value.replace(/[\t!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
      this.setState({
        inputName: filteredName
        //inputName: event.target.value
      });
    }
    else if (field === 'email') {
      this.setState({
        inputEmail: event.target.value
      });
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(event.target.value);
      this.setState({
        isValidEmail
      });
    }
    else if (field === 'orderNumber') {
      this.setState({
        inputOrderNumber: event.target.value
      });
    }
    else {
      let filteredInput = event.target.value.replace(/[\t!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
      this.setState({
        typingActionPending: true,
        inputText: filteredInput
        //inputText: event.target.value
      });
    }
  };

  handleAttachmentSelected = async file => {
    const data = await FileHelpers.getDataURL(file);
    const attachment = { name: file.name, data };
    this.setState({ attachment });
    this.scrollRef.current.scrollIntoView();
  };

  handleClearAttachment = () => {
    this.setState({ attachment: undefined });
    this.setState({ errorMsg: { message: '' } })

  };

  handleEmojiSelected = emoji => {
    const { current: inputEl } = this.msgRef;

    const insertResult = InputHelpers.insertEmoji(inputEl, emoji);
    const { newValue, selectionStart, selectionEnd } = insertResult;

    this.setState({ inputText: newValue });
    // Small hack to focus input after render and restore the cursor position
    setTimeout(() => {
      inputEl.focus();
      inputEl.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  handleSubmit = async () => {
    const { onSubmit } = this.props;
    let { inputText, attachment, inputName, inputEmail, inputOrderNumber } = this.state;
    const pattern = /\b(?:\d[ -]*?){15,16}\b/g;
    const shouldMaskText = pattern.test(inputText);

    let utagData = {chat_type: "Reactive Chat", fab_option: "Customer Service", event_name: "startChat"};
    const { flex } = this.props.manager.store.getState();
    UtagHelpers.setAATagsEventName(flex, utagData.event_name);
    UtagHelpers.setUtagData(utagData); //Added for Adobe Analytics for Customer Service.

    let aaTags = {
      chat_type: "Reactive Chat",
      event_name: flex.session.AATags?.event_name,
      fab_option: "Customer Service",
      page_definition_id: "nm chat",
      page_name: "Twilio Chat",
      page_template: "nm chat",
      page_type: "chat application",
    }

    if (shouldMaskText) {
      inputText = inputText.replace(pattern, '************');
    }
    this.setState({ uploading: true, disabled: true });
    try {
      if (attachment) {
        await onSubmit({ firstName: inputName, emailAddr: inputEmail, orderNum: inputOrderNumber, message: inputText, attachment, tags: aaTags });
      } else {
        await onSubmit({ firstName: inputName, emailAddr: inputEmail, orderNum: inputOrderNumber, message: inputText, tags: aaTags });
      }
    } catch (e) {
      console.error('Error occurred in CustomerServicePreEngagementForm.handleSubmit()', e);
      this.setState({ disabled: false });
      // Maybe do something if message fails to send?
    }
    this.setState({ inputText: '', attachment: undefined, uploading: false });
    setTimeout(() => {
      this.setState({ disabled: false });
    }, 400);
  };

  canSubmit = () => {
    return this.state.inputName !== '' && this.state.inputEmail !== '' && this.state.isValidEmail && this.state.inputText !== '' && this.state.errorMsg.message === '';
  }

  render() {
    const { classes } = this.props;
    const { inputText, inputName, inputEmail, inputOrderNumber, attachment, uploading, disabled, isValidEmail, errorMsg } = this.state;

    return (
      <>
        <style>
          {`
            .Twilio-MainContainer {
              height: 465px;
            }
          `}
        </style>
        <div>{`Customer Service`}</div>
        <div>
          <Grid container item xs={12}>
            <TextField
              placeholder="Your Name*"
              fullWidth
              multiline={false}
              margin="normal"
              onChange={(e) => this.handleInputChange(e, 'name')}
              value={inputName}
            //error={inputName == ''}
            //helperText={inputName == '' ? 'Field required' : ''}
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              placeholder="Your Email*"
              fullWidth
              multiline={false}
              margin="normal"
              onChange={(e) => this.handleInputChange(e, 'email')}
              value={inputEmail}
              type="email"
              //error={!isValidEmail || inputEmail == '' }
              //helperText={inputEmail == '' ? 'Field required' : !isValidEmail ? 'Invalid email address!' : ''}
              error={!isValidEmail}
              helperText={!isValidEmail ? 'Invalid email address!' : ''}
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              placeholder="Order number"
              fullWidth
              multiline={false}
              margin="normal"
              onChange={(e) => this.handleInputChange(e, 'orderNumber')}
              value={inputOrderNumber}
            //error={inputOrderNumber == ''}
            //helperText={inputOrderNumber == '' ? 'Field required' : ''}
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              fullWidth
              placeholder="Message*"
              multiline
              rows="5"
              margin="normal"
              inputRef={this.msgRef}
              onChange={(e) => this.handleInputChange(e, 'message')}
              value={inputText}
              disabled={uploading || disabled}
            />
            {attachment && (
              <Grid
                container
                item
                xs={12}
                direction="column"
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
          </Grid>
          <div>
            <div >
              <AttachmentPicker
                onAttachmentSelected={this.handleAttachmentSelected}
                onClearAttachment={this.handleClearAttachment}
                disabled={uploading}
                errorMsg={errorMsg}
              />
            </div>
          </div> 
          <p ref={this.scrollRef}>{errorMsg.message}</p>
          <button
            onClick={this.canSubmit() ? this.handleSubmit : null}
            disabled={!this.canSubmit()}
            fullWidth
          >
            START CHATTING
          </button>
        </div>
      </>
    );
  }
}

export default CustomerServicePreEngagementForm;