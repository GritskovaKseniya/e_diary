import { Alert } from "react-bootstrap";

export function AppAlertInfo() {
  return (
    <Alert variant="success" className="mt-3">
      <b>
        <span className="grade-hw">домашнее задание </span>/
        <span className="grade-t"> самостоятельная работа </span>/
        <span className="grade-cw"> работа на уроке </span>/
        <span className="grade-ct"> контрольная работа</span>
      </b>
    </Alert>
  );
}