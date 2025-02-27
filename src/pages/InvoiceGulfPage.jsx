import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Select, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

dayjs.locale("ja");
const { Title, Text } = Typography;

const InvoiceGulfPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const invoiceRef = useRef();
  const [datas, setDatas] = useState([]);
  const [課税1, set課税1] = useState("非課税");
  const [CRU課税1, setCRU課税1] = useState("非課税");
  const [軸課税1, set軸課税1] = useState("非課税");
  const [高速費課税, set高速費課税] = useState("課税");
  const [スケール費課税1, setスケール費課税1] = useState("非課税");
  const [シャーシ留置費課税1, setシャーシ留置費課税1] = useState("非課税");
  const [その他課税, setその他課税] = useState("非課税");
  const [課税2, set課税2] = useState("非課税");
  const [CRU課税2, setCRU課税2] = useState("非課税");
  const [軸課税2, set軸課税2] = useState("非課税");
  const [高速費課税2, set高速費課税2] = useState("課税");
  const [スケール費課税2, setスケール費課税2] = useState("非課税");
  const [シャーシ留置費課税2, setシャーシ留置費課税2] = useState("非課税");
  const [その他課税2, setその他課税2] = useState("非課税");
  const [課税3, set課税3] = useState("非課税");
  const [CRU課税3, setCRU課税3] = useState("非課税");
  const [軸課税3, set軸課税3] = useState("非課税");
  const [高速費課税3, set高速費課税3] = useState("課税");
  const [スケール費課税3, setスケール費課税3] = useState("非課税");
  const [シャーシ留置費課税3, setシャーシ留置費課税3] = useState("非課税");
  const [その他課税3, setその他課税3] = useState("非課税");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalRailwayPrice, setTotalRailwayPrice] = useState("");
  const [roundingMode, setRoundingMode] = useState(true);
  const [invoiceType, setInvoiceType] = useState(0);
  const today = dayjs().format("YYYY/MM/DD");

  // Helper functions
  const formatNumber = (num) => {
    return parseInt(num).toLocaleString("ja-JP");
  };

  const calculateValue = (num, roundingMode) => {
    if (roundingMode === false) return Math.floor(num);
    if (roundingMode === true) return Math.ceil(num);
    return Math.round(num);
  };

  // Fetch data from the API endpoints
  const fetchData = async () => {
    try {
      const res = await Promise.all(
        data?.map((code) => axios.get(`/order/invoice/${code}`))
      );
      setDatas(res.filter((v) => v.status === 200).map((v) => v.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate total prices and set tax status based on available fees.
  useEffect(() => {
    let total = 0;
    let RailwayPriceCal = 0;

    datas.forEach((data) => {
      if (data.基本料金1) {
        set課税1("課税");
        total += data.基本料金1 ;
      }
      if (data["3軸料金1"]) {
        set軸課税1("課税");
        total += data["3軸料金1"] ;
      }
      if (data.CRU変更料金1) {
        setCRU課税1("課税");
        total += data.CRU変更料金1 ;
      }
      if (data.高速費) {
        set軸課税1("課税");
        total += data.高速費 ;
        RailwayPriceCal += data.高速費;
      }
      if (data.スケール費) {
        setスケール費課税1("課税");
        total += data.スケール費 ;
      }
      if (data.シャーシ留置費) {
        setシャーシ留置費課税1("課税");
        total += data.シャーシ留置費 ;
      }
      if (data.その他費用) {
        setその他課税("課税");
        total += data.その他費用 ;
      }
      if (data.基本料金2) {
        set課税2("課税");
        total += data.基本料金2 ;
      }
      if (data["3軸料金2"]) {
        set軸課税2("課税");
        total += data["3軸料金2"] ;
      }
      if (data.CRU変更料金2) {
        setCRU課税2("課税");
        total += data.CRU変更料金2 ;
      }
      if (data.高速費2) {
        set高速費課税2("課税");
        total += data.高速費2 ;
        RailwayPriceCal += data.高速費2;
      }
      if (data.スケール費2) {
        setスケール費課税2("課税");
        total += data.スケール費2 ;
      }
      if (data.シャーシ留置費2) {
        setシャーシ留置費課税2("課税");
        total += data.シャーシ留置費2 ;
      }
      if (data.その他費用2) {
        setその他課税2("課税");
        total += data.その他費用2 ;
      }
      if (data.基本料金3) {
        set課税3("課税");
        total += data.基本料金3 ;
      }
      if (data["3軸料金3"]) {
        set軸課税3("課税");
        total += data["3軸料金3"] ;
      }
      if (data.CRU変更料金3) {
        setCRU課税3("課税");
        total += data.CRU変更料金3 ;
      }
      if (data.高速費3) {
        set高速費課税3("課税");
        total += data.高速費3 ;
        RailwayPriceCal += data.高速費3;
      }
      if (data.スケール費3) {
        setスケール費課税3("課税");
        total += data.スケール費3 ;
      }
      if (data.シャーシ留置費3) {
        setシャーシ留置費課税3("課税");
        total += data.シャーシ留置費3 ;
      }
      if (data.その他費用3) {
        setその他課税3("課税");
        total += data.その他費用3 ;
      }
    });
    setTotalPrice(Math.round(total));
    setTotalRailwayPrice(RailwayPriceCal);
  }, [datas]);

  // Renders a single table row for a data record.
  const renderRow = (data, index) => (
    <tr key={index} className={index % 2 === 0 ? "bg-[#d4eef4]" : ""}>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {data.識別コード}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {dayjs(data.積日).format("YYYY年MM月DD日 (dddd)")}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {data.取場所}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {data.搬入返却場所}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {data.コンテナNo}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {data.コンテナサイズ}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {data["3軸数"] ? "3軸" : ""}
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center">
        {formatNumber(
          calculateValue(
            data["3軸料金1"] + data["3軸料金2"] + data["3軸料金3"],
            roundingMode
          ) || 0
        )}
        円
      </td>
      <td className="border border-[#4eaec5] text-[13px] px-1 pb-2 items-center"></td>
      <td
        className={
          index % 2 === 0
            ? "border border-[#4eaec5] text-[13px] px-1 pb-2 items-center bg-[#7fccde]"
            : "border border-[#4eaec5] px-1 pb-2 items-center bg-[#a9dde9]"
        }
      >
        {formatNumber(
          calculateValue(
            data.基本料金1 +
              data["3軸料金1"] +
              data.CRU変更料金1 +
              data.高速費 +
              data.スケール費 +
              data.シャーシ留置費 +
              data.その他費用 +
              data.基本料金2 +
              data["3軸料金2"] +
              data.CRU変更料金2 +
              data.高速費2 +
              data.スケール費2 +
              data.シャーシ留置費2 +
              data.その他費用2 +
              data.基本料金3 +
              data["3軸料金3"] +
              data.CRU変更料金3 +
              data.高速費3 +
              data.スケール費3 +
              data.シャーシ留置費3 +
              data.その他費用3,
            roundingMode
          ) || 0
        )}
        円
      </td>
    </tr>
  );

  // Helper function to chunk an array into groups of a given size.
  const chunkArray = (array, size) => {
    let chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // Collect all rows from datas.
  const allRows = datas.map((data, index) => renderRow(data, index));
  // Split rows into chunks of 10.
  const chunkedRows = chunkArray(allRows, 25);

  // Placeholder for PDF download logic.
  const handleDownloadPDF = async () => {
    await axios
      .put(`/orderlist`, data)  
      .then(async (response) => {
        console.log("Database updated successfully", response);
        await html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("l", "mm", "a4");
          const imgWidth = 277; // A4 width in landscape
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;
          pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          pdf.save(`${datas[0].CRU顧客名}-${moment().format("YYYY-MM")}.pdf`);
        });
        navigate("/orders_invoices/billingList");
      })
      .catch((error) => {
        console.error("Error updating the database", error);
      });
  };



  return (
    <div className="bg-white text-black">
      <div className="flex flex-col justify-center w-full p-5" ref={invoiceRef}>
        {datas[0] && (
          <>
            {/* Header Section */}
            <div className="flex justify-between bg-[#2c7a8d] pb-2 px-2 items-center pr-20">
              <Title level={2} className="text text-white">
                {datas[0].CRU顧客名} 輸入 御中
              </Title>
              <Text className="white text-xl text-white">
                {dayjs(datas[0].請求日).format("YYYY年MM月")}分
              </Text>
            </div>
            <div className="flex justify-between bg-[#7fccde] pb-2 px-2 items-center pr-20">
              <div>
                <Text className="text-black text-[16px]">〒143-0001</Text>
                <br />
                <Text className="text-black text-[16px]">
                  東京都大田区東海４－１０－８ 事務所棟１０Ｆ
                </Text>
              </div>
              <div>
                <Title level={2} className="m-auto text-[#458a9c]">
                  {invoiceType == 2 ? "支払い確認書": "請求書"}
                </Title>
              </div>
            </div>
            <div className="flex justify-between pb-2">
              <div>
                <Text className="text-[#22525e] text-[16px]">
                  株式会社 ガルフ
                </Text>
                <br />
                <Text className="text-[#22525e] text-[16px]">
                  〒３４２－０００５{" "}
                </Text>
                <br />
                <Text className="text-[#22525e] text-[16px]">
                  埼玉県吉川市川藤３６０６番地１
                </Text>
              </div>
              <div>
                <Text className="text-[#22525e] text-[16px]">
                  TEL : 048-973-7360
                </Text>
                <br />
                <Text className="text-[#22525e] text-[16px]">
                  FAX : 048-973-7371
                </Text>
                <br />
                <Text className="text-[#22525e] text-[16px]">
                  E-mail gulf-co.ltd-@outlook.com
                </Text>
              </div>
              <div>
                <Text className="text-[#22525e] text-[15px]">
                  請求日 : {today} 請求書番号 : 012
                </Text>
                <br />
                <Text className="text-[#22525e] text-[15px]">
                  振込先 埼玉縣信用金庫 大袋支店028）
                </Text>
                <br />
                <Text className="text-[#22525e] text-[15px]">
                  普通預金口座番号 ３２３７６７２{" "}
                </Text>
                <p className="text-[#22525e]">
                  ｶﾌﾞｼｷｶﾞｲｼｬｶﾞﾙﾌ ﾀﾞｲﾋｮｳﾄﾘｼﾏﾘﾔｸ ｳﾂﾉｼﾝ
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <Text className="text-[black] text-[17px] border-b border-[#4eaec5] pb-2 pr-20">
                ご請求金額 {formatNumber(totalPrice * 1.1)}¥
              </Text>
              <Text className="text-[#22525e] text-[17px]">
                T7-0300-0111-1209
              </Text>
            </div>

            {/* Table Section with chunking */}
            <div className=" w-full justify-center pt-2">
              {chunkedRows.map((chunk, chunkIndex) => (
                <React.Fragment key={chunkIndex}>
                  <table className="min-w-full table-auto border-collapse border border-[#4eaec5] text-black">
                    <thead>
                      <tr>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          REF NO.
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          納品日
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          納品先
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          納品先住所
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          コンテナーＮｏ
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          サイズ
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          軸
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          高速料金（内税）
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          配送料（免税）
                        </th>
                        <th className="text-left px-2 pb-2 text-[#4eaec5]">
                          配送料
                        </th>
                      </tr>
                    </thead>
                    <tbody>{chunk}</tbody>
                  </table>
                  {/* Insert a spacer (approximately 10cm high) between chunks */}
                  {chunkIndex < chunkedRows.length - 1 && (
                    <div style={{ padding: "250px" }} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <div className="md:w-[40%] pt-5">
                <Text className="text-black text-[13px]">
                  毎々格別のお引き立てを賜りありがとうございます。
                </Text>
                <br />
                <Text className="text-black text-[13px]">
                  上記のとおり御請求申し上げます。
                </Text>
              </div>
              <div>
                <table className="min-w-full divide-y divide-black border border-[#4eaec5]">
                  <tbody className="bg-white divide-y divide-x divide-black">
                    <tr>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[#22525e] text-center pb-2">
                        請求書小計
                      </td>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[black] text-center pb-2 bg-[#a9dde9]">
                        {formatNumber(totalPrice || 0)}円
                      </td>
                    </tr>
                    <tr className="bg-[#d4eef4]">
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[#22525e] text-center pb-2">
                        高速料金
                      </td>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[black] text-center pb-2 bg-[#7fccde]">
                        {formatNumber(totalRailwayPrice || 0)}円
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[#22525e] text-center pb-2">
                        消費税（10％）
                      </td>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[black] text-center pb-2 bg-[#a9dde9]">
                        {formatNumber(totalPrice / 10 || 0)}円
                      </td>
                    </tr>
                    <tr className="bg-[#d4eef4]">
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[#22525e] text-center pb-2">
                        配送料（免税）
                      </td>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[black] text-center pb-2 bg-[#7fccde]"></td>
                    </tr>
                    <tr className="bg-[#7fccde]">
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[#185865] font-bold text-center pb-2">
                        合計
                      </td>
                      <td className="px-4 text-[13px] border border-[#4eaec5] text-[black] text-center pb-2">
                        {formatNumber(totalPrice * 1.1 || 0)}円
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-wrap flex-row items-center justify-end gap-5 p-5">
        <div className="flex justify-center items-center">請求先</div>
        <Select 
          options={[
            { value: 0, label: "顧客" },
            { value: 1, label: "船社" },
            { value: 2, label: "下払" },
            { value: 3, label: "保管" },
          ]} 
          defaultValue={1} 
          onChange={(value) => setInvoiceType(value)} 
          className="max-w-40 grow"
        />        
        <div className="flex justify-center items-center">端数処理</div>
        <Select
          options={[
            { value: true, label: "切り上げ" },
            { value: false, label: "切り捨て" },
          ]}
          defaultValue={true}
          onChange={(value) => setRoundingMode(value)}
          className="max-w-48"
        />
        <Button type="primary" onClick={handleDownloadPDF}>
          PDF作成
        </Button>
      </div>
    </div>
  );
};

export default InvoiceGulfPage;
