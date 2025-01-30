import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Table, Typography } from "antd";

const MonthlySalesPage = () => {
  const [date, setDate] = useState(dayjs());
  const [dataSource, setDataSource] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [plSource, setPlSource] = useState([]);
  const [expressSource, setExpressSource] = useState([]);
  const headColumn = [
    {
      title: "顧客名",
      dataIndex: "clientName",
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
    {
      title: "売上高",
      dataIndex: "",
      align: "center",
      key: "",
    },
    {
      title: "構成比",
      dataIndex: "",
      align: "center",
      key: "",
    },
    {
      title: "本数",
      dataIndex: "",
      align: "center",
      key: "",
    },
    {
      title: "構成比",
      dataIndex: "",
      align: "center",
      key: "",
    },
    {
      title: "1本単価",
      dataIndex: "",
      align: "center",
      key: "",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        month: moment(date).format("YYYY-M"),
        accountYear: moment(date).format("YYYY"),
        accountMonth: moment(date).format("MM"),
      };
      const res = await axios.get("/order-monthly-sales", { params });
      const resPL = await axios.get("/account/filter", { params });
      const resPLData = await axios.get("/accountpl", { params });
      const expresswayFeeData = await axios.get("/order-filterFee", { params });

      const filteredAccountData = resPLData.data.filter(
        (item) =>
          item.accountYear === params.accountYear &&
          item.accountMonth === params.accountMonth
      );
      const filteredExpresswayFeeData = expresswayFeeData.data.filter(
        (item) => {
          const deliveryDate = moment(item.配達日1);
          const formattedDeliveryMonth = deliveryDate.format("YYYY-M");
          return formattedDeliveryMonth === params.month;
        }
      );
      console.log("filteredExpresswayFeeData", filteredExpresswayFeeData);
      if (res.data.columnData?.length > 0) {
        const childrenColumns = res.data.columnData.map((item, key) => ({
          title: `${key + 1}`,
          children: [
            {
              title: item._id,
              dataIndex: item._id,
              key: item._id,
            },
          ],
        }));
        setTableColumns([...headColumn, ...childrenColumns, ...tailColumns]);
      }
      const childKeys = res.data.columnData.map((item) => item._id);

      const accountSources = resPL.data.map((account) => {
        const matchedAccount = filteredAccountData.find(
          (item) => item.accountList === account
        );
        return {
          clientName: account,
          grandTotal: matchedAccount.accountAmount,
          average: (matchedAccount.accountAmount / childKeys.length).toFixed(0),
          ...childKeys.reduce(
            (acc, key) => ({
              ...acc,
              [key]: (matchedAccount.accountAmount / childKeys.length).toFixed(
                0
              ),
            }),
            {}
          ),
        };
      });
      const grandTotal = filteredExpresswayFeeData.reduce((total, item) => {
        return total + (item["下払高速費1"] || 0); 
      }, 0);
      const average = (grandTotal/childKeys.length).toFixed(0)

      const expresswayFeeSources = [
        {
          clientName: "旅費交通費",
          grandTotal: grandTotal,
          average: average,

          ...childKeys.reduce((total, key) => {
            const items = filteredExpresswayFeeData.filter(
              (e) => e["自社車番F1"] === key
            );
            let value = 0;
            items.forEach((e) => {
              value += e["下払高速費1"] || 0;
            });
            console.log({ items });
            return { ...total, [key]: value || 0 };
          }, {}),
        },
      ];

      setDataSource(res.data.result); 
      setPlSource(accountSources);
      setExpressSource(expresswayFeeSources);
    };

    fetchData();
  }, [date]);

  const handleDateChange = (dateValue, dateString) => {
    setDate(dateString);
  };

  const combinedDataSource = [...dataSource, ...plSource, ...expressSource];

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

      <div className="w-full">
        <Table
          dataSource={combinedDataSource}
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

export default MonthlySalesPage;


