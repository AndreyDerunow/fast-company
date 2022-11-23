import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ quality: { name, color } }) => {
    let classes = "badge m-1 bg-";
    classes += color;

    return <span className={classes}>{name}</span>;
};

Qualitie.propTypes = {
    quality: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default Qualitie;
