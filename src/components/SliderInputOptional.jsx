import React, { useEffect, useState } from "react";
import { InputGroup, Stack } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import Form from "react-bootstrap/Form";

import HelpToolTip from "./HelpToolTip";

export default function SliderInputOptional(props) {
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
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
        <HelpToolTip description={props.description}></HelpToolTip>
      </Form.Label>
      <Stack direction="horizontal" gap={5}>
        <InputGroup>
          <InputGroup.Checkbox onChange={() => setSelected(!isSelected)} disabled={props.disabled}/>
          <Form.Control disabled={!isSelected || props.disabled}  
          required = {!props.disabled && isSelected}
          value={value}
          type="number"
          onChange={(e) => updateValue(e)} />
        </InputGroup>
        <RangeSlider
          disabled={!isSelected || props.disabled}
          max={props.max}
          min={props.min}
          value={value}
          tooltip="off"
          onChange={(e) => updateValue(e)}
        />
      </Stack>
    </Form.Group>
  );
}