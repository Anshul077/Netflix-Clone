import React from "react";
import { Link } from "react-router-dom";

function MovieDisplay({ data }) {
  return (
    <div>
      <Link
        to={`movie${data.id <= 50 ? "Info" : "Details"}/${data.media_type}/${
          data.id
        }`}
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <div className="card">
          <input
            type="image"
            className="card-img-top"
            src={
              data.poster_path === "N/A" || "" || null
                ? ""
                : `https://image.tmdb.org/t/p/w500/${
                    data.poster_path ? data.poster_path : ""
                  }`
            }
            alt="IMAGE"
          />
        </div>
      </Link>
    </div>
  );
}

export default MovieDisplay;
