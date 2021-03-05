import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";

export function AppAlert(props: any) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant={props.alertType} onClose={() => setShow(false)} dismissible>
          {props.text}
        </Alert>
      );
    }
    return <Button variant={props.buttonType} onClick={() => setShow(true)}>Подсказка</Button>;
  }