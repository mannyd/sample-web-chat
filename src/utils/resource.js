const axios = require('axios');
const { API_DEFAULT_TIMEOUT } = require('../utils/constants');
const { AWS_ENDPOINT } = process.env;

async function createServer(timeout = API_DEFAULT_TIMEOUT) {
  const { flex } = SampleWebchat.manager.store.getState();
  const { tokenPayload } = flex.session;
  // Webchat has not started a chat channel yet if token payload is null
  // If null, we're likely checking for product specialist prior to opening
  // So get token like webchat automatically does, will expire in 1h
  const token =
    tokenPayload === null ||
    tokenPayload === undefined ||
    !tokenPayload ||
    !Object.hasOwnProperty.call(flex, 'tokenPayload')
      ? await generateWebchatToken(flex.config)
      : tokenPayload.token;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  };
  return axios.create({ baseURL: AWS_ENDPOINT, headers, timeout });
}

async function generateWebchatToken(flexConfig) {
  const { tokenServerUrl, accountSid } = flexConfig;
  const requestURL = tokenServerUrl.replace(/{accountSid}/g, accountSid);
  const { data } = await axios.post(
    requestURL,
    { products: ['flex'] },
    { headers: { 'Content-Type': 'application/json' } }
  );

  return data.token;
}

async function mapCreateResponse(url, data, params, timeout) {
  const server = await createServer(timeout);
  const response = await server.post(url, data, { params });
  return response.data;
}

async function mapReadResponse(url, params, timeout) {
  const server = await createServer(timeout);
  const response = await server.get(url, { params });
  return response.data;
}

async function mapUpdateResponse(url, data, params, timeout) {
  const server = await createServer(timeout);
  const response = await server.put(url, data, { params });
  return response.data;
}

async function mapDestroyResponse(url, params, timeout) {
  const server = await createServer(timeout);
  const response = await server.delete(url, { params });
  return response.data;
}

export default endpoint => {
  const url = `/${endpoint}`;
  return {
    create: (data, params, timeout) =>
      mapCreateResponse(url, data, params, timeout),
    read: (params, timeout) => mapReadResponse(url, params, timeout),
    update: (data, params, timeout) =>
      mapUpdateResponse(url, data, params, timeout),
    destroy: (params, timeout) => mapDestroyResponse(url, params, timeout)
  };
};
