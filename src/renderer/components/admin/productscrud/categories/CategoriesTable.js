import React, { useState } from "react";
import axios from "axios";
import styles from "../../../admin/admin.less";
import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";

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
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "text" ? (
      <Input />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CategoriesTable = (props) => {
  const { categories, setCategories, updateCategorie, deleteCategorie } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.cat_code === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      cat_code: "",
      cat_name: "",
      sort_number: "",
      ...record,
    });
    setEditingKey(record.cat_code);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteCategorie({
        cat_code: record.cat_code,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const save = async (cat_code, cat_name, cat_number) => {
    try {
      const row = await form.validateFields();
      const { cat_name, sort_number } = row;

      updateCategorie({
        cat_code,
        cat_name,
        sort_number,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Update Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "cat_code",
      dataIndex: "cat_code",
      width: "25%",
      editable: false,
    },
    {
      title: "cat_name",
      dataIndex: "cat_name",
      width: "25%",
      editable: true,
    },
    {
      title: "sort_number",
      dataIndex: "sort_number",
      width: "15%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              style={{
                marginRight: "5px",
                marginBottom: "5px",
                color: "white",
                background: "#268540",
              }}
              onClick={() =>
                save(record.cat_code, record.cat_name, record.sort_number)
              }
            >
              Save
            </Button>
            <Button
              style={{
                marginRight: "5px",
                marginBottom: "5px",
                color: "white",
                background: "#ec3ff2",
              }}
              onClick={cancel}
            >
              Cancel
            </Button>
          </span>
        ) : (
          <span>
            <Button
              style={{ background: "#1613d1", color: "white" }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Zeker weten om te verwijderen?"
              onConfirm={() => deleteItem(record)}
            >
              <Button
                style={{ background: "#c90414", color: "white" }}
                disabled={editingKey !== ""}
              >
                Delete
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
        inputType: col.dataIndex === "sort_number" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles.table}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={categories.map((ele, i) => ({ key: i, ...ele }))}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default CategoriesTable;
