import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table , Button } from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";
import CTable from "src/components/CTable";
import moment from "moment";

const MonthlyVehiclePLPage = () => {
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, orders] = await Promise.all([
          axios.get(process.env.REACT_API_BASE_URL + `/vehiclemanagement`),
          axios.get(process.env.REACT_API_BASE_URL + `/order`),
        ]);
        setCustomer(customers.data);
        setOrder(orders.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // const customers = customer.filter(item => item.得意先 === true).map(item => item.自社乗務員1);
  const customers = customer.map((item) => item.所属_担当者);

  const calculatePrices = (startDate, endDate) => {
    return customers.map((customerItem) => {
      const matchedOrders = order.filter((orderItem) => {
        const orderDate = dayjs(orderItem.依頼書作成日);
        return (
          orderItem.自社乗務員1 === customerItem &&
          orderDate.isAfter(startDate) &&
          orderDate.isBefore(endDate)
        );
      });

      const totalPrice = matchedOrders.reduce((sum, orderItem) => {
        return (
          sum +
          (Number(orderItem.基本料金1) +
          Number(orderItem.基本料金2) +
          Number(orderItem.基本料金3))
        );
      }, 0);
      

      return {
        Price: totalPrice,
      };
    });
  };

  const startOfSelectedMonth = selectedMonth.startOf("month");
  const endOfSelectedMonth = selectedMonth.endOf("month");
  const startOfLastMonth = selectedMonth.subtract(1, "month").startOf("month");
  const endOfLastMonth = selectedMonth.subtract(1, "month").endOf("month");
  const selectedYearThisMonth = startOfSelectedMonth.format("YYYY-MM");
  const selectedYearLastMonth = startOfLastMonth.format("YYYY-MM");
  const selectedYearThisMonthPrice = calculatePrices(
    startOfSelectedMonth,
    endOfSelectedMonth,
  );
  const selectedYearLastMonthPrice = calculatePrices(
    startOfLastMonth,
    endOfLastMonth,
  );
  const totalDrivers = customer.length;

  
  let selectedMonthBusinessDaysCount = 0,
    selectedMonthBusinessDays = [];
  let lastMonthBusinessDaysCount = 0,
    lastMonthBusinessDays = [];
  order.map((item) => {
    if (moment(item.配達日1).format("YYYY-MM") === selectedYearThisMonth) {
      const date = moment(item.配達日1).format("YYYY-MM-DD");
      const isTargetIn = selectedMonthBusinessDays.findIndex((day) => {
        return day === date;
      });
      if (isTargetIn < 0) {
        selectedMonthBusinessDaysCount++;
        selectedMonthBusinessDays.push(date);
      }
    }
    if (moment(item.配達日1).format("YYYY-MM") === selectedYearLastMonth) {
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


  let averageLastMonthPrice = Math.floor(selectedYearLastMonthPrice.reduce((sum, item) => sum + item.Price, 0) / lastMonthBusinessDaysCount);
  let averageSelectedMonthPrice = Math.floor(selectedYearThisMonthPrice.reduce((sum, item) => sum + item.Price, 0) / selectedMonthBusinessDaysCount);
  let salesPerUnitLastMonth = Math.floor(selectedYearLastMonthPrice.reduce((sum, item) => sum + item.Price, 0) / totalDrivers);
  let salesPerUnitSelectedMonth = Math.floor(selectedYearThisMonthPrice.reduce((sum, item) => sum + item.Price, 0) / totalDrivers);
  let totalLastMonthPrice = selectedYearLastMonthPrice.reduce((sum, item) => sum + item.Price, 0);
  let totalSelectedMonthPrice = selectedYearThisMonthPrice.reduce((sum, item) => sum + item.Price, 0);

  const businessDaysDataSource = {
    customer: "稼働日数",
    [selectedYearLastMonth]: lastMonthBusinessDaysCount,
    [selectedYearThisMonth]: selectedMonthBusinessDaysCount,
    compare: selectedMonthBusinessDaysCount - lastMonthBusinessDaysCount,
  };

  const averageDataSource = {
    customer: "日当り売上",
    [selectedYearLastMonth]: averageLastMonthPrice,
    [selectedYearThisMonth]: averageSelectedMonthPrice,
    compare: averageSelectedMonthPrice - averageLastMonthPrice,
    ratio: averageSelectedMonthPrice && averageLastMonthPrice ? ( (averageSelectedMonthPrice / averageLastMonthPrice) * 100 || 0 ).toFixed(2) + "%" : "0%",
  };
  const totalMonthDrivers = {
    customer: "稼働人数",
    [selectedYearLastMonth]: totalDrivers,
    [selectedYearThisMonth]: totalDrivers,
    compare: "",
    ratio: "",
  };
  const salesPerUnit = {
    customer: "１台当り売上",
    [selectedYearLastMonth]: salesPerUnitLastMonth,
    [selectedYearThisMonth]: salesPerUnitSelectedMonth,
    compare: salesPerUnitSelectedMonth - salesPerUnitLastMonth,
    ratio: salesPerUnitSelectedMonth && salesPerUnitLastMonth ? ((salesPerUnitSelectedMonth / salesPerUnitLastMonth) * 100 || 0 ).toFixed(2) + "%" : "0%",
  }
  const TotalDataSource = {
    customer: "合計",
    [selectedYearLastMonth]: totalLastMonthPrice,
    [selectedYearThisMonth]: totalSelectedMonthPrice,
    compare: totalSelectedMonthPrice - totalLastMonthPrice,
    ratio: totalSelectedMonthPrice && totalLastMonthPrice ? ((totalSelectedMonthPrice / totalLastMonthPrice) * 100 || 0 ).toFixed(2) + "%" : "0%", 
  };

  const combined = customers.map((customer, index) => {
    return {
      customer: customer,
      [selectedYearLastMonth]: selectedYearLastMonthPrice[index]?.Price || 0,
      [selectedYearThisMonth]: selectedYearThisMonthPrice[index]?.Price || 0,
      compare: selectedYearThisMonthPrice[index]?.Price - selectedYearLastMonthPrice[index]?.Price,
      ratio: selectedYearThisMonthPrice[index]?.Price && selectedYearLastMonthPrice[index]?.Price ? ((selectedYearThisMonthPrice[index]?.Price / selectedYearLastMonthPrice[index]?.Price * 100) || 0).toFixed(2) + '%' : '0%',
    };
  });

  const columns = [
    {
      title: "",
      dataIndex: "customer",
      key: "customer",
      align: "center",
    },
    {
      title: `${startOfLastMonth.format("MM月")} `,
      dataIndex: selectedYearLastMonth,
      key: "selectedYearLastMonth",
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
      title: `${startOfSelectedMonth.format("MM月")} `,
      dataIndex: selectedYearThisMonth,
      key: "selectedYearThisMonth",
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

  const lineData = combined
    .map((item) => [
      {
        x: item.customer,
        y: item[selectedYearLastMonth],
        category: selectedYearLastMonth,
      },
      {
        x: item.customer,
        y: item[selectedYearThisMonth],
        category: selectedYearThisMonth,
      },
    ])
    .flat();

  const config = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: lineData,
    xField: "x",
    yField: "y",
    colorField: "category",
  };

  const barData = [
    {
      type: selectedYearLastMonth,
      value: combined.reduce(
        (sum, item) => sum + item[selectedYearLastMonth],
        0,
      ),
    },
    {
      type: selectedYearThisMonth,
      value: combined.reduce(
        (sum, item) => sum + item[selectedYearThisMonth],
        0,
      ),
    },
  ];

  const barConfig = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: barData,
    xField: "type",
    yField: "value",
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">月ごとの売掛買掛集計</h1>
      <div className="mb-4 text-center flex w-full justify-center gap-5">
        <DatePicker
          picker="month"
          value={selectedMonth}
          onChange={(date) => setSelectedMonth(date || dayjs())} 
          allowClear
          />
          <Button type="primary" onClick={() => setShowGraph(!showGraph)}>{showGraph ? '表' : 'チャート'}</Button>
      </div>
      {!showGraph && (
      <div className="mb-4">
        <CTable
          dataSource={[
            businessDaysDataSource,
            averageDataSource,
            totalMonthDrivers,
            salesPerUnit,
            ...combined,
            TotalDataSource,
          ]}
          columns={columns}
          pagination={false}
          ps={13}
          bordered
          scroll={{ x: "max-content" }}
        />
        </div>
      )}
      {showGraph && (
        <div className="flex flex-wrap flex-row items-center gap-5 w-full pt-5">
          <div className="flex-1 min-w-[250px] text-center">
            <h2>月次比較</h2>
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

export default MonthlyVehiclePLPage;
