import React from 'react'
import { Form, Input,Select, Button, } from 'antd';
import axios from 'axios'
import moment from 'moment'
// const {target} =require('../../../utils/gegevens')
const target = localStorage.getItem('target');
const {Option} = Select

const arr=[];
const a=12;
const n=22;
const index=(n-a)/0.25
for( let i=0;i<index+1;i++){
  arr.push(a+i*0.25)
}

const BezorgtijdenForm = props => {

  const {factors} = props
  const [form]=Form.useForm()
  const onFinish = async values => {
    const {data}=await axios.post(`${target}/api/admincrud/updatebezorgtijden`,values)
    window.location.reload()
  };
  const optionsArr=arr.map(time=>{
    const label =moment((Math.floor(time)*100+(time-Math.floor(time))*60).toString(),'hmm').format("HH:mm")
    return <Option value={time}>{label}</Option>})
    const {tijden} = factors
    if(tijden!==undefined && tijden.length>0){
    form.setFieldsValue(
      {begintime:tijden[0].value,
      endtime:tijden[tijden.length-1].value})
    }
  return (
    <div>

    <Form
      name="basic"
      form={form}
      onFinish={onFinish}

    >
      <Form.Item
        name="begintime"
        rules={[
          {
            required: true,
            message: 'Vul beginbezorgtijd in!',
          },
        ]}
      >
        <Select >
        {optionsArr}
        </Select >
      </Form.Item>
      <Form.Item
        name="endtime"
        rules={[
          {
            required: true,
            message: 'Vul eindbezorgtijd in!',
          },({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('begintime') < value) {
                return Promise.resolve();
              }

              return Promise.reject('Eindtijd moet later zijn dan begintijd!');
            },
          }),
        ]}
      >
        <Select >
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

export default BezorgtijdenForm
