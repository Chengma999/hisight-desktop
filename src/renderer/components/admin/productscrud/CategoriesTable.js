import React ,{useState, useEffect}from 'react'
import {Table,Button} from 'antd'
import CategorieForm from '../form/CategorieForm'
import styles from '../../admin/admin.less'
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

function CategoriesTable(props) {
  const [data,setData]=useState([])
  let {categories}= props
  categories = categories.categories?categories.categories:[]
  const newdata =categories.map((categorie,i)=>{
    return{
      key:i+1,
      keys:categorie.cat_code,
      values:<CategorieForm  categorie={categorie}/>
    }
  })
  useEffect(()=>{setData(newdata)},[props])
  const handleAdd=()=>{
    newdata.push(
      {key:newdata.length,
      keys:'nieuwe categorie',
      values:<CategorieForm />}
    )
    setData(newdata)
  }
  return (
        <div>

          <div className={styles.table}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              />
            </div>
          <Button
            onClick={handleAdd}
            type="primary"
            className={styles.button}
          >
            Voeg een rij toe
          </Button>

        </div>
  )
}

export default CategoriesTable


