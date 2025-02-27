import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Select, DatePicker,Table } from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import CTable from "src/components/CTable";

const { Title, Text } = Typography;
const { Option } = Select;

const RequestListPage = () => {
  const location = useLocation();
  const datas = location.state?.data;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pdfDate, setPdfDate] = useState("");
  const today = dayjs().format("YYYY-MM-DD");
  const componentRef = useRef();
  useEffect(() => {
    axios.get(`${process.env.REACT_API_BASE_URL}/pdfList`).then((response) => {

      const transformedData = response.data.map((item) => ({
        ...item,
        配達日1: moment(item.配達日1).format("MM-DD"),
        配達時間1: item.配達時間1 || "",
        搬入返却場所: item.搬入返却場所 || "",
        取場所: item.取場所 || "",
        コンテナサイズ: item.コンテナサイズ || "",
        コンテナNo: item.コンテナNo || "",
        シャーシ留置費: item.シャーシ留置費 || "",
        work1: item.work1 || "",
        work2: item.work2 || "",
        work3: item.work3 || "",
        work4: item.work4 || "",
        work5: item.work5 || "",
        work6: item.work6 || "",
        識別コード: item.識別コード || "",
        請求書備考: item.請求書備考 || "",
      }));
      setData(transformedData);
    });
   
    axios
      .get(`${process.env.REACT_API_BASE_URL}/partnercompany`)
      .then((response) => {
        const companyList = [
          ...new Set(response.data.map((item) => item.企業名略称)),
        ];
        setCompanies(companyList);
        console.log("data" , response.data)
      });
  }, []);
  useEffect(() => {
    filterData();
  }, [selectedCompany, selectedDate, data]);

  const columns = [
      {
        title: "No",
        align: "center",
        render: (_, __, index) => index + 1,
      },
      {
        title: "配達日",
        dataIndex: "配達日1",
        key: "配達日1",
        align: "center",
        render: (text, record) => {
          if (record.配達日1) {
            return dayjs(record.配達日1).format("MM-DD");
          }
        },
      },
      {
        title: "時間",
        dataIndex: "配達時間1",
        key: "配達時間1",
        align: "center",
      },
      {
        title: "発行",
        dataIndex: "発行",
        key: "発行",
        align: "center",
        render: (text, record) => (
          <input
            type="checkbox"
            checked={record.発行 === true}
            
          />
        ),
      },
      {
        title: "下払会社名",
        dataIndex: "下払会社名",
        key: "下払会社名",
        align: "center",
      },
      {
        title: "搬出・搬入",
        dataIndex: "搬入返却場所",
        key: "搬入返却場所",
        align: "center",
      },
      {
        title: "作業先",
        dataIndex: "取場所",
        key: "取場所",
        align: "center",
      },
      {
        title: "サイズ",
        dataIndex: "コンテナサイズ",
        key: "コンテナサイズ",
        align: "center",
      },
      {
        title: "コンテナ番号",
        dataIndex: "コンテナNo",
        key: "コンテナNo",
        align: "center",
      },
      {
        title: "シャーシ",
        dataIndex: "シャーシ留置費",
        key: "シャーシ留置費",
        align: "center",
      },
      {
        title: "作業 1",
        dataIndex: "work1",
        key: "work1",
        align: "center",
      },
      {
        title: "作業 2",
        dataIndex: "work2",
        key: "work2",
        align: "center",
      },
      {
        title: "作業 3",
        dataIndex: "work3",
        key: "work3",
        align: "center",
      },
      {
        title: "作業 4",
        dataIndex: "work4",
        key: "work4",
        align: "center",
      },
      {
        title: "作業 5",
        dataIndex: "work5",
        key: "work5",
        align: "center",
      },
      {
        title: "作業 6",
        dataIndex: "work6",
        key: "work6",
        align: "center",
      },
      // {
      //   title: "積日1",
      //   dataIndex: "積日1",
      //   key: "積日1",
      //   align: "center",
      //   render: (text, record) => {
      //     if (record.積日1) {
      //       return dayjs(record.積日1).format("YYYY-MM-DD");
      //     }
      //   },
      // },
      // {
      //   title: "配達日1",
      //   dataIndex: "配達日1",
      //   key: "配達日1",
      //   align: "center",
      //   render: (text, record) => {
      //     if (record.配達日1) {
      //       return dayjs(record.配達日1).format("YYYY-MM-DD");
      //     }
      //   },
      // },
      {
        title: "識別コード",
        dataIndex: "リクエスト番号",
        key: "識別コード",
        align: "center",
      },
      {
        title: "備考",
        dataIndex: "請求書備考",
        key: "請求書備考",
        align: "center",
      },
     
    ];

  const filterData = () => {
    let filtered = data.filter((item) => item.delete !== true);
    if (selectedCompany) {
      filtered = filtered.filter((item) =>
        [
          item.下払会社名,
          // item.下払会社名2,
          // item.下払会社名3,
          // item.下払会社名4,
          // item.下払会社名5,
          // item.下払会社名6,
        ].includes(selectedCompany),
      );
    }
    if (datas) {
      handleDateChange(datas);
    }
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("MM-DD");
      filtered = filtered.filter(
        (item) => moment(item.配達日1).format("MM-DD") === formattedDate,
      );
      setPdfDate(selectedDate);
    }
    setFilteredData(filtered);
  };
  console.log("filterData" , filteredData)
  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDownloadPDF = () => {
    axios
      .put("/pdfList", {
        data : filteredData.map((item) => item.リクエスト番号),
      })
      
        html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("l", "mm", "a4");
          const imgWidth = 277;
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
          pdf.save(`${selectedCompany}- ${moment(pdfDate).format("YYYY-MM-DD")}.pdf`);
        });
      
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap flex-row w-full justify-between items-center gap-4 px-2">
        <div className="flex  gap-4 mb-2">
          <Select
            placeholder="Select a company"
            onChange={handleCompanyChange}
            style={{ width: 200 }}
            allowClear>
            {companies.map((company) => (
              <Option key={company} value={company}>
                {company}
              </Option>
            ))}
          </Select>
          <DatePicker
            picker="date"
            onChange={(date, dateString) => {
              handleDateChange(dateString);
            }}
            format="YYYY/MM/DD"
            allowClear
          />
        </div>

        <Button type="primary" onClick={handleDownloadPDF} disabled={!selectedCompany || !selectedDate}>
          PDF作成
        </Button>
      </div>

      <div ref={componentRef} className="bg-white p-4">
        <div className="text-center text-black">
          <Title level={5} className="text-black pt-5">
            翔風運輸株式会社　担当：渡邉
          </Title>
          <Text className="text-black">{today}</Text>
        </div>
        <div className="flex justify-between ml-48 mr-48 mt-6 mb-4">
          <Text className="text-black">{selectedCompany} 御中</Text>
          <Text className="text-black">
            {moment(pdfDate).format("YYYY-MM-DD")}
          </Text>
        </div>


      <div className="w-full">
        <Table
          dataSource={filteredData}
          columns={columns}
          scroll={{ x: "max-content" }}
          size="small"
          className="table-fixed"
          pagination={false}
          ps={12}
        />
      </div>
      </div>
    </div>
  );
};

export default RequestListPage;
