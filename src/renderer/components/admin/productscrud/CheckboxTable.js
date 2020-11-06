import React from "react";
import { Table } from "antd";
import CheckboxForm from "../form/CheckboxForm";
import styles from "../admin.less";
const columns = [
  {
    title: "KEYS",
    dataIndex: "keys",
    width: 100,
    render: (text) => <div style={{ fontWeight: "600" }}>{text}</div>,
  },
  {
    title: "VALUES",
    dataIndex: "values",
    width: 100,
  },
];

function CheckboxTable({ checkbox, updateCheckbox }) {
  const data = [
    {
      key: 1,
      keys: "checkbox1",
      values: (
        <CheckboxForm
          checkboxcode={1}
          checkbox={checkbox}
          updateCheckbox={updateCheckbox}
        />
      ),
    },
    {
      key: 2,
      keys: "checkbox2",
      values: (
        <CheckboxForm
          checkboxcode={2}
          checkbox={checkbox}
          updateCheckbox={updateCheckbox}
        />
      ),
    },
    {
      key: 3,
      keys: "checkbox3",
      values: (
        <CheckboxForm
          checkboxcode={3}
          checkbox={checkbox}
          updateCheckbox={updateCheckbox}
        />
      ),
    },
    {
      key: 4,
      keys: "checkbox4",
      values: (
        <CheckboxForm
          checkboxcode={4}
          checkbox={checkbox}
          updateCheckbox={updateCheckbox}
        />
      ),
    },
  ];
  return (
    <div className={styles.table}>
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </div>
  );
}

export default CheckboxTable;
