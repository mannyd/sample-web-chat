export default theme => ({
  twcChatInputNmInput: {
    marginTop: 15
  },
  twcChatInputTextArea: {
    padding: 0,
    '& textarea:not([aria-hidden="true"])': {
      padding: '12px 10px'
    }
  },
  twcChatInputChatDivider: {
    marginTop: 8
  },
  twcChatInputBtnContainer: {
    display: 'flex',
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between'
  },
  twcChatInputSendBtn: {
    minWidth: 36,
    minHeight: 36
  },
  twcChatInputSendIcon: {
    maxHeight: 20,
    maxWidth: 20
  },
  twcChatInputRoot: {
    padding: '0 3.75%'
  },
  twcChatInputEndChatBtn: {
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'rgb(255, 255, 255)',
    width: '100%',
    marginBottom: 10,
    height: 35,
    fontWeight: 'bold',
    paddingLeft: 6,
    paddingRight: 6
  },
  twcChatInputErrorMessage: {
    fontSize: '0.7rem',
    fontWeight: '500',
    color: 'red',
    marginTop: '0.2rem',
  }
});
