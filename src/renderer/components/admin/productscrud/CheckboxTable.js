import React from 'react'
import {Table} from 'antd'
import CheckboxForm from '../form/CheckboxForm'
import styles from '../admin.less'
const columns = [
  {
    title: 'KEYS',
    dataIndex: 'keys',
    width: 100,
    render:(text)=><div style={{fontWeight:'600'}}>{text}</div>
  },
  {
    title: 'VALUES',
    dataIndex: 'values',
    width: 100,
  },


];


function CheckboxTable(props) {
  const {checkbox}= props

  const data = [
    {
      key: 1,
      keys: "Extra1" ,
      values: <CheckboxForm  checkboxcode={1} checkbox={checkbox} />,

    },
    {
      key: 2,
      keys: "Extra2" ,
      values: <CheckboxForm  checkboxcode={2} checkbox={checkbox} />,

    },
    {
      key: 3,
      keys: "Extra3" ,
      values: <CheckboxForm  checkboxcode={3} checkbox={checkbox} />,

    },
    {
      key: 4,
      keys: "Extra4" ,
      values: <CheckboxForm  checkboxcode={4} checkbox={checkbox}/>,

    }
  ];
  return (
    <div className={styles.table}>
        <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
        />
    </div>

  )
}

export default CheckboxTable


