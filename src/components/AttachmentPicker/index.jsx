import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import NMIconButton from '../NMIconButton';
import AttachIcon from '../../assets/AttachIcon';
import { withStyles } from '@mui/styles';

class AttachmentPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '' };
    this.pickerRef = React.createRef();
  }

  handleOpen = () => {
    this.pickerRef.current.click();
  };

  handleChange = event => {
    const { onAttachmentSelected } = this.props;
    const file = event.target.files[0];
    this.validateSelectedFile(file)
    onAttachmentSelected(file);
    this.setState({ file: '' });
  };

  validateSelectedFile = (selectedFile) => {
    const { errorMsg } = this.props;
    const MAX_FILE_SIZE = 3072; //3MB 

    if (!selectedFile) {
      errorMsg.message = 'Please choose a file'
      return;
    }
    const fileSizeKiloBytes = selectedFile.size / 1024

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      errorMsg.message = 'File size is greater than maximum limit'
      return;
    }

    errorMsg.message = '';
  }

  render() {
    const { disabled, classes } = this.props;

    return (
      <React.Fragment>
        <NMIconButton
          icon={<AttachIcon variant="AddAttachment" />}
          variant="AddAttachment"
          onClick={this.handleOpen}
          disabled={disabled}
        />
        <input
          ref={this.pickerRef}
          type="file"
          value={this.state.file}
          onChange={this.handleChange}
          className={classes.twcAttachmentPickerInput}
          disabled={disabled}
          accept="image/png, image/jpeg"
        />
      </React.Fragment>
    );
  }
}

AttachmentPicker.propTypes = {
  onAttachmentSelected: PropTypes.func,
  disabled: PropTypes.bool
};

AttachmentPicker.defaultProps = {
  onAttachmentSelected: () => { },
  disabled: false
};

export default withStyles(styles)(AttachmentPicker);
