import React, { Component } from 'react';
import clsx from 'clsx';
import { TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import styles from './styles';

class NMInput extends Component {
  render() {
    const { classes, multiline, rowsMax, InputProps, inputProps } = this.props;

    return (
      <TextField
        {...this.props}
        variant="outlined"
        rows={rowsMax}
        InputProps={{
          ...InputProps,
          className: clsx(
            classes.twcNmInputWrapper,
            InputProps && InputProps.className
          )
        }}
        inputProps={{
          ...inputProps,
          autocorrect: 'off',
          autocapitalize: 'off',
          spellcheck: 'false',
          className: clsx(
            classes.twcNmInput,
            multiline && classes.twcNmMultilineInput,
            inputProps && inputProps.className
          )
        }}
      />
    );
  }
}

export default withStyles(styles)(NMInput);
