import {
  SampleWidgetConfig,
  BergdorfGoodmanWidgetConfig,
  HorchowWidgetConfig,
  customComponentsConfig,
  preFillPreEngagementForm,
  hoursOfOperation
} from './widget-config';
import { managerStrings } from './manager-strings';
import { getPredefinedMessage as getPredefinedMessageForProactiveChat } from './proactive-chat';

export const NMConfig = {
  widgetConfig: SampleWidgetConfig,
  customComponentsConfig,
  managerStrings,
  preFillPreEngagementForm,
  getPredefinedMessageForProactiveChat,
  hoursOfOperation
};

export const BGConfig = {
  widgetConfig: BergdorfGoodmanWidgetConfig,
  customComponentsConfig,
  managerStrings,
  preFillPreEngagementForm,
  getPredefinedMessageForProactiveChat,
  hoursOfOperation
};

export const HConfig = {
  widgetConfig: HorchowWidgetConfig,
  customComponentsConfig,
  managerStrings,
  preFillPreEngagementForm,
  getPredefinedMessageForProactiveChat,
  hoursOfOperation
};
