import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import HelpToolTip from "./HelpToolTip";

export default function DropDownSelector(props) {
  const updateValue = (e) => {
    props.setConfigValue(props.id, e.target.value);
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
        <HelpToolTip description={props.description}></HelpToolTip>
      </Form.Label>
      <Form.Select value={props.value} onChange={(e) => updateValue(e)} required disabled={props.disabled} >
        {props.options.length > 0 &&
          props.options.map((option) => (
            <option value={option}>{option}</option>
          ))}
      </Form.Select>
    </Form.Group>
  );
}
