import React from "react";

export default function ErrorNotice(props) {
  return (
    <div class="alert alert-danger" role="alert" onClick={props.clearError}>
      {props.message}
    </div>
  );
}
