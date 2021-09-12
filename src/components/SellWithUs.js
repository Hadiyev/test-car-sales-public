import React from "react";

import { Typography } from "antd";

import { SendOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function SellWithUs() {
  return (
    <div>
      <div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            backgroundColor: "black",
            marginLeft: "0",
            borderRadius: "4px",
            padding: "40px",
          }}
        >
          <Title style={{ color: "white" }}>
            Bizimlə Birgə Satış Etmək üçün
          </Title>
          <Title style={{ color: "white" }} level={5}>
            Avtomobilinizi bestcars.az saytında satmaq istəyirsinizsə hesabınıza
            <a href="/login"> giriş</a> edərək elan əlavə edin. Yalnız formata
            uyğun elanlar qəbul edilir.
          </Title>
        </div>
      </div>
      <br />
    </div>
  );
}
