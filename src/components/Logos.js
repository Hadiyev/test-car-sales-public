import React from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Tag,
  Form,
  Select,
  Input,
  InputNumber,
  Typography,
  PageHeader,
  Skeleton,
  Avatar,
  Divider,
} from "antd";

const { Title } = Typography;

const styles = {
  image: {
    height: "7vh",
    width: "auto",
  },
};

export default function Logos() {
  return (
    <div>
      <Card bordered={false}>
        <Title level={3}>Əməkdaşlar</Title>
      </Card>

      <Row
        justify="center"
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col style={{ textAlign: "center" }} xs={8} sm={8} md={4} lg={4} xl={4}>
          <img
            style={styles.image}
            src="http://pngimg.com/uploads/aston_martin/aston_martin_PNG18.png"
          />
        </Col>
        <Col style={{ textAlign: "center" }} xs={8} sm={8} md={4} lg={4} xl={4}>
          <img
            style={styles.image}
            src="https://logos-download.com/wp-content/uploads/2016/02/Jaguar_logo_transparent_png.png"
          />
        </Col>
        <Col style={{ textAlign: "center" }} xs={8} sm={8} md={4} lg={4} xl={4}>
          <img
            style={styles.image}
            src="https://logodownload.org/wp-content/uploads/2019/08/land-rover-logo.png"
          />
        </Col>
      </Row>
      <Divider />
      <br />
      <br />
    </div>
  );
}
