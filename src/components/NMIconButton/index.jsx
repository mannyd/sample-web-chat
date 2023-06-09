import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import styles from './styles';

class NMIconButton extends Component {
  render() {
    const { classes, className, variant, ...props } = this.props;

    return (
      <Twilio.FlexWebChat.IconButton
        {...props}
        className={clsx(classes.twcNmIconBtn, classes[variant], className)}
      />
    );
  }
}

NMIconButton.propTypes = {
  variant: PropTypes.string
};

NMIconButton.defaultProps = {
  variant: 'noVariantProvided'
};

export default withStyles(styles)(NMIconButton);
