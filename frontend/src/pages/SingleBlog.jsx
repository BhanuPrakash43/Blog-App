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
  const { user_id: blogUserID, heading, body, category } = singleBlog;

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
      <h3>{heading}</h3>
      <small>{category}</small>
      <p>{body}</p>
      {user_id === blogUserID && <button onClick={deleteBlog}>Delete</button>}

      {user_id === blogUserID && (
        <div>
          <Link to={`/update/${id}`}>Edit this post</Link>
        </div>
      )}
    </div>
  );
}
export default SingleBlog;
