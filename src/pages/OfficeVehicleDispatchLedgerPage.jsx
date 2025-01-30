import { Button, DatePicker, Table, Typography, Checkbox } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const { Text , Title} = Typography;

const OfficeVehicleDispatchLedgerPage = () => {
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
      title: "担当",
      dataIndex: "自社乗務員1",
      key: "自社乗務員1",
      align: "center",
    },
    {
      title: "REF NO",
      dataIndex: "識別コード",
      key: "識別コード",
      align: "center",
      sorter: function (a, b) {
        return b.識別コード.localeCompare(a.識別コード);
      },
    },
    {
      title: "本船名",
      dataIndex: "船名",
      key: "船名",
      align: "center",
    },
    {
      title: "BL(BOOKING)No",
      dataIndex: "BLNo",
      key: "BLNo",
      align: "center",
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
      title: "作業場所",
      dataIndex: "取場所",
      key: "取場所",
      align: "center",
    },
    {
      title: "作業日",
      dataIndex: "配達日1",
      align: "center",
      key: "配達日1",
      sorter: function (a, b) {
        return b.配達日1.localeCompare(a.配達日1);
      },
      render:(text, record)=>{
        console.log("kkkk" , record);
        return(dayjs(record.配達日1).format("YYYY-MM-DD"))
      }
    },
    {
      title: "搬入先",
      dataIndex: "搬入返却場所",
      key: "搬入返却場所",
      align: "center",
    },
    {
      title: "台貫",
      dataIndex: "重量",
      key: "重量",
      align: "center",
    },
    {
      title: "軸数",
      dataIndex: "軸3",
      key: "軸3",
      align: "center",
      render: (text, record) => {
        if (record.軸3 == true) {
          return "軸3";
        } else if (record.軸3 == false) {
          return "";
        }
      },
    },
    {
      title: "サイズ",
      dataIndex: "コンテナサイズ",
      key: "コンテナサイズ",
      align: "center",
      render: (text, record) => {
        if (record.コンテナサイズ == "40") {
          return "40F";
        } else if (record.コンテナサイズ == "20") {
          return "20F";
        }
      },
    },
    {
      title: "作業料金",
      children: [
        {
          title: '受注金額',
          dataIndex: '基本料金1',
          key: '基本料金1',
        },
        {
          title: '搬出',
          dataIndex: '',
          key: '',
        },
        {
          title: '輸送',
          dataIndex: '',
          key: '',
        },
        {
          title: '作業',
          dataIndex: '',
          key: '',
        },
        {
          title: '作業',
          dataIndex: '',
          key: '',
        },
        {
          title: '輸送',
          dataIndex: '',
          key: '',
        },
        {
          title: '搬入',
          dataIndex: '',
          key: '',
        },
      ],
      
    },
    {
      title: "備考",
      dataIndex: "",
      key: "",
      align: "center",
    },
  ];
      
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/orderlist");
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

  const handleDateChange = (dateValue, dateString) => {
    if (dateValue) {
      setDate(dateValue); // Set the selected date
      filterData(dateValue.format("YYYY-MM"), datas); // Filter based on selected date
    } else {
      setDate(dayjs()); // Reset to today's date if cleared
      setFilteredDatas(datas); // Show all data if no date is selected
    }
  };

  

  const handleCheckboxChange = async (e, record) => {
    const newValue = e.target.checked;

    try {
      await axios.put(`/orderlist/${record._id}`, {
        支払い確認: newValue,
      });

      setDatas((prevDatas) =>
        prevDatas
          .map((data) =>
            data._id === record._id ? { ...data, 支払い確認: newValue } : data
          )
          .sort((a, b) => b.識別コード - a.識別コード)
      );
    } catch (error) {
      console.error("Error updating payment confirmation:", error);
    }
  };

  return (
    <div className="items-center gap-4 p-2">
      <div className="flex justify-between md:flex-row flex-col">
        <div className="mt-5 pl-5 sm:flex-row justify-start w-[300px] flex">
          <Title level={5} className="mt-1">作業日</Title>
          <Typography className="ml-5 justify-center">
            <DatePicker
              picker="date"
              defaultValue={dayjs().format("YYYY-MM-DD")}
              value={dayjs(date, "YYYY-MM-DD")}
              onChange={handleDateChange}
              allowClear
            />
          </Typography>
        </div>
        <table className=" border-collapse border mt-3 h-[50px]">
          <thead>
            <tr>
              <th className="border px-4 py-1">サイズ</th>
              <th className="border px-4 py-1">20F</th>
              <th className="border px-4 py-1">40F</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-1">受注件数</td>
              <td className="border px-4 py-1">
                {filteredDatas.filter(data => data.コンテナサイズ === "20").length}
              </td>
              <td className="border px-4 py-1">
                {filteredDatas.filter(data => data.コンテナサイズ === "40").length}
              </td>
            </tr>
          </tbody>
        </table>
        <table className=" border-collapse border mt-3 h-[50px]">
          <thead>
            <tr>
              <th className="border px-4 py-1">搬出①</th>
              <th className="border px-4 py-1">輸送②</th>
              <th className="border px-4 py-1">作業③</th>
              <th className="border px-4 py-1">作業④</th>
              <th className="border px-4 py-1">輸送⑤</th>
              <th className="border px-4 py-1">搬入⑥</th>
              <th className="border px-4 py-1">合計</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-1">
                3000
              </td>
              <td className="border px-4 py-1">
                4000
              </td>
              <td className="border px-4 py-1">
                4000
              </td>
              <td className="border px-4 py-1">
                4000
              </td>
              <td className="border px-4 py-1">
                4000
              </td>
              <td className="border px-4 py-1">
                4000
              </td>
              <td className="border px-4 py-1">
                17000
              </td>
            </tr>
          </tbody>
        </table>
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
  
  export default OfficeVehicleDispatchLedgerPage;
  

