
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import JoditEditor from 'jodit-react';

export const EditorDetexto = forwardRef(({ value, onBlur }, ref) => {
  const editor = useRef(null);
  const [content, setContent] = useState(value || "");

  // Sincroniza contenido externo (cuando llega del fetch)
  useEffect(() => {
    if (editor.current && value !== content) {
      editor.current.value = value || "";
      setContent(value || "");
    }
  }, [value]);

  const config = {
    readonly: false,
    height: 400,
    toolbarSticky: true,
    placeholder: 'Escribe aquí tu artículo...',
    defaultMode: 'wysiwyg',
    toolbarButtonSize: 'middle',
    buttons: [
      'source', 'undo', 'redo',
      'bold', 'italic', 'underline', 'strikethrough',
      'superscript', 'subscript',
      'font', 'fontsize', 'brush', 'highlight',
      'ul', 'ol', 'outdent', 'indent', 'align',
      'hr', 'link', 'unlink', 'image',  'table',
      'removeformat', 'copyformat', 'fullsize'
    ],
    // uploader: {
    //   insertImageAsBase64URI: false,
    //   url: 'http://localhost:5000/api/upload',
    //   filesVariableName: 'imagen',
    //   process: (resp) => resp.url,
    // },
    style: { color: '#000', backgroundColor: '#fff' }
  };

  return (
    <JoditEditor
      ref={(el) => {
        editor.current = el;
        if (ref) ref.current = el;
      }}
      value={content}
      config={config}
      onBlur={(newContent) => {
        setContent(newContent);
        onBlur && onBlur(newContent);
      }}
    />
  );
});
