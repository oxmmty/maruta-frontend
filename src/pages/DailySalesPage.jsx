import { useState, useEffect } from "react";

import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Table, Typography } from "antd";

const DailySalesPage = () => {
  const [date, setDate] = useState(dayjs());
  const [dataSource, setDataSource] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const headColumn = [
    {
      title: "請求日",
      dataIndex: "date",
      align: "center",
      key: "配達日",
    },
    {
      title: "顧客名",
      dataIndex: "companyName",
      align: "center",
      key: "顧客名",
    },
  ];
  const tailColumns = [
    {
      title: "売上合計",
      dataIndex: "grandTotal",
      align: "center",
      key: "売上合計",
      sorter: (a, b) => a.grandTotal - b.grandTotal,
    },
    {
      title: "AVERAGE",
      dataIndex: "average",
      align: "center",
      key: "AVERAGE",
      sorter: (a, b) => a.average - b.average,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        month: moment(date).format("YYYY-MM"),
      };

      const res = await axios.get("/order-daily-sales", { params });
      let bodyColumn = [];
      if (res.data.columnData?.length > 0) {
        const childrenColumns = res.data.columnData?.map((item, key) => ({
          title: `${key + 1}`,
          children: [
            {
              dataIndex: item._id,
              title: item._id,
              key: key,
            },
          ],
        }));

        const workFeeColumn = {
          title: "",
          children: childrenColumns,
        };

        setTableColumns([...headColumn, workFeeColumn, ...tailColumns]);
      }
      setDataSource(res.data.result);
    };
    fetchData();
  }, [date]);

  const handleDateChange = (dateValue, dateString) => {
    setDate(dateString); // Set the selected date
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="sm:flex-row justify-evenly w-full">
        <Typography className="ml-10 mt-5 justify-center">
          <DatePicker
            picker="month"
            defaultValue={dayjs(date, "YYYY-MM")}
            onChange={handleDateChange}
          />
        </Typography>
      </div>

      <div className="w-full p-3 pr-3">
        <Table
          dataSource={dataSource}
          columns={tableColumns}
          scroll={{ x: "max-content" }}
          size="small"
          className="table-fixed"
          pagination={{ pageSize: 32, position: ["bottomCenter"] }}
        />
      </div>
    </div>
  );
};

export default DailySalesPage;
