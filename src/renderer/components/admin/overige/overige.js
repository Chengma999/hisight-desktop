import React from 'react'
import {connect} from 'dva'
import {Table} from 'antd'
import AdminPage from '../AdminPage'
import BezorgstatusForm from './BezorgstatusForm'
import BezorgkostenForm from './BezorgkostenForm'
import BezorgtijdenForm from './BezorgtijdenForm'
import AfhaaltijdenForm from './AfhaaltijdenForm'
import ClosedayForm from './ClosedayForm'
import PrintStatusForm from './PrintStatusForm'
import PrinterForm from './PrinterForm'
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


function Overige (props) {
  const {bezorgkosten,bezorgstatus,factors} = props
  const kosten =bezorgkosten.fee===undefined?'':bezorgkosten.fee
  const status =bezorgstatus.status===undefined?'':bezorgstatus.status
  const data = [
    {
      key: 1,
      keys: "bezorgstatus" ,
      values: <BezorgstatusForm  status={status}/>,

    },
    {
      key: 2,
      keys: "bezorgkosten" ,
      values: <BezorgkostenForm  kosten={kosten}/>,

    },
    {
      key: 3,
      keys: "bezorgtijden" ,
      values: <BezorgtijdenForm  factors={factors}/>,

    },
    {
    key: 4,
    keys: "afhaaltijden" ,
    values: <AfhaaltijdenForm factors={factors}/>,

  },
  {
  key: 5,
  keys: "gesloten dagen" ,
  values: <ClosedayForm factors={factors}/>,

},
  {
  key: 6,
  keys: "Auto Print" ,
  values: <PrintStatusForm factors={factors}/>,

},
  {
  key: 7,
  keys: "Printer Config" ,
  values: <PrinterForm factors={factors}/>,

}

  ];
  return (
    <div>
      <AdminPage page='overige'/>
      <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            />,
      </div>


    </div>
  )
}

const mapStateToProps=({bezorgkosten,bezorgstatus,factors})=>({
  bezorgkosten,
  bezorgstatus,
  factors

})

export default connect(mapStateToProps)(Overige)
