import {
  Button,
  Form,
  Input,
  Popconfirm,
  Modal,
  notification,
  Select,
} from "antd";
import CTable from "src/components/CTable";
import axios from "axios";
import { useEffect, useState } from "react";

const getTelRules = () => [
  { message: "TELを入力してください！" },
  {
    pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
    message: "TELは数字とハイフンのみ入力可能です。",
  },
];

const getFaxRules = () => [
  { message: "FAXを入力してください！" },
  {
    pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
    message: "FAXは数字とハイフンのみ入力可能です。",
  },
];

const getAddressRules = () => [
  { message: "住所を入力してください！" },
  { min: 10, message: "住所は最低10文字必要です。" },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  const getValidationRules = () => {
    switch (dataIndex) {
      case "TEL":
        return getTelRules();
      case "FAX":
        return getFaxRules();
      case "住所":
        return getAddressRules();
      default:
        return [];
    }
  };
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BussinessLocation = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [selected, setSelected] = useState("取場所");
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_API_BASE_URL + `/workstation`,
      );
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to load workstations.",
      });
    }
  };
  const tableData = datas
    // .filter((item) => item[selected] !== null)
    .sort((a, b) => (b[selected] = a[selected]));
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
      const updatedCustomer = { ...row };

      await axios.put(
        process.env.REACT_API_BASE_URL + `/workstation/${key}`,
        updatedCustomer,
      );

      notification.success({
        message: "Success",
        description: "Customer updated successfully.",
      });
      setEditingKey("");
      fetchCustomers(); // Reload data after editing
    } catch (errInfo) {
      notification.error({
        message: "保存に失敗しました！",
        description: "Unable to save changes.",
      });
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(
        process.env.REACT_API_BASE_URL + `/workstation/${key}`,
      );
      notification.success({
        message: "Deleted",
        description: "Customer deleted successfully.",
      });
      fetchCustomers(); // Reload data after deletion
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete customer.",
      });
    }
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(process.env.REACT_API_BASE_URL + `/workstation`, values);
      notification.success({
        message: "追加成功",
        description: "作業地が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchCustomers(); // Reload data after adding
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add customer.",
      });
    }
  };

 

  const columns = [
    {
      title: "作業地名称",
      dataIndex: "作業地名称",
      align: "center",
      editable: true,
    },
    // {
    //   title: "搬入返却場所",
    //   dataIndex: "搬入返却場所",
    //   align: "center",
    //   editable: true,
    // },
    {
      title: "住所",
      dataIndex: "住所",
      align: "center",
      editable: true,
    },
    {
      title: "依頼書備考コメント",
      dataIndex: "依頼書備考コメント",
      align: "center",
      editable: true,
    },
    {
      title: "TEL",
      dataIndex: "TEL",
      align: "center",
      editable: true,
    },
    {
      title: "担当者",
      dataIndex: "担当者",
      align: "center",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex-wrap">
            <Button
              onClick={() => save(record._id)}
              type="link"
              style={{ marginRight: 8 }}>
              保存
            </Button>
            <Popconfirm
              title="キャンセルしてもよろしいですか？"
              onConfirm={cancel}>
              <Button type="link">キャンセル</Button>
            </Popconfirm>
          </span>
        ) : (
          <span className="flex-wrap">
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}>
              編集
            </Button>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleDelete(record._id)}>
              <Button type="link" danger>
                削除
              </Button>
            </Popconfirm>
          </span>
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
        inputType: "text",
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
    <div className="flex flex-col gap-0 items-center">
      <div className="flex justify-between w-96">
        <Select
          value={selected}
          onChange={setSelected}
          className="w-32 flex justify-end">
          <option key={"取場所"} value={"取場所"}>
            取場所
          </option>
          <option key={"配達場所"} value={"配達場所"}>
            配達場所
          </option>
          <option key={"搬入返却場所"} value={"搬入返却場所"}>
            搬入返却場所
          </option>
          <option key={"保管場所"} value={"保管場所"}>
            保管場所
          </option>
        </Select>
        <Button
          onClick={showAddModal}
          type="primary"
          style={{ marginBottom: 16 }}
          className="w-36">
          {selected}追加
        </Button>
      </div>

      <Form form={form} component={false}>
        <CTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey="_id"
          bordered
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={true}
          ps={10}
        />
      </Form>

      <Modal
        title={`${selected}追加`}
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}>
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item
            name="作業地名称"
            rules={[{ message: "Please input 作業地名称!" }]}>
            <Input placeholder="作業地名称" />
          </Form.Item>

          <Form.Item
            name={selected}
            rules={[{ message: `Please input ${selected}!` }]}>
            <Input placeholder={selected} />
          </Form.Item>
          <Form.Item
            name="住所"
            rules={getAddressRules()}>
            <Input placeholder="住所" />
          </Form.Item>
          <Form.Item
            name="依頼書備考コメント"
            rules={[
              { message: "Please input 依頼書備考コメント!" },
            ]}>
            <Input placeholder="依頼書備考コメント" />
          </Form.Item>
          <Form.Item
            name="TEL"
            rules={getTelRules()}>
            <Input placeholder="TEL" />
          </Form.Item>
          <Form.Item
            name="担当者"
            rules={[{ message: "Please input 担当者!" }]}>
            <Input placeholder="担当者" />
          </Form.Item>
          <Form.Item>
          <div className="flex justify-end">
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
export default BussinessLocation;
