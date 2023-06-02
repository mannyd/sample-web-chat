import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  withStyles,
  CircularProgress,
  MuiThemeProvider
} from '@material-ui/core';
import clsx from 'clsx';

import CloseIcon from '@material-ui/icons/Close';
import PhotoIcon from '@material-ui/icons/Photo';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import defaultTheme from '../../themes/default-theme';
import styles from './styles';
import { FileHelpers } from '../../utils/helpers';
import Resource from '../../utils/resource';

const Icons = { PhotoIcon, InsertDriveFileIcon };

class AttachmentItem extends Component {
  constructor(props) {
    super(props);
    const { name } = props.attachment;
    const label = name.split('.')[0];
    const nameParts = name.split('.');
    const fileExtension = nameParts[nameParts.length - 1];

    this.state = {
      name,
      label,
      fileExtension,
      signedUrl: undefined
    };
  }

  componentDidMount = async () => {
    const { s3Key } = this.props.attachment;
    if (s3Key) {
      try {
        const response = await Resource('get-signed-url').read({ s3Key });
        this.setState({ signedUrl: response.signedUrl });
      } catch (e) {
        console.error('Error occurred in AttachmentItem.componentDidMount()', e);
      }
    }
  };

  handleOpen = () => {
    const { signedUrl } = this.state;
    if (signedUrl) {
      window.open(signedUrl, '_blank', 'noopener');
    }
  };

  handleClearAttachment = event => {
    event.stopPropagation();
    this.props.onClearAttachment();
  };

  render() {
    const { name, fileExtension, signedUrl } = this.state;
    const {
      attachment,
      canDelete,
      isUploading,
      classes,
      className
    } = this.props;
    const attachmentIsImage = FileHelpers.isImage(fileExtension);
    const iconName = attachmentIsImage ? 'PhotoIcon' : 'InsertDriveFileIcon';
    const Icon = Icons[iconName];
    const hasThumbnail = attachmentIsImage && (signedUrl || attachment.data);
    const thumbnailUrl = attachment.data ? attachment.data : signedUrl;

    return (
      <MuiThemeProvider theme={defaultTheme}>
        {canDelete && (
          <Twilio.FlexWebChat.IconButton
            icon={<CloseIcon fontSize='small' className={classes.twcAttachmentItemCrossIcon} />}
            onClick={this.handleClearAttachment}
            onMouseDown={event => event.stopPropagation()}
            className={classes.twcAttachmentItemClearBtn}
          />
        )}
        <Grid container className={clsx(classes.twcAttachmentItemContainer, className)}>
          <div
            className={classes.twcAttachmentItemBtnBase}
            onClick={this.handleOpen}
            disabled={!signedUrl}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.twcAttachmentItemThumbWrapper}
            >
              {!hasThumbnail && <Icon />}
              {hasThumbnail && (
                <div
                  className={classes.twcAttachmentItemThumb}
                  style={{ backgroundImage: `url(${thumbnailUrl})` }}
                ></div>
              )}
            </Grid>
            {isUploading && (
              <Grid container className={classes.twcAttachmentItemSecondaryAction}>
                <CircularProgress size={28} color="inherit" />
              </Grid>
            )}

          </div>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

AttachmentItem.propTypes = {
  attachment: PropTypes.object,
  canDelete: PropTypes.bool,
  onClearAttachment: PropTypes.func
};

AttachmentItem.defaultProps = {
  attachment: undefined,
  canDelete: false,
  onClearAttachment: () => {}
};

export default withStyles(styles)(AttachmentItem);
