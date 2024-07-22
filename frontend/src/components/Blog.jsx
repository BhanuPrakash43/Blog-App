import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

function Blog({ _id: id, heading, category, body }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.container}>
      {!expanded && (
        <Link
          to={`/${id}`}
          onClick={toggleExpanded}
          style={{ marginTop: "0.5rem" }}
        >
          <h2>
            {heading} |{" "}
            <small style={{ fontSize: "15px", fontWeight: "400" }}>
              {category}
            </small>
          </h2>

          <hr />

          <div
            style={{
              WebkitLineClamp: expanded ? "unset" : "2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <span className={styles.readMore}>Read more</span>
        </Link>
      )}
    </div>
  );
}

export default Blog;
