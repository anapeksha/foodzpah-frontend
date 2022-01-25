import { CardMedia } from "@mui/material";
import React from "react";
import image from "../../img/not-found.jpeg";
import { API } from "../../uri";


const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : image;
  return (
    <CardMedia
    component="img"
    height="194"
    image={imageurl}
    alt="view"
  />
  );
};

export default ImageHelper;
