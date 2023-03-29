import React from 'react';
import { convertToRaw, EditorCommand, EditorState, RichUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styles from './styles.module.css';
import Bold from './icons/bold.svg';
import Italic from './icons/italic.svg';
import Underline from './icons/underline.svg';
import Undo from './icons/undo.svg';
import Redo from './icons/redo.svg';
import { convertHTMLtValueToEntityState } from './functions';
import draftJSToHTML from 'draftjs-to-html';

function TextEditor({
  placeholder,
  name,
  label,
  containerClass,
  error = 'Required',
  updateState,
  value,
  required = true,
}: {
  placeholder: string;
  name: string;
  containerClass: string;
  label: string;
  error?: string;
  updateState: (value: string) => void;
  value?: string;
  required?: boolean;
}) {
  const [editorState, setEditorState] = React.useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [touched, setTouched] = React.useState(false);

  const convertToHTML = React.useCallback(
    (state: EditorState) => draftJSToHTML(convertToRaw(state.getCurrentContent())),
    []
  );

  const checkIfTextExists = React.useCallback(
    (editorState: EditorState) => editorState.getCurrentContent().hasText(),
    []
  );

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
    updateState(convertToHTML(editorState));
  };

  React.useEffect(() => {
    if (value) {
      setEditorState(convertHTMLtValueToEntityState(value));
    }
  }, [value]);

  // For controlling shortcut keys like ctrl + b
  const handleKeyCommand = (command: EditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <div className={containerClass}>
      <label
        htmlFor={name}
        className={`font-normal text-base ${
          required && touched && !checkIfTextExists(editorState) ? 'text-red-600' : ''
        }`}
      >
        {label}
      </label>
      <Editor
        editorState={editorState}
        onEditorStateChange={onChange}
        handleKeyCommand={handleKeyCommand}
        placeholder={placeholder}
        spellCheck={true}
        toolbarClassName={styles.toolbar}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        onBlur={() => setTouched(true)}
        wrapperStyle={{
          borderColor:
            required && touched && !checkIfTextExists(editorState)
              ? '#F13637'
              : '#bcbdc1',
        }}
        toolbar={{
          options: ['inline', 'history'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline'],
            bold: { className: styles.icon, icon: Bold },
            italic: { className: styles.icon, icon: Italic },
            underline: { className: styles.icon, icon: Underline },
          },
          history: {
            options: ['undo', 'redo'],
            undo: { icon: Undo, className: styles.icon },
            redo: { icon: Redo, className: styles.icon },
          },
        }}
      />
      {required && touched && !checkIfTextExists(editorState) && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
}

export default TextEditor;
