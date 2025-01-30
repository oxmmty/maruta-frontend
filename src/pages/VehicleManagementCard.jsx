import {
  Button,
  Form,
  Input,
  Popconfirm,
  Modal,
  notification,
  Typography,
  Select,
} from "antd";
import axios from "axios";
import CTable from "src/components/CTable";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "/src/components/Table.jsx";
import dayjs from "dayjs";
const { Title, Text } = Typography;


// const getShipperNameRules = () => [
//   { required: true, message: "荷主名称を入力してください！" },
//   { max: 50, message: "荷主名称は50文字以内で入力してください。" },
// ];

// const getTelRules = () => [
//   { message: "TELを入力してください！" },
//   {
//     pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
//     message: "TELは数字とハイフンのみ入力可能です。",
//   },
// ];

// const getFaxRules = () => [
//   { message: "FAXを入力してください！" },
//   {
//     pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
//     message: "FAXは数字とハイフンのみ入力可能です。",
//   },
// ];

// const getAddressRules = () => [
//   { message: "住所を入力してください！" },
//   { min: 10, message: "住所は最低10文字必要です。" },
// ];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputtype,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;

  // const getValidationRules = () => {
  //   switch (dataIndex) {
  //     case "荷主名称":
  //       return getShipperNameRules();
  //     case "TEL":
  //       return getTelRules();
  //     case "FAX":
  //       return getFaxRules();
  //     case "住所":
  //       return getAddressRules();
  //     default:
  //       return [];
  //   }
  // };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          // rules={getValidationRules()}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const VehicleManagementCardPage = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalCardVisible, setIsModalCardVisible] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRow(record); // Store the clicked row data
    setIsModalCardVisible(true);
    console.log(record); // Show the modal
  };

  // const handleModalClose = () => {
  //   setIsModalVisible(false);
  //   setSelectedRow(null);
  // };

  useEffect(() => {
    if (selectedRow) {
      console.log(selectedRow.車両情報_登録番号);
    }
  }, [selectedRow]);

  useEffect(() => {
    fetchVehiclemanagements();
  }, []);

  const fetchVehiclemanagements = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_API_BASE_URL + `/vehiclemanagement`
      );
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "荷主の読み込みに失敗しました。",
      });
    }
  };

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const updatedVehiclemanagement = { ...row };

      await axios.put(
        process.env.REACT_API_BASE_URL + `/vehiclemanagement/${key}`,
        updatedVehiclemanagement
      );

      notification.success({
        message: "成功",
        description: "荷主情報が正常に更新されました。",
      });
      setEditingKey("");
      fetchVehiclemanagements();
    } catch (errInfo) {
      notification.error({
        message: "エラー",
        description: "変更を保存できません。",
      });
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(
        process.env.REACT_API_BASE_URL + `/vehiclemanagement/${key}`
      );
      notification.success({
        message: "削除成功",
        description: "荷主が正常に削除されました。",
      });
      fetchVehiclemanagements();
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "荷主の削除に失敗しました。",
      });
    }
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(
        process.env.REACT_API_BASE_URL + `/vehiclemanagement`,
        values
      );
      notification.success({
        message: "追加成功",
        description: "荷主が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchVehiclemanagements();
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "荷主の追加に失敗しました。",
      });
    }
  };

  const columns = [
    
    {
      title: "No",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "登録番号",
      dataIndex: "車両情報_登録番号",
      editable: true,
      align: "center",
      width: "3%",
    },
    {
      title: "車名",
      dataIndex: "車両情報_車名",
      editable: true,
      align: "center",
    },
    {
      title: "車台番号",
      dataIndex: "車両情報_車台番号",
      editable: true,
      align: "center",
    },
    {
      title: "型式",
      dataIndex: "車両情報_型式",
      editable: true,
      align: "center",
    },
    {
      title: "種別",
      dataIndex: "車両情報_種別",
      editable: true,
      align: "center",
    },
    {
      title: "用途",
      dataIndex: "車両情報_用途",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.車両情報_用途).format("YYYY-MM-DD"))
      }
    },
    {
      title: "乗車定員",
      dataIndex: "車両情報_乗車定員",
      editable: true,
      align: "center",
    },
    {
      title: "最大積載量",
      dataIndex: "車両情報_最大積載量",
      editable: true,
      align: "center",
    },
    {
      title: "排気量",
      dataIndex: "車両情報_排気量",
      editable: true,
      align: "center",
    },
    {
      title: "自賠責保険",
      dataIndex: "自賠責_自賠責保険",
      editable: true,
      align: "center",
    },
    {
      title: "保険料",
      dataIndex: "自賠責_保険料",
      editable: true,
      align: "center",
    },
    {
      title: "保険会社",
      dataIndex: "任意保険_保険会社",
      editable: true,
      align: "center",
    },
    {
      title: "証券No",
      dataIndex: "任意保険_証券No",
      editable: true,
      align: "center",
    },
    {
      title: "保険金額",
      dataIndex: "任意保険_保険金額",
      editable: true,
      align: "center",
    },
    {
      title: "対人賠償",
      dataIndex: "任意保険_対人賠償",
      editable: true,
      align: "center",
    },
    {
      title: "対物賠償",
      dataIndex: "任意保険_対物賠償",
      editable: true,
      align: "center",
    },
    {
      title: "車両",
      dataIndex: "任意保険_車両",
      editable: true,
      align: "center",
    },
    {
      title: "搭乗者",
      dataIndex: "任意保険_搭乗者",
      editable: true,
      align: "center",
    },
    {
      title: "付保日",
      dataIndex: "任意保険_付保日",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.任意保険_付保日).format("YYYY-MM-DD"))
      }
    },
    {
      title: "満期日",
      dataIndex: "任意保険_満期日",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.任意保険_満期日).format("YYYY-MM-DD"))
      }
    },
    {
      title: "購入日",
      dataIndex: "車両購入_購入日",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.車両購入_購入日).format("YYYY-MM-DD"))
      }
    },
    {
      title: "購入先",
      dataIndex: "車両購入_購入先",
      editable: true,
      align: "center",
    },
    {
      title: "購入費",
      dataIndex: "車両購入_購入費",
      editable: true,
      align: "center",
    },
    {
      title: "リース返済期間",
      dataIndex: "車両購入_リース返済期間",
      editable: true,
      align: "center",
    },
    {
      title: "リース最終月",
      dataIndex: "車両購入_リース最終月",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.車両購入_リース最終月).format("YYYY-MM-DD"))
      }
    },
    {
      title: "毎月の返済費",
      dataIndex: "車両購入_毎月の返済費",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.車両購入_毎月の返済費).format("YYYY-MM-DD"))
      }
    },
    {
      title: "購入形態",
      dataIndex: "車両購入_購入形態",
      editable: true,
      align: "center",
    },
    {
      title: "リース後の車両状態",
      dataIndex: "車両購入_リース後の車両状態",
      editable: true,
      align: "center",
    },
    {
      title: "再リース返済期間",
      dataIndex: "車両購入_再リース返済期間",
      editable: true,
      align: "center",
    },
    {
      title: "再リース最終月",
      dataIndex: "車両購入_再リース最終月",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.車両購入_再リース最終月).format("YYYY-MM-DD"))
      }
    },
    {
      title: "再リース後の毎月の返済額",
      dataIndex: "車両購入_再リース後の毎月の返済額",
      editable: true,
      align: "center",
    },
    {
      title: "一括買取金額",
      dataIndex: "車両購入_一括買取金額",
      editable: true,
      align: "center",
    },
    {
      title: "車検日",
      dataIndex: "車検_車検日",
      editable: true,
      align: "center",
      width: "120px",
      render: (text ,record) => {
        return(dayjs(record.車検_車検日).format("YYYY-MM-DD"))
      }
    },
    {
      title: "車検費用",
      dataIndex: "車検_車検費用",
      editable: true,
      align: "center",
    },
    {
      title: "所属",
      dataIndex: "所属_所属",
      editable: true,
      align: "center",
    },
    {
      title: "担当者",
      dataIndex: "所属_担当者",
      editable: true,
      align: "center",
    },
    {
      title: "保管場所",
      dataIndex: "所属_保管場所",
      editable: true,
      align: "center",
    },
    {
      title: "状態",
      dataIndex: "状態",
      editable: true,
      align: "center",
    },
    {
      title: "備考",
      dataIndex: "備考",
      editable: true,
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "operation",
      width: "6%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              color="primary" variant="solid"
              onClick={() => save(record._id)}
              type="link"
              style={{ marginRight: 8 }}
            >
              保存
            </Button>
            <Popconfirm
              title="キャンセルしてもよろしいですか？"
              onConfirm={cancel}
            >
              <Button type="link">キャンセル</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              編集
            </Button>
            <Popconfirm
              title="本当に削除しますか？"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button type="link" danger>
                削除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputtype: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const showAddModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col gap-0">
      <Form form={form} component={false}>
        <div className="flex justify-end mb-4">
          <Button onClick={showAddModal} type="primary">
            車両台帳を追加
          </Button>
        </div>
        <CTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey="_id"
          bordered
          dataSource={datas}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={true}
          ps={10}
          className="w-full h-full"
          scroll={{ x: "max-content" }}
          onRow={(record,a,b,c) => ({
            onDoubleClick: () => {
              handleRowClick(record)
            }, // Attach the click handler
          })}
        />
      </Form>
      {selectedRow && (
        <Modal
          // title="車両台帳"
          visible={isModalCardVisible}
          onCancel={() => setIsModalCardVisible(false)}
          className="w-[600px]"
        >
          <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex justify-between pb-2">
              <Text className="text-[17px]">No.{selectedRow["no"]}</Text>
              <Title level={3} className="m-0">車両台帳</Title>
              <Text className="text-[17px]">{dayjs(selectedRow["createdAt"]).format("YYYY年MM月DD日")}作成</Text>
            </div>
            <Table className="border-collapse">
              <TableBody>
                <TableRow>
                  <TableCell className="border p-[4px]" rowSpan={9}>
                    車<br />両<br />情<br />報
                  </TableCell>
                  <TableCell className="border p-[4px]">
                    登録番号
                    <br />
                    車両番号
                  </TableCell>
                  <TableCell className="border p-[4px]">
                    {selectedRow["車両情報_登録番号"]}
                  </TableCell>
                  <TableCell className="border p-[4px]" rowSpan={12}>
                    車<br />両<br />購<br />入
                  </TableCell>
                  <TableCell className="border p-[4px]" rowSpan={7}>
                    新<br />車<br />時
                  </TableCell>
                  <TableCell className="border p-[4px]">購入日</TableCell>
                  
                  <TableCell className="border p-[4px]">{dayjs(selectedRow["車両購入_購入日"]).format("YYYY-MM-DD")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">車名</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_車名"]}</TableCell>
                  <TableCell className="border p-[4px]">購入先</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_購入先"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">車台番号</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_車台番号"]}</TableCell>
                  <TableCell className="border p-[4px]">購入費</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_購入費"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">種別</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_種別"]}</TableCell>
                  <TableCell className="border p-[4px]">リース返済期間</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_リース返済期間"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">型式</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_型式"]}</TableCell>
                  <TableCell className="border p-[4px]">リース最終月</TableCell>
                  <TableCell className="border p-[4px]">
                    {dayjs(selectedRow["車両購入_リース最終月"]).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">用途</TableCell>
                  <TableCell className="border p-[4px]">
                  {dayjs(selectedRow["車両情報_用途"]).format("YYYY-MM-DD")}
                    </TableCell>
                  <TableCell className="border p-[4px]">毎月の返済費</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_毎月の返済費"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">乗車定員</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_乗車定員"]}</TableCell>
                  <TableCell className="border p-[4px]">購入形態</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_購入形態"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">最大積載量</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_最大積載量"]}</TableCell>
                  <TableCell className="border p-[4px]" rowSpan={5}>
                    新<br />車<br />リ<br />ー<br />ス<br />後
                  </TableCell>
                  <TableCell className="border p-[4px]">
                  リース後の車両状態
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_リース後の車両状態"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">排気量</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両情報_排気量"]}</TableCell>
                  <TableCell className="border p-[4px]">
                    再リース返済期間
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_再リース返済期間"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]" rowSpan={2}>
                    自<br />賠<br />責
                  </TableCell>
                  <TableCell className="border p-[4px]">自賠責保険</TableCell>
                  <TableCell className="border p-[4px]">
                  {selectedRow["自賠責_自賠責保険"]}
                    <span className="text-[10px]">千円</span>
                  </TableCell>
                  <TableCell className="border p-[4px]">
                    再リース最終月
                  </TableCell>
                  <TableCell className="border p-[4px]">
                    {dayjs(selectedRow["車両購入_再リース最終月"]).format("YYYY-MM-DD")}
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">保険料</TableCell>
                  <TableCell className="border p-[4px]">
                    <span className="text-[10px]">年間 </span>
                    {selectedRow["自賠責_保険料"]}
                  </TableCell>
                  <TableCell className="border p-[4px]">
                    再リース後の毎月の返済額
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_再リース後の毎月の返済額"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]" rowSpan={8}>
                    任<br />意<br />保<br />険
                  </TableCell>
                  <TableCell className="border p-[4px]">保険会社</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["任意保険_保険会社"]}</TableCell>
                  <TableCell className="border p-[4px]">一括買取金額</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車両購入_一括買取金額"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">証券No.</TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["任意保険_証券No"]}</TableCell>
                  <TableCell className="border p-[4px]" rowSpan={2}>
                    車<br />検
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={2}>
                    車検日
                  </TableCell>
                  <TableCell className="border p-[4px]">
                    {dayjs(selectedRow["車検_車検日"]).format("YYYY-MM-DD")}
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">保険金額</TableCell>
                  <TableCell className="border p-[4px]">
                    <span className="text-[10px]">毎月 </span>
                    {selectedRow["任意保険_保険金額"]}
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={2}>
                    車検費用
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["車検_車検費用"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">対人賠償</TableCell>
                  <TableCell className="border p-[4px]">
                    {selectedRow["任意保険_対人賠償"]}
                    <span className="text-[10px]"> 千円</span>
                  </TableCell>
                  <TableCell className="border p-[4px]" rowSpan={3}>
                    所<br />属
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={2}>
                    所　　属
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["所属_所属"]}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border p-[4px]">対物賠償</TableCell>
                  <TableCell className="border p-[4px]">
                    {selectedRow["任意保険_対物賠償"]}
                    <span className="text-[10px]"> 千円</span>
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={2}>
                    担当者
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["所属_担当者"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">車両</TableCell>
                  <TableCell className="border p-[4px]">
                    {selectedRow["任意保険_車両"]}
                    <span className="text-[10px]"> 千円</span>
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={2}>
                    保管場所
                  </TableCell>
                  <TableCell className="border p-[4px]">{selectedRow["所属_保管場所"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">搭乗者</TableCell>
                  <TableCell className="border p-[4px]">
                    {selectedRow["任意保険_搭乗者"]}
                    <span className="text-[10px]"> 千円</span>
                  </TableCell>
                  <TableCell className="border p-[4px]" rowSpan={1}>
                    状<br />態
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={3}>
                    {selectedRow["状態"]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border p-[4px]">付保日</TableCell>
                  <TableCell className="border p-[4px]">
                    {dayjs(selectedRow["任意保険_付保日"]).format("YYYY-MM-DD")}
                    </TableCell>
                  <TableCell className="border p-[4px]" rowSpan={1}>
                    備<br />考
                  </TableCell>
                  <TableCell className="border p-[4px]" colSpan={3}>{selectedRow["備考"]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Modal>
      )}

      <Modal
        title="車両台帳を追加"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
      >
        <Form form={addForm} onFinish={handleAdd}>
          {/* <Form.Item name="荷主名称" rules={getShipperNameRules()}>
            <Input placeholder="荷主名称" />
          </Form.Item>

          <Form.Item name="担当">
            <Input placeholder="担当" />
          </Form.Item>

          <Form.Item name="TEL" rules={getTelRules()}>
            <Input placeholder="TEL" />
          </Form.Item>

          <Form.Item name="FAX" rules={getFaxRules()}>
            <Input placeholder="FAX" />
          </Form.Item>

          <Form.Item name="住所" rules={getAddressRules()}>
            <Input placeholder="住所" />
          </Form.Item> */}
          <div className="w-full max-w-4xl mx-auto p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 border-r pr-4">
                <Text className="font-semibold">登録番号/車両番号</Text>
                <Form.Item name="車両情報_登録番号">
                  <Input placeholder="車両情報_登録番号" />
                </Form.Item>
                <Text className="font-semibold">車名</Text>
                <Form.Item name="車両情報_車名">
                  <Input placeholder="車両情報_車名" />
                </Form.Item>
                <Text className="font-semibold">車台番号</Text>
                <Form.Item name="車両情報_車台番号">
                  <Input placeholder="車両情報_車台番号" />
                </Form.Item>
                <Text className="font-semibold">型式</Text>
                <Form.Item name="車両情報_型式">
                  <Input placeholder="車両情報_型式" />
                </Form.Item>
                <Text className="font-semibold">種別</Text>
                <Form.Item name="車両情報_種別">
                  <Input placeholder="車両情報_種別" />
                </Form.Item>
                <Text className="font-semibold">用途</Text>
                <Form.Item name="車両情報_用途">
                  <Input type="date" placeholder="車両情報_用途" />
                </Form.Item>
                <Text className="font-semibold">乗車定員</Text>
                <Form.Item name="車両情報_乗車定員">
                  <Input type="number" placeholder="車両情報_乗車定員" />
                </Form.Item>
                <Text className="font-semibold">最大積載量</Text>
                <Form.Item name="車両情報_最大積載量">
                  <Input type="number" placeholder="車両情報_最大積載量" />
                </Form.Item>
                <Text className="font-semibold">排気量</Text>
                <Form.Item name="車両情報_排気量">
                  <Input type="number" placeholder="車両情報_排気量" />
                </Form.Item>
                <Text className="font-semibold">自賠責保険</Text>
                <Form.Item name="自賠責_自賠責保険">
                  <div className="flex items-center">
                    <Input type="number" placeholder="自賠責_自賠責保険" />
                    <span className="ml-2">千円</span>
                  </div>
                </Form.Item>
                <Text className="font-semibold">保険料(年間)</Text>
                <Form.Item name="自賠責_保険料">
                  <Input type="number" placeholder="自賠責_保険料" />
                </Form.Item>
                <Text className="font-semibold">保険会社</Text>
                <Form.Item name="任意保険_保険会社">
                  <Input placeholder="任意保険_保険会社" />
                </Form.Item>
                <Text className="font-semibold">証券No.</Text>
                <Form.Item name="任意保険_証券No">
                  <Input placeholder="任意保険_証券No" />
                </Form.Item>
                <Text className="font-semibold">保険金額 (毎月)</Text>
                <Form.Item name="任意保険_保険金額">
                  <div className="flex items-center">
                    <Input type="number" placeholder="任意保険_保険金額" />
                    <span className="ml-2">円</span>
                  </div>
                </Form.Item>
                <Text className="font-semibold">対人保険</Text>
                <Form.Item name="任意保険_対人賠償">
                  <div className="flex items-center">
                    <Input type="number" placeholder="任意保険_対人賠償" />
                    <span className="ml-2">千円</span>
                  </div>
                </Form.Item>
                <Text className="font-semibold">対物保険</Text>
                <Form.Item name="任意保険_対物賠償">
                  <div className="flex items-center">
                    <Input type="number" placeholder="任意保険_対物賠償" />
                    <span className="ml-2">千円</span>
                  </div>
                </Form.Item>
                <Text className="font-semibold">車両</Text>
                <Form.Item name="任意保険_車両">
                  <div className="flex items-center">
                    <Input type="number" placeholder="任意保険_車両" />
                    <span className="ml-2">千円</span>
                  </div>
                </Form.Item>
                <Text className="font-semibold">搭乗者</Text>
                <Form.Item name="任意保険_搭乗者">
                  <div className="flex items-center">
                    <Input type="number" placeholder="任意保険_搭乗者" />
                    <span className="ml-2">千円</span>
                  </div>
                </Form.Item>
                <Text className="font-semibold">付保日</Text>
                <Form.Item name="任意保険_付保日">
                  <Input type="date" placeholder="任意保険_付保日" />
                </Form.Item>
                <Text className="font-semibold">満期日</Text>
                <Form.Item name="任意保険_満期日">
                  <Input type="date" placeholder="任意保険_満期日" />
                </Form.Item>
              </div>
              <div className="space-y-2 pl-4">
                <Text className="font-semibold">購入日</Text>
                <Form.Item name="車両購入_購入日">
                  <Input type="date" placeholder="車両購入_購入日" />
                </Form.Item>
                <Text className="font-semibold">購入先</Text>
                <Form.Item name="車両購入_購入先">
                  <Input placeholder="車両購入_購入先" />
                </Form.Item>
                <Text className="font-semibold">購入費</Text>
                <Form.Item name="車両購入_購入費">
                  <Input type="number" placeholder="車両購入_購入費" />
                </Form.Item>
                <div className="border-t">
                  <Text className="font-semibold">リース返済期間</Text>
                  <Form.Item name="車両購入_リース返済期間">
                    <Input
                      type="number"
                      placeholder="車両購入_リース返済期間"
                    />
                  </Form.Item>
                  <Text className="font-semibold">リース最終月</Text>
                  <Form.Item name="車両購入_リース最終月">
                    <Input type="date" placeholder="車両購入_リース最終月" />
                  </Form.Item>
                  <Text className="font-semibold">毎月の返済額</Text>
                  <Form.Item name="車両購入_毎月の返済費">
                    <Input type="number" placeholder="車両購入_毎月の返済費" />
                  </Form.Item>
                  <Text className="font-semibold">購入形態</Text>
                  <Form.Item name="車両購入_購入形態">
                    <Input placeholder="車両購入_購入形態" />
                  </Form.Item>
                </div>
                <div className="border-t">
                  <Text className="font-semibold">リース後の車両状態</Text>
                  <Form.Item name="車両購入_リース後の車両状態">
                    <Input placeholder="車両購入_リース後の車両状態" />
                  </Form.Item>
                  <Text className="font-semibold">再リース返済期間</Text>
                  <Form.Item name="車両購入_再リース返済期間">
                    <Input
                      type="number"
                      placeholder="車両購入_再リース返済期間"
                    />
                  </Form.Item>
                  <Text className="font-semibold">再リース最終月</Text>
                  <Form.Item name="車両購入_再リース最終月">
                    <Input type="date" placeholder="車両購入_再リース最終月" />
                  </Form.Item>
                  <Text className="font-semibold">リース後の毎月の返済</Text>
                  <Form.Item name="車両購入_再リース後の毎月の返済額">
                    <Input
                      type="number"
                      placeholder="車両購入_再リース後の毎月の返済額"
                    />
                  </Form.Item>
                  <Text className="font-semibold">一括買取金額</Text>
                  <Form.Item name="車両購入_一括買取金額">
                    <Input type="number" placeholder="車両購入_一括買取金額" />
                  </Form.Item>
                </div>
                <div className="border-t">
                  <Text className="font-semibold">車検日</Text>
                  <Form.Item name="車検_車検日">
                    <Input type="date" placeholder="車検_車検日" />
                  </Form.Item>
                  <Text className="font-semibold">車検費用</Text>
                  <Form.Item name="車検_車検費用">
                    <Input type="number" placeholder="車検_車検費用" />
                  </Form.Item>
                </div>
                <div className="border-t">
                  <Text className="font-semibold">所属</Text>
                  <Form.Item name="所属_所属">
                    <Input placeholder="所属_所属" />
                  </Form.Item>
                  <Text className="font-semibold">担当者</Text>
                  <Form.Item name="所属_担当者">
                    <Input placeholder="所属_担当者" />
                  </Form.Item>
                  <Text className="font-semibold">保管場所</Text>
                  <Form.Item name="所属_保管場所">
                    <Input placeholder="所属_保管場所" />
                  </Form.Item>
                </div>

                <Text className="font-semibold">状態</Text>
                <Form.Item name="状態">
                  <Select placeholder="売却・破棄・その他">
                    <Select.Option value="売却">売却</Select.Option>
                    <Select.Option value="破棄">破棄</Select.Option>
                    <Select.Option value="その他">その他</Select.Option>
                  </Select>
                </Form.Item>
                <Text className="font-semibold">備考</Text>
                <Form.Item name="備考">
                  <Input placeholder="備考" />
                </Form.Item>
              </div>
            </div>
          </div>

          <Form.Item>
            <div className="flex justify-end pt-2">
              <Button type="primary" htmlType="submit">
                追加
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VehicleManagementCardPage;
