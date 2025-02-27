import React, { useState, useEffect } from "react";
import axios from "axios";
import Group from "./Group";
import { Form, Tabs, Select, Input, Radio } from "antd";

const SubcontractPaymentSub = ({ setSubPayDatas, editData, taxData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany1, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [subBasicPay1, setSubBasicPay] = useState(null);
  const [subBasicPayTax1, setSubBasicPayTax] = useState(true);
  const [driver1, setDriver] = useState(true);
  const [truckNumber11, setTruckNumber1] = useState(null);
  const [selfTruckNumber11, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber12, setSelfTruckNumber2] = useState(null);
  const [truckNumber21, setTruckNumber2] = useState(null);
  const [driverName1, setDriverName] = useState(null);
  const [selfDriverName1, setSelfDriverName] = useState(null);
  const [subAngle1, setSubAngle1] = useState(null);
  const [subAngleTax1, setSubAngleTax1] = useState(true);
  const [subExpressBasicFee1, setSubExpressBasicFee] = useState(null);
  const [subScaleFee1, setSubScaleFee] = useState(null);
  const [subScaleFeeTax1, setSubScaleFeeTax] = useState(true);
  const [subChassisFee1, setSubChassisFee] = useState(null);
  const [subChassisFeeTax1, setSubChassisFeeTax] = useState(true);
  const [subOtherFee1, setSubOtherFee] = useState(null);
  const [subOtherFeeTax1, setSubOtherFeeTax] = useState(true);
  const [driverData, setDriverData] = useState([]);
  const [selectedDriverNumber, setSelectedDriverNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companies, drivers] = await Promise.all([
          axios.get(process.env.REACT_API_BASE_URL + `/partnercompany`),
          axios.get(process.env.REACT_API_BASE_URL + `/vehiclemanagement`),
        ]);

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .filter((item) => item.仕入先 === true)
          .map((item) => item.企業名略称);
        setCompanyData(partnercompnay);

        const driver = drivers.data.map((item) => ({
          ...item,
          車両情報_登録番号: item.車両情報_登録番号 || "",
          所属_担当者: item.所属_担当者 || "",
        }));
        setDriverData(driver);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (taxData) {
      setSubBasicPayTax(taxData[0]);
      setSubAngleTax1(taxData[1]);
      setSubScaleFeeTax(taxData[3]);
      setSubChassisFeeTax(taxData[4]);
      setSubOtherFeeTax(taxData[5]);
    }
  }, [taxData]);
  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名1);
      setSubBasicPay(editData.下払料金1);
      setSubBasicPayTax(editData.下払課税1);
      setSelfDriverName(editData.自社乗務員1);
      setSelfTruckNumber1(editData.自社車番F1);
      setSelfTruckNumber2(editData.自社車番S1);
      setTruckNumber1(editData.下払自車F1);
      setTruckNumber2(editData.下払自車S1);
      setSubExpressBasicFee(editData.下払高速費1);
      setSubScaleFee(editData.下払スケール費1);
      setSubScaleFeeTax(editData.下払スケール費課税1);
      setSubChassisFee(editData.下払シャーシ留置費1);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税1);
      setSubOtherFee(editData.下払その他費用1);
      setSubOtherFeeTax(editData.下払その他課税1);
      setSubAngle1(editData.下払い3軸1);
      setSubAngleTax1(editData.下払い3軸課税1);
      setDriver(editData.車種1 || true)
    }
  }, [editData]);
  useEffect(() => {
    setSubPayDatas([
      selectedValueSubCompany1,
      subBasicPay1,
      subBasicPayTax1,
      driver1,
      truckNumber11,
      truckNumber21,
      driverName1,
      selfTruckNumber11,
      selfTruckNumber12,
      selfDriverName1,
      subExpressBasicFee1,
      subScaleFee1,
      subScaleFeeTax1,
      subChassisFee1,
      subChassisFeeTax1,
      subOtherFee1,
      subOtherFeeTax1,
      subAngle1,
      subAngleTax1,
    ]);
  }, [
    selectedValueSubCompany1,
    subBasicPay1,
    subBasicPayTax1,
    driver1,
    truckNumber11,
    truckNumber21,
    selfTruckNumber11,
    selfTruckNumber12,
    driverName1,
    selfDriverName1,
    subExpressBasicFee1,
    subScaleFee1,
    subScaleFeeTax1,
    subChassisFee1,
    subChassisFeeTax1,
    subOtherFee1,
    subOtherFeeTax1,
    subAngle1,
    subAngleTax1,
  ]);
  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            企業名: inputValueCompany,
          },
        );
        console.log("response" , response.data)
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    if (driver1 === false) {
      setTruckNumber1(selectedDriverNumber);
      setSelfTruckNumber1(null);
    } else {
      setTruckNumber1(null);
      setSelfTruckNumber1(selectedDriverNumber);
    }
    setSelfDriverName(
      selectedDriverNumber &&
        driverData.find(
          (item) => item.車両情報_登録番号 === selectedDriverNumber
        )["所属_担当者"]
    );
  }, [selectedDriverNumber]);

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany1}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay1}
            type="number"
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax1}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group
          onChange={(e) => {
            setDriver(e.target.value);
          }}
          value={driver1}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>

      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          {/* <Input
            onChange={(e) => {
              if (driver1 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver1 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          /> */}
          <Select
            placeholder=""
            onChange={(value) => setSelectedDriverNumber(value)}
            style={{ width: 200 }}
            allowClear
          >
            {driverData.map((value) => (
              <Option
                key={value.車両情報_登録番号}
                value={value.車両情報_登録番号}
              >
                {value.車両情報_登録番号}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver1 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            value={selfDriverName1}
            onChange={(e) => {
              console.log("=>", e.target.value);
              if (driver1 === false) {
                setDriverName(e.target.value);
                // setSelfDriverName(true);
              } else {
                // setSelfDriverName(e.target.value);
                setDriverName(true);
              }
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"3軸料金"} style={{ width: 100 }} className="grow">
          <Input
            value={subAngle1}
            type="number"
            onChange={(e) => {
              setSubAngle1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group value={subAngleTax1} defaultValue={true}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"高速道路料金"} className=" grow">
          <Input
            value={subExpressBasicFee1}
            type="number"
            onChange={(e) => {
              setSubExpressBasicFee(e.target.value);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee1}
            type="number"
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            type="number"
            value={subChassisFee1}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            required
            value={subOtherFee1}
            type="number"
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax1}
          defaultValue={true}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};

const SubcontractPayment = (
  {
    setSubPayData1,
    setSubPayData2,
    setSubPayData3,
    setSubPayData4,
    setSubPayData5,
    setSubPayData6,
    editData,
    taxData,
  },
  { className = "" },
) => {
  const tabNames = ["配車1", "配車2", "配車3", "配車4", "配車5", "配車6"];
  const dialogComponent = [
    <SubcontractPaymentSub
      setSubPayDatas={setSubPayData1}
      editData={editData}
      taxData={taxData}
    />,
    <SubcontractPaymentSub
      setSubPayDatas={setSubPayData2}
      editData={editData}
      taxData={taxData}
    />,
    <SubcontractPaymentSub
      setSubPayDatas={setSubPayData3}
      editData={editData}
      taxData={taxData}
    />,
    <SubcontractPaymentSub
      setSubPayDatas={setSubPayData4}
      editData={editData}
      taxData={taxData}
    />,
    <SubcontractPaymentSub
      setSubPayDatas={setSubPayData5}
      editData={editData}
      taxData={taxData}
    />,
    <SubcontractPaymentSub
      setSubPayDatas={setSubPayData6}
      editData={editData}
      taxData={taxData}
    />,
  ];
  return (
    <div
      className={`${className} w-full overflow-x-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
      <Group label={"下払"}>
        <Tabs
          type="card"
          id="下払"
          items={tabNames.map((item, index) => {
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

export default SubcontractPayment;
