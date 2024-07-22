import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import { useAuth } from "../contexts/AuthContextProvider";
import useAxiosGet from "../hooks/useAxiosGet";
import styles from "./CreateBlog.module.css";
import Editor from "./Editor";

function UpdateBlog() {
  const navigate = useNavigate();
  const {
    auth: { user_id, access_token },
  } = useAuth();
  const { id } = useParams();
  const [heading, setHeading] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const {
    error,
    isLoading,
    data: updateSingleBlog,
  } = useAxiosGet({ endpoint: BASE_URL + `/${id}`, sendToken: true });

  useEffect(() => {
    if (updateSingleBlog) {
      const { user_id: blogUserID, heading, category, body } = updateSingleBlog;
      setHeading(heading);
      setCategory(category);
      setBody(body);
    }
  }, [updateSingleBlog]);

  async function updateBlog() {
    try {
      await axios.patch(
        BASE_URL + `/${id}`,
        {
          heading,
          category,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      // Handle error
    }
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form className={styles.createBlogForm}>
      <h1>Update your Blog</h1>
      <div className={styles.container}>
        <input
          type="text"
          name="heading"
          placeholder="Heading"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Editor value={body} onChange={setBody} />

        <button type="button" onClick={updateBlog} className={styles.createBtn}>
          Update Blog
        </button>
      </div>
    </form>
  );
}

export default UpdateBlog;
