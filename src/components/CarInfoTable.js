import React from "react";

import { Descriptions, Card, Tag, Divider } from "antd";

export default function CarInfoTable(props) {
  const labelStyle = { fontWeight: "bold" };
  return (
    <div>
      <Descriptions
        bordered
        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label={<p style={labelStyle}>Marka</p>}>
          {props.carData.make}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Model</p>}>
          {props.carData.model}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Buraxılış ili</p>}>
          {props.carData.year}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Yer</p>}>
          {props.carData.location}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>VIN</p>}>
          {props.carData.vin}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Yürüş</p>}>
          {props.carData.milage} KM
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Ban növü</p>}>
          {props.carData.body_type}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Mühərrik</p>}>
          {props.carData.engine} L
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>At gücü</p>}>
          {props.carData.horsepower} At Gücü
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Ötürücü</p>}>
          {props.carData.drivetrain}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Sürətlər qutusu</p>}>
          {props.carData.gearbox}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Rəng</p>}>
          {props.carData.color}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Yanacaq Növü</p>}>
          {props.carData.fuel_type}
        </Descriptions.Item>
        <Descriptions.Item label={<p style={labelStyle}>Yanacaq Sərfiyyatı</p>}>
          {props.carData.fuelConsumptionMin} -{" "}
          {props.carData.fuelConsumptionMax} L/100KM
        </Descriptions.Item>
      </Descriptions>

      {props.carData.options && (
        <Divider orientation="left">Təchizatlar</Divider>
      )}
      {props.carData.options &&
        props.carData.options.map((option) => (
          <Tag color="#108ee9">{option}</Tag>
        ))}

      {props.carData.mods && (
        <Divider orientation="left">Modifikasiyalar</Divider>
      )}
      {props.carData.mods &&
        props.carData.mods.map((option) => <Tag color="#f50">{option}</Tag>)}
      <br />
      <br />

      <Card title="Avtomobil sahibinin əlavə qeydləri">
        <p>{props.carData.description && props.carData.description}</p>
      </Card>
    </div>
  );
}
