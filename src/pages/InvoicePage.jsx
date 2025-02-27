import React from "react";
import { Button, Divider, Select, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "src/components/Loading";

const { Title, Text } = Typography;

const InvoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const invoiceRef = useRef();

  // State definitions
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
  const [loading, setLoading] = useState(true);
  const [roundingMode, setRoundingMode] = useState(true);
  const [invoiceType, setInvoiceType] = useState(0);

  const today = dayjs().format("YYYY/MM/DD");

  // Helper to add commas
  const formatNumber = (num) => num.toLocaleString("ja-JP");

  // Rounding helper: if roundingMode is true we round up, if false we round down.
  const calculateValue = (num, roundingMode) => {
    if (roundingMode === false) return Math.floor(num);
    if (roundingMode === true) return Math.ceil(num);
    return Math.round(num);
  };

  // Fetch invoice data from API endpoints based on provided codes
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Promise.all(
        data?.map((code) => axios.get(`/order/invoice/${code}`))
      );
      console.log(res);
      setDatas(res.filter((v) => v.status === 200).map((v) => v.data));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
console.log("datas" , datas)
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate total price (for tax) and update tax status based on available fees
  useEffect(() => {
    let total = 0;
    datas.forEach((data) => {
      if (data.基本料金1) {set課税1("課税"); total += data.基本料金1 ;}
      if (data["3軸料金1"]) {set軸課税1("課税"); total += data["3軸料金1"] ;}
      if (data.CRU変更料金1) {setCRU課税1("課税"); total += data.CRU変更料金1 ;}
      if (data.高速費) {set軸課税1("課税"); total += data.高速費 ;}
      if (data.スケール費) {setスケール費課税1("課税"); total += data.スケール費 ;}
      if (data.シャーシ留置費) {setシャーシ留置費課税1("課税"); total += data.シャーシ留置費 ;}
      if (data.その他費用) {setその他課税("課税"); total += data.その他費用 ;}
      if (datas.基本料金2) {set課税2("課税"); total += datas.基本料金2 ;}
      if (data["3軸料金2"]) {set軸課税2("課税"); total += data["3軸料金2"] ;}
      if (data.CRU変更料金2) {setCRU課税2("課税"); total += data.CRU変更料金2 ;}
      if (data.高速費2) {set高速費課税2("課税"); total += data.高速費2 ;}
      if (data.スケール費2) {setスケール費課税2("課税"); total += data.スケール費2 ;}
      if (data.シャーシ留置費2) {setシャーシ留置費課税2("課税"); total += data.シャーシ留置費2 ;}
      if (data.その他費用2) {setその他課税2("課税"); total += data.その他費用2 ;}
      if (data.基本料金3) {set課税3("課税"); total += data.基本料金3 ;}
      if (data["3軸料金3"]) {set軸課税3("課税"); total += data["3軸料金3"] ;}
      if (data.CRU変更料金3) {setCRU課税3("課税"); total += data.CRU変更料金3 ;}
      if (data.高速費3) {set高速費課税3("課税"); total += data.高速費3 ;}
      if (data.スケール費3) {setスケール費課税3("課税"); total += data.スケール費3 ;}
      if (data.シャーシ留置費3) {setシャーシ留置費課税3("課税"); total += data.シャーシ留置費3 ;}
      if (data.その他費用3) {setその他課税3("課税"); total += data.その他費用3 ;}
    });
    setTotalPrice(Math.round(total));
  }, [datas]);

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

  // Modified renderRow with an improved key
  const renderRow = (data, label, tax, price, index, name) => (
    <tr key={index.name}>
      <td className="border border-black px-4 py-2">{name === "配達先" ? data.識別コード : ""}</td>
      <td className="border border-black px-4 py-2">{name === "配達先" ? dayjs(data.積日).format("YYYY-MM-DD") : ""}</td>
      <td className="border border-black px-4 py-2">{name === "配達先" ? data.取場所 : ""}</td>
      <td className="border border-black px-4 py-2">{name === "配達先" ? data.搬入返却場所 : ""}</td>
      <td className="border border-black px-4 py-2">{data.コンテナNo}</td>
      <td className="border border-black px-4 py-2">{label === "配達先" ? data.コンテナサイズ : name}</td>
      <td className="border border-black px-4 py-2">{formatNumber(tax)}</td>
      <td className="border border-black px-4 py-2">{formatNumber(data[label])}円</td>
      <td className="border border-black px-4 py-2">1</td>
      <td className="border border-black px-4 py-2">{formatNumber(data[label])}円</td>
      <td className="border border-black px-4 py-2">{formatNumber(price)}円</td>
      <td className="border border-black px-4 py-2">{formatNumber(data[label] + price)}円</td>
    </tr>
  );

  // Helper function to chunk an array into groups of specified size.
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Collect all table rows from the invoice data.
  const allRows = [];
  datas.forEach((data, index) => {
    if (data.配達先1) {
      allRows.push(
        renderRow(
          data,
          "基本料金1",
          課税1,
          calculateValue(data.基本料金1 / 10, roundingMode),
          index,
          "配達先"
        )
      );
    }
    if (data.CRU変更料金1) {
      allRows.push(
        renderRow(
          data,
          "CRU変更料金1",
          CRU課税1,
          calculateValue(data.CRU変更料金1 / 10, roundingMode),
          index,
          "CRU"
        )
      );
    }
    if (data["3軸料金1"]) {
      allRows.push(
        renderRow(
          data,
          "3軸料金1",
          軸課税1,
          calculateValue(data["3軸料金1"] / 10, roundingMode),
          index,
          "3軸"
        )
      );
    }
    if (data.高速費) {
      allRows.push(
        renderRow(
          data,
          "高速費",
          高速費課税,
          calculateValue(data.高速費 / 10, roundingMode),
          index,
          "高速費"
        )
      );
    }
    if (data.スケール費) {
      allRows.push(
        renderRow(
          data,
          "スケール費",
          スケール費課税1,
          calculateValue(data.スケール費 / 10, roundingMode),
          index,
          "スケール費"
        )
      );
    }
    if (data.シャーシ留置費) {
      allRows.push(
        renderRow(
          data,
          "シャーシ留置費",
          シャーシ留置費課税1,
          calculateValue(data.シャーシ留置費 / 10, roundingMode),
          index,
          "シャーシ留置費"
        )
      );
    }
    if (data.その他費用) {
      allRows.push(
        renderRow(
          data,
          "その他費用",
          その他課税,
          calculateValue(data.その他費用 / 10, roundingMode),
          index,
          "その他費用"
        )
      );
    }
    if (data.配達先2) {
      allRows.push(
        <tr key={`配達先2-${index}`}>
          <td className="border border-black px-4 py-2"></td>
          <td className="border border-black px-4 py-2">
            {dayjs(data.積日2).format("YYYY-MM-DD")}
          </td>
          <td className="border border-black px-4 py-2">{data.取場所2}</td>
          <td className="border border-black px-4 py-2">{data.搬入返却場所}</td>
          <td className="border border-black px-4 py-2">{data.コンテナNo}</td>
          <td className="border border-black px-4 py-2">
            {data.コンテナサイズ}
          </td>
          <td className="border border-black px-4 py-2">{課税2}</td>
          <td className="border border-black px-4 py-2">{data.基本料金2}円</td>
          <td className="border border-black px-4 py-2">1</td>
          <td className="border border-black px-4 py-2">{data.基本料金2}円</td>
          <td className="border border-black px-4 py-2">
            {data.基本料金2 ? data.基本料金2 / 10 : 0}円
          </td>
          <td className="border border-black px-4 py-2">
            {data.基本料金2 ? data.基本料金2 + data.基本料金2 / 10 : 0}円
          </td>
        </tr>
      );
    }
    if (data.CRU変更料金2) {
      allRows.push(
        renderRow(
          data,
          "CRU変更料金2",
          CRU課税2,
          calculateValue(data.CRU変更料金2, roundingMode),
          index,
          "CRU"
        )
      );
    }
    if (data["3軸料金2"]) {
      allRows.push(
        renderRow(
          data,
          "3軸料金2",
          軸課税2,
          calculateValue(data["3軸料金2"], roundingMode),
          index,
          "3軸"
        )
      );
    }
    if (data.高速費2) {
      allRows.push(
        renderRow(
          data,
          "高速費2",
          高速費課税2,
          calculateValue(data.高速費2, roundingMode),
          index,
          "高速費"
        )
      );
    }
    if (data.スケール費2) {
      allRows.push(
        renderRow(
          data,
          "スケール費2",
          スケール費課税2,
          calculateValue(data.スケール費2, roundingMode),
          index,
          "スケール費"
        )
      );
    }
    if (data.シャーシ留置費2) {
      allRows.push(
        renderRow(
          data,
          "シャーシ留置費2",
          シャーシ留置費課税2,
          calculateValue(data.シャーシ留置費2, roundingMode),
          index,
          "シャーシ留置費"
        )
      );
    }
    if (data.その他費用2) {
      allRows.push(
        renderRow(
          data,
          "その他費用2",
          その他課税2,
          calculateValue(data.その他費用2, roundingMode),
          index,
          "その他費用"
        )
      );
    }
    if (data.配達先3) {
      allRows.push(
        <tr key={`配達先3-${index}`}>
          <td className="border border-black px-4 py-2"></td>
          <td className="border border-black px-4 py-2">
            {dayjs(data.積日3).format("YYYY-MM-DD")}
          </td>
          <td className="border border-black px-4 py-2">{data.取場所3}</td>
          <td className="border border-black px-4 py-2">{data.搬入返却場所}</td>
          <td className="border border-black px-4 py-2">{data.コンテナNo}</td>
          <td className="border border-black px-4 py-2">
            {data.コンテナサイズ}
          </td>
          <td className="border border-black px-4 py-2">{課税3}</td>
          <td className="border border-black px-4 py-2">{data.基本料金3}円</td>
          <td className="border border-black px-4 py-2">1</td>
          <td className="border border-black px-4 py-2">{data.基本料金3}円</td>
          <td className="border border-black px-4 py-2">
            {data.基本料金3 ? data.基本料金3 / 10 : 0}円
          </td>
          <td className="border border-black px-4 py-2">
            {data.基本料金3 ? data.基本料金3 + data.基本料金3 / 10 : 0}円
          </td>
        </tr>
      );
    }
    if (data.CRU変更料金3) {
      allRows.push(
        renderRow(
          data,
          "CRU変更料金3",
          CRU課税3,
          calculateValue(data.CRU変更料金3, roundingMode),
          index,
          "CRU"
        )
      );
    }
    if (data["3軸料金3"]) {
      allRows.push(
        renderRow(
          data,
          "3軸料金3",
          軸課税3,
          calculateValue(data["3軸料金3"], roundingMode),
          index,
          "3軸"
        )
      );
    }
    if (data.高速費3) {
      allRows.push(
        renderRow(
          data,
          "高速費3",
          高速費課税3,
          calculateValue(data.高速費3, roundingMode),
          index,
          "高速費"
        )
      );
    }
    if (data.スケール費3) {
      allRows.push(
        renderRow(
          data,
          "スケール費3",
          スケール費課税3,
          calculateValue(data.スケール費3, roundingMode),
          index,
          "スケール費"
        )
      );
    }
    if (data.シャーシ留置費3) {
      allRows.push(
        renderRow(
          data,
          "シャーシ留置費3",
          シャーシ留置費課税3,
          calculateValue(data.シャーシ留置費3, roundingMode),
          index,
          "シャーシ留置費"
        )
      );
    }
    if (data.その他費用3) {
      allRows.push(
        renderRow(
          data,
          "その他費用3",
          その他課税3,
          calculateValue(data.その他費用3, roundingMode),
          index,
          "その他費用"
        )
      );
    }
  });

  // Split the full list of rows into chunks of 10 rows each.
  const chunkedRows = chunkArray(allRows, 19);

  return (
    <div className="bg-white text-black">
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
          className="max-w-40 grow"
        />
        <Button type="primary" onClick={handleDownloadPDF}>
          PDF作成
        </Button>
      </div>
      <div className="flex flex-col justify-center w-full p-5" ref={invoiceRef}>
          <Title level={2} className="m-auto text-black">
            {invoiceType == 2 ? "支払い確認書": "御請求書"}
          </Title>
        {datas[0] && (
          <>
            <Divider className="w-full m-2" />
            <div className="flex justify-between pr-12">
              <div className="flex justify-between w-[30%] ">
                <Title level={5} className="text-black">{datas[0].CRU顧客名} 輸入 御中</Title>
                <Text type="secondary" className="text-black">{dayjs(datas[0].請求日).format("YYYY年MM月")}締め</Text>
              </div>
              <div>
                <Text type="secondary" className="text-black">作成日:{today}</Text>
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row px-2">
              <div className="md:w-[30%]">
                <div className="pt-2">
                  <table className="min-w-full divide-y divide-black border border-black">
                    <tbody className="bg-white divide-y divide-x divide-black">
                      <tr>
                        <td className="px-6 py-2 whitespace-nowrap">課税（10％対象）</td>
                        <td className="px-6 py-2 whitespace-nowrap">{formatNumber(calculateValue(totalPrice, roundingMode))}円</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-2 whitespace-nowrap">消費税（10％）</td>
                        <td className="px-6 py-2 whitespace-nowrap">{formatNumber(calculateValue(totalPrice * 0.1, roundingMode))}円</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-2 whitespace-nowrap">非課税</td>
                        <td className="px-6 py-2 whitespace-nowrap">0円</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-between border-b border-black pb-4">
                    <Title level={4} className="m-auto pt-4 text-black">御請求金額</Title>
                    <Title level={4} className="m-auto pt-4 text-black">{formatNumber(calculateValue(totalPrice * 1.1, roundingMode))}円</Title>
                  </div>
                </div>
              </div>
              {(invoiceType == 0 || invoiceType == 1)  && (
              <div className="md:w-[50%]">
                <div className="flex flex-wrap flex-row items-center text-black gap-5">
                  <Typography className="text-black">
                    <Text className="text-black" strong>
                      顧客
                    </Text>
                    : LogiTechnoService株式会社
                  </Typography>
                  <Typography className="text-black">
                    <Text className="text-black" strong>
                      住所
                    </Text>
                    : 東京都武蔵村山市神明2-51-15
                  </Typography>
                  <Typography className="text-black">
                    <Text className="text-black" strong>
                      事業者登録番号
                    </Text>
                    : T1012801022526
                  </Typography>
                  <Typography className="text-black">
                    <Text className="text-black" strong>
                      銀行名
                    </Text>
                    : 山梨中央銀行（銀行コード0142）
                  </Typography>
                  <Typography className="text-black">
                    <Text className="text-black" strong>
                      支店名
                    </Text>
                    : 立川支店（支店コード207）
                  </Typography>
                  <Typography className="text-black">
                    <Text className="text-black" strong>
                      口座名
                    </Text>
                    : 普通 704264 ロジテクノサービス（カ）
                  </Typography>
                </div>
              </div>
              )}
            </div>
            <div className=" w-full justify-center py-5">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {chunkedRows.map((rows, chunkIndex) => (
                    <React.Fragment key={chunkIndex}>
                      <table className="min-w-full table-auto border-collapse border border-black text-black">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-black px-4 py-2">受注コード</th>
                          <th className="border border-black px-4 py-2">日付</th>
                          <th className="border border-black px-4 py-2">積地</th>
                          <th className="border border-black px-4 py-2">配達先</th>
                          <th className="border border-black px-4 py-2">品目</th>
                          <th className="border border-black px-4 py-2">種類</th>
                          <th className="border border-black px-4 py-2">区分</th>
                          <th className="border border-black px-4 py-2">基本料金</th>
                          <th className="border border-black px-4 py-2">数量</th>
                          <th className="border border-black px-4 py-2">小計</th>
                          <th className="border border-black px-4 py-2">消費税</th>
                          <th className="border border-black px-4 py-2">合計</th>
                        </tr>
                      </thead>
                        <tbody>{rows.map((row) => row)}</tbody>
                      </table>
                      {/* Insert a spacer (150px high) between chunks */}
                      {chunkIndex < chunkedRows.length - 1 && (
                        <div style={{ padding : "225px" }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default InvoicePage;
