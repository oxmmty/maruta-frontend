import React from "react";
import { useState, useEffect } from "react";
import Group from "./Group";
import {
  Form,
  Tabs,
  Select,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const format = "HH:mm";
const { TextArea } = Input;

const dateFormat = "YYYY-MM-DD";

const DeliverySub = ({ setDate, setDeliveryDatas, editData }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date1, setDate1] = useState(dayjs().format("YYYY-MM-DD"));
  const [dates1, setDates1] = useState(dayjs().format("YYYY-MM-DD"));
  const [time1, setTime1] = useState();
  const [deliveryData, setDeliveryData] = useState([]);
  const [filteredDeliveryData1, setFilteredDeliveryData1] = useState([]);
  const [selectedValueDelivery1, setSelectedValueDelivery1] = useState("");
  const [inputValueDelivery1, setInputValueDelivery1] = useState("");
  const [address1, setAddress1] = useState(null);
  const [tel1, setTEL1] = useState(null);
  const [charge1, setCharge1] = useState(null);
  const [basicFee1, setBasicFee1] = useState(null);
  const [basicFeeTax1, setBasicFeeTax1] = useState(true);
  const [fee3Angle1, setFee3Angle1] = useState(null);
  const [fee3AngleTax1, setFee3AngleTax1] = useState(true);
  const [CRUFee1, setCRUFee1] = useState(null);
  const [CRUFeeTax1, setCRUFeeTax1] = useState(true);
  const [highSpeedFee1, setHighSpeedFee1] = useState(null);
  const [scaleFee1, setScaleFee1] = useState(null);
  const [scaleFeeTax1, setScaleFeeTax1] = useState(true);
  const [chassisFee1, setChassisFee1] = useState(null);
  const [chassisFeeTax1, setChassisFeeTax1] = useState(true);
  const [otherFee1, setOtherFee1] = useState(null);
  const [otherFeeTax1, setOtherFeeTax1] = useState(true);
  const [requestText1, setRequestText1] = useState(null);
  const [keys1, setKeys1] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workstations = await axios.get(
          process.env.REACT_API_BASE_URL + `/workstation`,
        );
        const deliveryFilter = workstations.data
          .filter((item) => item.配達場所 !== null)
          .sort((a, b) => b.配達場所 - a.配達場所);
        const delivery = deliveryFilter;
        setDeliveryData(delivery);
        setFilteredDeliveryData1(delivery);
        if (dates1 === null) {
          setDate(today);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editData) {
      setSelectedValueDelivery1(editData.配達先1);
      setAddress1(editData.配達先住所1 || "");
      setTEL1(editData.配達先TEL1 || "");
      setCharge1(editData.配達先担当者1 || "");
      setRequestText1(editData.依頼書備考1 || "");
      setDates1(editData.積日1);
      setDate1(editData.配達日1);
      setDate(editData.配達日1);
      setTime1(editData.配達時間1);
      setBasicFee1(editData.基本料金1);
      setBasicFeeTax1(editData.基本課税1);
      setFee3Angle1(editData["3軸料金1"]);
      setFee3AngleTax1(editData["3軸課税1"]);
      setCRUFee1(editData.CRU変更料金1);
      setCRUFeeTax1(editData.CRU変更課税1);
      setHighSpeedFee1(editData.高速費);
      setScaleFee1(editData.スケール費);
      setScaleFeeTax1(editData.スケール費課税1);
      setChassisFee1(editData.シャーシ留置費);
      setChassisFeeTax1(editData.シャーシ留置費課税1);
      setOtherFee1(editData.その他費用);
      setOtherFeeTax1(editData.その他課税);
    }
  }, [editData]);

  useEffect(() => {
    setDeliveryDatas([
      date1,
      dates1,
      time1,
      selectedValueDelivery1,
      address1,
      tel1,
      charge1,
      basicFee1,
      basicFeeTax1,
      fee3Angle1,
      fee3AngleTax1,
      CRUFee1,
      CRUFeeTax1,
      highSpeedFee1,
      scaleFee1,
      scaleFeeTax1,
      chassisFee1,
      chassisFeeTax1,
      otherFee1,
      otherFeeTax1,
      requestText1,
    ]);
  }, [
    date1,
    dates1,
    time1,
    selectedValueDelivery1,
    address1,
    tel1,
    charge1,
    basicFee1,
    basicFeeTax1,
    fee3Angle1,
    fee3AngleTax1,
    CRUFee1,
    CRUFeeTax1,
    highSpeedFee1,
    scaleFee1,
    scaleFeeTax1,
    chassisFee1,
    chassisFeeTax1,
    otherFee1,
    otherFeeTax1,
    requestText1,
  ]);

  // Delivery Datas
  const handleSelectDelivery1 = (value, key) => {
    setSelectedValueDelivery1(value);
    if (!value) {
      setAddress1("");
      setTEL1("");
      setCharge1("");
      setRequestText1("");
    } else {
      setKeys1(key.key);
      const delivery = deliveryData.find((item) => item._id === key.key);
      if (delivery) {
        setAddress1(delivery["住所"] || "");
        setTEL1(delivery.TEL || "");
        setCharge1(delivery["担当者"] || "");
        setRequestText1(delivery["依頼書備考コメント"] || "");
      }
    }
  };

  const handleChangeDelivery1 = (value) => {
    setInputValueDelivery1(value);
    if (!value.trim()) {
      setFilteredDeliveryData1(deliveryData);
    } else {
      const filteredData = deliveryData.filter((delivery) => {
        if (typeof delivery === "string") {
          return delivery.toLowerCase().includes(value.toLowerCase());
        } else if (
          typeof delivery === "object" &&
          delivery !== null &&
          typeof delivery.作業地名称 === "string"
        ) {
          return delivery.作業地名称
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        console.log("Unexpected delivery structure:", delivery);
        return false;
      });
      setFilteredDeliveryData1(filteredData);
    }
  };

  const handleKeyPressDelivery1 = async (event) => {
    if (event.key === "Enter" && inputValueDelivery1) {
      const exists = deliveryData.some(
        (delivery) =>
          (typeof delivery === "string" &&
            delivery.toLowerCase() === inputValueDelivery1.toLowerCase()) ||
          (typeof delivery === "object" &&
            delivery !== null &&
            delivery.作業地名称.toLowerCase() ===
              inputValueDelivery1.toLowerCase()),
      );

      if (!exists) {
        try {
          // Assuming you have an API endpoint for adding new delivery options
          const response = await axios.post(
            `${process.env.REACT_API_BASE_URL}/workstation`,
            {
              作業地名称: inputValueDelivery1,
              配達場所: 0,
            },
          );
          const newOption = { 作業地名称: inputValueDelivery1 };
          setDeliveryData((prevOptions) => [...prevOptions, newOption]);
          setSelectedValueDelivery1(newOption);
          setInputValueDelivery1("");
          message.success("New delivery option added successfully");
        } catch (error) {
          console.error("Error adding new delivery option:", error);
          message.error("Failed to add new delivery option");
        }
      }
    }
  };

  useEffect(() => {
    if (!inputValueDelivery1) {
      setSelectedValueDelivery1("");
      setAddress1("");
      setTEL1("");
      setCharge1("");
    }
  }, [inputValueDelivery1]);

  return (
    <div>
      <Form.Item label={"配達先"} required>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Select
            showSearch
            value={selectedValueDelivery1}
            onSearch={handleChangeDelivery1}
            onSelect={handleSelectDelivery1}
            onInputKeyDown={handleKeyPressDelivery1}
            style={{ width: 200 }}
            filterOption={false}
            notFoundContent={null}
            className="grow">
            {inputValueDelivery1 && filteredDeliveryData1.length > 0 ? (
              filteredDeliveryData1.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            ) : inputValueDelivery1 ? (
              <Option disabled>No matching data</Option>
            ) : (
              deliveryData.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            )}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label={"住所"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          {selectedValueDelivery1 ? (
            <Input
              className="w-fit grow"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys1,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["住所"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys1}`,
                            {
                              住所: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              className="w-fit grow"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          {selectedValueDelivery1 ? (
            <Input
              value={tel1}
              onChange={(e) => setTEL1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys1,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["TEL"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys1}`,
                            {
                              TEL: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={tel1}
              onChange={(e) => setTEL1(e.target.value)}
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          {selectedValueDelivery1 ? (
            <Input
              value={charge1}
              onChange={(e) => setCharge1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys1,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["担当者"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys1}`,
                            {
                              担当者: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={charge1}
              onChange={(e) => setCharge1(e.target.value)}
              disabled
            />
          )}
        </Form.Item>
      </div>
      <Form.Item required label={"積日"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <DatePicker
            className="w-full"
            // value={dayjs(dates1)}
            onChange={(date, dateString) => {
              setDates1(dateString);
            }}
          />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item required label={"配達日"} className="grow">
          <DatePicker
            className="w-full"
            // value={dayjs(date1)}
            // defaultValue={dayjs(today, dateFormat)}
            onChange={(date, dateString) => {
              console.log(date, dateString);
              setDate1(dateString);
              setDate(dateString);
            }}
          />
        </Form.Item>
        <Form.Item required label={"配達時間"} className="grow">
          <TimePicker
            className="w-full"
            // value={time1}
            onChange={(time) => {
              const formattedTime = time.format(format);
              console.log(formattedTime);
              setTime1(formattedTime);
            }}
            format={format}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item required label={"基本料金"} className="grow">
          <Input
            required
            type="number"
            className="w-full"
            value={basicFee1}
            onChange={(e) => {
              setBasicFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={basicFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setBasicFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"3軸料金"} className="grow">
          <Input
            type="number"
            required
            className="w-full"
            onChange={(e) => {
              setFee3Angle1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={fee3AngleTax1}
          defaultValue={true}
          onChange={(e) => {
            setFee3AngleTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"CRU変更料金"} className="grow">
          <Input
            type="number"
            required
            className="w-full"
            onChange={(e) => {
              setCRUFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={CRUFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setCRUFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"高速道路料金"} className="grow">
          <Input
            type="number"
            required
            className="w-full"
            onChange={(e) => {
              setHighSpeedFee1(e.target.value);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            type="number"
            required
            className="w-full"
            onChange={(e) => {
              setScaleFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={scaleFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setScaleFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            type="number"
            required
            className="w-full"
            onChange={(e) => {
              setChassisFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={chassisFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setChassisFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"その他費用"} className="grow w-32">
          <Input
            type="number"
            required
            className="w-full"
            onChange={(e) => {
              setOtherFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={otherFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setOtherFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <Form.Item label={"依頼書備考欄"} rules={[{ required: true }]}>
        <div className="flex flex-wrap flex-row items-center gap-x-4">
          {selectedValueDelivery1 ? (
            <TextArea
              rows={4}
              value={requestText1}
              className="grow"
              onChange={(e) => setRequestText1(e.target.value)}
            />
          ) : (
            <TextArea
              rows={4}
              value={requestText1}
              className="grow"
              onChange={(e) => setRequestText1(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery = (
  {
    setDate,
    setDeliveryData1,
    setDeliveryData2,
    setDeliveryData3,
    editData,
    taxData,
  },
  { className = "" },
) => {
  const deliveryTab = ["配達1", "配達2", "配達3"];
  const dialogComponent = [
    <DeliverySub
      setDate={setDate}
      setDeliveryDatas={setDeliveryData1}
      editData={editData}
    />,
    <DeliverySub
      setDate={setDate}
      setDeliveryDatas={setDeliveryData2}
      editData={editData}
      taxData={taxData}
    />,
    <DeliverySub
      setDate={setDate}
      setDeliveryDatas={setDeliveryData3}
      editData={editData}
      taxData={taxData}
    />,
  ];
  return (
    <div className={`${className}`}>
      <Group label={"配達"}>
        <Tabs
          id="配達"
          className="anchor-section"
          type="card"
          items={deliveryTab.map((item, index) => {
            return {
              label: item,
              key: index,
              children: dialogComponent[index],
            };
          })}
        />
      </Group>
    </div>
  );
};

export default Delivery;
