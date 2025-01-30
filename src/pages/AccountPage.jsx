import React, { useEffect, useState, useRef } from "react";
import CTable from "src/components/CTable";
import { Button, Form, Input, Popconfirm, Modal, notification , Select ,  } from "antd";
import axios from "axios";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  

  return (
    <td {...restProps} className="scrollable-cell">
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
        >
          <Input className="scrollable-input" />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function AccountPage() {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchPartnerCompanies();
  }, []);

  const fetchPartnerCompanies = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_API_BASE_URL}/account`
      );
      const sortedData = res.data.sort((a, b) => b.カウント - a.カウント);
      setDatas(sortedData);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "勘定科目の読み込みに失敗しました。",
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
      const updatedCompany = { ...row };

      await axios.put(
        `${process.env.REACT_API_BASE_URL}/account/${key}`,
        updatedCompany
      );

      notification.success({
        message: "成功",
        description: "Account company updated successfully.",
      });
      setEditingKey("");
      fetchPartnerCompanies(); // Reload data after editing
    } catch (errInfo) {
      notification.error({
        message: "エラー",
        description: "Unable to save changes.",
      });
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(
        process.env.REACT_API_BASE_URL + `/account/${key}`
      );
      notification.success({
        message: "成功",
        description: "勘定科目が正常に削除されました。",
      });
      fetchPartnerCompanies(); // Reload data after deletion
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "勘定科目の削除に失敗しました。",
      });
    }
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_API_BASE_URL}/account`,
        values
      );
      notification.success({
        message: "成功",
        description: "勘定科目が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchPartnerCompanies(); // Reload data after adding
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "勘定科目の追加に失敗しました。",
      });
    }
  };
  

  const columns = [
    {
      title: "科目",
      dataIndex: "科目",
      editable: true,
      align: "center",
      width: 90,
    },
    {
      title: "勘定科目コード",
      dataIndex: "勘定科目コード",
      editable: true,
      align: "center",
      width: 100,
    },
    {
      title: "勘定科目分類",
      dataIndex: "勘定科目分類",
      editable: true,
      align: "center",
      width: 100,
    },
    {
      title: "勘定科目名",
      dataIndex: "勘定科目名",
      editable: true,
      align: "center",
      width: 100,
    },
    
 
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      width: 200,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex-wrap">
            <Button
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
          <span className="flex-wrap">
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              編集
            </Button>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
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
        <div className="flex justify-end p-4">
          <Button
            onClick={showAddModal}
            type="primary"
            className=" w-32 h-12 z-1"
          >
            勘定科目を追加
          </Button>
        </div>

        <CTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          // virtualscroll={{ x: 2000, y: 500 }}
          scroll={{ x: "max-content" }}
          className="overflow-scroll w-full h-full"
          rowKey="_id"
          bordered
          dataSource={datas}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={true}
          ps={10}
        />
      </Form>

      <Modal
        title="勘定科目を追加"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
      >
        <Form form={addForm} onFinish={handleAdd}>
           
            <Form.Item
              name="科目"
              rules={[
                { required: true, message: "「科目分類を選択してください！" },
              ]}
            >
              <Select placeholder="科目">
                <Select.Option value="販売管理費">販売管理費</Select.Option>
                <Select.Option value="一般管理費">一般管理費</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="勘定科目コード"
              rules={[
                { required: true, message: "「勘定科目コードを入力してください！" },
              ]}
            >
              <Input placeholder="勘定科目コード" />
            </Form.Item>
            <Form.Item
              name="勘定科目分類"
              rules={[
                { required: true, message: "「勘定科目分類を入力してください！" },
              ]}
            >
              <Input name="number" placeholder="勘定科目分類" />
            </Form.Item>
            <Form.Item
              name="勘定科目名"
            >
              <Input name="number" placeholder="勘定科目名" />
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
}
