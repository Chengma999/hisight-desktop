import React from 'react'
import { Form,Select, Button, } from 'antd';
import axios from 'axios'
import moment from 'moment'
import {daysOptions} from './timeOptions'
// const {target} =require('../../../utils/gegevens')
const target = localStorage.getItem('target');
const {Option} = Select



const ClosedayForm = props => {

  const {factors} = props
  const [form]=Form.useForm()
  const onFinish = async values => {
    console.log(values)
    const {data}=await axios.post(`${target}/api/admincrud/updatecloseday`,values)
    window.location.reload()
  };
  const optionsArr=daysOptions.map(day=>{
    return <Option value={day.value}>{day.text}</Option>})
    const {closeday} = factors
    if(closeday!==undefined && closeday.length>0){
      form.setFieldsValue(
        {closeday}
      )
    }
  return (
    <div>

    <Form
      name="basic"
      form={form}
      onFinish={onFinish}

    >
      <Form.Item
        name="closeday"
        rules={[
          {
            required: true,
            message: 'Kies de dag wanneer je gesloten bent!',
          },
        ]}
      >
        <Select
          mode="multiple">
        {optionsArr}
        </Select >
      </Form.Item>


        <Button type="primary" htmlType="submit">
          Submit
        </Button>

    </Form>
    </div>
  );
};

export default ClosedayForm
