import React, { useState } from "react";
import axios from "axios";
import { Button, Select, Form, Input, Space, DatePicker } from "antd";
import { KPMG_ENDPOINT } from "../config";
import "./inputform.css";
import Swal from "sweetalert2";

const { Option } = Select;
const { TextArea } = Input;
const ExchangeMaster = [
  { title: "Coin Switch Kuber", id: "kuber" },
  { title: "WazirX", id: "wazirx" },
  { title: "Binance", id: "binance" },
  { title: "Coin DCX", id: "coindcx" },
  { title: "KuCoin", id: "kucoin" },
  { title: "Coinbase", id: "coinbase" },
  { title: "Bitfinex", id: "bitfinex" },
  { title: "BitSo", id: "bitso" },
];

const InputForm = () => {
  const [form] = Form.useForm();

  const [myState, setMyState] = useState({
    exchangedate: "",
    exchangeName: "",
    leafhash: "",
  });

  const PostData = async (params) => {
    let endPoint = KPMG_ENDPOINT;

    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
      params: params,
    };
    axios
      .get(endPoint, config)
      .then(function (response) {
        if (response.status === 200) {
          if (
            response.data !== "data not found" &&
            response.data !== "Proof validation unsuccessfully !! Try Again"
          ) {
            console.log("Response :::", response.statusText);
            Swal.fire(`Success`, `${response.data}`, "success");
          } else Swal.fire(`Error`, `${response.data}`, "error");
        }
      })
      .catch(function (error) {
        console.log("Error ", error);
      });
  };

  const onFinish = (values) => {
    if (
      myState.date !== "" &&
      myState.exchangeName !== "" &&
      myState.leafhash !== ""
    ) {
      console.log("mystate -->::", myState);
      const params = {
        date: myState.exchangedate,
        exchange_name: myState.exchangeName,
        leaf: myState.leafhash,
      };
      try {
        console.log("OnFinish :", params);
        PostData(params);
      } catch (error) {
        console.log("Errr", error);
        Swal.fire(`Error Occurred`, `${error.res}`, "error");
      }

      console.log("Success:", params);
    } else {
      Swal.fire("Error", "All fields are mandatory.", "error");
      return;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onLeafChange = (e) => {
    console.log("onLeafchange :", e.target.value);
    if (e?.target?.value === "") setMyState({ ...myState, leafhash: "" });
    else setMyState({ ...myState, leafhash: e.target.value });
  };
  const onDateChange = (date, dateString) => {
    console.log("onDateChange :", date, dateString);
    if (date === undefined) setMyState({ ...myState, exchangedate: "" });
    else setMyState({ ...myState, exchangedate: dateString });
  };

  const onExchangeChange = (value) => {
    console.log("onExchangeChange :", value);

    if (value === undefined) setMyState({ ...myState, exchangeName: value });
    else setMyState({ ...myState, exchangeName: value });
  };
  return (
    <div className="mainbox">
      <div className="row mt-3 mb-3">
        <div className="col-3"></div>
        <div className="col-9">
          <Form
            form={form}
            size="small"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Exchange"
              name="exchangeName"
              wrapperCol={{
                span: 8,
              }}
            >
              <Space size="large" style={{ width: "100%", marginLeft: "2rem" }}>
                <Select
                  className="col3"
                  onChange={onExchangeChange}
                  style={{ width: "100%", display: "inline-block" }}
                  allowClear
                >
                  <Option
                    key="-1"
                    disabled="true"
                    value="----------------Please Select----------------"
                  >
                    Please select an exchange
                  </Option>
                  {ExchangeMaster.map((ele, idx) => (
                    <>
                      <Option key={idx} value={ele.id}>
                        {ele.title}
                      </Option>
                    </>
                  ))}
                </Select>
              </Space>
            </Form.Item>

            <Form.Item
              label="Date"
              name="exchangedate"
              wrapperCol={{
                span: 8,
              }}
            >
              <Space size="large" style={{ width: "100%", marginLeft: "2rem" }}>
                <DatePicker
                  onChange={onDateChange}
                  className="col3"
                  inputReadOnly={true}
                  style={{ width: "100%", display: "inline-block" }}
                />
              </Space>
            </Form.Item>

            <Form.Item
              label="Leaf Hash"
              name="leafhash"
              wrapperCol={{
                span: 8,
              }}
            >
              <Space size="large" style={{ width: "100%", marginLeft: "2rem" }}>
                <TextArea
                  rows={4}
                  onChange={onLeafChange}
                  className="col3"
                  style={{ width: "100%", display: "inline-block" }}
                />
              </Space>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 8,
                offset: 11,
              }}
            >
              <Button
                type="primary"
                style={{
                  width: "150px",
                  height: "30px",
                  display: "inline-block",
                  fontFamily: "Lucida Sans Regular",
                  fontWeight: "500",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default InputForm;
