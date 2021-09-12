import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";

import Compressor from "compressorjs";

import firebase from "./Firestore";

import { v4 as uuidv4 } from "uuid";

import jsonData from "../files/car-makes.json";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Radio,
  Row,
  Col,
  InputNumber,
  Upload,
  Descriptions,
  Divider,
  Modal,
  message,
  Skeleton,
  Result,
  Space,
  Spin,
} from "antd";

import { SendOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function Add() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  // const [compressedFiles, setCompressedFiles] = useState([]);
  // const [compressedFileURL, setCompressedFileURL] = useState(null);

  useEffect(() => {
    setMakes([]);
    const carMakes = JSON.parse(JSON.stringify(jsonData));
    setData(carMakes);
    carMakes.map((car) => {
      setMakes((makes) => [...makes, { label: car.name, value: car.name }]);
    });

    firebase.auth().onAuthStateChanged((user) => {
      firebase
        .firestore()
        .collection("usersCollection")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          const data = doc.data();
          setUserData(data);
          setIsLoading(false);
        });
    });
  }, []);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    // const isLt2M = file.size / 1024 / 1024 < 5;
    const isLt2M = true;
    // if (!isLt2M) {
    //   message.error("Image must smaller than 5MB!");
    // }
    return false;
  }

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    beforeUpload: beforeUpload,
    onChange(info) {
      const { status } = info.file;
      // console.log("info.file", info.file);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  firebase.storage().ref().constructor.prototype.putFiles = function (
    files,
    folder
  ) {
    var ref = this;

    return Promise.all(
      files.map(function (file) {
        // new Compressor(file.originFileObj, {
        //   quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        //   success: (compressedResult) => {
        //     ref
        //       .child(folder + "/" + file.name)
        //       .put(compressedResult, { contentType: "image/jpeg" });
        //   },
        // });

        ref
          .child(folder)
          .listAll()
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              console.log("folderRef", folderRef);
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
              // All the items under listRef.
              console.log("itemRef", itemRef);
            });
          })
          .catch((error) => {
            console.log("error", error);
          });

        return (
          ref
            .child(folder + "/" + file.name)
            // .put(file.originFileObj)
            .put(file, { contentType: "image/jpeg" })
            .then(function (snapshot) {
              return snapshot.ref.getDownloadURL().then((downloadURL) => {
                return downloadURL;
              });
            })
        );
      })
    );
  };

  const onFinish = (values) => {
    const folder = uuidv4();
    const uid = firebase.auth().currentUser.uid;

    // console.log("Success:", values);
    // console.log("Success:", values.dragger.concat(values.dragger2));

    setIsSending(true);

    if (
      values.front == undefined ||
      values.rear == undefined ||
      values.side == undefined ||
      values.interior == undefined
    ) {
      setIsSending(false);
      message.error("Hər bir kategoriyaya aid şəkil əlavə etməlisiniz.");
    }

    firebase
      .storage()
      .ref()
      .putFiles(
        values.front.concat(values.rear, values.side, values.interior),
        folder
      )
      .then(function (urls) {
        console.log("Files put, connecting to DB to add a new document");
        const db = firebase.firestore();
        console.log("after db");
        db.collection("listings")
          .doc(folder)
          .set({
            uid: uid,
            isActive: true,
            isApproved: false,
            seller: values.seller,
            phone: values.phone,
            video: values.video || null,
            make: values.make || null,
            model: values.model || null,
            location: values.location || null,
            vin: values.vin_number || null,
            body_type: values.body_type || null,
            milage: values.milage || null,
            color: values.color || null,
            price: values.price || null,
            currency: values.currency || null,
            fuel_type: values.fuel_type || null,
            drivetrain: values.drivetrain || null,
            gearbox: values.gearbox || null,
            year: values.year || null,
            engine: values.engine || null,
            horsepower: values.horsepower || null,
            options: values.options || null,
            fuelConsumptionMin: values.fuelConsumptionMin || null,
            fuelConsumptionMax: values.fuelConsumptionMax || null,
            description: values.description || null,
            images: urls || null,
            created_date:
              firebase.firestore.FieldValue.serverTimestamp() || null,
          })
          .then(function () {
            console.log("SUCCESS");
            console.log("Document written with UUID: ", folder);
            message.success("Elan əlavə edildi!");
            setIsSending(false);
            setIsAdded(true);
          })
          .catch(function (error) {
            console.log("ERROR");
            console.error("Error adding document: ", error);
            message.error("Xəta baş verdi.");
            setIsSending(false);
            setIsFailed(true);
          });
      })
      .catch(function (error) {
        console.log("Error: ", error);
        message.error("Xəta baş verdi.");
        setIsSending(false);
        setIsFailed(true);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChangeMakes = (value) => {
    setModels([]);
    console.log("entered, value: ", value);
    if (typeof value != "undefined") {
      const filtered = data.filter((car) => car.name == value);
      filtered[0].models.map((model) => {
        setModels((models) => [
          ...models,
          { label: model.name, value: model.name },
        ]);
      });
    }
  };

  const options = [
    { label: "Multizone Climate System", value: "Multizone Climate System" },
    { label: "Dual Climate System", value: "Dual Climate System" },
    { label: "Dəri oturacaqlar", value: "Dəri oturacaqlar" },
    { label: "Massaging Seats", value: "Massaging Seats" },
    {
      label: "Oturacaqların ventilyasiyası",
      value: "Oturacaqların ventilyasiyası",
    },
    { label: "Oturacaqların isidilməsi", value: "Oturacaqların isidilməsi" },
    { label: "Heated Steering Wheel", value: "Heated Steering Wheel" },
    { label: "Head-Up Display", value: "Head-Up Display" },
    { label: "360 Kamera", value: "360 Kamera" },
    { label: "Backup camera", value: "Backup camera" },
    { label: "Bluetooth", value: "Bluetooth" },
    { label: "Keyless Entry", value: "Keyless Entry" },
    { label: "Remote start", value: "Remote start" },
    { label: "Power Tailgate", value: "Power Tailgate" },
    {
      label: "Rear Entertainment Systems",
      value: "Rear Entertainment Systems",
    },
    { label: "Lyuk", value: "Lyuk" },
    { label: "Blind Spot Warning System", value: "Blind Spot Warning System" },
    { label: "Power-Adjustable Seats", value: "Power-Adjustable Seats" },
    {
      label: "Apple CarPlay/Android Auto",
      value: "Apple CarPlay/Android Auto",
    },
    {
      label: "Gesture Control",
      value: "Gesture Control",
    },
    {
      label: "Lane Departure Warning System",
      value: "Lane Departure Warning System",
    },
    {
      label: "Forward collision warning",
      value: "Forward collision warning",
    },
    {
      label: "Automatic emergency braking",
      value: "Automatic emergency braking",
    },
    {
      label: "Wireless charging pad",
      value: "Wireless charging pad",
    },
  ];

  if (
    firebase.auth().currentUser &&
    firebase.auth().currentUser &&
    isAdded == false &&
    isLoading == false
  ) {
    return (
      <div>
        <Row>
          <Col span={4}></Col>
          <Col span={12}>
            <br />
            <h1>Avtomobil Əlavə Etmək üçün Formu Doldurun</h1>
            <Form
              name="basic"
              initialValues={{
                seller: userData.seller || null,
                phone: userData.phone || null,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                label="Satıcı"
                name="seller"
                // rules={[{ required: false, message: "VIN daxil edin!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Telefon"
                name="phone"
                // rules={[{ required: false, message: "VIN daxil edin!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Youtube In Detail Video"
                name="video"
                // rules={[{ required: false, message: "VIN daxil edin!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Marka"
                name="make"
                rules={
                  [
                    // { required: true, message: "Zəhmət olmasa marka seçin!" },
                  ]
                }
              >
                <Select
                  onChange={onChangeMakes}
                  placeholder="Marka seçin."
                  showSearch
                  // onChange={onSelectSetMake}
                  allowClear
                >
                  {makes &&
                    makes.map((make) => (
                      <Option value={make.value}>{make.label}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Model"
                name="model"
                rules={
                  [
                    // { required: true, message: "Zəhmət olmasa model seçin!" },
                  ]
                }
              >
                <Select showSearch placeholder="Model seçin." allowClear>
                  {models &&
                    models.map((model) => (
                      <Option value={model.value}>{model.label}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Yer"
                name="location"
                // rules={[{ required: true, message: "Zəhmət olmasa yer seçin!" }]}
              >
                <Select placeholder="Yer seçin." allowClear>
                  <Option value="Bakı">Bakı</Option>
                  <Option value="Gəncə">Gəncə</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="VIN Kodu/Nömrəsi"
                name="vin_number"
                // rules={[{ required: false, message: "VIN daxil edin!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ban növü"
                name="body_type"
                // rules={[{ required: true, message: "Ban növü seçin!" }]}
              >
                <Radio.Group>
                  <Radio value="Sedan">Sedan</Radio>
                  <Radio value="Furqon">Furqon</Radio>
                  <Radio value="Hetçbek">Hetçbek</Radio>
                  <Radio value="Kupe">Kupe</Radio>
                  <Radio value="Kabrio">Kabrio</Radio>
                  <Radio value="Rodster">Rodster</Radio>
                  <Radio value="SUV">SUV</Radio>
                  <Radio value="Van">Van</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Yürüş (KM)"
                name="milage"
                // rules={[{ required: true, message: "Yürüş daxil edin!" }]}
              >
                <InputNumber placeholder="KM" />
              </Form.Item>
              <Form.Item
                label="Rəng"
                name="color"
                // rules={[
                //   { required: true, message: "Please input your username!" },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Qiymət"
                name="price"
                // rules={[{ required: true, message: "Qiymət daxil edin!" }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Məzənnə"
                name="currency"
                // rules={[{ required: true, message: "Məzənnə seçin!" }]}
              >
                <Radio.Group>
                  <Radio value="AZN">AZN</Radio>
                  <Radio value="USD">USD</Radio>
                  <Radio value="EURO">EURO</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Yanacaq növü"
                name="fuel_type"
                // rules={[{ required: true, message: "Yanacaq növü seçin!" }]}
              >
                <Radio.Group>
                  <Radio value="Benzin">Benzin</Radio>
                  <Radio value="Elektrik">Elektrik</Radio>
                  <Radio value="Hibrid">Hibrid</Radio>
                  <Radio value="Dizel">Dizel</Radio>
                  <Radio value="Qaz">Qaz</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Ötürücü"
                name="drivetrain"
                // rules={[{ required: true, message: "Ötürücü növü seçin!" }]}
              >
                <Radio.Group>
                  <Radio value="Ön">Ön</Radio>
                  <Radio value="Arxa">Arxa</Radio>
                  <Radio value="Tam">Tam</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Sürətlər Qutusu"
                name="gearbox"
                rules={
                  [
                    // { required: true, message: "Sürətlər qutusu növü seçin!" },
                  ]
                }
              >
                <Radio.Group>
                  <Radio value="Avtomat">Avtomat</Radio>
                  <Radio value="Mexanika">Mexanika</Radio>
                  <Radio value="Sıralı">Sıralı</Radio>
                  <Radio value="Elektrik">Elektrik</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Buraxılış ili"
                name="year"
                // rules={[{ required: true, message: "Buraxılış ili daxil edin!" }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Mühərrik həcmi"
                name="engine"
                rules={
                  [
                    // { required: true, message: "Mühərrik həcmi daxil edin!" },
                  ]
                }
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="At gücü (HP)"
                name="horsepower"
                // rules={[{ required: true, message: "At gücü daxil edin!" }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item label="Yanacaq sərfiyyatı (l/100km)">
                <Input.Group compact>
                  <Form.Item
                    style={{ paddingRight: "1em" }}
                    name={"fuelConsumptionMin"}
                    rules={[{ type: "number", min: 0 }]}
                  >
                    <InputNumber placeholder="min" />
                  </Form.Item>
                  <Form.Item
                    name={"fuelConsumptionMax"}
                    rules={[{ type: "number", min: 0 }]}
                  >
                    <InputNumber placeholder="max" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item
                label="Əlavə"
                name="description"
                // rules={[{ required: true, message: "Please the job title!" }]}
              >
                {/* <Input placeholder="Write here.." /> */}
                <Input.TextArea placeholder="Write here.." />
              </Form.Item>
              <Form.Item label="Təchizatlar" name="options">
                <Checkbox.Group options={options} />
              </Form.Item>
              <Form.Item label="Ön tərəfə aid şəkillər">
                <Form.Item
                  name="front"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      {/* <InboxOutlined /> */}
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Arxa tərəfə aid şəkillər">
                <Form.Item
                  name="side"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      {/* <InboxOutlined /> */}
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Yan tərəflərə aid şəkillər">
                <Form.Item
                  name="rear"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      {/* <InboxOutlined /> */}
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item label="İçəriyə aid şəkillər">
                <Form.Item
                  name="interior"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      {/* <InboxOutlined /> */}
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>

              {isSending ? (
                <Spin />
              ) : (
                <Space>
                  <Button type="primary" htmlType="submit">
                    <SendOutlined />
                    Göndər
                  </Button>
                  Məlumatların doğruluğundan əmin olun.
                </Space>
              )}
            </Form>
          </Col>
        </Row>
        <br />
        <Modal
          title="Problem"
          visible={isFailed}
          onCancel={() => {
            setIsFailed(false);
          }}
          footer={[]}
        >
          <Result
            status="error"
            title="Xəta baş verdi."
            subTitle="Elan göndərilməsində xəta baş verdi. Lütfən geri dönüb məlumatların tam olduğundan əmin olun."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  setIsFailed(false);
                }}
              >
                Geri Dön
              </Button>,
              // <Button key="buy">Yeni Elan Əlavə Et</Button>,
            ]}
          />
        </Modal>
      </div>
    );
  } else if (
    firebase.auth().currentUser &&
    firebase.auth().currentUser == null
  ) {
    return <Redirect to="/login" />;
  } else if (isAdded) {
    return (
      <div>
        <Result
          status="success"
          title="Elan göndərildi!"
          subTitle="Elan təsdiqləndikdən sonra saytda görünəcək. Elanın statusunu hesabınızdan izləyə bilərsiniz.
          Bizim xidmətlərdən istifadə etdiyiniz üçün təşəkkür edirik!"
          extra={[
            <a href={`/users/${userData.uid}`}>
              <Button type="primary" key="console">
                Hesaba Get
              </Button>
            </a>,
            <a href="/car/add">
              <Button key="buy">Yeni Elan Əlavə Et</Button>
            </a>,
          ]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div style={{ height: "100vh" }}>
                <div className="my-container">
                  <br />
                  <Skeleton paragraph={{ rows: 8 }}></Skeleton>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
