import ReactQuill from "react-quill";
import styles from "./Editor.module.css";
import "react-quill/dist/quill.snow.css";

function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <div className={styles.editor}>
      <ReactQuill
        placeholder="Write your blog post here..."
        value={value}
        theme={"snow"}
        r
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
export default Editor;
