import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Group from "../components/Group";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Button, Modal, FloatButton } from "antd";
import { AreaChartOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import NewOrderFormPage from "./NewOrderFormPage";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import CustomModal from "../components/CustomModal";
import "./custom.css";
import jaLocale from "@fullcalendar/core/locales/ja";
const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [eventPickupLocation, setEventPickupLocation] = useState("");
  const [eventDeliveryLocation, setEventDeliveryLocation] = useState("");
  const [orderModal, setOrderModal] = useState(false);
  const [delFlag, setDelFlag] = useState(false);
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    position: { top: 0, left: 0 },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/orderlist");
      const stateManagement = await axios.get("/pdflist");

      // Add state fields from stateManagement to matching orders
      response.data = response.data.map((order) => {
        const matchingState = stateManagement.data.find((state) => {
          const orderCode = order.識別コード?.slice(2) || "";
          const stateCode = state.受注コード?.slice(2) || "";
          return orderCode && stateCode && orderCode === stateCode;
        });

        if (matchingState) {
          return {
            ...order,
            mail発行: matchingState.mail発行,
            発行: matchingState.発行,
            仮依頼書: matchingState.仮依頼書,
            依頼書: matchingState.依頼書,
            delete: matchingState.delete,
          };
        }
        return order;
      });
      const rawData = response.data.filter(
        (item) => !item.hasOwnProperty("支払い確認") || item.支払い確認 !== true
      );
      const formattedEvents = rawData.flatMap((item) => {
        const eventsList = [];
        const hasDeliveryDates = [
          item["配達日1"],
          item["配達日2"],
          item["配達日3"],
        ].filter(Boolean).length;
        if (item["配達日1"]) {
          const content =
            hasDeliveryDates > 1
              ? `${item["識別コード"]}-01`
              : item["識別コード"];
          const additionalContent = `${item["下払会社名1"]}, ${
            item["配達先1"]
          }, ${item["3軸数"] ? "3軸" : ""}, ${item["配達時間1"]},  ${
            item["取場所"]
          },${item["コンテナサイズ"]}, ${item["コンテナ種類"]}`;
          addEvent(
            eventsList,
            item["配達日1"],
            item["配達時間1"],
            content,
            additionalContent,
            item,
            item["取場所"],
            item["配達先1"]
          );
        }
        if (item["配達日2"]) {
          const content = `${item["識別コード"]}-02`;
          addEvent(
            eventsList,
            item["配達日2"],
            item["配達時間2"],
            content,
            item,
            item["取場所"],
            item["配達先2"]
          );
        }
        if (item["配達日3"]) {
          const content = `${item["識別コード"]}-03`;
          addEvent(
            eventsList,
            item["配達日3"],
            item["配達時間3"],
            content,
            item,
            item["取場所"],
            item["配達先3"]
          );
        }
        return eventsList;
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addEvent = (
    eventsList,
    date,
    time,
    content,
    additionalContent,
    item,
    pickupLocation,
    deliveryLocation
  ) => {
    const existingEvent = eventsList.find(
      (event) => event.content === content && event.date === date
    );

    if (!existingEvent) {
      const type = item["送り状受領書作成"]
        ? "error"
        : item["ピックチェック"] == true && item["配車組み"] !== true
        ? "warning"
        : item["ピックチェック"] == true && item["配車組み"] == true
        ? "success"
        : null;
      let backgroundColor;
      let textColor;
      let descriptionColor;

      if (item["mail発行"] == true) {
        backgroundColor = "blue";
        textColor = "white";
      } else if (item["発行"] == true) {
        backgroundColor = "green";
        textColor = "white";
      } else if (item["依頼書"] == true) {
        backgroundColor = "red";
        textColor = "white";
        descriptionColor = "white";
      } else if (item["仮依頼書"] == true) {
        backgroundColor = "black";
        textColor = "white";
      }

      if (type) {
        const formattedDate = date
          ? new Date(date).toISOString().slice(0, 10)
          : null;
        const formattedTime = time ? `T${time}` : "";
        setEventPickupLocation(pickupLocation);
        setEventDeliveryLocation(deliveryLocation);

        if (formattedDate) {
          eventsList.push({
            id: nanoid(),
            title: content,
            start: formattedDate + formattedTime,
            backgroundColor,
            textColor,
            descriptionColor,
            extendedProps: {
              description: additionalContent,
              pickupLocation,
              deliveryLocation,
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [delFlag]);
  const dashboard = () => {
    navigate("/dashboard");
  };
  const newCustomer = () => {
    navigate("/masterDatas/customer");
  };
  const newCompany = () => {
    navigate("/masterDatas/partnerCompany");
  };
  const newShipper = () => {
    navigate("/masterDatas/shipperList");
  };
  const newShip = () => {
    navigate("/masterDatas/shipCompany");
  };
  const newWorkstation = () => {
    navigate("/masterDatas/businessLocation");
  };
  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };

  function handleEventClick(clickInfo) {
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    console.log("start", start);
    setPickupLocation(clickInfo.event.pickupLocation);
    setDeliveryLocation(clickInfo.event.deliveryLocation);
    console.log(
      "clickInfo.event.deliveryLocation",
      clickInfo.event.deliveryLocation
    );
    setModal(true);
  }

  const orderOpen = () => {
    setOrderModal(true);
  };
  const orderClose = () => {
    setOrderModal(false);
  };
  function handleClose() {
    setModal(false);
  }

  const handleEventMouseEnter = (info) => {
    setTooltip({
      visible: true,
      content: info.event.extendedProps.description,
      position: {
        top: info.jsEvent.clientY + 10,
        left: info.jsEvent.clientX + 10,
      },
    });
  };

  const handleEventMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

const updateDate = (date) => {
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
    setSelectedDate(date); // Update state to reflect changes
  }
};

const handleDateChange = (e) => {
  updateDate(e.target.value);
};

const handleNextMonth = () => {
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    const date = new Date(calendarApi.currentData.dateProfile.currentDate);
    date.setMonth(date.getMonth() + 1);
    updateDate(date.toISOString().split("T")[0]);
  }
};

const handlePrevMonth = () => {
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    const date = new Date(calendarApi.currentData.dateProfile.currentDate);
    date.setMonth(date.getMonth() - 1);
    updateDate(date.toISOString().split("T")[0]);
  }
};

const handleNextYear = () => {
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    const date = new Date(calendarApi.currentData.dateProfile.currentDate);
    date.setFullYear(date.getFullYear() + 1);
    updateDate(date.toISOString().split("T")[0]);
  }
};

const handlePrevYear = () => {
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    const date = new Date(calendarApi.currentData.dateProfile.currentDate);
    date.setFullYear(date.getFullYear() - 1);
    updateDate(date.toISOString().split("T")[0]);
  }
};

const handleToday = () => {
  const today = new Date().toISOString().split("T")[0];
  updateDate(today);
};

useEffect(() => {
  const button = document.querySelector(".fc-customInput-button");
  if (button) {
    button.innerHTML = `<input type="date" id="dateInput" />`;
    const input = button.querySelector("#dateInput");
    if (input) {
      input.value = selectedDate; // Sync input with the current date
      input.addEventListener("change", handleDateChange);
    }
  }
}, [selectedDate]);


  return (
    <div>
      <Container className="w-full">
        <Row>
          <Col md={12} className="flex justify-between">
            <div className="md:w-[15%] hidden md:block w-0">
              <div className="pl-auto pr-auto pt-10 w-fit flex flex-col gap-10">
                <Button onClick={orderOpen} className="w-2/3">
                  受注入力
                </Button>
                <div className="w-2/3">
                  <Group label={"新規登録"}>
                    <Button onClick={newCustomer} className="w-full my-2">
                      顧客
                    </Button>
                    <Button onClick={newCompany} className="w-full my-2">
                      協力会社
                    </Button>
                    <Button onClick={newShipper} className="w-full my-2">
                      荷主
                    </Button>
                    <Button onClick={newShip} className="w-full my-2">
                      船社
                    </Button>
                    <Button onClick={newWorkstation} className="w-full my-2">
                      作業地
                    </Button>
                  </Group>
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center pb-3 ">
                  <div className="w-14 h-5 bg-blue-600"></div>
                  <p>メール発行</p>
                </div>
                <div className="flex gap-2 items-center pb-3">
                  <div className="w-14 h-5 bg-green-600"></div>
                  <p>依頼リスト発行</p>
                </div>
                <div className="flex gap-2 items-center pb-3">
                  <div className="w-14 h-5 bg-red-600"></div>
                  <p>依頼書発行</p>
                </div>
                <div className="flex gap-2 items-center pb-3">
                  <div className="w-14 h-5 bg-black"></div>
                  <p>仮依頼書発行</p>
                </div>
              </div>
            </div>
            <div className="md:w-[85%] w-full h-[calc(100vh-100px)]">
              <FullCalendar
                height="100%"
                expandRows={false}
                ref={calendarRef}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                initialView="dayGridMonth"
                // headerToolbar={{
                //   left: "prevYear,prev,today,next,nextYear",
                //   center: "title",
                //   right: "dayGridMonth,listWeek,timeGridDay",
                // }}
                headerToolbar={{
                  left: "prevYear,prev,today,next,nextYear",
                  center: "customInput",
                  right: "dayGridMonth,listWeek,timeGridDay",
                }}
                customButtons={{
                  customInput: {
                    // text: "Select Date",
                    click: (e) => {
                      e.target.addEventListener("change", (e) => {
                        handleDateChange(e.target.value);
                      });
                    },
                  },
                  today: {
                    click: handleToday,
                    text: "今日",
                  },
                  nextYear: {
                    click: handleNextYear,
                  },
                  prevYear: {
                    click: handlePrevYear,
                  },
                  next: {
                    click: handleNextMonth,
                  },
                  prev: {
                    click: handlePrevMonth,
                  },
                }}
                locale={jaLocale}
                weekends={true}
                events={events}
                selectable={true}
                eventContent={(arg) => {
                  return (
                    <div
                      style={{
                        backgroundColor: arg.event.backgroundColor,
                        color: arg.event.textColor,
                      }}
                    >
                      <div>{arg.event.title}</div>
                      <div
                        style={{
                          fontSize: "0.8em",
                          color: arg.event.descriptionColor,
                        }}
                      >
                        {arg.event.extendedProps.description}
                      </div>
                    </div>
                  );
                }}
                eventClick={handleEventClick}
                eventMouseEnter={handleEventMouseEnter}
                eventMouseLeave={handleEventMouseLeave}
                views={{
                  listWeek: {
                    buttonText: "週",
                  },
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <CustomModal
        title={title}
        start={start}
        isOpen={modal}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <NewOrderFormPage
          title={title}
          start={start}
          setModal={setModal}
          delFlag={delFlag}
          setDelFlag={setDelFlag}
        />
      </CustomModal>
      <Modal
        open={orderModal}
        onCancel={orderClose}
        className="w-[80%]"
        footer={false}
      >
        <NewOrderFormPage />
      </Modal>
      <FloatButton
        shape="square"
        type="primary"
        className="mb-2 mr-2 animate-bounce"
        onClick={dashboard}
        icon={<AreaChartOutlined />}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.position.top,
            left: tooltip.position.left,
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
            zIndex: 1000,
            width: "250px",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
