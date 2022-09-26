import React, {  useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function DropDownSelector(props) {

    const updateValue = (e) => {
        props.setValue(props.id, e.target.value);
    };

    return (
        <Form.Group style={{ paddingBottom: 10 }}>
        <Form.Label
          style={{ textAlign: "text-center text-md-right" }}
        >
                {props.label}
        </Form.Label>
        <Form.Select 
         onChange={e => updateValue(e)}>
          {props.options.length > 0 && props.options.map((option) => <option value={option}>{option}</option>)}
          
        </Form.Select>
      </Form.Group>

    );

}
