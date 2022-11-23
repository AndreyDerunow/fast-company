import React from "react";

const Bookmark = ({ bookmark, onFavorite, id }) => {
    const addClass = bookmark ? "-fill" : "";
    return (
        <button
            className={"btn-outline-secondary bi bi-bookmark-star" + addClass}
            onClick={() => onFavorite(id)}
        ></button>
    );
};

export default Bookmark;
