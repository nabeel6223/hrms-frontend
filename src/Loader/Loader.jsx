import React from "react";
import loadingImg from "../icons/loading.gif";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader">
      <img className="loaderImg" src={loadingImg} alt="loader" title="image" />
    </div>
  );
};

export default Loader;
