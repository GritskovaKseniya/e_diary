import { Alert } from "react-bootstrap";

export function AppAlertInfo() {
  return (
    <Alert variant="success">
      <h6 className="grade-hw">5 - оценка за домашнее задание </h6>
      <h6 className="grade-t">5 - оценка за самостоятельную работу </h6>
      <h6 className="grade-cw">5 - оценка за работу на уроке </h6>
      <h6 className="grade-ct">5 - оценка за контрольную работу </h6>
    </Alert>
  );
}