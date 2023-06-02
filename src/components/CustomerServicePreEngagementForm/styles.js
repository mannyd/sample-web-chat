import { ImportantDevices } from "@material-ui/icons";

export default theme => ({
  twcCustomerPreEngagementNmInput: {
    marginTop: 12
  },
  twcCustomerPreEngagementTextArea: {
    marginTop: '1px !important',
    padding: 0,
    '& textarea:not([aria-hidden="true"])': {
      padding: '12px 10px'
    }
  },
  twcCustomerPreEngagementChatDivider: {
    marginTop: 8
  },
  twcCustomerPreEngagementBtnContainer: {
    display: 'flex',
    marginTop: 0,
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between'
  },
  twcCustomerPreEngagementSendBtn: {
    minWidth: 36,
    minHeight: 36
  },
  twcCustomerPreEngagementSendIcon: {
    maxHeight: 20,
    maxWidth: 20
  },
  twcCustomerPreEngagementRoot: {
    padding: '0 3.75%'
  },
  twcCustomerPreEngagementSubmitButton: {
    color: 'rgb(255, 255, 255)',
    width: '100%',
    backgroundImage: 'linear-gradient(to top, rgb(0, 0, 0), rgb(0, 0, 0))',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    whiteSpace: 'nowrap',
    alignSelf: 'flex-start',
    borderRadius: 0,
    padding: '9px 16px',
    height: 'auto',
    textTransform: 'uppercase',
    marginTop: 0,
    '&:disabled': {
      opacity: 0.2,
      backgroundColor: 'transparent'
    },
  },
  twcCustomerPreEngagementChatHeader: {
    paddingTop: 0,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 400
  },
  twcCustomerPreEngagementTextFieldEmail: {
    marginTop: '1px !important',
    '& p': {
      marginTop: '0px !important',
      padding: '0px 0px !important',
      color: 'red'
    }
  },
  twcCustomerPreEngagementTextField: {
    marginTop: '1px !important',
    '& p': {
      marginTop: '0px !important',
      padding: '0px 0px !important',
      color: 'red'
    }
  },
  twcCustomerPreEngagementAttachmentContainer: {
    position: 'relative',
    marginTop: '0px !important'
  },
  twcCustomerPreEngagementErrorMessage: {
    fontSize: '0.7rem',
    fontWeight: '500',
    color: 'red',
    marginTop: '0.2rem',
  }
});