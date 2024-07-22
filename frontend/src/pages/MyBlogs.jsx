import { BASE_URL } from "../constants";
import Blog from "../components/Blog";
import styles from "./MyBlogs.module.css";
import useAxiosGet from "../hooks/useAxiosGet";

function MyBlogs() {
  const {
    error,
    isLoading,
    data: myBlogs,
  } = useAxiosGet({ endpoint: BASE_URL + "/my-blogs", sendToken: true });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className={styles.container}>
      <h1 style={{ color: "#149eca" }}>My Blogs</h1>

      <div className={styles.myBlogContainer}>
        {myBlogs.map((blog) => (
          <Blog key={blog._id} {...blog} />
        ))}
      </div>
      <hr className={styles.hrLine} />
    </div>
  );
}
export default MyBlogs;
