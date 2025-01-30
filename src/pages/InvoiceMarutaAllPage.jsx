import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Select, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const InvoiceMarutaAllPage = () => {
  const location = useLocation();
  const datas = location.state?.data;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pdfDate, setPdfDate] = useState("");
  const today = dayjs().format("YYYY-MM");
  const componentRef = useRef();
  useEffect(() => {
    axios.get(`${process.env.REACT_API_BASE_URL}/order`).then((response) => {
      const transformedData = response.data.map((item) => ({
        ...item,
        配達日1: moment(item.配達日1).format("YYYY-MM-DD"),
        取場所: item.取場所 || "",
        搬入返却場所: item.搬入返却場所 || "",
        顧客名: item.顧客名 || "",
        コンテナサイズ: item.コンテナサイズ || "",
        軸3: item.軸3 || "",
        コンテナNo: item.コンテナNo || "",
        識別コード: item.識別コード || "",
        基本料金1: item.基本料金1 || "",
        軸3: item.軸3 || "",
        その他費用: item.その他費用 || "",
        基本課税1: item.基本課税1 || "",
        区分: item.区分 || "",
        "3軸料金1": item["3軸料金1"] || "", 
        基本課税1: item.基本課税1 || "",
        船名: item.船名 || "",
      }));
      setData(transformedData);
    });

    axios
      .get(`${process.env.REACT_API_BASE_URL}/partnercompany`)
      .then((response) => {
        const customerList = 
          response.data.filter(item => item.得意先 === true).map((item) => ({
            ...item,
            企業名略称: item.企業名略称 || "",
            住所1: item.住所1 || "",
            住所2: item.住所2 || "",
            郵便番号: item.郵便番号 || "",
      }));
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
          item.顧客名
        ].includes(selectedCustomer),
      );
    }

    if (datas) {
      handleDateChange(datas);
    }

    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM");
      filtered = filtered.filter(
        (item) => moment(item.配達日1).format("YYYY-MM") === formattedDate,
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

  return (
    <div className="w-full pl-5 pr-5 pt-3 pb-4">
      <div className="flex justify-between border-b-2">
        {/* <Button type="primary" onClick={handleDownloadPDF}>
          PDF作成
        </Button> */}
        <div className="flex items-center">
          <Title level={2} className="mb-[-5px]">請　求　書</Title>
          
        </div>
        <div className="">
          <div className="flex">
            <Text className="pr-3" strong>発行日 : </Text>
            <p>{dayjs().format("YYYY年MM月DD日")}</p>
          </div>
          <div className="flex">
            <Text className="pr-3" strong>請求日 : </Text>
            <p>
            {selectedDate ? dayjs(selectedDate).endOf('month').format('YYYY年MM月DD日') : dayjs().endOf('month').format('YYYY年MM月DD日')}
            </p>
          </div>
          <div className="flex">
            <Text className="pr-3" strong>請求№ :</Text>
            <p>11710-2024-09-001</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-2 border-b-2 pb-1">
        <div className="pt-4">
        <p className="pb-1">〒 {selectedCustomer && customers.find(item => item.企業名略称 === selectedCustomer)["郵便番号"]}</p>
          <p className="pb-1">{selectedCustomer && customers.find(item => item.企業名略称 === selectedCustomer)["住所1"]}</p>
          <p>{selectedCustomer && customers.find(item => item.企業名略称 === selectedCustomer)["住所2"]}</p>
          <div className="flex pt-4 items-center">
            <Select
              placeholder="Select a customer"
              onChange={handleCustomerChange}
              style={{ width: 200 }}
              allowClear>
              {customers.map((customer) => (
                <Option key={customer.企業名略称} value={customer.企業名略称}>
                  {customer.企業名略称}
                </Option>
            ))}
            </Select>
            <Text className="pl-2">御中</Text>
          </div>
        </div>
        <div>
          <Title level={3}>丸田運輸倉庫株式会社</Title>
          <p className="pb-2">〒230-0054	横浜市鶴見区大黒埠頭22番地</p>
          <p className="pb-2">横浜港流通センター(YCC)7階 1703号室</p>
          <div className="flex ml-[-7px]">
            <p>【TEL】: 045-506-2901</p>
            <p>【FAX】: 045-506-2971</p>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <Text className="text-center flex justify-center pb-10">下記の通りご請求申し上げます。</Text>
        <div className="flex justify-center items-center gap-2 pb-10">
          <Title level={5} className="mb-0">
            <DatePicker
              className="mr-2"
              picker="month"
              onChange={(date, dateString) => {
                handleDateChange(dateString);
              }}
              defaultValue={dayjs()}
              format="YYYY/MM"
              allowClear
            />
            度
          </Title>
          <div className="w-[300px] border border-black h-[60px] flex items-center justify-center">
            <Title level={4} className="mb-0">御請求金額	
              <span className="pl-6 text-[22px]">
                ¥ {Math.floor(filteredData.reduce((sum, item) => sum + (item.基本料金1 || 0) + (item["3軸料金1"] || 0) + (item.その他費用 || 0), 0) * 1.1)}
              </span>
            </Title>
          </div>
        </div>
        <table className=" border-collapse border border-black h-[80px] m-auto w-[60%]">
          <thead>
            <tr className="text-balck">
              <th className="border border-black px-4 py-1">10％対象額</th>
              <th className="border border-black px-4 py-1">免税・非課税額</th>
              <th className="border border-black px-4 py-1">小計</th>
              <th className="border border-black px-4 py-1">10％消費税額</th>
            </tr>
          </thead>
          <tbody>
          <tr className="text-balck">
              <td className="border border-black px-4 py-1">
              ¥ {filteredData.reduce((sum, item) => sum + (item.基本料金1 || 0) + (item["3軸料金1"] || 0) + (item.その他費用 || 0), 0)}
              </td>
              <td className="border border-black px-4 py-1">¥ 0</td>
              <td className="border border-black px-4 py-1">
                ¥ {filteredData.reduce((sum, item) => sum + (item.基本料金1 || 0) + (item["3軸料金1"] || 0) + (item.その他費用 || 0), 0)}
              </td>
              <td className="border border-black px-4 py-1">
                ¥ {Math.floor(filteredData.reduce((sum, item) => sum + (item.基本料金1 || 0) + (item["3軸料金1"] || 0) + (item.その他費用 || 0), 0) * 0.1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pt-20">
        <div className="">
          <p>【取引銀行】<span className="pl-2">: 横浜信用金庫　末吉支店</span></p>
          <p>【当座預金】<span className="pl-2">: 口座番号 22742</span></p>
          <Text>お手数ですが上記口座にお振込みお願い致します。</Text>
        </div>
      </div>
    </div>
  );
};

export default InvoiceMarutaAllPage;
