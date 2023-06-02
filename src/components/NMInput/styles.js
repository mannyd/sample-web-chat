export default theme => ({
  twcNmInputWrapper: {
    padding: 0,
    borderRadius: 4,
    overflow: 'hidden',
    '&::after': {
      content: 'unset'
    },
    '&::before': {
      content: 'unset'
    }
  },
  twcNmInput: {
    padding: '12px 10px'
  },
  twcNmMultilineInput: {
    maxWidth: 'calc(100% - 20px)'
  }
});
