import React, { Component, Fragment, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import Form from "react-bootstrap/Form";

export default function SliderInput(props) {
  const [value, setValue] = React.useState({ ...props.value });

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
      </Form.Label>
      <Stack direction="horizontal" gap={5}>
        <Form.Control 
          required
          value={value}
          type="number"
          onChange={(e) => updateValue(e)}
        />
        <RangeSlider
          max={props.max}
          value={value}
          tooltip="off"
          onChange={(e) => updateValue(e)}
        />
      </Stack>
    </Form.Group>
  );
}
