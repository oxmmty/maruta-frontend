import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table ,Button} from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import CTable from "src/components/CTable";
import moment from "moment";
dayjs.extend(isBetween);

const MonthlyPartnerCompanyDBGraphPage = () => {
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [company, setCompany] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("month")); // Default to this year and this month
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, companies, orders, pdfLists] = await Promise.all([
          axios.get(process.env.REACT_API_BASE_URL + `/partnercompany`),
          axios.get(process.env.REACT_API_BASE_URL + `/partnercompany`),
          axios.get(process.env.REACT_API_BASE_URL + `/order`),
          axios.get(process.env.REACT_API_BASE_URL + `/pdfList`),
        ]);
        setOrder(orders.data);
        setCustomer(customers.data);
        setCompany(companies.data);
        setPdfList(pdfLists.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const companyList = company.filter(item => item.仕入先 === true).map(item => item.企業名略称);

  const calculatePrices = (startDate, endDate) => {
    return companyList.map((companyItem) => {
      const matchedPdfItem = pdfList.find(
        
        (pdfItem) =>
          pdfItem.下払会社名 === companyItem &&
          dayjs(pdfItem.依頼日).isBetween(startDate, endDate, null, "[]"),
      );
      return {
        Price: matchedPdfItem ? Number(matchedPdfItem.基本料金) : 0,
      };
    });
  };

  // Calculate prices based on selected date
  const startOfMonth = selectedDate.startOf("month");
  const endOfMonth = selectedDate.endOf("month");
  const lastMonthStart = startOfMonth.subtract(1, "month");
  const lastMonthEnd = endOfMonth.subtract(1, "month");

  // New date calculations
  const thisYearLastMonthStart = startOfMonth.subtract(1, "month");
  const thisYearLastMonthEnd = endOfMonth.subtract(1, "month");
  const thisYearLastMonthDate = thisYearLastMonthEnd.format("YYYY-MM");
  const thisYearThisMonthDate = endOfMonth.format("YYYY-MM");

  const thisYearLastMonthPrice = calculatePrices(
    thisYearLastMonthStart,
    thisYearLastMonthEnd,
  );
  const thisYearThisMonthPrice = calculatePrices(startOfMonth, endOfMonth);
  const selectedYearThisMonthPrice = calculatePrices(
    startOfMonth,
    endOfMonth,
  );
  const selectedYearLastMonthPrice = calculatePrices(
    lastMonthStart,
    lastMonthEnd,
  );
  let selectedMonthBusinessDaysCount = 0,
    selectedMonthBusinessDays = [];
  let lastMonthBusinessDaysCount = 0,
    lastMonthBusinessDays = [];

  order.map((item) => {
    if (moment(item.配達日1).format("YYYY-MM") === thisYearThisMonthDate) {
      const date = moment(item.配達日1).format("YYYY-MM-DD");
      const isTargetIn = selectedMonthBusinessDays.findIndex((day) => {
        return day === date;
      });
      if (isTargetIn < 0) {
        selectedMonthBusinessDaysCount++;
        selectedMonthBusinessDays.push(date);
      }
    }
    if (moment(item.配達日1).format("YYYY-MM") === thisYearLastMonthDate) {
      const date = moment(item.配達日1).format("YYYY-MM-DD");

      const isTargetIn = lastMonthBusinessDays.findIndex((day) => {
        return day === date;
      });
      if (isTargetIn < 0) {
        lastMonthBusinessDaysCount++;
        lastMonthBusinessDays.push(date);
      }
    }
  });

  let averageLastMonthPrice =
    Math.floor(selectedYearLastMonthPrice.reduce((sum, item) => sum + item.Price, 0) /
    lastMonthBusinessDaysCount);
  let averageSelectedMonthPrice =
    Math.floor(selectedYearThisMonthPrice.reduce((sum, item) => sum + item.Price, 0) /
    selectedMonthBusinessDaysCount);
  let totalLastMonthPrice = selectedYearLastMonthPrice.reduce((sum, item) => sum + item.Price, 0);
  let totalSelectedMonthPrice = selectedYearThisMonthPrice.reduce((sum, item) => sum + item.Price, 0);


  const businessDaysDataSource = {
    company: "稼働日数",
    thisYearLastMonthPrice: lastMonthBusinessDaysCount,
    thisYearThisMonthPrice: selectedMonthBusinessDaysCount,
    compare: selectedMonthBusinessDaysCount - lastMonthBusinessDaysCount,
  };

  const averageDataSource = {
    company: "日当り売上",
    thisYearLastMonthPrice: averageLastMonthPrice,
    thisYearThisMonthPrice: averageSelectedMonthPrice,
    compare: averageSelectedMonthPrice - averageLastMonthPrice,
    ratio: averageSelectedMonthPrice && averageLastMonthPrice
          ? (
              (averageSelectedMonthPrice /
                averageLastMonthPrice) *
                100 || 0
            ).toFixed(2) + "%"
          : "0%",
  };
  const TotalDataSource = {
    company: "合計",
    thisYearLastMonthPrice: totalLastMonthPrice,
    thisYearThisMonthPrice: totalSelectedMonthPrice,
    compare: totalSelectedMonthPrice - totalLastMonthPrice,
    ratio: totalSelectedMonthPrice && totalLastMonthPrice
          ? (
              (totalSelectedMonthPrice /
                totalLastMonthPrice) *
                100 || 0
            ).toFixed(2) + "%"
          : "0%", 
  };

  const combined = companyList.map((company, index) => {
   

    return {
      company: company,
      thisYearLastMonthPrice: thisYearLastMonthPrice[index].Price,
      thisYearThisMonthPrice: thisYearThisMonthPrice[index].Price,
      // thisYearLastMonthDate,
      // thisYearThisMonthDate,
      compare: selectedYearThisMonthPrice[index]?.Price - selectedYearLastMonthPrice[index]?.Price,
      ratio: selectedYearThisMonthPrice[index]?.Price && selectedYearLastMonthPrice[index]?.Price ? 
        ((selectedYearThisMonthPrice[index]?.Price / selectedYearLastMonthPrice[index]?.Price * 100) || 0).toFixed(2) + '%' : '0%',

    };
  });

  const columns = [
    {
      title: "",
      dataIndex: "company",
      key: "company",
      align: "center",
    },
   
    {
      title: `${thisYearLastMonthEnd.format("MM月")} `,
      dataIndex: "thisYearLastMonthPrice", 
      align: "center",
      key: "thisYearLastMonthPrice",
    },
  
    {
      title: `${endOfMonth.format("MM月")} `,
      dataIndex: "thisYearThisMonthPrice",
      align: "center",
      key: "thisYearThisMonthPrice",
    },
    {
      title: "前月比",
      dataIndex: "compare",
      key: "compare",
      align: "center",
      render: (text) => {
        return {
          props: {
            style: { color: text >= 0 ? 'inherit' : 'red' }
          },
          children: text
        };
      }
    },
    {
      title: "比率",
      dataIndex: "ratio",
      key: "ratio",
      align: "center",
    },
  ];

  const lineData = combined.flatMap((item) => [
   
    {
      x: item.company,
      y: item.thisYearLastMonthPrice,
      category: item.thisYearLastMonthDate,
    },
  
    {
      x: item.company,
      y: item.thisYearThisMonthPrice,
      category: item.thisYearThisMonthDate,
    },
  ]);

  const config = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: lineData,
    xField: "x",
    yField: "y",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    colorField: "category",
    style: {
      lineWidth: 2,
    },
  };

  const barData = [
    
    {
      type: `${thisYearLastMonthEnd.format("YYYY年MM月")}`,
      value: combined.reduce(
        (sum, item) => sum + item.thisYearLastMonthPrice,
        0,
      ),
    },
    
    {
      type: `${endOfMonth.format("YYYY年MM月")}`,
      value: combined.reduce(
        (sum, item) => sum + item.thisYearThisMonthPrice,
        0,
      ),
    },
  ];

  const barConfig = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: barData,
    xField: "type",
    yField: "value",
    style: {
      fill: "#2989FF",
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        return val < 0.05 ? (val * 100).toFixed(1) + "%" : "";
      },
      offset: 10,
    },
    legend: false,
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        月ごとの庸車売上集計
      </h1>
      <div className="flex justify-end w-full pb-2 gap-5">
        <DatePicker
          picker="month"
          className="grow max-w-60"
          value={selectedDate} // Set the value of the DatePicker
          onChange={handleDateChange} // Handle date change
        />
        <Button type="primary" onClick={() => setShowGraph(!showGraph)}>{showGraph ? '表' : 'チャート'}</Button>
      </div>
      {!showGraph && (
      <div className="mb-4">
        <CTable
          dataSource={[businessDaysDataSource, averageDataSource,  ...combined, TotalDataSource,]}
          columns={columns}
          // pagination={true}
          ps={13}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
      )}
      {showGraph && (
      <div className="flex flex-wrap flex-row items-center gap-5 w-full pt-5">
        <div className="flex-1 min-w-[250px] text-center">
          <h2>月次比較グラフ</h2>
          <Line {...config} />
        </div>
        <div className="flex-1 min-w-[250px] text-center">
          <h2>月次合計</h2>
          <Column {...barConfig} />
        </div>
      </div>
      )}
    </div>
  );
};

export default MonthlyPartnerCompanyDBGraphPage;
