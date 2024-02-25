import { BASE_URL } from "../constants";
import useAxiosGet from "../hooks/useAxiosGet";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "../pages/SingleBlog.module.css";
import { useAuth } from "../contexts/AuthContextProvider";
import axios from "axios";

function SingleBlog() {
  const navigate = useNavigate();
  const {
    auth: { user_id, access_token },
  } = useAuth();
  const { id } = useParams();
  const {
    error,
    isLoading,
    data: singleBlog,
  } = useAxiosGet({ endpoint: BASE_URL + `/${id}`, sendToken: true });
  const { user_id: blogUserID, heading, body, category } = singleBlog || {};

  async function deleteBlog() {
    await axios.delete(BASE_URL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    navigate("/my-blogs");
  }

  if (isLoading) {
    return <h1>Loading </h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className={styles.container}>
      <h1>
        {heading} |{" "}
        <small style={{ fontSize: "20px", fontWeight: "400" }}>
          {category}
        </small>
      </h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: body }} />
      {user_id === blogUserID && (<hr />)}
      <div className={styles.catBtn}>
        {user_id === blogUserID && (
          <Link to={`/update/${id}`} className={styles.postBtn}>
            Edit Post
          </Link>
        )}
        {user_id === blogUserID && (
          <button onClick={deleteBlog} className={styles.deleteBtn}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
export default SingleBlog;
