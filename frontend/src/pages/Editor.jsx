import JoditEditor from "jodit-react";
import { useRef } from "react";
import styles from "./Editor.module.css";

function Editor({ value, onChange }) {
  const editor = useRef(null);

  return (
    <div className={styles.editor}>
      <JoditEditor
        ref={editor}
        value={value}
        config={{
          readonly: false,
          toolbarSticky: false,
          toolbarAdaptive: false,
          height: "auto", // Let the editor height be auto-adjusted
          minHeight: 300, // Minimum height in pixels
          maxHeight: "none", // No maximum height
          defaultMode: "1",
          style: {
            color: "white",
          },
          toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "superscript",
            "subscript",
            "|",
            "ul",
            "ol",
            "|",
            "outdent",
            "indent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "video",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "eraser",
            "copyformat",
            "|",
            "symbol",
            "fullsize",
            "print",
            "about",
          ],
          events: {
            afterInit: (editor) => {
              const editorContent =
                editor.container.querySelector(".jodit-wysiwyg");
              if (editorContent) {
                editorContent.style.fontSize = "16px";
                editorContent.style.lineHeight = "1.2"; // Reduced line height
                editorContent.style.backgroundColor = "#212a3e";
                editorContent.style.color = "white";
                // Add some padding to prevent text from touching the edges
                editorContent.style.padding = "8px";
              }
              const toolbar = editor.container.querySelector(".jodit-toolbar");
              if (toolbar) {
                toolbar.style.backgroundColor = "black";
                toolbar.style.color = "white";
              }
              const toolbarButtons = editor.container.querySelectorAll(
                ".jodit-toolbar__button"
              );
              toolbarButtons.forEach((button) => {
                button.style.backgroundColor = "black";
                button.style.color = "white";
              });
              const toolbarIcons = editor.container.querySelectorAll(
                ".jodit-toolbar-button__icon"
              );
              toolbarIcons.forEach((icon) => {
                icon.style.fill = "white";
                icon.style.stroke = "white";
              });

              // Add custom CSS to reduce spacing between paragraphs
              const customCSS = `
                .jodit-wysiwyg p {
                  margin-top: 0;
                  margin-bottom: 0.5em;
                }
                .jodit-wysiwyg * {
                  line-height: 1.2;
                }
              `;
              const styleTag = document.createElement("style");
              styleTag.textContent = customCSS;
              editor.container.appendChild(styleTag);
            },
          },
        }}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
}

export default Editor;
