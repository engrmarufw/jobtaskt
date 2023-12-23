import JoditEditor from 'jodit-react';
import React, { useRef } from 'react';

const TextEditor = ({ setContent, content }) => {
    const editor = useRef(null);
    return (
        <div className="notailwindcss">
            <JoditEditor
                ref={editor}
                value={content}

                onBlur={newContent => setContent(newContent)}
            // onChange={newContent => setContent(newContent)}
            />
        </div>
    );
};

export default TextEditor;
