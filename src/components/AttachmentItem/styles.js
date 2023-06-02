export default theme => ({
  twcAttachmentItemContainer: {
    width: 'auto',
    maxWidth: '100%',
    border: '1px solid #ccc',
    borderRadius: 4,
    margin: '2px 0',
    overflow: 'hidden'
  },
  twcAttachmentItemBtnBase: {
    width: '100%',
    height: '100%'
  },
  twcAttachmentItemTexts: {
    color: 'inherit',
    width: 'auto',
    flex: 1,
    padding: '0 8px',
    minWidth: 128
  },
  twcAttachmentItemName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  twcAttachmentItemThumbWrapper: {
    minWidth: 64,
    flexBasis: 64,
    height: 60,
    backgroundColor: '#ccc',
    borderRight: '1px solid #ccc'
  },
  twcAttachmentItemThumb: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%'
  },
  twcAttachmentItemSecondaryAction: {
    flexBasis: 32,
    alignSelf: 'center',
    width: 'auto',
    padding: '0 4px 0 0'
  },
  twcAttachmentItemClearBtn: {
    pointerEvents: 'all',
    color: 'white',
    position: 'absolute',
    right: -2,
    background: 'black',
    width: 20,
    height: 20,
    borderRadius: 20,
    border: "1px solid white"
  },
  twcAttachmentItemCrossIcon: {
    fontSize: 14
  }
});
