import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";

const Message = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.onClose();
    }, 4000);
  }, []);

  return (
    <>
      {props.isShow && (
        <Alert onClose={props.onClose} severity={props.severity}>
          {props.message}
        </Alert>
      )}
    </>
  );
};
