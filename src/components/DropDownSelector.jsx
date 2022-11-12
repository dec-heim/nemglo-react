import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function DropDownSelector(props) {
  const updateValue = (e) => {
    props.setConfigValue(props.id, e.target.value);
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
      </Form.Label>
      <Form.Select value={props.value} onChange={(e) => updateValue(e)} required >
        {props.options.length > 0 &&
          props.options.map((option) => (
            <option value={option}>{option}</option>
          ))}
      </Form.Select>
    </Form.Group>
  );
}
