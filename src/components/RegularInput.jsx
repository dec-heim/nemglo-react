import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import HelpToolTip from "./HelpToolTip";

export default function RegularInput(props) {
  const updateValue = (e) => {
    let value = parseInt(e.target.value)
    props.setConfigValue(props.id, value);
  };

  return (
    <Form.Group style={{ paddingBottom: 10 }}>
      <Form.Label style={{ textAlign: "text-center text-md-right" }}>
        {props.label}
        <HelpToolTip description={props.description}></HelpToolTip>
      </Form.Label>
      <Row>
        <Col>
          <Form.Control
            type={props.type}
            onChange={(e) => updateValue(e)}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.readOnly ?? false}
            // readOnly={props.readOnly ?? false}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
