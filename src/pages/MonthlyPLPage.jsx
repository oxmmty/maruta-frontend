import { Button, DatePicker, Form, Table, Typography, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Text } = Typography;
const MonthlyPLPage = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [tpData1, setTpData1] = useState([]);
  const [tpData2, setTpData2] = useState([]);
  const [accountplData, setAccountplData] = useState([]);

  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [planEdit, setPlanEdit] = useState(false);
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const [accountData, setAccountData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [totalMActual, setTotalMActual] = useState([]);
  const [totalRatio, setTotalRatio] = useState([]);
  const [totalPlan, setTotalPlan] = useState([]);
  const [totalMActualRatio, setTotalMActualRatio] = useState([]);

  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [filteredData3, setFilteredData3] = useState([]);
  const [filteredData4, setFilteredData4] = useState([]);
  const [filteredData5, setFilteredData5] = useState([]);
  const [filteredData6, setFilteredData6] = useState([]);
  const [filteredData7, setFilteredData7] = useState([]);
  const [filteredData8, setFilteredData8] = useState([]);
  const [filteredData9, setFilteredData9] = useState([]);
  const [filteredData10, setFilteredData10] = useState([]);
  const [filteredData11, setFilteredData11] = useState([]);
  const [filteredData12, setFilteredData12] = useState([]);
  const [filteredDataPLSum, setFilteredDataPLSum] = useState(0);
  const [filteredDataOperatingProfit, setFilteredDataOperatingProfit] = useState(0);
  const [filteredDataOperatingIncome, setFilteredDataOperatingIncome] = useState(0);
  const [filteredDataOperatingExpenses, setFilteredDataOperatingExpenses] = useState(0);
  const [filteredDataOrdinaryProfit, setFilteredDataOrdinaryProfit] = useState(0);
  const [filteredDataExtraordinaryProfit, setFilteredDataExtraordinaryProfit] = useState(0);
  const [filteredDataExtraordinaryLosses, setFilteredDataExtraordinaryLosses] = useState(0);
  const [filteredDataPretaxProfit, setFilteredDataPretaxProfit] = useState(0);
  const [filteredDataCorporateTax, setFilteredDataCorporateTax] = useState(0);
  const [filteredDataNetIncome, setFilteredDataNetIncome] = useState(0);


  const [totalMActual1, setTotalMActual1] = useState(0);
  const [totalMActual2, setTotalMActual2] = useState(0);
  const [totalMActual3, setTotalMActual3] = useState(0);
  const [totalMActual4, setTotalMActual4] = useState(0);
  const [totalMActual5, setTotalMActual5] = useState(0);
  const [totalMActual6, setTotalMActual6] = useState(0);
  const [totalMActual7, setTotalMActual7] = useState(0);
  const [totalMActual8, setTotalMActual8] = useState(0);
  const [totalMActual9, setTotalMActual9] = useState(0);
  const [totalMActual10, setTotalMActual10] = useState(0);
  const [totalMActual11, setTotalMActual11] = useState(0);
  const [totalMActual12, setTotalMActual12] = useState(0);
  const [totalMActual13, setTotalMActual13] = useState(0);
  const [totalMActual14, setTotalMActual14] = useState(0);
  const [totalMActual15, setTotalMActual15] = useState(0);
  const [totalMActual16, setTotalMActual16] = useState(0);
  const [totalMActual17, setTotalMActual17] = useState(0);
  const [totalMActual18, setTotalMActual18] = useState(0);
  const [totalMActual19, setTotalMActual19] = useState(0);
  const [totalMActual20, setTotalMActual20] = useState(0);
  const [totalMActual21, setTotalMActual21] = useState(0);
  const [totalMActual22, setTotalMActual22] = useState(0);
  const [totalMActual23, setTotalMActual23] = useState(0);
  const [totalMActual24, setTotalMActual24] = useState(0);
  const [totalMActual25, setTotalMActual25] = useState(0);
  const [totalMActual26, setTotalMActual26] = useState(0);
  const [totalMActual27, setTotalMActual27] = useState(0);
  const [totalMActualPLSum, setTotalMActualPLSum] = useState(0);
  const [totalMActualOperatingProfit, setTotalMActualOperatingProfit] = useState(0);
  const [totalMActualOperatingIncome, setTotalMActualOperatingIncome] = useState(0);
  const [totalMActualOperatingExpenses, setTotalMActualOperatingExpenses] = useState(0);
  const [totalMActualOrdinaryProfit, setTotalMActualOrdinaryProfit] = useState(0);
  const [totalMActualExtraordinaryProfit, setTotalMActualExtraordinaryProfit] = useState(0);
  const [totalMActualExtraordinaryLosses, setTotalMActualExtraordinaryLosses] = useState(0);
  const [totalMActualPretaxProfit, setTotalMActualPretaxProfit] = useState(0);
  const [totalMActualCorporateTax, setTotalMActualCorporateTax] = useState(0);
  const [totalMActualNetIncome, setTotalMActualNetIncome] = useState(0);

  const [totalMActualRatio1, setTotalMActualRatio1] = useState(0);
  const [totalMActualRatio2, setTotalMActualRatio2] = useState(0);
  const [totalMActualRatio3, setTotalMActualRatio3] = useState(0);
  const [totalMActualRatio4, setTotalMActualRatio4] = useState(0);
  const [totalMActualRatio5, setTotalMActualRatio5] = useState(0);
  const [totalMActualRatio6, setTotalMActualRatio6] = useState(0);
  const [totalMActualRatio7, setTotalMActualRatio7] = useState(0);
  const [totalMActualRatio8, setTotalMActualRatio8] = useState(0);
  const [totalMActualRatio9, setTotalMActualRatio9] = useState(0);
  const [totalMActualRatio10, setTotalMActualRatio10] = useState(0);
  const [totalMActualRatio11, setTotalMActualRatio11] = useState(0);
  const [totalMActualRatio12, setTotalMActualRatio12] = useState(0);
  const [totalMActualRatio13, setTotalMActualRatio13] = useState(0);
  const [totalMActualRatio14, setTotalMActualRatio14] = useState(0);
  const [totalMActualRatio15, setTotalMActualRatio15] = useState(0);
  const [totalMActualRatio16, setTotalMActualRatio16] = useState(0);
  const [totalMActualRatio17, setTotalMActualRatio17] = useState(0);
  const [totalMActualRatio18, setTotalMActualRatio18] = useState(0);
  const [totalMActualRatio19, setTotalMActualRatio19] = useState(0);
  const [totalMActualRatio20, setTotalMActualRatio20] = useState(0);
  const [totalMActualRatio21, setTotalMActualRatio21] = useState(0);
  const [totalMActualRatio22, setTotalMActualRatio22] = useState(0);
  const [totalMActualRatio23, setTotalMActualRatio23] = useState(0);
  const [totalMActualRatio24, setTotalMActualRatio24] = useState(0);
  const [totalMActualRatio25, setTotalMActualRatio25] = useState(0);
  const [totalMActualRatio26, setTotalMActualRatio26] = useState(0);
  const [totalMActualRatio27, setTotalMActualRatio27] = useState(0);
  const [totalMActualRatioPLSum, setTotalMActualRatioPLSum] = useState(0);
  const [totalMActualRatioOperatingProfit, setTotalMActualRatioOperatingProfit] = useState(0);
  const [totalMActualRatioOperatingIncome, setTotalMActualRatioOperatingIncome] = useState(0);
  const [totalMActualRatioOperatingExpenses, setTotalMActualRatioOperatingExpenses] = useState(0);
  const [totalMActualRatioOrdinaryProfit, setTotalMActualRatioOrdinaryProfit] = useState(0);
  const [totalMActualRatioExtraordinaryProfit, setTotalMActualRatioExtraordinaryProfit] = useState(0);
  const [totalMActualRatioExtraordinaryLosses, setTotalMActualRatioExtraordinaryLosses] = useState(0);
  const [totalMActualRatioPretaxProfit, setTotalMActualRatioPretaxProfit] = useState(0);
  const [totalMActualRatioCorporateTax, setTotalMActualRatioCorporateTax] = useState(0);
  const [totalMActualRatioNetIncome, setTotalMActualRatioNetIncome] = useState(0);

  const [totalPlan1, setTotalPlan1] = useState(0);
  const [totalPlan2, setTotalPlan2] = useState(0);
  const [totalPlan3, setTotalPlan3] = useState(0);
  const [totalPlan4, setTotalPlan4] = useState(0);
  const [totalPlan5, setTotalPlan5] = useState(0);
  const [totalPlan6, setTotalPlan6] = useState(0);
  const [totalPlan7, setTotalPlan7] = useState(0);
  const [totalPlan8, setTotalPlan8] = useState(0);
  const [totalPlan9, setTotalPlan9] = useState(0);
  const [totalPlan10, setTotalPlan10] = useState(0);
  const [totalPlan11, setTotalPlan11] = useState(0);
  const [totalPlan12, setTotalPlan12] = useState(0);
  const [totalPlan13, setTotalPlan13] = useState(0);
  const [totalPlan14, setTotalPlan14] = useState(0);
  const [totalPlan15, setTotalPlan15] = useState(0);
  const [totalPlan16, setTotalPlan16] = useState(0);
  const [totalPlan17, setTotalPlan17] = useState(0);
  const [totalPlan18, setTotalPlan18] = useState(0);
  const [totalPlan19, setTotalPlan19] = useState(0);
  const [totalPlan20, setTotalPlan20] = useState(0);
  const [totalPlan21, setTotalPlan21] = useState(0);
  const [totalPlan22, setTotalPlan22] = useState(0);
  const [totalPlan23, setTotalPlan23] = useState(0);
  const [totalPlan24, setTotalPlan24] = useState(0);
  const [totalPlan25, setTotalPlan25] = useState(0);
  const [totalPlan26, setTotalPlan26] = useState(0);
  const [totalPlan27, setTotalPlan27] = useState(0);
  const [totalSalesProfit, setTotalSalesProfit] = useState(0);
  const [totalPlanPLSum, setTotalPlanPLSum] = useState(0);
  const [totalPlanOperatingProfit , setTotalPlanOperatingProfit] = useState(0);
  const [totalPlanOperatingIncome, setTotalPlanOperatingIncome] = useState(0);
  const [totalPlanOperatingExpenses, setTotalPlanOperatingExpenses] = useState(0);
  const [totalPlanOrdinaryProfit, setTotalPlanOrdinaryProfit] = useState(0);
  const [totalPlanExtraordinaryProfit, setTotalPlanExtraordinaryProfit] = useState(0);
  const [totalPlanExtraordinaryLosses, setTotalPlanExtraordinaryLosses] = useState(0);
  const [totalPlanPretaxProfit, setTotalPlanPretaxProfit] = useState(0);
  const [totalPlanCorporateTax, setTotalPlanCorporateTax] = useState(0);
  const [totalPlanNetIncome, setTotalPlanNetIncome] = useState(0);


  const [totalRatio1, setTotalRatio1] = useState(0);
  const [totalRatio2, setTotalRatio2] = useState(0);
  const [totalRatio3, setTotalRatio3] = useState(0);
  const [totalRatio4, setTotalRatio4] = useState(0);
  const [totalRatio5, setTotalRatio5] = useState(0);
  const [totalRatio6, setTotalRatio6] = useState(0);
  const [totalRatio7, setTotalRatio7] = useState(0);
  const [totalRatio8, setTotalRatio8] = useState(0);
  const [totalRatio9, setTotalRatio9] = useState(0);
  const [totalRatio10, setTotalRatio10] = useState(0);
  const [totalRatio11, setTotalRatio11] = useState(0);
  const [totalRatio12, setTotalRatio12] = useState(0);
  const [totalRatio13, setTotalRatio13] = useState(0);
  const [totalRatio14, setTotalRatio14] = useState(0);
  const [totalRatio15, setTotalRatio15] = useState(0);
  const [totalRatio16, setTotalRatio16] = useState(0);
  const [totalRatio17, setTotalRatio17] = useState(0);
  const [totalRatio18, setTotalRatio18] = useState(0);
  const [totalRatio19, setTotalRatio19] = useState(0);
  const [totalRatio20, setTotalRatio20] = useState(0);
  const [totalRatio21, setTotalRatio21] = useState(0);
  const [totalRatio22, setTotalRatio22] = useState(0);
  const [totalRatio23, setTotalRatio23] = useState(0);
  const [totalRatio24, setTotalRatio24] = useState(0);
  const [totalRatio25, setTotalRatio25] = useState(0);
  const [totalRatio26, setTotalRatio26] = useState(0);
  const [totalRatio27, setTotalRatio27] = useState(0);
  const [totalRatioPLSum, setTotalRatioPLSum] = useState(0);
  const [totalRatioOperatingProfit, setTotalRatioOperatingProfit] = useState(0);
  const [totalRatioOperatingIncome, setTotalRatioOperatingIncome] = useState(0);
  const [totalRatioOperatingExpenses, setTotalRatioOperatingExpenses] = useState(0);
  const [totalRatioOrdinaryProfit, setTotalRatioOrdinaryProfit] = useState(0);
  const [totalRatioExtraordinaryProfit, setTotalRatioExtraordinaryProfit] = useState(0);
  const [totalRatioExtraordinaryLosses, setTotalRatioExtraordinaryLosses] = useState(0);
  const [totalRatioPretaxProfit, setTotalRatioPretaxProfit] = useState(0);
  const [totalRatioCorporateTax, setTotalRatioCorporateTax] = useState(0);
  const [totalRatioNetIncome, setTotalRatioNetIncome] = useState(0);

  useEffect(() => {
    setTotalMActual([
      totalMActual13,
      totalMActual14,
      totalMActual15,
      totalMActual16,
      totalMActual17,
      totalMActual18,
      totalMActual19,
      totalMActual20,
      totalMActual21,
      totalMActual22,
      totalMActual23,
      totalMActual24,
      totalMActual25,
      totalMActual26,
      totalMActual27,
    ]);
  }, [
    totalMActual13,
    totalMActual14,
    totalMActual15,
    totalMActual16,
    totalMActual17,
    totalMActual18,
    totalMActual19,
    totalMActual20,
    totalMActual21,
    totalMActual22,
    totalMActual23,
    totalMActual24,
    totalMActual25,
    totalMActual26,
    totalMActual27,
  ]);

   useEffect(() => {
    setTotalPlan([
      totalPlan13,
      totalPlan14,
      totalPlan15,
      totalPlan16,
      totalPlan17,
      totalPlan18,
      totalPlan19,
      totalPlan20,
      totalPlan21,
      totalPlan22,
      totalPlan23,
      totalPlan24,
      totalPlan25,
      totalPlan26,
      totalPlan27,
    ]);
  }, [
    totalPlan13,
    totalPlan14,
    totalPlan15,
    totalPlan16,
    totalPlan17,
    totalPlan18,
    totalPlan19,
    totalPlan20,
    totalPlan21,
    totalPlan22,
    totalPlan23,
    totalPlan24,
    totalPlan25,
    totalPlan26,
    totalPlan27,
  ]);

  useEffect(() => {
    setTotalRatio([
      `${(totalRatio13 * 100).toFixed(2)}%`,
      `${(totalRatio14 * 100).toFixed(2)}%`,
      `${(totalRatio15 * 100).toFixed(2)}%`,
      `${(totalRatio16 * 100).toFixed(2)}%`,
      `${(totalRatio17 * 100).toFixed(2)}%`,
      `${(totalRatio18 * 100).toFixed(2)}%`,
      `${(totalRatio19 * 100).toFixed(2)}%`,
      `${(totalRatio20 * 100).toFixed(2)}%`,
      `${(totalRatio21 * 100).toFixed(2)}%`,
      `${(totalRatio22 * 100).toFixed(2)}%`,
      `${(totalRatio23 * 100).toFixed(2)}%`,
      `${(totalRatio24 * 100).toFixed(2)}%`,
      `${(totalRatio25 * 100).toFixed(2)}%`,
      `${(totalRatio26 * 100).toFixed(2)}%`,
      `${(totalRatio27 * 100).toFixed(2)}%`,
    ]);
  }, [totalRatio13]);
  useEffect(()=>{
    setTotalMActualRatio([
    `${(totalMActualRatio13 * 100).toFixed(2)}%`,
    `${(totalMActualRatio14 * 100).toFixed(2)}%`,
    `${(totalMActualRatio15 * 100).toFixed(2)}%`,
    `${(totalMActualRatio16 * 100).toFixed(2)}%`,
    `${(totalMActualRatio17 * 100).toFixed(2)}%`,
    `${(totalMActualRatio18 * 100).toFixed(2)}%`,
    `${(totalMActualRatio19 * 100).toFixed(2)}%`,
    `${(totalMActualRatio20 * 100).toFixed(2)}%`,
    `${(totalMActualRatio21 * 100).toFixed(2)}%`,
    `${(totalMActualRatio22 * 100).toFixed(2)}%`,
    `${(totalMActualRatio23 * 100).toFixed(2)}%`,
    `${(totalMActualRatio24 * 100).toFixed(2)}%`,
    `${(totalMActualRatio25 * 100).toFixed(2)}%`,
    `${(totalMActualRatio26 * 100).toFixed(2)}%`,
    `${(totalMActualRatio27 * 100).toFixed(2)}%`,

  ]);
  },[totalMActualRatio13])
  const fetchData = async () => {
    setLoading(true);
    try {
      const [orders, accountpls, accounts] = await Promise.all([
        axios.get(process.env.REACT_API_BASE_URL + `/order`),
        axios.get(process.env.REACT_API_BASE_URL + `/accountpl`),
        axios.get(process.env.REACT_API_BASE_URL + `/account`),
      ]);

      setOrderData(orders.data);
      setAccountplData(accountpls.data);
      filterOrderDataByYear(selectedYear, orders.data);
      filterAccountplDataByYear(selectedYear, accountpls.data);
      setAccountData(accounts.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const filterOrderDataByYear = (year, orderData, classification) => {
    let totalMActualSum = 0;
    const filterOrderData = orderData
      .filter((item) => {
        const itemYear = dayjs(item.依頼書作成日).year();
        return itemYear === year.year() && item.invoicePublished;
      })
      .reduce((acc, item) => {
        const createdDate = dayjs(item.依頼書作成日);
        const month = createdDate.month() + 1;

        if (!acc[month]) {
          acc[month] = {
            運送売上: 0,
            利用運送: 0,
            自社原価: 0,
            利用運送原価: 0,
            [`${month}mActual`]: 0,
            [`${month}mComparedActual`]: 0,
            [`${month}mComparedRatio`]: "100%",
            [`${month}SalesRatio`]: "0%",
          };
        }

        acc[month].運送売上 += item.基本料金1;
        acc[month].利用運送 += item["3軸料金1"] + item.その他費用;
        acc[month].自社原価 += item.下払料金1;
        acc[month].利用運送原価 += item.下払その他費用1 + item.下払高速費1;

        if (classification === "運送売上") {
          acc[month][`${month}mActual`] += acc[month].運送売上;
        } else if (classification === "利用運送") {
          acc[month][`${month}mActual`] += acc[month].利用運送;
        } else if (classification === "自社原価") {
          acc[month][`${month}mActual`] += acc[month].自社原価;
        } else if (classification === "利用運送原価（下払い）") {
          acc[month][`${month}mActual`] += acc[month].利用運送原価;
        } else if (classification === "自社原価：運送売上") {
          acc[month][`${month}mActual`] +=
            acc[month].運送売上 - acc[month].自社原価;
        } else if (classification === "利用運送原価：利用運送") {
          acc[month][`${month}mActual`] +=
            acc[month].利用運送 - acc[month].利用運送原価;
        } else if (classification === "自社原価+利用運送原価：運送売上+利用運送") {
          acc[month][`${month}mActual`] +=
            acc[month].運送売上 - acc[month].自社原価;
        }

        totalMActualSum += acc[month][`${month}mActual`];

        return acc;
      }, {});
    const finalData = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return {
        month,
        ...(filterOrderData[month] || {
          運送売上: 0,
          利用運送: 0,
          [`${month}mActual`]: 0,
          [`${month}mComparedActual`]: 0,
          [`${month}mComparedRatio`]: "0%",
          [`${month}SalesRatio`]: "0%",
        }),
      };
    });

    if (classification === "運送売上") {
      setTotalMActual1(totalMActualSum);
    } else if (classification === "利用運送") {
      setTotalMActual2(totalMActualSum);
    } else if (classification === "自社原価") {
      setTotalMActual5(totalMActualSum);
    } else if (classification === "利用運送原価（下払い）") {
      setTotalMActual6(totalMActualSum);
    } else if (classification === "売上総利益（粗利）") {
      setTotalMActual9(totalMActualSum);
    } else if (classification === "自社原価：運送売上") {
      setTotalMActual10(totalMActualSum);
    } else if (classification === "利用運送原価：利用運送") {
      setTotalMActual11(totalMActualSum);
    } else if (classification === "自社原価+利用運送原価：運送売上+利用運送") {
      setTotalMActual12(totalMActualSum);
    }
    
    return finalData;
  };
  const filterAccountplDataByYear = (year, accountplData, classification) => {
    const filterAccountplData = accountplData
      .filter((item) => {
        const itemYear = item.accountYear;
        return String(itemYear) == String(year.year());
        
      })
      .reduce((acc, item) => {
        const month = item.accountMonth;
        if (month === "") {
          
          if (
            classification === "運送売上" &&
            item.accountList === "運送売上"
          ) {
            setTotalPlan1(item.accountAmount);
            setTotalRatio1(`${((totalPlan1 / totalPlan4) * 100).toFixed(2)}%`);
          } else if (
            classification === "利用運送" &&
            item.accountList === "利用運送"
          ) {
            setTotalPlan2(item.accountAmount);
            setTotalRatio2(`${((totalPlan2 / totalPlan4) * 100).toFixed(2)}%`);
          } else if (
            classification === "その他売上" &&
            item.accountList === "その他売上"
          ) {
            setTotalPlan3(item.accountAmount);
            setTotalRatio3(`${((totalPlan3 / totalPlan4) * 100).toFixed(2)}%`);
          } else if (
            classification === "自社原価" &&
            item.accountList === "自社原価"
          ) {
            setTotalPlan5(item.accountAmount);
            setTotalRatio5(`${((totalPlan5 / totalPlan8) * 100).toFixed(2)}%`);
          } else if (
            classification === "利用運送原価（下払い）" &&
            item.accountList === "利用運送原価（下払い）"
          ) {
            setTotalPlan6(item.accountAmount);
            setTotalRatio6(`${((totalPlan6 / totalPlan8) * 100).toFixed(2)}%`);
          } else if (
            classification === "その他原価" &&
            item.accountList === "その他原価"
          ) {
            setTotalPlan7(item.accountAmount);
            setTotalRatio7(`${((totalPlan7 / totalPlan8) * 100).toFixed(2)}%`);
          } else if (
            classification === "役員報酬" &&
            item.accountList === "役員報酬"
          ) {
            setTotalPlan13(item.accountAmount);
          } else if (
            classification === "従業員人件費" &&
            item.accountList === "従業員人件費"
          ) {
            console.log("compare" ,item);
            setTotalPlan14(item.accountAmount);
          } else if (
            classification === "賃借料" &&
            item.accountList === "賃借料"
          ) {
            setTotalPlan15(item.accountAmount);
          } else if (
            classification === "保険料" &&
            item.accountList === "保険料"
          ) {
            setTotalPlan16(item.accountAmount);
          } else if (
            classification === "修繕費" &&
            item.accountList === "修繕費"
          ) {
            setTotalPlan17(item.accountAmount);
          } else if (
            classification === "租税公課" &&
            item.accountList === "租税公課"
          ) {
            setTotalPlan18(item.accountAmount);
          } else if (
            classification === "減価償却費" &&
            item.accountList === "減価償却費"
          ) {
            setTotalPlan19(item.accountAmount);
          } else if (
            classification === "旅費交通費" &&
            item.accountList === "旅費交通費"
          ) {
            setTotalPlan20(item.accountAmount);
          } else if (
            classification === "通信費" &&
            item.accountList === "通信費"
          ) {
            setTotalPlan21(item.accountAmount);
          } else if (
            classification === "リース料" &&
            item.accountList === "リース料"
          ) {
            setTotalPlan22(item.accountAmount);
          } else if (
            classification === "弁償金" &&
            item.accountList === "弁償金"
          ) {
            setTotalPlan23(item.accountAmount);
          } else if (
            classification === "支払作業料" &&
            item.accountList === "支払作業料"
          ) {
            setTotalPlan24(item.accountAmount);
          } else if (
            classification === "支払手数料" &&
            item.accountList === "支払手数料"
          ) {
            setTotalPlan25(item.accountAmount);
          } else if (
            classification === "接待交際費" &&
            item.accountList === "接待交際費"
          ) {
            setTotalPlan26(item.accountAmount);
          } else if (
            classification === "その他経費" &&
            item.accountList === "その他経費"
          ) {
            setTotalPlan27(item.accountAmount);
          } else if (
            classification === "営業外収益" &&
            item.accountList === "営業外収益"
          ) {
            setTotalPlanOperatingIncome(item.accountAmount);
          } else if (
            classification === "営業外費用（▲）" &&
            item.accountList === "営業外費用（▲）"
          ) {
            setTotalPlanOperatingExpenses(item.accountAmount);
          } else if (
            classification === "特別利益" &&
            item.accountList === "特別利益"
          ) {
            setTotalPlanExtraordinaryProfit(item.accountAmount);
          } else if (
            classification === "特別損失（▲）" &&
            item.accountList === "特別損失（▲）"
          ) {
            setTotalPlanExtraordinaryLosses(item.accountAmount);
          } else if (
            classification === "法人税等" &&
            item.accountList === "法人税等"
          ) {
            setTotalPlanCorporateTax(item.accountAmount);
          }
        }
        if (!acc?.hasOwnProperty(month)) {
          acc = {
            ...acc,
            [month]: {
              accountAmount: 0,
              [`${month}mActual`]: 0,
              [`${month}mComparedActual`]: 0,
              [`${month}mComparedRatio`]: "100%",
              [`${month}SalesRatio`]: "50%",
            },
          };
        }

        acc[month].accountAmount += item.accountAmount;

        if (
          classification === "その他売上" &&
          item.accountList === "その他売上"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "その他原価" &&
          item.accountList === "その他原価"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "役員報酬" &&
          item.accountList === "役員報酬"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "従業員人件費" &&
          item.accountList === "従業員人件費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "賃借料" &&
          item.accountList === "賃借料"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "保険料" &&
          item.accountList === "保険料"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "修繕費" &&
          item.accountList === "修繕費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "租税公課" &&
          item.accountList === "租税公課"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "減価償却費" &&
          item.accountList === "減価償却費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "旅費交通費" &&
          item.accountList === "旅費交通費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "通信費" &&
          item.accountList === "通信費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "リース料" &&
          item.accountList === "リース料"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "弁償金" &&
          item.accountList === "弁償金"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "支払作業料" &&
          item.accountList === "支払作業料"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "支払手数料" &&
          item.accountList === "支払手数料"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "接待交際費" &&
          item.accountList === "接待交際費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "その他経費" &&
          item.accountList === "その他経費"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "営業外収益" &&
          item.accountList === "営業外収益"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "営業外費用（▲）" &&
          item.accountList === "営業外費用（▲）"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "特別利益" &&
          item.accountList === "特別利益"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "特別損失（▲）" &&
          item.accountList === "特別損失（▲）"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        } else if (
          classification === "法人税等" &&
          item.accountList === "法人税等"
        ) {
          acc[month][`${month}mActual`] += item.accountAmount;
        }

        return acc;
      }, {});

    const finalData = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return {
        month,
        ...(filterAccountplData[month] || {
          accountAmount: 0,
          [`${month}mActual`]: 0,
          [`${month}mComparedActual`]: 0,
          [`${month}mComparedRatio`]: "0%",
          [`${month}SalesRatio`]: "0%",
        }),
      };
    });

    const totalMActualSum = finalData.reduce((sum, monthData) => {
      return sum + monthData[`${monthData.month}mActual`];
    }, 0);

    if (classification === "その他売上") {
      setTotalMActual3(totalMActualSum);
      setTotalMActualRatio3(
        `${((totalMActual3 / totalMActual4) * 100).toFixed(2)}%`
      );
    } else if (classification === "その他原価") {
      setTotalMActual7(totalMActualSum);
      setTotalMActualRatio7(
        `${((totalMActual7 / totalMActual8) * 100).toFixed(2)}%`
      );
    } else if (classification === "役員報酬") {
      setTotalMActual13(totalMActualSum);
    } else if (classification === "従業員人件費") {
      setTotalMActual14(totalMActualSum);
    } else if (classification === "賃借料") {
      setTotalMActual15(totalMActualSum);
    } else if (classification === "保険料") {
      setTotalMActual16(totalMActualSum);
    } else if (classification === "修繕費") {
      setTotalMActual17(totalMActualSum);
    } else if (classification === "租税公課") {
      setTotalMActual18(totalMActualSum);
    } else if (classification === "減価償却費") {
      setTotalMActual19(totalMActualSum);
    } else if (classification === "旅費交通費") {
      setTotalMActual20(totalMActualSum);
    } else if (classification === "通信費") {
      setTotalMActual21(totalMActualSum);
    } else if (classification === "リース料") {
      setTotalMActual22(totalMActualSum);
    } else if (classification === "弁償金") {
      setTotalMActual23(totalMActualSum);
    } else if (classification === "支払作業料") {
      setTotalMActual24(totalMActualSum);
    } else if (classification === "支払手数料") {
      setTotalMActual25(totalMActualSum);
    } else if (classification === "接待交際費") {
      setTotalMActual26(totalMActualSum);
    } else if (classification === "その他経費") {
      setTotalMActual27(totalMActualSum);
    } else if (classification === "営業外収益") {
      setTotalMActualOperatingIncome(totalMActualSum);
    } else if (classification === "営業外費用（▲）") {
      setTotalMActualOperatingExpenses(totalMActualSum);
    } else if (classification === "特別利益") {
      setTotalMActualExtraordinaryProfit(totalMActualSum);
    } else if (classification === "特別損失（▲）") {
      setTotalMActualExtraordinaryLosses(totalMActualSum);
    } else if (classification === "法人税等") {
      setTotalMActualCorporateTax(totalMActualSum);
    }
    return finalData;
  };

  const calculateTotalSalesByMonth = (data1, data2, data3) => {
    return data1.map((item, index) => {
      const month = item.month;
      const totalActual =
        item[`${month}mActual`] +
        (data2[index] ? data2[index][`${month}mActual`] : 0) +
        (data3[index] ? data3[index][`${month}mActual`] : 0);
      return {
        month,
        [`${month}mActual`]: totalActual,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "100%",
      };
    });
  };

  const calculateGrossProfitByMonth = (
    data1,
    data2,
    data3,
    data4,
    data5,
    data6
  ) => {
    return data1.map((item, index) => {
      const month = item.month;
      const totalGrossProfit =
        item[`${month}mActual`] +
        (data2[index] ? data2[index][`${month}mActual`] : 0) +
        (data3[index] ? data3[index][`${month}mActual`] : 0) -
        (data4[index] ? data4[index][`${month}mActual`] : 0) -
        (data5[index] ? data5[index][`${month}mActual`] : 0) -
        (data6[index] ? data6[index][`${month}mActual`] : 0);
      return {
        month,
        [`${month}mActual`]: totalGrossProfit,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "0%",
      };
    });
  };

  const calculatePLSumByMonth = (
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
    data11,
    data12,
    data13,
    data14,
    data15
  ) => {
    return data1.map((item, index) => {
      const month = item.month;
      const PLSum =
        item[`${month}mActual`] +
        (data2[index] ? data2[index][`${month}mActual`] : 0) +
        (data3[index] ? data3[index][`${month}mActual`] : 0) +
        (data4[index] ? data4[index][`${month}mActual`] : 0) +
        (data5[index] ? data5[index][`${month}mActual`] : 0) +
        (data6[index] ? data6[index][`${month}mActual`] : 0);
      +(data7[index] ? data2[index][`${month}mActual`] : 0) +
        (data8[index] ? data3[index][`${month}mActual`] : 0) +
        (data9[index] ? data4[index][`${month}mActual`] : 0) +
        (data10[index] ? data5[index][`${month}mActual`] : 0) +
        (data11[index] ? data6[index][`${month}mActual`] : 0);
      +(data12[index] ? data2[index][`${month}mActual`] : 0) +
        (data13[index] ? data3[index][`${month}mActual`] : 0) +
        (data14[index] ? data4[index][`${month}mActual`] : 0) +
        (data15[index] ? data5[index][`${month}mActual`] : 0);
      return {
        month,
        [`${month}mActual`]: PLSum,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "0%",
      };
    });
  };

  const calculateOperatingProfitByMonth = (data1, data2) => {
    return data1.map((item, index) => {
      const month = item.month;
      const operatingProfit =
        item[`${month}mActual`] -
        (data2[index] ? data2[index][`${month}mActual`] : 0);

      return {
        month,
        [`${month}mActual`]: operatingProfit,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "0%",
      };
    });
  };

  const calculateOrdinaryProfitByMonth = (data1, data2, data3) => {
    return data1.map((item, index) => {
      const month = item.month;
      const ordinaryProfit =
        item[`${month}mActual`] +
        (data2[index] ? data2[index][`${month}mActual`] : 0) -
        (data3[index] ? data2[index][`${month}mActual`] : 0);
      return {
        month,
        [`${month}mActual`]: ordinaryProfit,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "0%",
      };
    });
  };

  const calculateIncomebeforeProfitByMonth = (data1, data2, data3) => {
    return data1.map((item, index) => {
      const month = item.month;
      const incomebeforeProfit =
        item[`${month}mActual`] +
        (data2[index] ? data2[index][`${month}mActual`] : 0) -
        (data3[index] ? data2[index][`${month}mActual`] : 0);

      return {
        month,
        [`${month}mActual`]: incomebeforeProfit,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "0%",
      };
    });
  };

  const calculateCurrentProfitByMonth = (data1, data2) => {
    return data1.map((item, index) => {
      const month = item.month;
      const currentProfit =
        item[`${month}mActual`] -
        (data2[index] ? data2[index][`${month}mActual`] : 0);
      return {
        month,
        [`${month}mActual`]: currentProfit,
        [`${month}mComparedActual`]: 0,
        [`${month}mComparedRatio`]: "0%",
        [`${month}SalesRatio`]: "0%",
      };
    });
  };

  const handleFormSubmit = async (values) => {
    const data = Object.entries(values).map(([key, value]) => {
      setLoading(true);
      const [accountList, year, month] = key.split("-");
      const accountYear = year;
      const accountMonth = month ? month.replace("mActual", "") : "";
      const accountAmount = parseInt(value);
      return {
        accountList,
        accountYear,
        accountMonth,
        accountAmount,
      };
    });
    console.log("data====>", data);
    try {
      const response = await fetch(
        `${process.env.REACT_API_BASE_URL}/accountpl`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
    console.log("Data to be updated:", data);
    setEdit(false);
    setPlanEdit(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
    setPlanEdit(!planEdit);
  };

  const handleDateChange = (date) => {
    setSelectedYear(date);
    console.log(date);
  };
  useEffect(() => {
     setTotalSalesProfit(totalMActual1 + totalMActual2 + totalMActual3 - totalMActual5 - totalMActual6 - totalMActual7);
     setTotalPlan4(totalPlan1 + totalPlan2 + totalPlan3);
     setTotalPlan8(totalPlan5 + totalPlan6 + totalPlan7);
     setTotalPlan9(totalPlan4 - totalPlan8);
     setTotalPlan10( totalPlan1 - totalPlan5);
     setTotalPlan11( totalPlan2 - totalPlan6);
     setTotalPlan12( totalPlan1 - totalPlan5);
     setTotalPlanPLSum(totalPlan13 + totalPlan14 + totalPlan15 + totalPlan16 + totalPlan17 + totalPlan18 + totalPlan19 + totalPlan20 + totalPlan21 + totalPlan22 + totalPlan23 + totalPlan24 + totalPlan25 + totalPlan26 + totalPlan27);
     setTotalPlanOperatingProfit(totalPlan9 - totalPlanPLSum);
     setTotalPlanOperatingIncome(totalPlanOperatingIncome);
     setTotalPlanOperatingExpenses(totalPlanOperatingExpenses);
     setTotalPlanOrdinaryProfit(totalPlanOperatingProfit + totalPlanOperatingIncome - totalPlanOperatingExpenses);
     setTotalPlanExtraordinaryProfit(totalPlanExtraordinaryProfit);
     setTotalPlanExtraordinaryLosses(totalPlanExtraordinaryLosses);
     setTotalPlanPretaxProfit( totalPlanOrdinaryProfit + totalPlanExtraordinaryProfit - totalPlanExtraordinaryLosses);
     setTotalMActualNetIncome(totalMActualPretaxProfit - totalMActualCorporateTax);
     setTotalPlanCorporateTax(totalPlanCorporateTax);
     setTotalPlanNetIncome(totalPlanPretaxProfit - totalPlanCorporateTax);

    },[totalPlan13 , totalPlan4 , totalPlan8])
 
  useEffect(() => {
    setTotalRatio9(`${(((totalPlan4 - totalPlan8) / totalPlan8) * 100).toFixed(2)}%`);
    setTotalRatio10(`${(((totalPlan1 - totalPlan5) / totalPlan1) * 100).toFixed(2)}%`);
    setTotalRatio11(`${(((totalPlan2 - totalPlan6) / totalPlan1) * 100).toFixed(2)}%`);
    setTotalRatio12(`${(((totalPlan1 - totalPlan5) / totalPlan1) * 100).toFixed(2)}%`);
    setTotalRatio13(totalPlan13 / totalPlan4);
    setTotalRatio14(totalPlan14 / totalPlan4);
    setTotalRatio15(totalPlan15 / totalPlan4);
    setTotalRatio16(totalPlan16 / totalPlan4);
    setTotalRatio17(totalPlan17 / totalPlan4);
    setTotalRatio18(totalPlan18 / totalPlan4);
    setTotalRatio19(totalPlan19 / totalPlan4);
    setTotalRatio20(totalPlan20 / totalPlan4);
    setTotalRatio21(totalPlan21 / totalPlan4);
    setTotalRatio22(totalPlan22 / totalPlan4);
    setTotalRatio23(totalPlan23 / totalPlan4);
    setTotalRatio24(totalPlan24 / totalPlan4);
    setTotalRatio25(totalPlan25 / totalPlan4);
    setTotalRatio26(totalPlan26 / totalPlan4);
    setTotalRatio27(totalPlan27 / totalPlan4);
    setTotalRatioPLSum(`${((totalPlanPLSum / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioOperatingProfit(`${((totalPlanOperatingProfit / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioOperatingIncome(`${((totalPlanOperatingIncome / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioOperatingExpenses(`${((totalPlanOperatingExpenses / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioOrdinaryProfit(`${((totalPlanOrdinaryProfit / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioExtraordinaryProfit(`${((totalPlanExtraordinaryProfit / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioExtraordinaryLosses(`${((totalPlanExtraordinaryLosses / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioPretaxProfit(`${((totalPlanPretaxProfit / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioCorporateTax(`${((totalPlanCorporateTax / totalPlan4) * 100).toFixed(2)}%`);
    setTotalRatioNetIncome(`${((totalPlanNetIncome / totalPlan4) * 100).toFixed(2)}%`);
  }, [totalPlan13, totalPlan4 ,totalPlan14, totalPlanPLSum , totalPlan4 , totalPlanOperatingProfit, totalPlanOperatingIncome, totalPlanOperatingExpenses, totalPlanOrdinaryProfit, totalPlanPretaxProfit, totalPlanCorporateTax, totalPlanNetIncome]);

  useEffect(() => {
     setTotalMActual4( totalMActual1 + totalMActual2 + totalMActual3);
     setTotalMActual8( totalMActual5 + totalMActual6 + totalMActual7);
     setTotalMActualPLSum(totalMActual13 + totalMActual14 + totalMActual15 + totalMActual16 + totalMActual17 + totalMActual18 + totalMActual19 + totalMActual20 + totalMActual21 + totalMActual22 + totalMActual23 + totalMActual24 + totalMActual25 + totalMActual26 + totalMActual27);
     setTotalMActualOperatingProfit(totalMActual9 - totalMActualPLSum);
     setTotalMActualOrdinaryProfit(totalMActualOperatingProfit + totalMActualOperatingIncome - totalMActualOperatingExpenses);
     setTotalMActualPretaxProfit(totalMActualOrdinaryProfit + totalMActualExtraordinaryProfit - totalMActualExtraordinaryLosses);
     setTotalMActualNetIncome(totalMActualPretaxProfit - totalMActualCorporateTax);
  } ,[totalMActual1 , totalMActual2 , totalMActual3 , totalMActual5 , totalMActual6 , totalMActual7, totalMActual9, totalMActualPLSum])

  useEffect(() => {
    setTotalMActualRatio6(`${((totalMActual6 / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio5(`${((totalMActual5 / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio2(`${((totalMActual2 / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio1(`${((totalMActual1 / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio9(`${(((totalMActual4 - totalMActual8) / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio10(`${(((totalMActual4 - totalMActual5) / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio11(`${(((totalMActual4 - totalMActual6) / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio12(`${(((totalMActual4 - totalMActual5) / totalMActual4) * 100).toFixed(2)}%`);
    setTotalMActualRatio13(totalMActual13 / totalPlan4);
    setTotalMActualRatio14(totalMActual14 / totalPlan4);
    setTotalMActualRatio15(totalMActual15 / totalPlan4);
    setTotalMActualRatio16(totalMActual16 / totalPlan4);
    setTotalMActualRatio17(totalMActual17 / totalPlan4);
    setTotalMActualRatio18(totalMActual18 / totalPlan4);
    setTotalMActualRatio19(totalMActual19 / totalPlan4);
    setTotalMActualRatio20(totalMActual20 / totalPlan4);
    setTotalMActualRatio21(totalMActual21 / totalPlan4);
    setTotalMActualRatio22(totalMActual22 / totalPlan4);
    setTotalMActualRatio23(totalMActual23 / totalPlan4);
    setTotalMActualRatio24(totalMActual24 / totalPlan4);
    setTotalMActualRatio25(totalMActual25 / totalPlan4);
    setTotalMActualRatio26(totalMActual26 / totalPlan4);
    setTotalMActualRatio27(totalMActual27 / totalMActual4);
    setTotalMActualRatioPLSum(`${((totalMActualPLSum / totalMActual4) * 100).toFixed(2)}%`)
    setTotalMActualRatioOperatingProfit(`${((totalMActualOperatingProfit / totalMActual4) * 100).toFixed(2)}%`)
    setTotalMActualRatioOperatingIncome(`${((totalMActualOperatingIncome / totalMActual4) * 100).toFixed(2)}%`)
    setTotalMActualRatioOperatingExpenses(`${((totalMActualOperatingExpenses / totalMActual4) * 100).toFixed(2)}%`)
    setTotalMActualRatioOrdinaryProfit(`${((totalMActualOrdinaryProfit / totalMActual4) * 100).toFixed(2)}%`)
    setTotalMActualRatioExtraordinaryProfit(`${((totalMActualExtraordinaryProfit / totalMActual4) * 100).toFixed(2)}%`) 
    setTotalMActualRatioExtraordinaryLosses(`${((totalMActualExtraordinaryLosses / totalMActual4) * 100).toFixed(2)}%`) 
    setTotalMActualRatioPretaxProfit(`${((totalMActualPretaxProfit / totalMActual4) * 100).toFixed(2)}%`) 
    setTotalMActualRatioCorporateTax(`${((totalMActualCorporateTax / totalMActual4) * 100).toFixed(2)}%`) 
    setTotalMActualRatioNetIncome(`${((totalMActualNetIncome / totalMActual4) * 100).toFixed(2)}%`) 
  }, [totalMActual13, totalPlan4 , totalMActual8 ,totalMActual4, totalMActualPLSum, totalMActualOperatingProfit, totalMActualOperatingIncome, totalMActualOperatingExpenses, totalMActualExtraordinaryProfit, totalMActualOrdinaryProfit, totalMActualPretaxProfit, totalMActualCorporateTax])
  useEffect(() => {
    const filteredData1 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "運送売上"
    );
    const filteredData2 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "利用運送"
    );
    const filteredData3 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "その他売上"
    );
    const filteredData4 = calculateTotalSalesByMonth(
      filteredData1,
      filteredData2,
      filteredData3
    );
    const filteredData5 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "自社原価"
    );
    const filteredData6 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "利用運送原価（下払い）"
    );
    const filteredData7 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "その他原価"
    );
    const filteredData8 = calculateTotalSalesByMonth(
      filteredData5,
      filteredData6,
      filteredData7
    );
    const filteredData9 = calculateGrossProfitByMonth(
      filteredData1,
      filteredData2,
      filteredData3,
      filteredData5,
      filteredData6,
      filteredData7
    );
    const filteredData10 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "自社原価：運送売上"
    );
    const filteredData11 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "利用運送原価：利用運送"
    );
    const filteredData12 = filterOrderDataByYear(
      selectedYear,
      orderData,
      "自社原価+利用運送原価：運送売上+利用運送"
    );
    const filteredData13 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "役員報酬"
    );
    const filteredData14 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "従業員人件費"
    );
    const filteredData15 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "賃借料"
    );
    const filteredData16 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "保険料"
    );
    const filteredData17 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "修繕費"
    );
    const filteredData18 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "租税公課"
    );
    const filteredData19 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "減価償却費"
    );
    const filteredData20 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "旅費交通費"
    );
    const filteredData21 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "通信費"
    );
    const filteredData22 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "リース料"
    );
    const filteredData23 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "弁償金"
    );
    const filteredData24 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "支払作業料"
    );
    const filteredData25 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "支払手数料"
    );
    const filteredData26 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "接待交際費"
    );
    const filteredData27 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "その他経費"
    );
    const filteredDataPLSum = calculatePLSumByMonth(
      filteredData13,
      filteredData14,
      filteredData15,
      filteredData16,
      filteredData17,
      filteredData18,
      filteredData19,
      filteredData20,
      filteredData21,
      filteredData22,
      filteredData23,
      filteredData24,
      filteredData25,
      filteredData26,
      filteredData27
    );
    const filteredDataOperatingProfit = calculateOperatingProfitByMonth(
      filteredData9,
      filteredDataPLSum
    );
    const filteredDataOperatingIncome = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "営業外収益"
    );
    const filteredDataOperatingExpenses = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "営業外費用（▲）"
    );
    const filteredDataOrdinaryProfit = calculateOrdinaryProfitByMonth(
      filteredDataOperatingProfit,
      filteredDataOperatingIncome,
      filteredDataOperatingExpenses
    );
    const filteredDataExtraordinaryProfit = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "特別利益"
    );
    const filteredDataExtraordinaryLosses = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "特別損失（▲）"
    );
    const filteredDataPretaxProfit = calculateIncomebeforeProfitByMonth(
      filteredDataOrdinaryProfit,
      filteredDataExtraordinaryProfit,
      filteredDataExtraordinaryLosses
    );
    const filteredDataCorporateTax = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "法人税等"
    );
    const filteredDataNetIncome = calculateCurrentProfitByMonth(
      filteredDataCorporateTax,
      filteredDataPretaxProfit
    );
    const totalPlan1 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "運送売上"
    );
    const totalPlan2 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "利用運送"
    );
    const totalPlan3 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "その他売上"
    );
    const totalPlan5 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "自社原価"
    );
    const totalPlan6 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "利用運送原価（下払い）"
    );
    const totalPlan7 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "その他原価"
    );
    const totalPlan13 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "役員報酬"
    );
    const totalPlan14 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "従業員人件費"
    );
    const totalPlan15 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "賃借料"
    );
    const totalPlan16 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "保険料"
    );
    const totalPlan17 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "修繕費"
    );
    const totalPlan18 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "租税公課"
    );
    const totalPlan19 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "減価償却費"
    );
    const totalPlan20 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "旅費交通費"
    );
    const totalPlan21 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "通信費"
    );
    const totalPlan22 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "リース料"
    );
    const totalPlan23 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "弁償金"
    );
    const totalPlan24 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "支払作業料"
    );
    const totalPlan25 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "支払手数料"
    );
    const totalPlan26 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "接待交際費"
    );
    const totalPlan27 = filterAccountplDataByYear(
      selectedYear,
      accountplData,
      "その他経費"
    );

    const allFilteredData = [
      filteredData1, filteredData2, filteredData3, filteredData4, filteredData5, filteredData6, filteredData7, filteredData8, filteredData9, filteredData10, filteredData11, filteredData12, filteredData13,filteredData14, filteredData15, filteredData16, filteredData17, filteredData18, filteredData19, filteredData20, filteredData21, filteredData22, filteredData23, filteredData24, filteredData25, filteredData26, filteredData27, filteredDataPLSum, filteredDataOperatingProfit, filteredDataOperatingIncome, filteredDataOperatingExpenses, filteredDataOrdinaryProfit, filteredDataExtraordinaryProfit, filteredDataExtraordinaryLosses, filteredDataPretaxProfit, filteredDataCorporateTax, filteredDataNetIncome];

    filteredData4.forEach((e, i) => {
      allFilteredData.forEach((filteredData) => {
        filteredData[i][`${e.month}SalesRatio`] = `${(
          (filteredData[i][`${e.month}mActual`] / e[`${e.month}mActual`]) *
          100
        ).toFixed(2)}%`;
      });
    });

    setFilteredData([
      filteredData13,
      filteredData14,
      filteredData15,
      filteredData16,
      filteredData17,
      filteredData18,
      filteredData19,
      filteredData20,
      filteredData21,
      filteredData22,
      filteredData23,
      filteredData24,
      filteredData25,
      filteredData26,
      filteredData27,
    ]);
    setFilteredData1(filteredData1);
    setFilteredData2(filteredData2);
    setFilteredData3(filteredData3);
    setFilteredData4(filteredData4);
    setFilteredData5(filteredData5);
    setFilteredData6(filteredData6);
    setFilteredData7(filteredData7);
    setFilteredData8(filteredData8);
    setFilteredData9(filteredData9);
    setFilteredData10(filteredData10);
    setFilteredData11(filteredData11);
    setFilteredData12(filteredData12);
    setFilteredDataPLSum(filteredDataPLSum);
    setFilteredDataOperatingProfit(filteredDataOperatingProfit);
    setFilteredDataOperatingIncome(filteredDataOperatingIncome);
    setFilteredDataOperatingExpenses(filteredDataOperatingExpenses);
    setFilteredDataOrdinaryProfit(filteredDataOrdinaryProfit);
    setFilteredDataExtraordinaryProfit(filteredDataExtraordinaryProfit);
    setFilteredDataExtraordinaryLosses(filteredDataExtraordinaryLosses);
    setFilteredDataPretaxProfit(filteredDataPretaxProfit);
    setFilteredDataCorporateTax(filteredDataCorporateTax);
    setFilteredDataNetIncome(filteredDataNetIncome);
  }, [selectedYear, orderData, accountplData]);

  useEffect(() => {
    if (edit == false) fetchData();
  }, [edit]);

  // Sample data
  const data = [
    {
      key: "1",
      subject: "売上高",
      code: "",
      classification: "運送売上",
      name: "",
      plan: totalPlan1,
      ratio: totalRatio1,
      actual: totalMActual1,
      actualRatio: totalMActualRatio1,
      monthlyData: filteredData1,
      type: 0,
      rowSpan: 4,
      planType: 1,
    },
    {
      key: "2",
      subject: "",
      code: "",
      classification: "利用運送",
      name: "",
      plan: totalPlan2,
      ratio: totalRatio2,
      actual: totalMActual2,
      actualRatio: totalMActualRatio2,
      monthlyData: filteredData2,
      type: 0,
      rowSpan: 0,
      planType: 1,
    },
    {
      key: "3",
      subject: "",
      code: "",
      classification: "その他売上",
      name: "",
      plan: totalPlan3,
      ratio: totalRatio3,
      actual: totalMActual3,
      actualRatio: totalMActualRatio3,
      monthlyData: filteredData3,
      type: 1,
      rowSpan: 0,
      planType: 1,
    },
    {
      key: "4",
      subject: "",
      code: "",
      classification: "売上高合計",
      name: "",
      plan: totalPlan4,
      ratio: "100%",
      actual: totalMActual4,
      actualRatio: "100%",
      monthlyData: filteredData4,
      type: 0,
      rowSpan: 0,
      planType: 0,
    },
    // 売上原価
    {
      key: "5",
      subject: "売上原価",
      code: "",
      classification: "自社原価",
      name: "",
      plan: totalPlan5,
      ratio: totalRatio5,
      actual: totalMActual5,
      actualRatio: totalMActualRatio5,
      monthlyData: filteredData5,
      type: 0,
      rowSpan: 4,
      planType: 1,
    },
    {
      key: "6",
      subject: "",
      code: "",
      classification: "利用運送原価（下払い）",
      name: "",
      plan: totalPlan6,
      ratio: totalRatio6,
      actual: totalMActual6,
      actualRatio: totalMActualRatio6,
      monthlyData: filteredData6,
      type: 0,
      rowSpan: 0,
      planType: 1,
    },
    {
      key: "7",
      subject: "",
      code: "",
      classification: "その他原価",
      name: "",
      plan: totalPlan7,
      ratio: totalRatio7,
      actual: totalMActual7,
      actualRatio: totalMActualRatio7,
      monthlyData: filteredData7,
      type: 1,
      rowSpan: 0,
      planType: 1,
    },
    {
      key: "8",
      subject: "",
      code: "",
      classification: "売上原価合計",
      name: "",
      plan: totalPlan8,
      ratio: "100%",
      actual: totalMActual8,
      actualRatio: "100%",
      monthlyData: filteredData8,
      type: 0,
      rowSpan: 0,
      planType: 0,
    },
    // 売上総利益（粗利）
    {
      key: "9",
      subject: "売上総利益（粗利）",
      code: "",
      classification: "売上総利益（粗利）",
      name: "",
      plan: totalPlan9,
      ratio: totalRatio9,
      actual: totalSalesProfit,
      actualRatio: totalMActualRatio9,
      monthlyData: filteredData9,
      type: 0,
      rowSpan: 4,
      planType: 0,
    },
    {
      key: "10",
      subject: "",
      code: "",
      classification: "自社原価：運送売上",
      name: "",
      plan: totalPlan10,
      ratio: totalRatio10,
      actual: totalMActual10,
      actualRatio: totalMActualRatio10,
      monthlyData: filteredData10,
      type: 0,
      rowSpan: 0,
      planType: 0,
    },
    {
      key: "11",
      subject: "",
      code: "",
      classification: "利用運送原価：利用運送",
      name: "",
      plan: totalPlan11,
      ratio: totalRatio11,
      actual: totalMActual11,
      actualRatio: totalMActualRatio11,
      monthlyData: filteredData11,
      type: 0,
      rowSpan: 0,
      planType: 0,
    },
    {
      key: "12",
      subject: "",
      code: "",
      classification: "自社原価+利用運送原価：運送売上+利用運送",
      name: "",
      plan: totalPlan12,
      ratio: totalRatio12,
      actual: totalMActual12,
      actualRatio: totalMActualRatio12,
      monthlyData: filteredData12,
      type: 0,
      rowSpan: 0,
      planType: 0,
    },
  ];

  useEffect(() => {
    if (accountData) {
      const tpData1 =
        accountData
          ?.filter((account) => account.科目 === "販売管理費")
          ?.map((account, index) => {
            return {
              key: (index + 13).toString(),
              subject: index === 0 ? "販売管理費" : "",
              code: account.勘定科目コード || "",
              classification: account.勘定科目分類 || "",
              name: " ",
              plan: totalPlan[index],
              ratio: totalRatio[index],
              actual: totalMActual[index],
              actualRatio: totalMActualRatio[index],
              monthlyData: filteredData[index],
              type: 1,
              planType: 1,
              rowSpan:
                index === 0
                  ? accountData?.filter(
                      (account) => account.科目 === "販売管理費"
                    ).length
                  : 0,
            };
          }) || [];
      setTpData1(tpData1);
    }
  }, [accountData]);

  useEffect(() => {
    if (accountData) {
      const tpData2 =
        accountData
          ?.filter((account) => account.科目 === "一般管理費")
          ?.map((account, index) => {
            return {
              key: (index + 21).toString(),
              subject: index === 0 ? "一般管理費" : "",
              code: account.勘定科目コード || "",
              classification: account.勘定科目分類 || "",
              name: " ",
              plan: totalPlan[index + 7],
              ratio: totalRatio[index + 7],
              actual: totalMActual[index + 7],
              actualRatio: totalMActualRatio[index + 7],
              monthlyData: filteredData[index + 7],
              type: 1,
              planType: 1,
              rowSpan:
                index === 0
                  ? accountData?.filter(
                      (account) => account.科目 === "一般管理費"
                    ).length
                  : 0,
            };
          }) || [];
      setTpData2(tpData2);
    }
  }, [accountData]);

  const tpData3 = [
    {
      key: "28",
      subject: "",
      code: "",
      classification: "合計",
      name: "",
      plan: totalPlanPLSum,
      ratio: totalRatioPLSum,
      actual: totalMActualPLSum,
      actualRatio: totalMActualRatioPLSum,
      monthlyData: filteredDataPLSum,
      type: 0,
      rowSpan: 1,
      planType: 1,
    },
    {
      key: "29",
      subject: "営業利益",
      code: "",
      classification: "営業利益",
      name: "",
      plan: totalPlanOperatingProfit,
      ratio: totalRatioOperatingProfit,
      actual: totalMActualOperatingProfit,
      actualRatio: totalMActualRatioOperatingProfit,
      monthlyData: filteredDataOperatingProfit,
      type: 0,
      rowSpan: 1,
      planType: 0,
    },
    {
      key: "30",
      subject: "営業外収益",
      code: "",
      classification: "営業外収益",
      name: "",
      plan: totalPlanOperatingIncome,
      ratio: totalRatioOperatingIncome,
      actual: totalMActualOperatingIncome,
      actualRatio: totalMActualRatioOperatingIncome,
      monthlyData: filteredDataOperatingIncome,
      type: 1,
      rowSpan: 1,
      planType: 1,
    },
    {
      key: "31",
      subject: "営業外費用（▲）",
      code: "",
      classification: "営業外費用（▲）",
      name: "",
      plan: totalPlanOperatingExpenses,
      ratio: totalRatioOperatingExpenses,
      actual: totalMActualOperatingExpenses,
      actualRatio: totalMActualRatioOperatingExpenses,
      monthlyData: filteredDataOperatingExpenses,
      type: 1,
      rowSpan: 1,
      planType: 1,
    },
    {
      key: "32",
      subject: "経常利益",
      code: "",
      classification: "経常利益",
      name: "",
      plan: totalPlanOrdinaryProfit,
      ratio: totalRatioOrdinaryProfit,
      actual: totalMActualOrdinaryProfit,
      actualRatio: totalMActualRatioOrdinaryProfit,
      monthlyData: filteredDataOrdinaryProfit,
      type: 0,
      rowSpan: 1,
      planType: 0,
    },
    {
      key: "33",
      subject: "特別利益",
      code: "",
      classification: "特別利益",
      name: "",
      plan: totalPlanExtraordinaryProfit,
      ratio: totalRatioExtraordinaryProfit,
      actual: totalMActualExtraordinaryProfit,
      actualRatio: totalMActualRatioExtraordinaryProfit,
      monthlyData: filteredDataExtraordinaryProfit,
      type: 1,
      rowSpan: 1,
      planType: 1,
    },
    {
      key: "34",
      subject: "特別損失（▲）",
      code: "",
      classification: "特別損失（▲）",
      name: "",
      plan: totalPlanExtraordinaryLosses,
      ratio: totalRatioExtraordinaryLosses,
      actual: totalMActualExtraordinaryLosses,
      actualRatio: totalMActualRatioExtraordinaryLosses,
      monthlyData: filteredDataExtraordinaryLosses,
      type: 1,
      rowSpan: 1,
      planType: 1,
    },
    {
      key: "35",
      subject: "税引前当期純利益",
      code: "",
      classification: "税引前当期純利益",
      name: "",
      plan: totalPlanPretaxProfit,
      ratio: totalRatioPretaxProfit,
      actual: totalMActualPretaxProfit,
      actualRatio: totalMActualRatioPretaxProfit,
      monthlyData: filteredDataPretaxProfit,
      type: 0,
      rowSpan: 1,
      planType: 0,
    },
    {
      key: "36",
      subject: "法人税等",
      code: "",
      classification: "法人税等",
      name: "",
      plan: totalPlanCorporateTax,
      ratio: totalRatioCorporateTax,
      actual: totalMActualCorporateTax,
      actualRatio: totalMActualRatioCorporateTax,
      monthlyData: filteredDataCorporateTax,
      type: 1,
      rowSpan: 1,
      planType: 1,
    },
    {
      key: "37",
      subject: "当期純利益",
      code: "",
      classification: "当期純利益",
      name: "",
      plan: totalPlanNetIncome,
      ratio: totalRatioNetIncome,
      actual: totalMActualNetIncome,
      actualRatio: totalMActualRatioNetIncome,
      monthlyData: filteredDataNetIncome,
      type: 0,
      rowSpan: 1,
      planType: 0,
    },
  ];
  // data.push(tpData);
  // Column definitions
  const columns = [
    {
      title: "勘定科目",
      children: [
        {
          title: "科目",
          dataIndex: "subject",
          key: "subject",
          width: 150,
          render: (_, record) => ({
            children: (
              <Text style={{ fontWeight: "bold" }}>
                {record.subject || "-"}
              </Text>
            ),
            props: { rowSpan: record.rowSpan },
          }),
        },
        {
          title: "勘定科目コード",
          dataIndex: "code",
          key: "code",
          align: "center",
        },
        {
          title: "勘定科目分類",
          dataIndex: "classification",
          key: "classification",
          align: "center",
        },
        {
          title: "勘定科目名",
          dataIndex: "name",
          key: "name",
          align: "center",
        },
      ],
    },
    {
      title: "計画",
      children: [
        {
          title: "計画値",
          dataIndex: "plan",
          key: "plan",
          align: "center",
          render: (text, record) => {
            const yearData = record.plan;
            if (record.planType === 1 && planEdit) {
              return (
                <Form.Item
                  name={`${record.classification}-${
                    selectedYear?.$y || new Date().getFullYear()
                  }`}
                  initialValue={yearData ? yearData : "-"}
                >
                  <input
                    type="number"
                    defaultValue={yearData ? yearData : "-"}
                  />
                </Form.Item>
              );
            }
            return yearData ? record.plan : "-";
          },
        },
        {
          title: "売上比率",
          dataIndex: "ratio",
          key: "ratio",
          align: "center",
        },
      ],
    },
    {
      title: "実績合計",
      children: [
        {
          title: "実績",
          dataIndex: "actual",
          key: "actual",
          align: "center",
        },
        {
          title: "売上比率",
          dataIndex: "actualRatio",
          key: "actualRatio",
          align: "center",
        },
      ],
    },
    ...["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(
      (month, key) => ({
        title: key + 1,
        children: [
          {
            title: "実績値",
            dataIndex: `monthlyData[${key}].mActual`,
            key: `${month}mActual`,
            align: "center",
            render: (text, record) => {
              const monthData = record.monthlyData[key];
              if (record.type === 1 && edit) {
                return (
                  <Form.Item
                    name={`${record.classification}-${
                      selectedYear?.$y || new Date().getFullYear()
                    }-${month}mActual`}
                    initialValue={
                      monthData ? monthData[`${month}mActual`] : "-"
                    }
                  >
                    <input
                      type="number"
                      defaultValue={
                        monthData ? monthData[`${month}mActual`] : "-"
                      }
                    />
                  </Form.Item>
                );
              }
              return monthData ? monthData[`${month}mActual`] : "-";
            },
          },
          {
            title: "前比",
            dataIndex: `monthlyData[${key}].mComparedActual`,
            key: `${key}mComparedActual`,
            align: "center",
            render: (text, record) => {
              const monthData = record.monthlyData[key];
              const prevMonthData =
                key > 0 ? record.monthlyData[key - 1] : null;
              if (!monthData) return "-";
              if (key === 0) return monthData[`${month}mActual`];
              return prevMonthData
                ? monthData[`${month}mActual`] - prevMonthData[`${key}mActual`]
                : "-";
            },
          },
          {
            title: "前比率",
            dataIndex: `monthlyData[${key}].mComparedRatio`,
            key: `${key}mComparedRatio`,
            align: "center",
            render: (text, record) => {
              const monthData = record.monthlyData[key];
              const prevMonthData =
                key > 0 ? record.monthlyData[key - 1] : null;
              if (!monthData) return "-";
              if (key === 0) return "-";
              return prevMonthData
                ? `${(
                    (monthData[`${month}mActual`] /
                      prevMonthData[`${key}mActual`]) *
                    100
                  ).toFixed(2)}%`
                : "-";
            },
          },
          {
            title: "売上比率",
            dataIndex: `monthlyData[${key}].SalesRatio`,
            key: `${month}SalesRatio`,
            align: "center",
            render: (text, record) => {
              const monthData = record.monthlyData[key];
              if (key === 0) return "-";
              return monthData ? monthData[`${month}SalesRatio`] : "-";
            },
          },
        ],
      })
    ),
  ];

  return (
    <div className="w-full p-2">
      {loading && (
        <Spin className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/50 z-50" />
      )}
      <Form onFinish={handleFormSubmit}>
        <div className="flex w-[30%]">
          <Form.Item label={"年"} className="grow">
            <DatePicker
              picker="year"
              value={selectedYear}
              onChange={handleDateChange}
            />
          </Form.Item>
          <div className="flex gap-3">
            <Button type="primary" onClick={handleEdit}>
              編集
            </Button>
            {/* <Button type="primary">一時保存</Button> */}
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleFormSubmit()}
            >
              確定
            </Button>
          </div>
        </div>
        <Table
          className="PLtable"
          columns={columns}
          dataSource={[...data, ...tpData1, ...tpData2, ...tpData3]}
          bordered
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </Form>
    </div>
  );
};

export default MonthlyPLPage;
