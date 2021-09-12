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
  image_full: {
    height: "30vh",
    width: "100%",
    borderRadius: "4px",
    objectFit: "cover",
  },
  image_wide: {
    height: "50vh",
    width: "100%",
    borderRadius: "4px",
    objectFit: "cover",
  },
  image_tall: {
    height: "50vh",
    width: "100%",
    borderRadius: "4px",
    objectFit: "cover",
  },
};

export default function Featured() {
  return (
    <div>
      <Card bordered={false}>
        <Title level={3}>Önə Çıxanlar</Title>
      </Card>

      <Row
        justify="center"
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col
          style={{ textAlign: "center" }}
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={18}
        >
          <img
            style={styles.image_wide}
            src="https://www.bmwakron.com/static/dealer-12432/4721/BMW_Web_Banner_32921c.jpg"
          />
        </Col>
        <Col
          style={{ textAlign: "center" }}
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
        >
          <img
            style={styles.image_tall}
            src="https://i.pinimg.com/originals/3b/0f/c6/3b0fc67a4014543b5690632187d833e1.jpg"
          />
        </Col>
      </Row>

      <br />
      <br />
    </div>
  );
}
