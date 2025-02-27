import React from "react";
import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const TransportCompanyRequestPage = () => {

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_API_BASE_URL}/orderlist`,
      );
      setAllData(response.data);
      console.log(allData)
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

  const columns = [
    {
      title: "配送日",
      dataIndex: "配達日1",
      key: "deliveryDate",
      align: "center",
      render: (text, record) => {
        if (record.配達日1) {
          return dayjs(record.配達日1).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "ピック日",
      dataIndex: "createdAt",
      key: "pickDate",
      align: "center",
      render: (text, record) => {
        if (record.createdAt) {
          return dayjs(record.createdAt).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "時間",
      dataIndex: "配達時間1",
      key: "time",
      align: "center",
    },
    {
      title: "コンテナ種類",
      dataIndex: "コンテナサイズ",
      key: "containerType",
      align: "center",
    },
    {
      title: "軸数",
      dataIndex: "3軸数",
      key: "axisCount",
      align: "center",
      render: (value) => (value ? "3" : ""),
    },
    {
      title: "MG有無",
      dataIndex: "コンテナタイプ",
      key: "mgPresence",
      align: "center",
    },
    {
      title: "BOOKING NO.",
      dataIndex: "BKNo",
      key: "bookingNo",
      align: "center",
    },
    {
      title: "コンテナNo.",
      dataIndex: "コンテナNo",
      key: "containerNo",
      align: "center",
    },
    {
      title: "備考",
      dataIndex: "remarks",
      key: "remarks",
      align: "center",
    },
    {
      title: "依頼日",
      dataIndex: "積日1",
      key: "requestDate",
      align: "center",
      render: (text, record) => {
        if (record.積日1) {
          return dayjs(record.積日1).format("YYYY-MM-DD");
        }
      },
    },
  ];

  const data = [
    {
      key: "1",
      deliveryDate: "7月11日",
      pickDate: "7月15日",
      time: "9:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234567",
      containerNo: "AIHI1234567",
      remarks: "",
      requestDate: "7月15日",
      isUpdated: true,
    },
    {
      key: "2",
      deliveryDate: "9月13日",
      pickDate: "9月15日",
      time: "10:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234568",
      containerNo: "AIHI1234568",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "3",
      deliveryDate: "9月14日",
      pickDate: "9月15日",
      time: "11:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234569",
      containerNo: "AIHI1234569",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "4",
      deliveryDate: "9月15日",
      pickDate: "9月15日",
      time: "12:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234570",
      containerNo: "AIHI1234570",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "5",
      deliveryDate: "9月16日",
      pickDate: "9月15日",
      time: "13:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234571",
      containerNo: "AIHI1234571",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "6",
      deliveryDate: "9月16日",
      pickDate: "9月15日",
      time: "16:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234574",
      containerNo: "AIHI1234574",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
      isNew: true,
    },
    {
      key: "7",
      deliveryDate: "9月16日",
      pickDate: "9月15日",
      time: "17:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234575",
      containerNo: "AIHI1234575",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
      isNew: true,
    },
  ];

  const getRowClassName = (record) => {
    const updatedDate = moment("2024-08-31", "YYYY-MM-DD").format("YYYY-MM-DD");

    const recordDeliveryDate = moment(record.deliveryDate, "M月D日").format(
      "YYYY-MM-DD",
    );

    if (record.isNew) {
      return "bg-yellow-600";
    }

    if (moment(recordDeliveryDate).isBefore(updatedDate)) {
      return "bg-gray-500";
    }

    return "";
  };

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={false}
      rowClassName={getRowClassName}
    />
  );
};

export default TransportCompanyRequestPage;
