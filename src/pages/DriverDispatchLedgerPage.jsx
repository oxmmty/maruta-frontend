import { Button, DatePicker, Table, Typography, Checkbox , } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
const { Title, Text } = Typography;
  const DriverDispatchLedgerPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);

  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "税区分",
      dataIndex: "基本課税1",
      key: "基本課税1",
      align: "center",
      render: (text, record) => {
        return record.基本課税1 ? "課税" : "免税";
      },
    },
    {
      title: "得意先",
      dataIndex: "顧客名",
      key: "顧客名",
      align: "center",
    },
    {
      title:"種類",
      dataIndex:"コンテナ種類",
      key:"コンテナ種類",
      align:"center",
    },
    {
      title: "REF NO",
      dataIndex: "識別コード",
      key: "識別コード",
      align: "center",
      sorter: (a, b) => b.識別コード.localeCompare(a.識別コード),
    },
    {
      title: "コンテナ番号",
      dataIndex: "コンテナNo",
      key: "コンテナNo",
      align: "center",
    },
    {
      title: "搬出先",
      dataIndex: "搬入返却場所",
      key: "搬入返却場所",
      align: "center",
    },
    {
      title:"作業場所",
      dataIndex:"取場所",
      key:"取場所",
      align:"center",
    },
    {
      title: "作業日",
      dataIndex: "配達日1",
      align: "center",
      key: "配達日1",
      sorter: (a, b) => b.配達日1.localeCompare(a.配達日1),
      render: (text, record) => dayjs(record.配達日1).format("YYYY-MM-DD"),
    },
    {
      title: "搬入先",
      dataIndex: "搬入返却場所",
      key: "搬入返却場所",
      align: "center",
    },
    {
      title: "軸数",
      dataIndex: "軸3",
      key: "軸3",
      align: "center",
      render: (text, record) => (record.軸3 ? "軸3" : ""),
    },
    {
      title: "20F",
      dataIndex: "コンテナサイズ",
      key: "コンテナサイズ",
      align: "center",
      render: (text, record) => (record.コンテナサイズ === "20" ? "1" : ""),
    },
    {
      title: "40F",
      dataIndex: "コンテナサイズ",
      key: "コンテナサイズ",
      align: "center",
      render: (text, record) => (record.コンテナサイズ === "40" ? "1" : ""),
    },
    {
      title: "運転者名",
      dataIndex: "自社乗務員1",
      key: "自社乗務員1",
      align: "center",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/orderlist");
        console.log("now" , res.data);
        const data = res.data.sort((a, b) => b.識別コード - a.識別コード);
        setDatas(data);
        filterData(dayjs().format("YYYY-MM-DD"), data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterData = (selectedDate, dataToFilter) => {
    const filtered = dataToFilter.filter((item) => {
      const invoiceDate = dayjs(item.配達日1).format("YYYY-MM-DD");
      return invoiceDate === selectedDate;
    });
    setFilteredDatas(filtered);
  };

  // const handleDateChange = (date, dateString) => {
  //   setDate(dateString);
  //   filterData(dateString, datas);
  // };


  
  const handleDateChange = (dateValue, dateString) => {
    if (dateValue) {
      setDate(dateValue); // Set the selected date
      filterData(dateValue.format("YYYY-MM-DD"), datas); // Filter based on selected date
    } else {
      setDate(dayjs()); // Reset to today's date if cleared
      setFilteredDatas(datas); // Show all data if no date is selected
    }
  };



  return (
    <div className="flex flex-col items-center gap-4">
      <div className="sm:flex-row justify-evenly w-full">
        <Typography className="flex items-center ml-10 mt-5 justify-left">
        <Title level={5} className="mt-2">作業日：</Title>
          <DatePicker
            picker="date"
            value={dayjs(date, "YYYY-MM-DD")}
            onChange={handleDateChange}
          />
        </Typography>
      </div>
      <div className="w-full">
        <Table
          dataSource={filteredDatas} // Corrected here
          columns={columns}
          scroll={{ x: "max-content" }}
          size="small"
          className="table-fixed"
          pagination={{ pageSize: 14, position: ["bottomCenter"] }}
        />
      </div>
    </div>
  );
};

export default DriverDispatchLedgerPage;
