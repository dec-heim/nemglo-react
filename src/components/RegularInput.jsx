import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function RegularInput(props) {
  const updateValue = (e) => {
    let value = parseInt(e.target.value)
    props.setValue(props.id, value);
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
      </Form.Label>
      <Row>
        <Col>
          <Form.Control
            type="number"
            onChange={(e) => updateValue(e)}
            placeholder={props.placeholder}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
