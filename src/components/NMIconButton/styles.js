import { Config } from '../../config';

export default theme => {
  const { brand } = SampleWebchat;
  const { ButtonVariants={} } = Config[brand].customComponentsConfig;
  let styles = {
    twcNmIconBtn: {
      width: 'auto',
      height: 'auto',
      padding: 6
    },
    noVariantProvided: {
      backgroundColor: 'transparent',
      color: '#000',
      '&:hover': {
        backgroundColor: '#CCC'
      },
      '&:disabled': {
        opacity: 0.2,
        backgroundColor: 'transparent'
      },
      '&:disabled:hover': {
        backgroundColor: 'transparent'
      }
    }
  };

  Object.keys(ButtonVariants).forEach(variant => {
    const config = ButtonVariants[variant];
    styles[variant] = {
      backgroundColor: config.backgroundColor,
      color: config.color,
      '&:hover': {
        backgroundColor: config.hoverBackgroundColor
      },
      '&:disabled': {
        opacity: 0.2,
        backgroundColor: config.backgroundColor
      },
      '&:disabled:hover': {
        backgroundColor: config.backgroundColor
      }
    }
  });
  
  return styles;
};
