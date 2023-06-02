import moment from 'moment-timezone';
export function preFillPreEngagementForm(data, widgetConfig) {
  const config = widgetConfig.preEngagementConfig;
  const preFilledFields = config.fields.map(fieldConfig => {
    const { attributes } = fieldConfig;
    const value = data[attributes.name];
    return { ...fieldConfig, attributes: { ...attributes, value } };
  });
  return { ...config, fields: preFilledFields };
}

 export const hoursOfOperation = {
  checkHours: (openHour,closeHour) => {
    const now = moment().tz('America/Chicago');
    const openMoment = moment().tz('America/Chicago');
    const closeMoment = moment().tz('America/Chicago');

    const open = openMoment.set({
      hour: openHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const close = closeMoment.set({
      hour: closeHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    if (!moment(now).isBetween(open, close)) {
      return true;
    } else {
      return false;
    }
  },
  checkStyleAdvisorOffHours: () => {
    const openHour = 9;
    const closeHour = 18;
    const now = moment().tz('America/Chicago');
    const openMoment = moment().tz('America/Chicago');
    const closeMoment = moment().tz('America/Chicago');

    const open = openMoment.set({
      hour: openHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const close = closeMoment.set({
      hour: closeHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    if (!moment(now).isBetween(open, close) || moment(now).day() === 6 || moment(now).day() === 0) {
      return true;
    } else {
      return false;
    }
  },

  checkBrandAdvisorOffHours: () => {
    const openHour = 7;
    const closeHour = 18;
    const now = moment().tz('America/Chicago');
    const openMoment = moment().tz('America/Chicago');
    const closeMoment = moment().tz('America/Chicago');

    const open = openMoment.set({
      hour: openHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const close = closeMoment.set({
      hour: closeHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    if (!moment(now).isBetween(open, close) || moment(now).day() === 6 || moment(now).day() === 0) {
      return true;
    } else {
      return false;
    }
  }
};

export const customComponentsConfig = {
  ButtonVariants: {
    SendMessage: {
      color: '#FFF',
      backgroundColor: '#000',
      hoverBackgroundColor: 'rgba(0,0,0,0.8)'
    },
    AddAttachment: {
      color: '#000',
      backgroundColor: 'transparent',
      hoverBackgroundColor: '#ccc'
    },
    InsertEmoji: {
      color: '#000',
      backgroundColor: 'transparent',
      hoverBackgroundColor: '#ccc'
    }
  },
  IconVariants: {
    SendMessage: {
      color: '#FFF'
    },
    AddAttachment: {
      color: '#000'
    },
    InsertEmoji: {
      color: '#000'
    }
  }
};

// NOTE: Some visual settings are being dynamically overriden inside the init() method in index.js file, depending on whether the page
// is being displayed on a mobile or a desktop screen. If you change the widget configuration, please check the index.js file to
// ensure your changes do not clash with these overrides!

export const SampleWidgetConfig = {
  startEngagementOnInit: false,
  preEngagementConfig: {
    description: '',
    submitLabel: 'Contact Agent',
    fields: [
      {
        label: '',
        type: 'InputItem',
        attributes: { name: 'firstName', type: 'text', required: true, placeholder: "First Name" }
      },
      {
        label: '',
        type: 'InputItem',
        attributes: { name: 'lastName', type: 'text', required: true, placeholder: "Last Name" }
      },
      {
        label: '',
        type: 'InputItem',
        attributes: { name: 'emailAddr', type: 'email', required: true, placeholder: "Email Address" }
      },
      {
        label: '',
        type: 'InputItem',
        attributes: { name: 'orderNum', type: 'text', required: false, placeholder: "Order Number" }
      }
    ]
  },
  componentProps: {
    MessagingCanvas: {
      showWelcomeMessage: false,
    },
    MessageCanvasTray: {
      onButtonClick: () => {
        const { flex } = SampleWebchat.manager.store.getState();
        const { channels } = flex.chat;
        const channelSids = Object.keys(channels);

        if (channelSids.length) {
          // Assumes there's only one chat channel for webchat widget
          Twilio.FlexWebChat.Actions.invokeAction('RestartEngagement');
        }
      }
    },
    MessageInput: {
      useLocalState: false
    },
    // Update the imageUrl to change the brand logo in the customer webchat header
    MainHeader: {
      closeCallback: () => {
        Twilio.FlexWebChat.Actions.invokeAction("CloseChat");
      },
      showTitle: false,
      imageUrl: ' '
    }
  },
  colorTheme: {
    overrides: {
      Chat: {
        MessageListItem: {
          FromMe: {
            Bubble: {
              background: '#8A8A8A',
              color: '#FFFFFF'
            }
          },
          FromOthers: {
            Bubble: {
              background: '#ABABAB',
              color: '#FFFFFF'
            }
          }
        },
        MessageCanvasTray: {
          Button: {
            background: '#000000'
          }
        }
      },
      MainHeader: {
        Container: {
          background: '#FFFFFF',
          color: '#000000'
        }
      },
      Modal: {
        SecondaryButton: {
          color: '#FFFFFF'
        }
      },
      Progress: {
        Circular: {
          animatingForegroundBorderColor: '#000000'
        }
      },
      EntryPoint: {
        Container: {
          backgroundImage: 'linear-gradient(to top, #000000, #000000)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            backgroundBlendMode: 'color'
          }
        }
      },
      PreEngagementCanvas: {
        Form: {
          SubmitButton: {
            width: '100%',
            backgroundImage: 'linear-gradient(to top, #000000, #000000)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)',
              backgroundBlendMode: 'color'
            }
          }
        }
      }
    }
  }
};

export const BergdorfGoodmanWidgetConfig = {
  startEngagementOnInit: false,
  preEngagementConfig: {
    description: 'Tell us about yourself',
    submitLabel: 'Contact Agent',
    fields: [
      {
        label: 'First Name',
        type: 'InputItem',
        attributes: { name: 'firstName', type: 'text', required: true }
      },
      {
        label: 'Last Name',
        type: 'InputItem',
        attributes: { name: 'lastName', type: 'text', required: true }
      },
      {
        label: 'Email Address',
        type: 'InputItem',
        attributes: { name: 'emailAddr', type: 'email', required: true }
      },
      {
        label: 'Order Number',
        type: 'InputItem',
        attributes: { name: 'orderNum', type: 'text', required: false }
      }
    ]
  },
  componentProps: {
    MessagingCanvas: {
      showWelcomeMessage: false
    },
    MessageCanvasTray: {
      onButtonClick: () => {
        const { flex } = SampleWebchat.manager.store.getState();
        const { channels } = flex.chat;
        const channelSids = Object.keys(channels);

        if (channelSids.length) {
          // Assumes there's only one chat channel for webchat widget
          const channelSid = Object.keys(channels)[0];
          const { source } = channels[channelSid];
          const { pre_engagement_data: formData } = source.attributes;
          Twilio.FlexWebChat.Actions.invokeAction('RestartEngagement');
          Twilio.FlexWebChat.Actions.invokeAction('StartEngagement', {
            formData
          });
        }
      }
    },
    MessageInput: {
      useLocalState: false
    },
    // Update the imageUrl to change the brand logo in the customer webchat header
    MainHeader: {
      closeCallback: () => {
        Twilio.FlexWebChat.Actions.invokeAction("CloseChat");
      },
      showTitle: false,
      imageUrl: 'https://www.bergdorfgoodman.com/bgecm/image/upload/v1647275634/images/BG_Chat_Logo_3x_93.png'
    }
  },
  colorTheme: {
    overrides: {
      Chat: {
        MessageListItem: {
          FromMe: {
            Bubble: {
              background: '#000000'
            }
          }
        },
        MessageCanvasTray: {
          Button: {
            background: '#000000'
          }
        }
      },
      MainHeader: {
        Container: {
          background: '#000000',
          color: '#FFFFFF'
        }
      },
      Modal: {
        SecondaryButton: {
          color: '#FFFFFF'
        }
      },
      Progress: {
        Circular: {
          animatingForegroundBorderColor: '#000000'
        }
      },
      EntryPoint: {
        Container: {
          backgroundImage: 'linear-gradient(to top, #000000, #000000)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            backgroundBlendMode: 'color'
          }
        }
      },
      PreEngagementCanvas: {
        Form: {
          SubmitButton: {
            backgroundImage: 'linear-gradient(to top, #000000, #000000)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)',
              backgroundBlendMode: 'color'
            }
          }
        }
      }
    }
  }
};

export const HorchowWidgetConfig = {
  startEngagementOnInit: false,
  preEngagementConfig: {
    description: 'Tell us about yourself',
    submitLabel: 'Contact Agent',
    fields: [
      {
        label: 'First Name',
        type: 'InputItem',
        attributes: { name: 'firstName', type: 'text', required: true }
      },
      {
        label: 'Last Name',
        type: 'InputItem',
        attributes: { name: 'lastName', type: 'text', required: true }
      },
      {
        label: 'Email Address',
        type: 'InputItem',
        attributes: { name: 'emailAddr', type: 'email', required: true }
      },
      {
        label: 'Order Number',
        type: 'InputItem',
        attributes: { name: 'orderNum', type: 'text', required: false }
      }
    ]
  },
  componentProps: {
    MessagingCanvas: {
      showWelcomeMessage: false
    },
    MessageCanvasTray: {
      onButtonClick: () => {
        const { flex } = SampleWebchat.manager.store.getState();
        const { channels } = flex.chat;
        const channelSids = Object.keys(channels);

        if (channelSids.length) {
          // Assumes there's only one chat channel for webchat widget
          const channelSid = Object.keys(channels)[0];
          const { source } = channels[channelSid];
          const { pre_engagement_data: formData } = source.attributes;
          Twilio.FlexWebChat.Actions.invokeAction('RestartEngagement');
          Twilio.FlexWebChat.Actions.invokeAction('StartEngagement', {
            formData
          });
        }
      }
    },
    MessageInput: {
      useLocalState: false
    },
    // Update the imageUrl to change the brand logo in the customer webchat header
    MainHeader: {
      closeCallback: () => {
        Twilio.FlexWebChat.Actions.invokeAction("CloseChat");
      },
      showTitle: false,
      imageUrl: 'https://res.cloudinary.com/nmg-prod/image/upload/b_rgb:000000,co_rgb:ffffff,e_colorize:100/v1630427045/content/stock/Horchow_Logo_SVG.png'
    }
  },
  colorTheme: {
    overrides: {
      Chat: {
        MessageListItem: {
          FromMe: {
            Bubble: {
              background: '#000000'
            }
          }
        },
        MessageCanvasTray: {
          Button: {
            background: '#000000'
          }
        }
      },
      MainHeader: {
        Container: {
          background: '#000000',
          color: '#FFFFFF'
        }
      },
      Modal: {
        SecondaryButton: {
          color: '#FFFFFF'
        }
      },
      Progress: {
        Circular: {
          animatingForegroundBorderColor: '#000000'
        }
      },
      EntryPoint: {
        Container: {
          backgroundImage: 'linear-gradient(to top, #000000, #000000)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            backgroundBlendMode: 'color'
          }
        }
      },
      PreEngagementCanvas: {
        Form: {
          SubmitButton: {
            backgroundImage: 'linear-gradient(to top, #000000, #000000)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)',
              backgroundBlendMode: 'color'
            }
          }
        }
      }
    }
  }
};