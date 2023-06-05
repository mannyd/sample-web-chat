import { isImage, getDataURL } from './file-helpers';
import { insertEmoji, findLastIndexOf } from './input-helpers';
import { upload } from './attachment-helpers';
import {
  isSpecialistAvailable, isAgentEndChat,
  checkIfAgentIsFromBrandWebchatQueue, getSellerProfileDetails, saveCustomerSARelation, initiatePostChat, saveSARating
} from './agent-helpers';
import { setAATagsEventName, setUtagData, getUtagData, getBrandInfoFromNMO } from './utag-helpers';

export const FileHelpers = {
  isImage,
  getDataURL
};

export const InputHelpers = {
  insertEmoji,
  findLastIndexOf
};

export const AttachmentHelpers = {
  upload
};

export const AgentHelpers = {
  isSpecialistAvailable,
  isAgentEndChat,
  checkIfAgentIsFromBrandWebchatQueue,
  getSellerProfileDetails,
  saveCustomerSARelation,
  initiatePostChat,
  saveSARating,
};

export const UtagHelpers = {
  setAATagsEventName,
  setUtagData,
  getUtagData,
  getBrandInfoFromNMO
};