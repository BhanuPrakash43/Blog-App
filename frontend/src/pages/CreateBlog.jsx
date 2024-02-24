import { useState } from "react";
import styles from "./CreateBlog.module.css";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const {
    auth: { access_token },
  } = useAuth();
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // create dropdown also
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post(
        BASE_URL,
        { heading, body, category },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setBody("");
      setCategory("");
      setHeading("");
      navigate("/my-blogs");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.createBlogForm}>
      <div className={styles.container}>
        <input
          type="text"
          name="heading"
          placeholder="Blog heading"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />

        <input
          type="text"
          name="category"
          placeholder="Blog category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className={styles.bodyContent}>
          <Editor value={body} onChange={setBody} />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating ..." : "Create Blog"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}
export default CreateBlog;
