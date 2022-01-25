import React from "react";
import { API } from "../../uri";
import image from "../../img/background-photo.jpg";
import { CardMedia } from "@mui/material";


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
