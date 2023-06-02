import Resource from '../resource';

export async function upload(channelSid, attachment) {
  if (attachment && channelSid && channelSid.length > 0) {
    try {
      console.log(`about to call save-attachment for sid: ${channelSid}...`);
      return await Resource('save-attachment').create({
        channelSid,
        attachment
      });
    } catch (e) {
      console.error('Failed to upload attachment', e);
      throw e;
    }
  }
};