import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Select, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { Input } from "postcss";

const { Title, Text } = Typography;
const { Option } = Select;

const distances = [
  { value: 10 ,label: '10km' },
  { value: 20, label: '20km' },
  { value: 30, label: '30km' },
  { value: 40, label: '40km' },
  { value: 50 ,label: '50km' },
  { value: 60, label: '60km' },
  { value: 70, label: '70km' },
  { value: 80, label: '80km' },
  { value: 90 ,label: '90km' },
  { value: 100, label: '100km' },
 
];

const WorkCompletionReportPage = () => {
  const location = useLocation();
  const datas = location.state?.data;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pdfDate, setPdfDate] = useState("");
  const today = dayjs().format("YYYY-MM-DD");
  const componentRef = useRef();
  const [selectedDistance, setSelectedDistance] = useState([]);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_API_BASE_URL}/order`).then((response) => {
      const transformedData = response.data.map((item) => ({
        // ...item,
        識別コード: item.識別コード || "",
        搬入返却場所: item.搬入返却場所 || "",
        取場所: item.取場所 || "",
        コンテナNo: item.コンテナNo || "",
        配達先: item.配達先	 || "",
        コンテナサイズ: item.コンテナサイズ || "",
        自社乗務員1 : item.自社乗務員1 || "", 
        自社車番F1: item.自社車番F1 || "",
        下払料金1: item.下払料金1 || "",
        配達日1: item.配達日1 || "",
        顧客名: item.顧客名 || "",

      }));
      setData(transformedData);
    });

    axios
      .get(`${process.env.REACT_API_BASE_URL}/partnercompany`)
      .then((response) => {
        const customerList = [
          ...new Set(response.data.filter(item => item.得意先 === true).map(item => item.企業名略称)),
        ];
        setCustomers(customerList);
      });
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedCustomer, selectedDate, data]);

  const filterData = () => {
    let filtered = data;

    if (selectedCustomer) {
      filtered = filtered.filter((item) =>
        [
          item.顧客名,
        ].includes(selectedCustomer),
      );
    }

    if (datas) {
      handleDateChange(datas);
    }

    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      filtered = filtered.filter(
        (item) => moment(item.配達日1).format("YYYY-MM-DD") === formattedDate,
      );
      setPdfDate(selectedDate);
    }
    setFilteredData(filtered);
  };

  const handleCustomerChange = (value) => {
    setSelectedCustomer(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDownloadPDF = () => {
    if (pdfDate == null && selectedCustomer == null) {
    }
    html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${selectedCustomer} ${moment(pdfDate).format("YYMMDD")}.pdf`);
    });
  };





  const handleDistanceChange = (value) => {
    setSelectedDistance(value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap flex-row justify-end items-center gap-4 pt-2 px-4">
        <Button className="justify-end" type="primary" onClick={handleDownloadPDF}>
          PDF作成
        </Button>
      </div>

      <div ref={componentRef} className="bg-white p-4">
        <div className="flex justify-between">
          <div className="w-60  justify-between items-center">
            <Select
              placeholder="Select a customer"
              onChange={handleCustomerChange}
              style={{ width: 200}}
              allowClear>
              {Customers.map((customer) => (
                <Option key={customer} value={customer}>
                  {customer}
                </Option>
              ))}
            </Select>
            <div className="flex pt-5">
              <Text className="text-black">{selectedCustomer}</Text>
              <p className="pl-12 text-black ">御中</p>
            </div>
          </div>
          <div>
            <table className="w-72 border-collapse border border-black">
              <thead>
                <tr className="text-balck">
                  <th className="border border-black px-4 py-2">係</th>
                  <th className="border border-black px-4 py-2">係長</th>
                  <th className="border border-black px-4 py-2">課長</th>
                  <th className="border border-black px-4 py-2">所長</th>
                </tr>
              </thead>
              <tbody>
              <tr className="text-balck">
                  <td className="border border-black px-4 py-6"></td>
                  <td className="border border-black px-4 py-6"></td>
                  <td className="border border-black px-4 py-6"></td>
                  <td className="border border-black px-4 py-6"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <div className="flex items-center gap-2">
            <Text className="text-black" strong>
            作業日
            </Text>
            <DatePicker
              className="h-8"
              picker="date"
              onChange={(date, dateString) => {
                handleDateChange(dateString);
              }}
              format="YYYY/MM/DD"
              allowClear
            />
          </div>
          <Title level={2} className="text-black pt-5">
            作業完了報告書
          </Title>
          <div className="w-64 border border-black gap-5 p-2">
            <Typography className="text-black">
              <Text className="text-black pr-2" strong>
              業者名
              </Text>
              : 丸田運輸倉庫株式会社
            </Typography>
            <Typography className="text-black">
              <Text className="text-black pr-2" strong>
              担当者
              </Text>
              : 横山
            </Typography>
            <Typography className="text-black">
              <Text className="text-black pr-7" strong>
                TEL
              </Text>
              : 045-506-2901
            </Typography>
            <Typography className="text-black">
              <Text className="text-black pr-6" strong>
                FAX
              </Text>
              : 045-506-2971
            </Typography>
          </div>
        </div>
        
        <div className="flex justify-between  mt-6 mb-4">
          <Text className="text-black">下記のとおりご報告いたします。</Text>
          <Text className="text-black">
            ※月末にサインを押印後、ORIGINALの送付をお願いします。
          </Text>
        </div>
        <table className="w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border border-black px-4 py-2">No</th>
              <th className="border border-black px-4 py-2">REF №</th>
              <th className="border border-black px-4 py-2">搬出先</th>
              <th className="border border-black px-4 py-2">作業場所</th>
              <th className="border border-black px-4 py-2">搬入先</th>
              <th className="border border-black px-4 py-2">コンテナ№</th>
              <th className="border border-black px-4 py-2">サイズ</th>
              <th className="border border-black px-4 py-2">運転手氏名</th>
              <th className="border border-black px-4 py-2">車番</th>
              <th className="border border-black px-4 py-2">輸送距離(往復)</th>
              <th className="border border-black px-4 py-2">運送料</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-black">
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">
                  {item.識別コード}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.搬入返却場所}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.取場所}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.搬入返却場所}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.コンテナNo}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.コンテナサイズ}
                  {item.コンテナサイズ ? "F" : ""}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.自社乗務員1}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.自社車番F1}
                </td>
                <td className="border border-black px-4 py-2">
                  <Select
                    className="m-auto w-36"
                    placeholder="Select a distance"
                    onChange={handleDistanceChange}
                    // style={{ width: 200}}
                    allowClear>
                    {distances.map((distance) => (
                      <Option key={distance.value} value={distance.value}>
                        {distance.label}
                      </Option>
                    ))}
                  </Select>
                </td>
                <td className="border border-black px-4 py-2">
                  {item.下払料金1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCompletionReportPage;
