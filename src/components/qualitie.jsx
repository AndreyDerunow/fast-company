import React from "react";

const Qualitie = ({ quality: { name, color } }) => {
  let classes = "badge m-1 bg-";
  classes += color;

  return <span className={classes}>{name}</span>;
};

export default Qualitie;
