import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function RegularInput(props) {
  const updateValue = (e) => {
    props.setValue(props.id, e.target.value);
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
      </Form.Label>
      <Row>
        <Col>
          <Form.Control
            onChange={(e) => updateValue(e)}
            placeholder={props.placeholder}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
