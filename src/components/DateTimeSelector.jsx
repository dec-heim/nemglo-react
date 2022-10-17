import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function DateTimeSelector(props) {
  const updateValue = (e) => {
    props.setConfigValue(props.id, e.target.value);
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
      {props.label}
      </Form.Label>
      <Form.Control
        required
        type={props.type}
        format="dd/MM/yyyy"
        onChange={(e) => updateValue(e)}
        value={props.value}
      />
    </Form.Group>
  );
}
