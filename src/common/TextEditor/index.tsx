import React from 'react';
import { EditorCommand, EditorState, RichUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styles from './styles.module.css';
import Bold from './icons/bold.svg';
import Italic from './icons/italic.svg';
import Underline from './icons/underline.svg';
import Undo from './icons/undo.svg';
import Redo from './icons/redo.svg';
import {
  checkIfTextExists,
  convertHTMLtValueToEntityState,
  convertToHTML,
} from './functions';

function TextEditor({
  placeholder,
  name,
  label,
  containerClass,
  error = 'Required',
  updateState,
  value,
}: {
  placeholder: string;
  name: string;
  containerClass: string;
  label: string;
  error?: string;
  updateState: (value: string) => void;
  value?: string;
}) {
  const [editorState, setEditorState] = React.useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [touched, setTouched] = React.useState(false);

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
          touched && !checkIfTextExists(editorState) ? 'text-red-600' : ''
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
          borderColor: touched && !checkIfTextExists(editorState) ? '#F13637' : '#bcbdc1',
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
      {touched && !checkIfTextExists(editorState) && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
}

export default TextEditor;
