import React, { useEffect, useState } from "react";
import { InputGroup, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import HelpToolTip from "./HelpToolTip";

export default function DropDownSelectorOptional(props) {
  const [value, setValue] = useState({ ...props.value });
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const updateValue = (e) => {
    let val = e.target.value;
    if (val <= props.max) {
      setValue(e.target.value);
      props.setConfigValue(props.id, parseInt(e.target.value));
    }
    // console.log("setting value..."+val)
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
        <HelpToolTip description={props.description}></HelpToolTip>
      </Form.Label>
      <InputGroup>
        <InputGroup.Checkbox onChange={() => setSelected(!isSelected)} disabled={props.disabled}/>
        <Form.Select disabled={!isSelected || props.disabled}  
        required = {!props.disabled && isSelected}
        value={value}
        onChange={(e) => updateValue(e)}>
          {props.options.length > 0 && isSelected &&
            props.options.map((option) => (
              <option value={option}>{option}</option>
            ))}
        </Form.Select>
      </InputGroup>
    </Form.Group>
  );
}