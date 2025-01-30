import React, { useEffect, useState, useRef } from "react";
import CTable from "src/components/CTable";
import { Button, Form, Input, Popconfirm, Modal, notification } from "antd";
import axios from "axios";

const phoneNumberValidator = (_, value) => {
  if (value && !/^(?:0\d{1,4}-\d{2,4}-\d{4})$/.test(value)) {
    return Promise.reject(
      new Error(
        "有効な電話番号を入力してください！(例: 0287-36-8131, 045-392-6281, 03-5476-9812)"
      )
    );
  }
  return Promise.resolve();
};

const faxNumberValidator = (_, value) => {
  if (value && !/^(?:0\d{1,4}-\d{2,4}-\d{4})$/.test(value)) {
    return Promise.reject(
      new Error("有効なFAX番号を入力してください！(例: 045-506-2901)")
    );
  }
  return Promise.resolve();
};

const validateAddress = (_, value) => {
  if (value && value.length < 5) {
    return Promise.reject(new Error("住所は5文字以上で入力してください！"));
  }
  return Promise.resolve(); // Allow empty value
};
const postalCodeValidator = (_, value) => {
  if (value && !/^\d{3}-\d{4}$/.test(value)) {
    // Assuming the format is XXX-XXXX
    return Promise.reject(
      new Error("有効な郵便番号を入力してください！(例: 123-4567)")
    );
  }
  return Promise.resolve();
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const getValidationRules = (dataIndex) => {
    switch (dataIndex) {
      case "TEL":
        return [{ validator: phoneNumberValidator }];
      case "FAX":
        return [{ validator: faxNumberValidator }];
      case "郵便番号":
        return [{ validator: postalCodeValidator }];
      default:
        return [{ required: false, message: `${title}を入力してください！` }];
    }
  };

  return (
    <td {...restProps} className="scrollable-cell">
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={getValidationRules(dataIndex)}
        >
          <Input className="scrollable-input" />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function CustomerPage() {
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
        `${process.env.REACT_API_BASE_URL}/customer`
      );
      const sortedData = res.data.sort((a, b) => b.カウント - a.カウント);
      setDatas(sortedData);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "得意先の読み込みに失敗しました。",
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
        `${process.env.REACT_API_BASE_URL}/customer/${key}`,
        updatedCompany
      );

      notification.success({
        message: "成功",
        description: "Partner company updated successfully.",
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
        process.env.REACT_API_BASE_URL + `/customer/${key}`
      );
      notification.success({
        message: "成功",
        description: "得意先が正常に削除されました。",
      });
      fetchPartnerCompanies(); // Reload data after deletion
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "得意先の削除に失敗しました。",
      });
    }
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_API_BASE_URL}/customer`,
        values
      );
      // notification.success({
      //   message: "成功",
      //   description: "得意先が正常に追加されました。",
      // });
      setIsModalVisible(false);
      fetchPartnerCompanies(); // Reload data after adding
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "得意先の追加に失敗しました。",
      });
    }
  };

  const columns = [
    
    {
      title: "企業CD",
      dataIndex: "企業CD",
      editable: true,
      align: "center",
      width: 90,
    },
    {
      title: "得意先CD",
      dataIndex: "得意先CD",
      editable: true,
      align: "center",
      width: 100,
    },
    {
      title: "企業名",
      dataIndex: "企業名",
      editable: true,
      align: "center",
      width: 250,
    },
    {
      title: "事業所1",
      dataIndex: "事業所1",
      editable: true,
      align: "center",
      width: 200,
    },
    {
      title: "事業所2",
      dataIndex: "事業所2",
      editable: true,
      align: "center",
      width: 350,
    },
    {
      title: "企業名ｶﾅ",
      dataIndex: "企業名ｶﾅ",
      editable: true,
      align: "center",
      width: 150,
    },
    {
      title: "事業所1ｶﾅ",
      dataIndex: "事業所1ｶﾅ",
      editable: true,
      align: "center",
      width: 200,
    },
    {
      title: "事業所2ｶﾅ",
      dataIndex: "事業所ｶﾅ",
      editable: true,
      align: "center",
      width: 150,
    },
    {
      title: "企業名略称",
      dataIndex: "企業名略称",
      editable: true,
      align: "center",
      width: 250,
    },
    {
      title: "郵便番号",
      dataIndex: "郵便番号",
      editable: true,
      align: "center",
      validationRules: [{ validator: postalCodeValidator }],
    },
    {
      title: "住所1",
      dataIndex: "住所1",
      editable: true,
      align: "center",
      width: 330,
    },
    {
      title: "住所2",
      dataIndex: "住所2",
      editable: true,
      align: "center",
      width: 300,
    },
    {
      title: "TEL",
      dataIndex: "TEL",
      editable: true,
      align: "center",
      validationRules: [{ validator: phoneNumberValidator }],
      width: 150,
    },
    {
      title: "FAX",
      dataIndex: "FAX",
      editable: true,
      align: "center",
      validationRules: [{ validator: faxNumberValidator }],
      width: 150,
    },
    {
      title: "種類1",
      dataIndex: "種類1",
      editable: true,
      align: "center",
      width: 150,
    },
    {
      title: "種類2",
      dataIndex: "種類2",
      editable: true,
      align: "center",
      width: 150,
    },
    {
      title: "種類3",
      dataIndex: "種類3",
      editable: true,
      align: "center",
      width: 150,
      },
    {
      title: "種類4",
      dataIndex: "種類4",
      editable: true,
      align: "center",
      width: 150,
      },
    {
      title: "種類5",
      dataIndex: "種類5",
      editable: true,
      align: "center",
      width: 150,
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
            得意先を追加
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
        title="得意先を追加"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
      >
        <Form form={addForm} onFinish={handleAdd}>
          <div className="flex justify-between">
            <Form.Item
              name="企業CD"
              rules={[
                { required: true, message: "「企業CDを入力してください！" },
              ]}
            >
              <Input name="number" placeholder="企業CD" />
            </Form.Item>
            <Form.Item
              name="得意先CD"
              rules={[
                { required: true, message: "「得意先CDを入力してください！" },
              ]}
            >
              <Input name="number" placeholder="得意先CD" />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <Form.Item
              name="企業名"
              rules={[
                { required: true, message: "「企業名を入力してください！" },
              ]}
            >
              <Input placeholder="企業名" />
            </Form.Item>
            <Form.Item
              name="企業名ｶﾅ"
              rules={[
                { required: true, message: "「企業名ｶﾅを入力してください！" },
              ]}
            >
              <Input
                placeholder="企業名ｶﾅ"
                rules={[
                  {
                    pattern: /^[ァ-ヶー]*$/,
                    message: "カタカナのみ入力可能です",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <Form.Item name="事業所1">
              <Input placeholder="事業所1" />
            </Form.Item>

            <Form.Item name="事業所1ｶﾅ">
              <Input
                placeholder="事業所1ｶﾅ"
                rules={[
                  {
                    pattern: /^[ァ-ヶー]*$/,
                    message: "カタカナのみ入力可能です",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <Form.Item name="事業所2">
              <Input placeholder="事業所2" />
            </Form.Item>

            <Form.Item name="事業所2ｶﾅ">
              <Input
                placeholder="事業所2ｶﾅ"
                rules={[
                  {
                    pattern: /^[ァ-ヶー]*$/,
                    message: "カタカナのみ入力可能です",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="企業名略称"
            rules={[
              { required: true, message: "「企業名略称を入力してください！" },
            ]}
          >
            <Input placeholder="企業名略称" />
          </Form.Item>
          <Form.Item
            name="郵便番号"
            rules={[{ validator: postalCodeValidator }]}
          >
            <Input placeholder="郵便番号" />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item name="住所1">
              <Input placeholder="住所1" />
            </Form.Item>
            <Form.Item name="住所2">
              <Input placeholder="住所2" />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <Form.Item name="TEL" rules={[{ validator: phoneNumberValidator }]}>
              <Input placeholder="TEL" />
            </Form.Item>
            <Form.Item name="FAX" rules={[{ validator: faxNumberValidator }]}>
              <Input placeholder="FAX" />
            </Form.Item>
          </div>
          <div className="flex gap-2">
            <Form.Item name="種類1">
              <Input placeholder="種類1" />
            </Form.Item>
            <Form.Item name="種類2">
              <Input placeholder="種類2" />
            </Form.Item>
            <Form.Item name="種類3">
              <Input placeholder="種類3" />
            </Form.Item>
            <Form.Item name="種類4">
              <Input placeholder="種類4" />
            </Form.Item>
            <Form.Item name="種類5">
              <Input placeholder="種類5" />
            </Form.Item>
          </div>
          
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
