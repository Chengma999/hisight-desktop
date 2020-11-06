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

const GroupsTable = (props) => {
  const { options, updateGroup, deleteGroup } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.title === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      title: "",
      amount: "",
      description: "",
      kind_of_choice: "",
      ...record,
    });
    setEditingKey(record.title);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteGroup({
        title: record.title,
      }).then(() => {
        setEditingKey("");
      });
    } catch (errInfo) {
      console.log("Delete failed:", errInfo);
    }
  };

  const save = async (title) => {
    try {
      const row = await form.validateFields();
      const { description, kind_of_choice } = row;
      updateGroup({
        title,
        description,
        kind_of_choice,
      }).then(() => {
        setEditingKey("");
      });
    } catch (errInfo) {
      console.log("Update faild:", errInfo);
    }
  };

  const columns = [
    {
      title: "Groupsnaam",
      dataIndex: "title",
      width: "25%",
      editable: false,
    },
    {
      title: "description",
      dataIndex: "description",
      width: "25%",
      editable: true,
    },
    {
      title: "kind_of_choice",
      dataIndex: "kind_of_choice",
      width: "15%",
      editable: true,
    },
    {
      title: "amount",
      dataIndex: "amount",
      width: "15%",
      editable: false,
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
                save(record.title, record.description, record.kind_of_choice)
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
        inputType:
          col.dataIndex === "amount"
            ? "number"
            : col.dataIndex === "kind_of_choice"
            ? "select"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const dataSource = options.map((group) => {
    return { ...group, amount: group.options.length };
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
          dataSource={dataSource.map((ele, i) => ({ key: i, ...ele }))}
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

export default GroupsTable;
