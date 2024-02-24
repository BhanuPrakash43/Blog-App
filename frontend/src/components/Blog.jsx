import { useState } from "react";
import { Link } from "react-router-dom";

function Blog({ _id: id, heading, category, body }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "4px",
        marginTop: "2rem",
        padding: "1rem",
        display: "block",
      }}
    >
      {!expanded && (
        <Link
          to={`/${id}`}
          onClick={toggleExpanded}
          style={{ marginTop: "0.5rem" }}
        >
          <h3>
            {heading} |{" "}
            <small style={{ fontSize: "15px", fontWeight: "400" }}>
              {category}
            </small>
          </h3>

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
          <span style={{ color: "blue" }}>Read more</span>
        </Link>
      )}
    </div>
  );
}

export default Blog;
