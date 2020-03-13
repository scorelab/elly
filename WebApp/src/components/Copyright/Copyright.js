import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyroght() {
  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#014421",
        color: "white",
        padding: 20,
        width: "100%"
      }}
    >
      <Typography
        style={{ color: "white", fontFamily: "Montserrat-Regular" }}
        variant="h6"
        color="textSecondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.scorelab.org">
          www.SCoReLab.org
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
