import { connect } from "dva";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../admin/admin.less";
import OptionForm from "./options/OptionForm";
import Groep from "./options/Groep";
import { Table, Input, InputNumber, Button, Popconfirm, Form } from "antd";
import { updateOptions } from "../../../actions/index";
const restaurantType = localStorage.getItem('restaurantType');


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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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

const Optionscomponent = ({
  options,
  getOptions,
  addGroup,
  deleteGroup,
  updateGroup,
  addGroupOption,
  updateGroupOption,
  deleteGroupOption,
}) => {
  const [form] = Form.useForm();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.option_title === editingKey;

  const edit = (record) => {
    console.log(record);
    if (restaurantType !== "chinees") {
      form.setFieldsValue({
        option_title: "",
        option_name: "",
        option_price: "",
        ...record,
      });
    }
    if (restaurantType === "chinees") {
      form.setFieldsValue({
        option_title: "",
        option_name: "",
        option_chi_cha: "",
        option_price: "",
        ...record,
      });
    }
    setEditingKey(record.option_title);
  };
  const deleteItem = async ({ option_title }) => {
    try {
      deleteGroupOption({ title: selectedGroup, option_title }).then(() => {
        setEditingKey("");
      });
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleSelectChange = (value) => {
    //async axios
    setSelectedGroup(value);
    console.log(`selected ${value}`);
  };
  // const addGroupOption = async (option) => {
  //   addGroupOption({ title: selectedGroup, ...option });
  // };
  const save = async (option_title) => {
    const row = await form.validateFields();

    try {
      updateGroupOption({
        title: selectedGroup,
        old_option_title: option_title,
        ...row,
      }).then(() => setEditingKey(""));
    } catch (err) {
      console.log("Validate Failed:", err);
    }
  };

  const columns = [
    {
      title: "option_title",
      dataIndex: "option_title",
      width: "25%",
      editable: true,
    },
    {
      title: "option_name",
      dataIndex: "option_name",
      width: "30%",
      editable: true,
    },
    {
      title: "option_price",
      dataIndex: "option_price",
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
              onClick={() => save(record.option_title)}
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
  const index = options.findIndex((group) => group.title === selectedGroup);

  const datasource = !options[index] ? [] : options[index].options;
  if (restaurantType === "chinees") {
    columns.splice(2, 0, {
      title: "option_chi_cha",
      dataIndex: "option_chi_cha",
      width: "25%",
      editable: true,
    });
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "option_price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles.table}>
      <Groep
        // setGroups_arr={setGroups_arr}
        // groups_arr={groups_arr}
        groups={groups}
        setGroups={setGroups}
        handleSelectChange={handleSelectChange}
        options={options}
        addGroup={addGroup}
        deleteGroup={deleteGroup}
        updateGroup={updateGroup}
      />
      <OptionForm
        addGroupOption={addGroupOption}
        selectedGroup={selectedGroup}
        options={options}
      />
      <h4>{selectedGroup}</h4>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={datasource.map((ele, i) => ({ key: i, ...ele }))}
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

export default Optionscomponent;
