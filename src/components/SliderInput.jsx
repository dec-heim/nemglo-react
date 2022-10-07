import React, { Component, Fragment, useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";

export default function SliderInput(props) {

    const [ value, setValue ] = React.useState({...props.value});

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    const updateValue = (e) => {
        setValue(e.target.value);
        props.setValue(props.id, e.target.value);
    };

    return (
        <Form.Group style={{ paddingBottom: 10}}>
        <Form.Label
          style={{ textAlign: "text-center text-md-right" }}
        >
          {props.label}
        </Form.Label>
        <Row>
          <Col>
            <Form.Control value={value} type="number" onChange={(e) => updateValue(e)}/>
          </Col>
          <Col >
            <RangeSlider
              max={props.max}
              defaultValue={value}
              onChange={(e) => updateValue(e)}
            />
          </Col>
        </Row>
      </Form.Group>
    );

}

