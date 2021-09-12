import React from "react";

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function CarStatus(props) {
  if (props.isApproved) {
    return <CheckCircleOutlined style={{ color: "green" }} />;
  } else {
    return <ExclamationCircleOutlined style={{ color: "red" }} />;
  }
}
