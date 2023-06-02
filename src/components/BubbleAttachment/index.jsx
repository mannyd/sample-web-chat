import React, { Component } from 'react';
import { Grid, Link, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles';
import AttachmentItem from '../AttachmentItem';

class BubbleAttachment extends Component {
  constructor(props) {
    super(props);
    this.state = { showAll: false };
  }

  toggleShowAll = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  render() {
    const { showAll } = this.state;
    const { message, classes } = this.props;
    const gridItemClasses = clsx(classes.twcBubbleAttachmentListItem, showAll && classes.twcBubbleAttachmentExpanded);

    let { attachments } = message.source.attributes;
    attachments.sort((a, b) => a.name.localeCompare(b.name));
    const attachmentComponents = attachments.map((attachment, idx) => {
      return (
        <Grid item xs={12} key={`attachment-${idx}`}>
          <AttachmentItem attachment={attachment} />
        </Grid>
      );
    });
    
    return (
      <Grid container direction="column" className={classes.twcBubbleAttachmentContainer}>
        <Grid item xs={12} className={gridItemClasses}>
          {attachmentComponents}
        </Grid>

        {attachments.length > 2 && (
          <Grid item xs={12} className={classes.twcBubbleAttachmentExpandItem}>
            <Link onClick={this.toggleShowAll} className={classes.twcBubbleAttachmentExpandLink}>
              {showAll ? 'Show less' : 'Show more'}
            </Link>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(BubbleAttachment);
