import { ContentState, convertFromHTML, EditorState } from 'draft-js';

// If a value(with html) exists, convert to draftjs state first
export const convertHTMLtValueToEntityState = (value: string) => {
  const blocksFromHTML = convertFromHTML(value);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(state);
};

// For customized formatting options

// const onBoldClick = () => {
//   onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
// };

// const onItalicClick = () => {
//   onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
// };

// const onUnderlineClick = () => {
//   onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
// };
