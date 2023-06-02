export function insertEmoji(inputEl, emoji) {
  const { selectionStart, selectionEnd, value } = inputEl;
  const startSlice = value.substring(0, selectionStart);
  const endSlice = value.substring(selectionEnd);
  const newValue = `${startSlice}${emoji}${endSlice}`;
  // Emoji characters are 2 characters long, so don't subtract 1 here like you'd expect
  const newCursorPosition = `${startSlice}${emoji}`.length;
  return {
    newValue,
    selectionStart: newCursorPosition,
    selectionEnd: newCursorPosition
  };
};

export function findLastIndexOf(array, searchKey, searchValue) {
  var index = array.slice().reverse().findIndex(x => x[searchKey] === searchValue);
  var count = array.length - 1
  var finalIndex = index >= 0 ? count - index : index;
  return finalIndex;
}