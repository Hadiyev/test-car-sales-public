import React, { useState, useEffect } from "react";

import firebase from "./Firestore";

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
  Upload,
  message,
  Badge,
} from "antd";

import {
  EditOutlined,
  EditFilled,
  EllipsisOutlined,
  SettingOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DealerListings from "./DealerListings";

const { Meta } = Card;

const styles = {
  price: {
    float: "left",
    position: "absolute",
    right: "5px",
    top: "calc(35vh - 20px)",
    zIndex: "1000",
    backgroundColor: "#222222",
    color: "white",
    fontSize: "1em",
    paddingTop: "5px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    borderRadius: "4px",
    fontWeight: "600",
  },
};

const uploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

firebase.storage().ref().constructor.prototype.putFiles = function (
  files,
  folder
) {
  var ref = this;
  return Promise.all(
    files.map(function (file) {
      // return ref.child(file.name).put(file);
      return ref
        .child(folder + "/" + file.name)
        .put(file.originFileObj)
        .then(function (snapshot) {
          return snapshot.ref.getDownloadURL().then((downloadURL) => {
            return downloadURL;
          });
        });
    })
  );
};

const onFinish = (values) => {
  console.log("Success:", values);
  // console.log("Success:", values.dragger.concat(values.dragger2));
  const uid = firebase.auth().currentUser.uid;
  if (values.profilePicture && values.coverPicture) {
    firebase
      .storage()
      .ref()
      .putFiles(values.profilePicture.concat(values.coverPicture), uid)
      .then(function (urls) {
        console.log("Files put, connecting to DB to add a new document");
        const db = firebase.firestore();
        db.collection("usersCollection")
          .doc(uid)
          .update({
            seller: values.seller || null,
            description: values.description || null,
            phone: values.phone || null,
            address: values.address || null,
            workingHours: values.workingHours || null,
            profilePicture: urls[0] || null,
            coverPicture: urls[1] || null,
            updated_date:
              firebase.firestore.FieldValue.serverTimestamp() || null,
          })
          .then(function () {
            message.success("Məlumatlar yadda saxlanıldı!");
          })
          .catch(function (error) {
            message.error("Xəta baş verdi.");
          });
      })
      .catch(function (error) {
        message.error("Xəta baş verdi.");
      });
  } else if (values.profilePicture) {
    firebase
      .storage()
      .ref()
      .putFiles(values.profilePicture, uid)
      .then(function (urls) {
        console.log("Files put, connecting to DB to add a new document");
        const db = firebase.firestore();
        db.collection("usersCollection")
          .doc(uid)
          .update({
            seller: values.seller || null,
            description: values.description || null,
            phone: values.phone || null,
            address: values.address || null,
            workingHours: values.workingHours || null,
            profilePicture: urls[0] || null,
            updated_date:
              firebase.firestore.FieldValue.serverTimestamp() || null,
          })
          .then(function () {
            message.success("Məlumatlar yadda saxlanıldı!");
          })
          .catch(function (error) {
            message.error("Xəta baş verdi.");
          });
      })
      .catch(function (error) {
        message.error("Xəta baş verdi.");
      });
  } else if (values.coverPicture) {
    firebase
      .storage()
      .ref()
      .putFiles(values.coverPicture, uid)
      .then(function (urls) {
        console.log("Files put, connecting to DB to add a new document");
        const db = firebase.firestore();
        db.collection("usersCollection")
          .doc(uid)
          .update({
            seller: values.seller || null,
            description: values.description || null,
            phone: values.phone || null,
            address: values.address || null,
            workingHours: values.workingHours || null,
            coverPicture: urls[0] || null,
            updated_date:
              firebase.firestore.FieldValue.serverTimestamp() || null,
          })
          .then(function () {
            message.success("Məlumatlar yadda saxlanıldı!");
          })
          .catch(function (error) {
            message.error("Xəta baş verdi.");
          });
      })
      .catch(function (error) {
        message.error("Xəta baş verdi.");
      });
  } else {
    console.log("Files put, connecting to DB to add a new document");
    const db = firebase.firestore();
    db.collection("usersCollection")
      .doc(uid)
      .update({
        seller: values.seller || null,
        description: values.description || null,
        phone: values.phone || null,
        address: values.address || null,
        workingHours: values.workingHours || null,
        updated_date: firebase.firestore.FieldValue.serverTimestamp() || null,
      })
      .then(function () {
        message.success("Məlumatlar yadda saxlanıldı!");
      })
      .catch(function (error) {
        message.error("Xəta baş verdi.");
      });
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Profile({ match }) {
  const uid = match.params.uid;

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("usersCollection")
      .doc(uid)
      .get()
      .then(function (doc) {
        const data = doc.data();
        setUserData(data);
        setIsLoading(false);
      });
  }, []);

  if (isEditing) {
    return (
      <div>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="listings-container">
              {firebase.auth().currentUser &&
                firebase.auth().currentUser.uid == uid && (
                  <Form
                    name="profile"
                    initialValues={{
                      seller: userData.seller || null,
                      description: userData.description || null,
                      phone: userData.phone || null,
                      workingHours: userData.workingHours || null,
                      address: userData.address || null,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                  >
                    <Card
                      cover={
                        <div style={{ width: "100%" }}>
                          <Form.Item
                            name="coverPicture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                          >
                            <Upload {...uploadProps}>
                              <div style={styles.price}>
                                <EditOutlined />
                              </div>
                            </Upload>
                          </Form.Item>
                          <img
                            style={{
                              objectFit: "cover",
                              height: "35vh",
                              width: "100%",
                            }}
                            alt="example"
                            src={
                              userData.coverPicture
                                ? userData.coverPicture
                                : "https://husmen.xyz/portfolio/eight-point/featured.png"
                            }
                          />
                        </div>
                      }
                      actions={[
                        <Button
                          danger
                          onClick={() => {
                            setIsEditing(false);
                          }}
                        >
                          <CloseOutlined key="cancel" />
                        </Button>,
                        <Button type="primary" htmlType="submit">
                          <CheckOutlined key="save" />
                        </Button>,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Form.Item
                            name="profilePicture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                          >
                            <Upload {...uploadProps}>
                              <Tag
                                style={{
                                  float: "left",
                                  position: "absolute",
                                  left: "24px",
                                  zIndex: "99",
                                  margin: "5px",
                                }}
                                icon={<EditOutlined />}
                              />
                              <Avatar
                                shape="square"
                                size={128}
                                src={
                                  userData.profilePicture
                                    ? userData.profilePicture
                                    : "https://husmen.xyz/portfolio/eight-point/featured.png"
                                }
                              />
                            </Upload>
                          </Form.Item>
                        }
                        title={
                          <Form.Item
                            label="Satıcı və ya Avtosalon Adı"
                            name="seller"
                            // rules={[{ required: false, message: "VIN daxil edin!" }]}
                          >
                            <Input />
                          </Form.Item>
                        }
                        description={
                          <div>
                            <Form.Item
                              label="Avtosalon haqqında məlumat"
                              name="description"
                              // rules={[{ required: true, message: "Please the job title!" }]}
                            >
                              {/* <Input placeholder="Write here.." /> */}
                              <Input.TextArea placeholder="Write here.." />
                            </Form.Item>
                            <PhoneOutlined /> Əlaqə Nömrələri
                            <Form.Item
                              name="phone"
                              // rules={[{ required: false, message: "VIN daxil edin!" }]}
                            >
                              <Input />
                            </Form.Item>
                            <ClockCircleOutlined /> İş Vaxtı
                            <Form.Item
                              name="workingHours"
                              // rules={[{ required: false, message: "VIN daxil edin!" }]}
                            >
                              <Input />
                            </Form.Item>
                            <HomeOutlined /> Address
                            <Form.Item
                              name="address"
                              // rules={[{ required: false, message: "VIN daxil edin!" }]}
                            >
                              <Input />
                            </Form.Item>
                          </div>
                        }
                      />
                    </Card>
                  </Form>
                )}
            </div>
          </Col>
        </Row>
        <br />
      </div>
    );
  } else if (!isLoading) {
    return (
      <div>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="listings-container">
              {firebase.auth().currentUser &&
              firebase.auth().currentUser.uid == uid ? (
                <Card
                  cover={
                    <img
                      style={{ objectFit: "cover", height: "35vh" }}
                      alt="example"
                      src={
                        userData.coverPicture
                          ? userData.coverPicture
                          : "https://husmen.xyz/portfolio/eight-point/featured.png"
                      }
                    />
                  }
                  actions={[
                    <SettingOutlined
                      onClick={() => {
                        setIsEditing(true);
                      }}
                      key="edit"
                    />,
                    <a href="/car/add">
                      <PlusOutlined key="add" />
                    </a>,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar
                        size={128}
                        src={
                          userData.profilePicture
                            ? userData.profilePicture
                            : "https://husmen.xyz/portfolio/eight-point/featured.png"
                        }
                      />
                    }
                    title={userData.seller}
                    description={
                      <div>
                        <p>{userData.description}</p>
                        <PhoneOutlined /> Əlaqə Nömrələri
                        <p>{userData.phone}</p>
                        <ClockCircleOutlined /> İş Vaxtı
                        <p>{userData.workingHours}</p>
                        <HomeOutlined /> Address
                        <p>{userData.address}</p>
                      </div>
                    }
                  />
                </Card>
              ) : (
                <Card
                  cover={
                    <img
                      style={{ objectFit: "cover", height: "35vh" }}
                      alt="example"
                      src={
                        userData.coverPicture
                          ? userData.coverPicture
                          : "https://husmen.xyz/portfolio/eight-point/featured.png"
                      }
                    />
                  }
                >
                  <Meta
                    avatar={
                      <Avatar
                        size={128}
                        src={
                          userData.profilePicture
                            ? userData.profilePicture
                            : "https://husmen.xyz/portfolio/eight-point/featured.png"
                        }
                      />
                    }
                    title={userData.seller}
                    description={
                      <div>
                        <p>{userData.description}</p>
                        <PhoneOutlined /> Əlaqə Nömrələri
                        <p>{userData.phone}</p>
                        <ClockCircleOutlined /> İş Vaxtı
                        <p>{userData.workingHours}</p>
                        <HomeOutlined /> Address
                        <p>{userData.address}</p>
                      </div>
                    }
                  />
                </Card>
              )}
            </div>
          </Col>
        </Row>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="listings-container">
              <DealerListings uid={userData.uid}></DealerListings>
            </div>
          </Col>
        </Row>
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
                  <Skeleton avatar paragraph={{ rows: 4 }}></Skeleton>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
