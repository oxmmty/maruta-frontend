import React from "react";
import {
  Route,
  redirect,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "src/components/Theme";
import { tokenLogin } from "src/components/TokenLogin";
import App from "src/App";
import Public from "src/routers/Public";
import Private from "src/routers/Private";
import Error from "src/components/Error";
import LoginPage from "src/pages/LoginPage";
import RegisterPage from "src/pages/RegisterPage";
import DashboardPage from "src/pages/DashboardPage";
import BillingListPage from "src/pages/BillingListPage";
import TransportCompanyRequestPage from "src/pages/TransportCompanyRequestPage";
import DepartmentProfitPage from "src/pages/DepartmentProfitPage";
import MonthlyDepartmentReportPage from "src/pages/MonthlyDepartmentReportPage";
import InvoiceReceiptPage from "src/pages/InvoiceReceiptPage";
import NewRequestFormPage from "src/pages/NewRequestFormPage";
import NewRequestFormFakePage from "src/pages/NewRequestFormFakePage";
import InvoicePage from "src/pages/InvoicePage";
import InvoiceGulfPage from "src/pages/InvoiceGulfPage";



import InvoiceMSPage from "src/pages/InvoiceMSPage";
import OrderDBPage from "src/pages/OrderDBPage";
import CalendarPage from "src/pages/CalendarPage";
import MailPage from "src/pages/MailPage";
import StorageContainerPage from "src/pages/StorageContainerPage";
import InventoryContainerPage from "src/pages/InventoryContainerPage";
import ReleaseNotesPage from "src/pages/ReleaseNotesPage";
import DataPage from "src/pages/DataPage";
import CustomerPage from "src/pages/CustomerPage";
import PartnerCompanyPage from "src/pages/PartnerCompanyPage";
import CustomerListPage from "src/pages/CustomerListPage";
import PartnerCompanyListPage from "src/pages/PartnerCompanyListPage";
import MonthlyCustomerDBGraphPage from "src/pages/MonthlyCustomerDBGraphPage";
import MonthlyPartnerCompanyDBGraphPage from "src/pages/MonthlyPartnerCompanyDBGraphPage";
import MonthlyCustomerDBPage from "src/pages/MonthlyCustomerDBPage";
import MonthlyCustomerPage from "src/pages/MonthlyCustomerPage";
import MonthlyPartnerCompanyPage from "src/pages/MonthlyPartnerCompanyPage";
import StorageContainerDBPage from "src/pages/StorageContainerDBPage";
import DBSPage from "src/pages/DBSPage";
import TaskSchedulePage from "src/pages/TaskSchedulePage";
import RequestListPage from "src/pages/RequestListPage";
import RequestPdfListPage from "src/pages/RequestPdfListPage";
import NewOrderFormPage from "src/pages/NewOrderFormPage";
import DispatchSpecificationPage from "src/pages/DispatchSpecificationPage";
import DBPage from "src/pages/DBPage";
import BusinessOffice from "src/pages/BusinessOfficePage";
import BusinessLocation from "src/pages/BusinessLocationPage";
import ShipperList from "src/pages/ShipperListPage";
import ShipCompany from "src/pages/ShipCompanyPage";
import UserManage from "src/pages/UserManagePage";
import WorkCompletionReportPage from "src/pages/WorkCompletionReportPage";
import DriverDispatchLedgerPage from "src/pages/DriverDispatchLedgerPage";
import InvoiceMarutaPage from "src/pages/InvoiceMarutaPage";
import InvoiceMarutaAllPage from "src/pages/InvoiceMarutaAllPage";
import OfficeVehicleDispatchLedgerPage from "src/pages/OfficeVehicleDispatchLedgerPage";
import VehicleManagementCardPage from "src/pages/VehicleManagementCard";
import DailySalesPage from "src/pages/DailySalesPage";
import MonthlySalesPage from "src/pages/MonthlySalesPage";
import PartnerPage from "src/pages/PartnerPage";
import AccountPage from "src/pages/AccountPage";
import MonthlyPLPage from "src/pages/MonthlyPLPage";
import YearlyPLPage from "src/pages/YearlyPLPage";
import MonthlyVehiclePL from "src/pages/MonthlyVehiclePLPage";
import MonthlyCustomerRankingPage from "src/pages/MonthlyCustomerRankingPage";

axios.defaults.baseURL = process.env.REACT_API_BASE_URL;

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<App />} errorElement={<Error />}>
          <Route
            element={<Private />}
            loader={async () => {
              const tokenData = await tokenLogin();
              return { tokenData };
            }}>
            <Route path="/" loader={() => redirect("/dashboard")} />
            <Route
              path="/dashboard"
              loader={() => redirect("/dashboard/overview")}
            />
            <Route path="/dashboard/overview" element={<DashboardPage />} />

            <Route
              path="/orders_invoices"
              loader={() => redirect("/orders_invoices/calendar")}
            />
            <Route
              path="/orders_invoices/newOrderForm"
              element={<NewOrderFormPage />}
            />
            <Route path="/orders_invoices/db" element={<DBPage />} />
            <Route path="/orders_invoices/orderDB" element={<OrderDBPage />} />
            <Route
              path="/orders_invoices/billingList"
              element={<BillingListPage />}
            />
            <Route path="/orders_invoices/invoice" element={<InvoicePage />} />
            <Route path="/orders_invoices/invoiceGulf" element={<InvoiceGulfPage />} />
            <Route
              path="/orders_invoices/invoice_Ms"
              element={<InvoiceMSPage />}
            />
            <Route
              path="/orders_invoices/requestPdfList"
              element={<RequestPdfListPage />}
            />
            <Route
              path="/orders_invoices/requestList"
              element={<RequestListPage />}
            />
            <Route
              path="/orders_invoices/newRequestForm"
              element={<NewRequestFormPage />}
            />
             <Route
              path="/orders_invoices/newRequestFormFake"
              element={<NewRequestFormFakePage />}
            />
            <Route
              path="/orders_invoices/invoice_receipt"
              element={<InvoiceReceiptPage />}
            />
            <Route path="/orders_invoices/mail" element={<MailPage />} />
            <Route
              path="/containers"
              loader={() => redirect("/containers/storageContainer")}
            />
            <Route
              path="/containers/storageContainer"
              element={<StorageContainerPage />}
            />
            <Route
              path="/containers/inventoryContainer"
              element={<InventoryContainerPage />}
            />
            <Route
              path="/calendar_schedules"
              loader={() => redirect("/calendar_schedules/calendar")}
            />
            <Route
              path="/calendar_schedules/calendar"
              element={<CalendarPage />}
            />
            <Route
              path="/orders_invoices/calendar"
              element={<CalendarPage />}
            />
            <Route
              path="/calendar_schedules/dispatchSpecification"
              element={<DispatchSpecificationPage />}
            />
            <Route
              path="/calendar_schedules/taskSchedule"
              element={<TaskSchedulePage />}
            />
            <Route
              path="/masterDatas"
              loader={() => redirect("/masterDatas/customer")}
            />
            <Route path="/masterDatas/customer" element={<CustomerPage />} />
            <Route
              path="/masterDatas/partnerCompany"
              element={<PartnerCompanyPage />}
            />
            <Route
              path="/masterDatas/customerList"
              element={<CustomerListPage />}
            />
            <Route
              path="/masterDatas/partnerCompanyList"
              element={<PartnerCompanyListPage />}
            />
            <Route path="/masterDatas/shipperList" element={<ShipperList />} />
            <Route path="/masterDatas/shipCompany" element={<ShipCompany />} />
            <Route
              path="/masterDatas/partner"
              element={<PartnerPage />}
            />
            <Route
              path="/masterDatas/businessLocation"
              element={<BusinessLocation />}
            />
             <Route
              path="/masterDatas/vehicleManagementCard"
              element={<VehicleManagementCardPage/>}
            />
            <Route
              path="/masterDatas/account"
              element={<AccountPage/>}
            />
            <Route
              path="/masterDatas/monthlyPL"
              element={<MonthlyPLPage/>}
            />
            <Route
              path="/masterDatas/yearlyPL"
              element={<YearlyPLPage/>}
            />
            <Route
              path="/analysis_reports"
              loader={() =>
                redirect("/analysis_reports/monthlyCustomerDBGraph")
              }
            />
            <Route
              path="/analysis_reports/monthlyCustomerDBGraph"
              element={<MonthlyCustomerDBGraphPage />}
            />
            <Route
              path="/analysis_reports/monthlyPartnerCompanyDBGraph"
              element={<MonthlyPartnerCompanyDBGraphPage />}
            />
            <Route
              path="/analysis_reports/monthlyVehiclePL"
              element={<MonthlyVehiclePL/>}
            />
            <Route
              path="/analysis_reports/monthlyCustomerRanking"
              element={<MonthlyCustomerRankingPage/>}
            />
            <Route path="/analysis_reports/db_s" element={<DBSPage />} />
            <Route
              path="/analysis_reports/monthlyCustomerDB"
              element={<MonthlyCustomerDBPage />}
            />
            <Route
              path="/analysis_reports/storageContainerDB"
              element={<StorageContainerDBPage />}
            />
            <Route
              path="/analysis_reports/monthlyCustomer"
              element={<MonthlyCustomerPage />}
            />
            <Route
              path="/analysis_reports/monthlyPartnerCompany"
              element={<MonthlyPartnerCompanyPage />}
            />
            <Route
              path="/analysis_reports/departmentProfit"
              element={<DepartmentProfitPage />}
            />
            <Route
              path="/analysis_reports/monthlyDepartmentReport"
              element={<MonthlyDepartmentReportPage />}
            />
            <Route
              path="/analysis_reports/transportCompanyRequest"
              element={<TransportCompanyRequestPage />}
            />
             <Route
              path="/analysis_reports/dailySales"
              element={<DailySalesPage/>}
            />
            <Route
              path="/analysis_reports/monthlySales"
              element={<MonthlySalesPage/>}
            />
            <Route
              path="/document_notes"
              loader={() => redirect("/document_notes/releaseNotes")}
            />
            <Route
              path="/document_notes/releaseNotes"
              element={<ReleaseNotesPage />}
            />
            <Route path="/document_notes/data" element={<DataPage />} />
            <Route
              path="/settings_administration"
              loader={() =>
                redirect("/settings_administration/userManagements")
              }
            />
            <Route
              path="/settings_administration/userManagements"
              element={<UserManage />}
            />
            <Route
              path="/settings_administration/businessOffice"
              element={<BusinessOffice />}
            />
            <Route
              path="/orders_invoices/work_completion_report"
              element={<WorkCompletionReportPage />}
            />
            <Route
              path="/orders_invoices/driverDispatchLedger"
              element={<DriverDispatchLedgerPage />}
            />
            <Route
              path="/orders_invoices/invoiceMaruta"
              element={<InvoiceMarutaPage/>}
            />
            <Route
              path="/orders_invoices/invoiceMarutaAll"
              element={<InvoiceMarutaAllPage/>}
            />
            <Route
              path="/orders_invoices/officeVehicleDispatchLedger"
              element={<OfficeVehicleDispatchLedgerPage/>}
            />
          </Route>
        </Route>
        <Route
          element={<Public />}
          errorElement={<Error />}
          loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
          }}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        {/* <Route path="*" loader={() => redirect('/login')} /> */}
      </>,
    ),
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default AppRouter;
