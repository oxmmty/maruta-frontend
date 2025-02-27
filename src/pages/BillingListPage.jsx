import { Button, Checkbox, DatePicker, Form, Select, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming react-router-dom is used for navigation
import CTable from "src/components/CTable";

const BillingListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]); // State for storing selected rows
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterState ,setFilterState] = useState("");

  const navigate = useNavigate(); // Navigation hook

  const columns = [
    {
      title: "選択",
      key: "select",
      align: "center",
      render: (_, record) =>
        record.delete == true ? (
          <Checkbox
            
            checked={selectedRows.includes(record.識別コード)}
            onChange={(e) =>
              handleRowSelection(e.target.checked, record.識別コード)
            }
          />
        ) : (
          <Checkbox
            checked={selectedRows.includes(record.識別コード)}
            onChange={(e) =>
              handleRowSelection(e.target.checked, record.識別コード)
            }
          />
        ),
    },
    {
      title: "受注コード",
      dataIndex: "識別コード",
      key: "識別コード",
      align: "center",
    },
    {
      title: "日付",
      dataIndex: "配達日1",
      key: "配達日1",
      align: "center",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "顧客名",
      dataIndex: "顧客名",
      key: "顧客名",
      align: "center",
    },
    {
      title: "発行",
      dataIndex: "delete",
      key:" delete",
      align: "center",
      render: (text, record) => (
        <input
          type="checkbox"
          checked={record.delete==true}
          
        />
      ),
    },
    {
      title: "積地",
      dataIndex: "取場所",
      key: "取場所",
      align: "center",
    },
    {
      title: "配達先",
      dataIndex: "配達先1",
      key: "配達先1",
      align: "center",
    },
    {
      title: "船社",
      dataIndex: "船社B",
      key: "船社B",
      align: "center",
    },
    {
      title: "下払会社1",
      dataIndex: "下払会社名1",
      key: "下払会社名1",
      align: "center",
    },
    {
      title: "下払会社2",
      dataIndex: "下払会社名2",
      key: "下払会社名2",
      align: "center",
    },
    {
      title: "下払会社3",
      dataIndex: "下払会社名3",
      key: "下払会社名3",
      align: "center",
    },
    {
      title: "下払会社4",
      dataIndex: "下払会社名4",
      key: "下払会社名4",
      align: "center",
    },
    {
      title: "下払会社5",
      dataIndex: "下払会社名5",
      key: "下払会社名5",
      align: "center",
    },
    {
      title: "下払会社6",
      dataIndex: "下払会社名6",
      key: "下払会社名6",
      align: "center",
    },
    {
      title: "保管場所",
      dataIndex: "保管場所",
      key: "保管場所",
      align: "center",
    },
    {
      title: "請求書作成日",
      dataIndex: "請求書作成日",
      key: "請求書作成日",
      align: "center",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/orderlist");
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesDate = filterDate
      ? dayjs(item.配達日1).format("YYYY-MM") === filterDate.format("YYYY-MM")
      : true;
    const matchesCompany = filterCompany
      ? item.顧客名.includes(filterCompany)
      : true;
    const matchesStatus =
      filterState === "すべて"
        ? true
        : filterState === "請求済"
        ? item.delete === true
        : filterState === "未請求"
        ? item.delete === false
        : true; // Default to true for unhandled cases
  
    return matchesDate && matchesCompany && matchesStatus;
      
  });

  const handleRowSelection = (isSelected, code) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, code]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== code));
    }
  };

  const handleCreateButton = () => {
    if (selectedRows.length > 0) {
      navigate("/orders_invoices/invoice", { state: { data: selectedRows } });
      // navigate("/orders_invoices/invoiceGulf", { state: { data: selectedRows } });
    } else {
      alert("Please select at least one row.");
    }
  };


  const handleMultiSelectionButton = () => {
    if (filterCompany) {
      const matchingRows = filteredData
        .filter((item) => item.顧客名 === filterCompany )
        .map((item) => item.識別コード);
  
        
      const allSelected = matchingRows.every((id) => selectedRows.includes(id));
  
      if (allSelected) {
        setSelectedRows((prevSelected) =>
          prevSelected.filter((id) => !matchingRows.includes(id))
        );
        alert(`選択を解除しました。顧客名: ${filterCompany}`);
      } else {
        setSelectedRows((prevSelected) => [
          ...new Set([...prevSelected, ...matchingRows]), 
        ]);
        alert(`複数選択が完了しました。選択された顧客名: ${filterCompany}`);
      }
    }
  };

  const status = ["すべて", "未請求", "請求済"];

  return (
    <div className="flex flex-col items-center w-full">
      <Form layout="vertical">
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Form.Item label={"年月"} className="grow">
            <DatePicker
              picker="month"
              onChange={(date) => setFilterDate(date)}
              style={{ marginRight: 10 }}
              allowClear
            />
          </Form.Item>
          <Form.Item label={"顧客名"} className="grow">
            <Select
              placeholder="Filter by Company"
              allowClear
              onChange={(value) => setFilterCompany(value)}
              style={{ width: 200, marginRight: 10 }}
            >
              {data
                .map((item) => item.顧客名)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((company) => (
                  <Option key={company} value={company}>
                    {company}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label={"請求状況"} className="grow">
            <Select defaultValue={"すべて"} style={{ width: 100 }} onChange={(value) => setFilterState(value)}>
              {status.map((data) => (
                <Select.Option key={data} value={data} >
                  {data}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" className="grow" onClick={handleCreateButton}  disabled={!filterCompany || !filterDate}>
            作成
          </Button>
          <Button
            type="primary"
            className="grow"
            onClick={handleMultiSelectionButton}
            disabled={!filterCompany || !filterDate}
          >
            複数選択
          </Button>
        </div>
      </Form>
      <div className="w-full">
        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: "max-content" }}
          rowKey="識別コード"
          className="table-fixed"
          size="small"
          ps={12}
          pagination={false}

        />
        
      </div>
    </div>
  );
};

export default BillingListPage;
