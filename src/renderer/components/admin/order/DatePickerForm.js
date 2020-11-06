import React from 'react'
import {Form,Button,DatePicker} from 'antd'
import styles from '../../../css/form.less'

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const layout = {
  labelCol: {
    xs: {span: 24},
    sm:{span: 4}
  },
  wrapperCol: {
    xs: {span: 24},
    sm:{span: 16}
  }
};
const tailLayout = {
  wrapperCol: {
    xs: {span: 24 },
    sm:{ offset: 4,span: 16}
  }
};


const DatePickerForm =(props)=>{

  return <Form {...layout} name="basic" onFinish={props.onFinish}>
          <div className={styles.datePicker}>
            <Form.Item label="Kies a datum" name="date" rules={[
              {
                required: true,
                message: "Kies een datum!"
              }
              ]}
            >
            <DatePicker
              format={dateFormatList}
              onChange={props.onChange}
              placeholder='vandaag'
              // value={this.state.value}

            />
          </Form.Item>
          </div>

          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
}
export default DatePickerForm
