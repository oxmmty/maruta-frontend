import { DatePicker, Table, Typography, Checkbox } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import CTable from "src/components/CTable";
const { Title } = Typography;

const DBPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_API_BASE_URL}/order`,
      );
      setAllData(response.data);
      console.log("responsedate",response.data);
      setFilteredData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDate(formattedDate);
      const filtered = allData.filter(date);
      setFilteredData(filtered);
    } else {
      setFilteredData(allData);
    }
  };

  const onCheckboxChange = async (record, field, checked) => {
    const updatedRecord = { ...record, [field]: checked };
    try {
      await axios.put(`${process.env.REACT_API_BASE_URL}/order/${record._id}`, {
        [field]: checked,
        識別コード: record.識別コード,
      });
      const updatedData = filteredData.map((item) =>
        item.id === record.id ? updatedRecord : item,
      );
      setFilteredData(updatedData);
      if (field == "配車組み") {
        const train = "true";
        await handleAddRecords(record, train);
      } else {
        const train = "false";
        await handleAddRecords(record, train);
      }
    } catch (err) {
      console.error("Error updating data:", err);
      setError("Failed to update data. Please try again.");
    }
  };

  const handleAddRecords = async (record, train) => {
    let axles;
    let 危険品;
    if (record["3軸数"] !== true) {
      axles = "";
    } else {
      axles = "3";
    }
    if (record.危険品 !== true) {
      危険品 = "";
    } else {
      危険品 = "危険品";
    }
    const 依頼日 = moment().format("YYYY-MM-DD");
    const a = record.識別コード.replace(/^MA/, "HA");
    record.区分 = "配達";
    record.識別コード = a;
    const {
      識別コード,
      区分,
      取場所,
      コンテナNo,
      コンテナタイプ,
      コンテナサイズ,
      コンテナ種類,
      配達先1,
      積日1,
      配達日1,
      配達時間1,
      配達先住所1,
      配達先TEL1,
      配達先担当者1,
      配達先2,
      積日2,
      配達日2,
      配達時間2,
      配達先住所2,
      配達先TEL2,
      配達先担当者2,
      配達先3,
      積日3,
      配達日3,
      配達時間3,
      配達先住所3,
      配達先TEL3,
      配達先担当者3,
      搬入返却場所,
      船名,
      VOYNo,
      船社,
      BKNo,
      BLNo,
      荷揚港,
      最終仕向,
      荷主名,
      依頼書備考1,
      下払会社名1,
      下払料金1,
      下払スケール費1,
      下払その他費用1,
      下払高速費1,
      下払シャーシ留置費1,
      下払会社名2,
      下払料金2,
      下払スケール費2,
      下払その他費用2,
      下払高速費2,
      下払シャーシ留置費2,
      下払会社名3,
      下払料金3,
      下払スケール費3,
      下払その他費用3,
      下払高速費3,
      下払シャーシ留置費3,
      下払会社名4,
      下払料金4,
      下払スケール費4,
      下払その他費用4,
      下払高速費4,
      下払シャーシ留置費4,
      下払会社名5,
      下払料金5,
      下払スケール費5,
      下払その他費用5,
      下払高速費5,
      下払シャーシ留置費5,
      下払会社名6,
      下払料金6,
      下払スケール費6,
      下払その他費用6,
      下払高速費6,
      下払シャーシ留置費6,
      依頼書備考欄,
      部署コード,
      下払課税1,
      下払その他課税1,
      下払スケール費課税1,
      下払シャーシ留置費課税1,
      下払課税2,
      下払その他課税2,
      下払スケール費課税2,
      下払シャーシ留置費課税2,
      下払課税3,
      下払その他課税3,
      下払スケール費課税3,
      下払シャーシ留置費課税3,
      下払課税4,
      下払その他課税4,
      下払スケール費課税4,
      下払シャーシ留置費課税4,
      下払課税5,
      下払その他課税5,
      下払スケール費課税5,
      下払シャーシ留置費課税5,
      下払課税6,
      下払その他課税6,
      下払スケール費課税6,
      下払シャーシ留置費課税6,
    } = record;
    if (train == "true") {
      if (下払会社名1) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0001`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名1,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金1,
          基本料金課税: 下払課税1,
          その他費用課税: 下払その他課税1,
          スケール費課税: 下払スケール費課税1,
          シャーシ留置費課税: 下払シャーシ留置費課税1,
          その他費用: 下払その他費用1,
          スケール費: 下払スケール費1,
          高速費: 下払高速費1,
          シャーシ留置費: 下払シャーシ留置費1,
          備考欄: 依頼書備考欄,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名2) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0002`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,

          下払会社名: 下払会社名2,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金2,
          その他費用: 下払その他費用2,
          スケール費: 下払スケール費2,
          高速費: 下払高速費2,
          シャーシ留置費: 下払シャーシ留置費2,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税2,
          その他費用課税: 下払その他課税2,
          スケール費課税: 下払スケール費課税2,
          シャーシ留置費課税: 下払シャーシ留置費課税2,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名3) {
        requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0003`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名3,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金3,
          その他費用: 下払その他費用3,
          スケール費: 下払スケール費3,
          高速費: 下払高速費3,
          シャーシ留置費: 下払シャーシ留置費3,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税3,
          その他費用課税: 下払その他課税3,
          スケール費課税: 下払スケール費課税3,
          シャーシ留置費課税: 下払シャーシ留置費課税3,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名4) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0004`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名4,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金4,
          その他費用: 下払その他費用4,
          スケール費: 下払スケール費4,
          高速費: 下払高速費4,
          シャーシ留置費: 下払シャーシ留置費4,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税4,
          その他費用課税: 下払その他課税4,
          スケール費課税: 下払スケール費課税4,
          シャーシ留置費課税: 下払シャーシ留置費課税4,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名5) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0005`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名5,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金5,
          その他費用: 下払その他費用5,
          スケール費: 下払スケール費5,
          高速費: 下払高速費5,
          シャーシ留置費: 下払シャーシ留置費5,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税5,
          その他費用課税: 下払その他課税5,
          スケール費課税: 下払スケール費課税5,
          シャーシ留置費課税: 下払シャーシ留置費課税5,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名6) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0006`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名6,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金6,
          その他費用: 下払その他費用6,
          スケール費: 下払スケール費6,
          高速費: 下払高速費6,
          シャーシ留置費: 下払シャーシ留置費6,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税6,
          その他費用課税: 下払その他課税6,
          スケール費課税: 下払スケール費課税6,
          シャーシ留置費課税: 下払シャーシ留置費課税6,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
    }
    fetchData();
  };

  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      key: "ピックチェック",
      title: "ピックチェック",
      dataIndex: "ピックチェック",
      align: "center",

      render: (text, record) => (
        <Checkbox
          checked={record.ピックチェック || false}
          onChange={(e) => {
            // if (!record.ピックチェック) {
            onCheckboxChange(record, "ピックチェック", e.target.checked);
            // }
          }}
        />
      ),
    },
    {
      key: "配車組み",
      title: "配車組み",
      dataIndex: "配車組み",
      align: "center",

      render: (text, record) => (
        <Checkbox
          checked={record.配車組み || false}
          onChange={(e) => {
            // if (!record.配車組み) {
            onCheckboxChange(record, "配車組み", e.target.checked);
            // }
          }}
        />
      ),
    },
    {
      key: "空バン返却チェック",
      title: "空バン返却チェック",
      dataIndex: "空バン返却チェック",
      align: "center",

      render: (text, record) => (
        <Checkbox
          checked={record.空バン返却チェック || false}
          onChange={(e) => {
            // if (!record.空バン返却チェック) {
            onCheckboxChange(record, "空バン返却チェック", e.target.checked);
            // }
          }}
        />
      ),
    },
    {
      key: "送り状受領書作成",
      title: "送り状・受領書作成",
      dataIndex: "送り状・受領書作成",
      align: "center",

      render: (text, record) => (
        <Checkbox
          checked={record["送り状受領書作成"] || false}
          onChange={(e) => {
            // if (!record["送り状受領書作成"]) {
            onCheckboxChange(record, "送り状受領書作成", e.target.checked);
            // }
          }}
        />
      ),
    },
    {
      key: "識別コード",
      title: "受注No.",
      dataIndex: "識別コード",
      align: "center",

      sorter: function (a, b) {
        return b.識別コード.localeCompare(a.識別コード);
      },
    },
   
    {
      key: "配達日1",
      title: "作業日",
      dataIndex: "配達日1",
      align: "center",
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      key: "基本課税1",
      title: "税区分",
      dataIndex: "基本課税1",
      align: "center",
      render: (text, record) => (record.基本課税1 == true ? "課税" : "免税"),
    },
    { key: "顧客名", title: "受注先", dataIndex: "顧客名", align: "center" },
    { key: "顧客名", title: "請求先", dataIndex: "顧客名", align: "center" },
    { key: "輸入種類", title: "種類", dataIndex: "輸入種類", align: "center" },
    {
      key: "識別コード",
      title: "注文番号",
      dataIndex: "識別コード",
      align: "center",

      sorter: function (a, b) {
        return b.識別コード.localeCompare(a.識別コード);
      },
    },
    { key: "船名", title: "本船名", dataIndex: "船名", align: "center" },
    // ＢＬ(BOOKING)NO
    { key: "BK№", title: "BK№", dataIndex: "BK№", align: "center" },
    {
      key: "コンテナ№",
      title: "コンテナ番号",
      dataIndex: "コンテナ№",
      align: "center",
    },
    {
      key: "搬入返却場所",
      title: "搬出先",
      dataIndex: "搬入返却場所",
      align: "center",
    },
    { key: "取場所", title: "作業場所", dataIndex: "取場所", align: "center" },
    {
      key: "配達日1",
      title: "着日",
      dataIndex: "配達日1",
      align: "center",
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      key: "配達日1",
      title: "作業完了日",
      dataIndex: "配達日1",
      align: "center",
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      key: "配達日1",
      title: "請求日",
      dataIndex: "配達日1",
      align: "center",
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      key: "搬入返却場所",
      title: "搬入先",
      dataIndex: "搬入返却場所",
      align: "center",
    },
    {
      key: "コンテナサイズ",
      title: "サイズ",
      dataIndex: "コンテナサイズ",
      align: "center",
      render: (text, record) => (record.コンテナサイズ === "20" ? "20F" : "40F"),

    },
    {
      key: "コンテナ種類",
      title: "タイプ",
      dataIndex: "コンテナ種類",
      align: "center",
    },
    {
      key: "軸3",
      title: "軸3",
      dataIndex: "軸3",
      align: "center",
      render: (text, record) => (record.軸3 ? "軸3" : ""),
    },
    {
      key: "",
      title: "その他",
      dataIndex: "",
      align: "center",
    },
    {
      key: "請求書備考",
      title: "備考",
      dataIndex: "請求書備考",
      align: "center",
    },
    {
      key: "",
      title: "輸送区分",
      dataIndex: "",
      align: "center",
    },
    {
      key: "基本料金1",
      title: "運送料",
      dataIndex: "基本料金1",
      align: "center",
    },
    {
      key: "3軸料金1",
      title: "3軸料金",
      dataIndex: "3軸料金1",
      align: "center",
    },
    {
      key: "売上",
      title: "売上",
      dataIndex: "売上",
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const 軸料金 = record["3軸料金1"] || 0;
        const その他費用 = record.その他費用 || 0;
        return 基本料金 + 軸料金 + その他費用;
      }
    },
    { key: "自社乗務員1", title: "運転者名1", dataIndex: "自社乗務員1", align: "center" },
    { key: "下払会社名1", title: "下払先1", dataIndex: "下払会社名1", align: "center" },
    { 
      key: "売上1", 
      title: "売上1", 
      dataIndex: "売上1", 
      align: "center",
      render: (text, record) => {
        const 基本料金1 = record.下払料金1 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const その他費用1 = record.下払その他費用1 || 0;
        return 基本料金1 + 軸料金1 + その他費用1;
      } 
    },
    { 
      key: "下払料金1", 
      title: "運送原価1",
      dataIndex: "下払料金1", 
      align: "center" 
    },
    
    { 
      key: "下払その他費用1", 
      title: "その他原価1", 
      dataIndex: "下払その他費用1", 
      align: "center" 
    },
    { 
      key: "原価1", 
      title: "原価1", 
      dataIndex: "原価1", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金1 = record.下払料金1 || 0;
        const その他費用1 = record.下払その他費用1 || 0;
        return 基本料金1 + その他費用1;
      }
    },
    { key: 
      "粗利1", 
      title: "粗利1", 
      dataIndex: "粗利1", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金1 = record.下払料金1 || 0;
        const その他費用1 = record.下払その他費用1 || 0;
        return 基本料金 + その他費用 + 軸料金1 - (基本料金1 + その他費用1);
      }
    },
    { 
      key: "粗利率1", 
      title: "粗利率1", 
      dataIndex: "粗利率1", 
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金1 = record.下払料金1 || 0;
        const その他費用1 = record.下払その他費用1 || 0;
        const 粗利率 = ((基本料金 + その他費用 + 軸料金1 - (基本料金1 + その他費用1)) / (基本料金 + その他費用 + 軸料金1)) * 100;
        if (isNaN(粗利率) || !isFinite(粗利率)) return 0;
        return Number(粗利率.toFixed(2));
      }
    },

    { 
      key: "自社乗務員2", 
      title: "運転者名2", 
      dataIndex: "自社乗務員2", 
      align: "center" 
    },
    { 
      key: "下払会社名2", 
      title: "下払先2", 
      dataIndex: "下払会社名2", 
      align: "center" 
    },
    { 
      key: "売上2", 
      title: "売上2", 
      dataIndex: "売上2", 
      align: "center",
      render: (text, record) => {
        const 基本料金2 = record.下払料金2 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const その他費用2 = record.下払その他費用2 || 0;
        return 基本料金2 + 軸料金1 + その他費用2;
      } 

    },
    { key: "下払料金2", title: "運送原価2", dataIndex: "下払料金2", align: "center" },
    { key: "下払その他費用2", title: "その他原価2", dataIndex: "下払その他費用2", align: "center" },
    { key: "原価2", 
      title: "原価2", 
      dataIndex: "原価2", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金2 = record.下払料金2 || 0;
        const その他費用2 = record.下払その他費用2 || 0;
        return 基本料金2 + その他費用2;
      }
    },
    { key: 
      "粗利2", 
      title: "粗利2", 
      dataIndex: "粗利2", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金2 = record.下払料金2 || 0;
        const その他費用2 = record.下払その他費用2 || 0;
        return 基本料金 + その他費用 + 軸料金1 - (基本料金2 + その他費用2);
      }
    },
    { 
      key: "粗利率2", 
      title: "粗利率2", 
      dataIndex: "粗利率2", 
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金2 = record.下払料金2 || 0;
        const その他費用2 = record.下払その他費用2 || 0;
        const 粗利率 = ((基本料金 + その他費用 + 軸料金1 - (基本料金2 + その他費用2)) / (基本料金 + その他費用 + 軸料金1)) * 100;
        if (isNaN(粗利率) || !isFinite(粗利率)) return 0;
        return Number(粗利率.toFixed(2));
      }
    },

    { key: "自社乗務員3", title: "運転者名3", dataIndex: "自社乗務員3", align: "center" },
    { key: "下払会社名3", title: "下払先3", dataIndex: "下払会社名3", align: "center" },
    { 
      key: "売上3", 
      title: "売上3", 
      dataIndex: "売上3", 
      align: "center",
      render: (text, record) => {
        const 基本料金3 = record.下払料金3 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const その他費用3 = record.下払その他費用3 || 0;
        return 基本料金3 + 軸料金1 + その他費用3;
      } 
    },
    { key: "下払料金3", title: "運送原価3", dataIndex: "下払料金3", align: "center" },
    { key: "下払その他費用3", title: "その他原価3", dataIndex: "下払その他費用3", align: "center" },
    { key: "原価3", 
      title: "原価3", 
      dataIndex: "原価3", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金3 = record.下払料金3 || 0;
        const その他費用3 = record.下払その他費用3 || 0;
        return 基本料金3 + その他費用3;
      }
    },
    { key: "粗利3", 
      title: "粗利3", 
      dataIndex: "粗利3", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金3 = record.下払料金3 || 0;
        const その他費用3 = record.下払その他費用3 || 0;
        return 基本料金 + その他費用 + 軸料金1 - (基本料金3 + その他費用3);
      }
    },
    { 
      key: "粗利率3", 
      title: "粗利率3", 
      dataIndex: "粗利率3", 
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金3 = record.下払料金3 || 0;
        const その他費用3 = record.下払その他費用3 || 0;
        const 粗利率 = ((基本料金 + その他費用 + 軸料金1 - (基本料金3 + その他費用3)) / (基本料金 + その他費用 + 軸料金1)) * 100;
        if (isNaN(粗利率) || !isFinite(粗利率)) return 0;
        return Number(粗利率.toFixed(2));
      }
    },

    { key: "自社乗務員4", title: "運転者名4", dataIndex: "自社乗務員4", align: "center" },
    { key: "下払会社名4", title: "下払先4", dataIndex: "下払会社名4", align: "center" },
    { 
      key: "売上4", 
      title: "売上4", 
      dataIndex: "売上4", 
      align: "center",
      render: (text, record) => {
        const 基本料金4 = record.下払料金4 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const その他費用4 = record.下払その他費用4 || 0;
        return 基本料金4 + 軸料金1 + その他費用4;
      } 
    },
    { key: "下払料金4", title: "運送原価4", dataIndex: "下払料金4", align: "center" },
    { key: "下払その他費用4", title: "その他原価4", dataIndex: "下払その他費用4", align: "center" },
    { key: "原価4", 
      title: "原価4", 
      dataIndex: "原価4", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金4 = record.下払料金4 || 0;
        const その他費用4 = record.下払その他費用4 || 0;
        return 基本料金4 + その他費用4;
      }
    },
    { key: 
      "粗利4", 
      title: "粗利4", 
      dataIndex: "粗利4", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金4 = record.下払料金4 || 0;
        const その他費用4 = record.下払その他費用4 || 0;
        return 基本料金 + その他費用 + 軸料金1 - (基本料金4 + その他費用4);
      }
    },
    { 
      key: "粗利率4", 
      title: "粗利率4", 
      dataIndex: "粗利率4", 
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金4 = record.下払料金4 || 0;
        const その他費用4 = record.下払その他費用4 || 0;
        const 粗利率 = ((基本料金 + その他費用 + 軸料金1 - (基本料金4 + その他費用4)) / (基本料金 + その他費用 + 軸料金1)) * 100;
        if (isNaN(粗利率) || !isFinite(粗利率)) return 0;
        return Number(粗利率.toFixed(2));
      }
    },


    { key: "自社乗務員5", title: "運転者名5", dataIndex: "自社乗務員5", align: "center" },
    { key: "下払会社名5", title: "下払先5", dataIndex: "下払会社名5", align: "center" },
    { 
      key: "売上5", 
      title: "売上5", 
      dataIndex: "売上5", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金5 = record.下払料金5 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const その他費用5 = record.下払その他費用5 || 0;
        return 基本料金5 + 軸料金1 + その他費用5;
      } 
    },
    { key: "下払料金5", title: "運送原価5", dataIndex: "下払料金5", align: "center" },
    { key: "下払その他費用5", title: "その他原価5", dataIndex: "下払その他費用5", align: "center" },
    { key: "原価5", 
      title: "原価5", 
      dataIndex: "原価5", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金5 = record.下払料金5 || 0;
        const その他費用5 = record.下払その他費用5 || 0;
        return 基本料金5 + その他費用5;
      }
    },
    { key: 
      "粗利5", 
      title: "粗利5", 
      dataIndex: "粗利5", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金5 = record.下払料金5 || 0;
        const その他費用5 = record.下払その他費用5 || 0;
        return 基本料金 + その他費用 + 軸料金1 - (基本料金5 + その他費用5);
      }
    },
    { 
      key: "粗利率5", 
      title: "粗利率5", 
      dataIndex: "粗利率5", 
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金5 = record.下払料金5 || 0;
        const その他費用5 = record.下払その他費用5 || 0;
        const 粗利率 = ((基本料金 + その他費用 + 軸料金1 - (基本料金5 + その他費用5)) / (基本料金 + その他費用 + 軸料金1)) * 100;
        if (isNaN(粗利率) || !isFinite(粗利率)) return 0;
        return Number(粗利率.toFixed(2));
      }
    },

    { key: "自社乗務員6", title: "運転者名6", dataIndex: "自社乗務員6", align: "center" },
    { key: "下払会社名6", title: "下払先6", dataIndex: "下払会社名6", align: "center" },
    { 
      key: "売上6", 
      title: "売上6", 
      dataIndex: "売上6", 
      align: "center",
      render: (text, record) => {
        const 基本料金6 = record.下払料金6 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const その他費用6 = record.下払その他費用6 || 0;
        return 基本料金6 + 軸料金1 + その他費用6;
      } 
    },
    { key: "下払料金6", title: "運送原価6", dataIndex: "下払料金6", align: "center" },
    { key: "下払その他費用6", title: "その他原価6", dataIndex: "下払その他費用6", align: "center" },
    { key: "原価6", 
      title: "原価6", 
      dataIndex: "原価6", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金6 = record.下払料金6 || 0;
        const その他費用6 = record.下払その他費用6 || 0;
        return 基本料金6 + その他費用6;
      }
    },
    { key: 
      "粗利6", 
      title: "粗利6", 
      dataIndex: "粗利6", 
      align: "center" ,
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金6 = record.下払料金6 || 0;
        const その他費用6 = record.下払その他費用6 || 0;
        return 基本料金 + その他費用 + 軸料金1 - (基本料金6 + その他費用6);
      }
    },
    { 
      key: "粗利率6", 
      title: "粗利率6", 
      dataIndex: "粗利率6", 
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const その他費用 = record.その他費用 || 0;
        const 軸料金1 = record["3軸料金1"] || 0;
        const 基本料金6 = record.下払料金6 || 0;
        const その他費用6 = record.下払その他費用6 || 0;
        const 粗利率 = ((基本料金 + その他費用 + 軸料金1 - (基本料金6 + その他費用6)) / (基本料金 + その他費用 + 軸料金1)) * 100;
        if (isNaN(粗利率) || !isFinite(粗利率)) return 0;
        return Number(粗利率.toFixed(2));
      }
    },
    {
      key: "消費税U",
      title: "消費税U",
      dataIndex: "消費税U",
      align: "center",
      render: (text, record) => {
        const 基本料金 = record.基本料金1 || 0;
        const 軸料金 = record["3軸料金1"] || 0;
        const その他費用 = record.その他費用 || 0;
        return (基本料金 + 軸料金 + その他費用) * 0.1;
      }
    },
    { 
      key: "消費税G1", 
      title: "消費税G1", 
      dataIndex: "消費税G1", 
      align: "center", 
      render: (text, record) => {
        const 基本料金1 = record.下払料金1 || 0;
        const その他費用1 = record.下払その他費用1 || 0;
        return (基本料金1 + その他費用1) * 0.1;
      }
    },
    { 
      key: "消費税G2", 
      title: "消費税G2", 
      dataIndex: "消費税G2", 
      align: "center", 
      render: (text, record) => {
        const 基本料金2 = record.下払料金2 || 0;
        const その他費用2 = record.下払その他費用2 || 0;
        return (基本料金2 + その他費用2) * 0.1;
      }
    },
    { 
      key: "消費税G3", 
      title: "消費税G3", 
      dataIndex: "消費税G3", 
      align: "center", 
      render: (text, record) => {
        const 基本料金3 = record.下払料金3 || 0;
        const その他費用3 = record.下払その他費用3 || 0;
        return (基本料金3 + その他費用3) * 0.1;
      }
    },
    { 
      key: "消費税G4", 
      title: "消費税G4", 
      dataIndex: "消費税G4", 
      align: "center", 
      render: (text, record) => {
        const 基本料金4 = record.下払料金4 || 0;
        const その他費用4 = record.下払その他費用4 || 0;
        return (基本料金4 + その他費用4) * 0.1;
      }
    },
    { 
      key: "消費税G5", 
      title: "消費税G5", 
      dataIndex: "消費税G5", 
      align: "center", 
      render: (text, record) => {
        const 基本料金5 = record.下払料金5 || 0;
        const その他費用5 = record.下払その他費用5 || 0;
        return (基本料金5 + その他費用5) * 0.1;
      }
    },
    { 
      key: "消費税G6", 
      title: "消費税G6", 
      dataIndex: "消費税G6", 
      align: "center", 
      render: (text, record) => {
        const 基本料金6 = record.下払料金6 || 0;
        const その他費用6 = record.下払その他費用6 || 0;
        return (基本料金6 + その他費用6) * 0.1;
      }
    },
    { key: "区分", title: "区分", dataIndex: "区分", align: "center" },














    // {
    //   key: "荷主名",
    //   title: "荷主名",
    //   dataIndex: "荷主名",
    //   align: "center",
    //   sorter: function (a, b) {
    //     return b.荷主名.localeCompare(a.荷主名);
    //   },
    // },
    
    // { key: "配達先", title: "配達先", dataIndex: "配達先", align: "center" },
    // {
    //   key: "配達先住所",
    //   title: "配達先住所",
    //   dataIndex: "配達先住所",
    //   align: "center",
    // },
    // {
    //   key: "配達先TEL",
    //   title: "配達先TEL",
    //   dataIndex: "配達先TEL",
    //   align: "center",
    // },
    // {
    //   key: "配達先担当者",
    //   title: "配達先担当者",
    //   dataIndex: "配達先担当者",
    //   align: "center",
    // },
    
    // { key: "船社", title: "船社", dataIndex: "船社", align: "center" },
    // {
    //   key: "コンテナタイプ",
    //   title: "コンテナタイプ",
    //   dataIndex: "コンテナタイプ",
    //   align: "center",
    // },
    
   
    // { key: "危険品", title: "危険品", dataIndex: "危険品", align: "center" },
    // { key: "軸数", title: "軸数", dataIndex: "軸数", align: "center" },
   
    // {
    //   key: "シール番号",
    //   title: "シール番号",
    //   dataIndex: "シール番号",
    //   align: "center",
    // },
    // { key: "TW", title: "TW", dataIndex: "TW", align: "center" },
    // { key: "BL№", title: "BL№", dataIndex: "BL№", align: "center" },
    // {
    //   key: "依頼書備考欄",
    //   title: "依頼書備考欄",
    //   dataIndex: "依頼書備考欄",
    //   align: "center",
    // },
    // {
    //   key: "ピック日",
    //   title: "ピック日",
    //   dataIndex: "ピック日",
    //   align: "center",
    // },
    // { key: "配送日", title: "配送日", dataIndex: "配送日", align: "center" },
    // {
    //   key: "配送時間",
    //   title: "配送時間",
    //   dataIndex: "配送時間",
    //   align: "center",
    // },
    // {
    //   key: "倉庫作業日",
    //   title: "倉庫作業日",
    //   dataIndex: "倉庫作業日",
    //   align: "center",
    // },
    // {
    //   key: "倉庫作業時間",
    //   title: "倉庫作業時間",
    //   dataIndex: "倉庫作業時間",
    //   align: "center",
    // },
    // {
    //   key: "自社車番F1",
    //   title: "自社車番",
    //   dataIndex: "自社車番F1",
    //   align: "center",
    // },
    // {
    //   key: "自社シャーシ",
    //   title: "自社シャーシ",
    //   dataIndex: "自社シャーシ",
    //   align: "center",
    // },
    // {
    //   key: "自社乗務員",
    //   title: "自社乗務員",
    //   dataIndex: "自社乗務員",
    //   align: "center",
    // },
    // {
    //   key: "協力会社名",
    //   title: "協力会社名",
    //   dataIndex: "協力会社名",
    //   align: "center",
    // },
    // {
    //   key: "輸送料金",
    //   title: "輸送料金",
    //   dataIndex: "輸送料金",
    //   align: "center",
    // },
    // {
    //   key: "輸送課税",
    //   title: "輸送課税",
    //   dataIndex: "輸送課税",
    //   align: "center",
    // },
    // {
    //   key: "下払会社名1",
    //   title: "下払会社名1",
    //   dataIndex: "下払会社名1",
    //   align: "center",
    // },
    // {
    //   key: "下払料金1",
    //   title: "下払料金1",
    //   dataIndex: "下払料金1",
    //   align: "center",
    // },
    // {
    //   key: "下払課税1",
    //   title: "下払課税1",
    //   dataIndex: "下払課税1",
    //   align: "center",
    // },
    // {
    //   key: "下払自車1",
    //   title: "下払自車1",
    //   dataIndex: "下払自車1",
    //   align: "center",
    // },
    // {
    //   key: "下払会社名2",
    //   title: "下払会社名2",
    //   dataIndex: "下払会社名2",
    //   align: "center",
    // },
    // {
    //   key: "下払料金2",
    //   title: "下払料金2",
    //   dataIndex: "下払料金2",
    //   align: "center",
    // },
    // {
    //   key: "下払課税2",
    //   title: "下払課税2",
    //   dataIndex: "下払課税2",
    //   align: "center",
    // },
    // {
    //   key: "下払自車2",
    //   title: "下払自車2",
    //   dataIndex: "下払自車2",
    //   align: "center",
    // },
    // {
    //   key: "下払会社名3",
    //   title: "下払会社名3",
    //   dataIndex: "下払会社名3",
    //   align: "center",
    // },
    // {
    //   key: "下払料金3",
    //   title: "下払料金3",
    //   dataIndex: "下払料金3",
    //   align: "center",
    // },
    // {
    //   key: "下払課税3",
    //   title: "下払課税3",
    //   dataIndex: "下払課税3",
    //   align: "center",
    // },
    // {
    //   key: "下払自車3",
    //   title: "下払自車3",
    //   dataIndex: "下払自車3",
    //   align: "center",
    // },
    // {
    //   key: "下払会社名4",
    //   title: "下払会社名4",
    //   dataIndex: "下払会社名4",
    //   align: "center",
    // },
    // {
    //   key: "下払料金4",
    //   title: "下払料金4",
    //   dataIndex: "下払料金4",
    //   align: "center",
    // },
    // {
    //   key: "下払課税4",
    //   title: "下払課税4",
    //   dataIndex: "下払課税4",
    //   align: "center",
    // },
    // {
    //   key: "下払自車4",
    //   title: "下払自車4",
    //   dataIndex: "下払自車4",
    //   align: "center",
    // },
    // {
    //   key: "下払会社名5",
    //   title: "下払会社名5",
    //   dataIndex: "下払会社名5",
    //   align: "center",
    // },
    // {
    //   key: "下払料金5",
    //   title: "下払料金5",
    //   dataIndex: "下払料金5",
    //   align: "center",
    // },
    // {
    //   key: "下払課税5",
    //   title: "下払課税5",
    //   dataIndex: "下払課税5",
    //   align: "center",
    // },
    // {
    //   key: "下払自車5",
    //   title: "下払自車5",
    //   dataIndex: "下払自車5",
    //   align: "center",
    // },
    // {
    //   key: "下払会社名6",
    //   title: "下払会社名6",
    //   dataIndex: "下払会社名6",
    //   align: "center",
    // },
    // {
    //   key: "下払料金6",
    //   title: "下払料金6",
    //   dataIndex: "下払料金6",
    //   align: "center",
    // },
    // {
    //   key: "下払課税6",
    //   title: "下払課税6",
    //   dataIndex: "下払課税6",
    //   align: "center",
    // },
    // {
    //   key: "下払自車6",
    //   title: "下払自車6",
    //   dataIndex: "下払自車6",
    //   align: "center",
    // },
    // { key: "空冷", title: "空冷", dataIndex: "空冷", align: "center" },
  ];

  return (
    <>
      <div className="flex flex-col gap-0">
        <Title level={3}>DBデータ</Title>
        <DatePicker
          defaultValue={dayjs(date)}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className=""
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <CTable
            dataSource={filteredData} // Use the filtered data
            columns={columns}
            scroll={{ x: "max-content" }}
            ps={10}
            className="w-full h-full"
            rowKey="id" // Ensure each row has a unique key
          />
        )}
      </div>
    </>
  );
};

export default DBPage;
