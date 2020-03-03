import React from "react";

export default function TileImage(props) {
  const handleClickOpen = id => {
    props.parentCallback([true, id]);
  };

  return (
    <img
      onClick={() => handleClickOpen(props.index)}
      width={props.wp}
      height={props.hp}
      style={{ width: props.wp, height: props.hp, borderRadius: 20 }}
      src={props.obPhoto}
    ></img>
  );
}
