import { IMAGE_EXTENSIONS } from '../constants';

export function isImage(fileExtension) {
  if (!fileExtension) {
    return false;
  }
  return IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase());
};

export async function getDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
};