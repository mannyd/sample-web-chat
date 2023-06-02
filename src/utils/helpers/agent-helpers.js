import Resource from '../resource';

export async function isSpecialistAvailable(product) {
  if (product && product.length > 0) {
    try {
      const response = await Resource('check-specialist-availability').create({ product });
      return response.message;
    } catch (e) {
      console.error('Failed to check for specialist availability', e);
      return false;
    }
  } else {
    return false;
  }
};

export async function isAgentEndChat(channelSid) {
  if (channelSid && channelSid.length > 0) {
    try {
      const response = await Resource('check-agent-end-chat').create({ channelSid });
      return response.message;
    } catch (e) {
      console.error('Failed to check for agent End the Task and ChatChannel', e);
      return false;
    }
  } else {
    return false;
  }
};

export async function checkIfAgentIsFromBrandWebchatQueue(agentEmail) {
  if (agentEmail && agentEmail.length > 0) {
    try {
      const response = await Resource('get-subscribed-queue').create({ agentEmail });
      return response.message;
    } catch (error) {
      console.error('Failed to check if agent is from brand webchat queue:', error);
      return false;

    }
  } else {
    return false;
  }
};

export async function getSellerProfileDetails(associatePin) {
  if (associatePin) {
    try {
      const response = await Resource('get-seller-profile').create({associatePin})
      return response.message;
    } catch (error) {
      console.error('Failed to get seller profile details', error);
      return false;
    }
  } else {
    return false;
  }
};

export async function saveCustomerSARelation(sellerDetailsPayload) {
  if (sellerDetailsPayload) {
    try {
      const response = await Resource('save-customer-sa-relation').create({ sellerDetailsPayload });
      return response.message;
    } catch (error) {
      console.error('Failed to save customer SA relation', error);
      return false;
    }
  } else {
    return false;
  }
};

export async function saveSARating(ratingPayload) {
  try {
    const response = await Resource('save-sa-rating').create({ ratingPayload });
    return response.message;
  } catch (error) {
    console.error('Failed to save stylist rating', error);
    return false;
  }
};

export async function initiatePostChat(taskSid) {
  if (taskSid && taskSid.length > 0) {
    try {
      const response = await Resource('initiate-post-chat').create({ taskSid });
      return response.message;
    } catch (e) {
      console.error('Failed to End the Task and ChatChannel', e);
      return false;
    }
  } else {
    return false;
  }
};
