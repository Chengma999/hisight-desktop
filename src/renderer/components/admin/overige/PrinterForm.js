import React, { useState, useEffect } from 'react';
import { Form, Select, Button } from 'antd';
import { getPrinters, printerSet, printerGet } from '../../../services/print';
const target = localStorage.getItem('target');
const { Option } = Select;

const PrinterForm = (props) => {
  const [printerList, setPrinterList] = useState([]);
  const [chosenPrinter, setchosenPrinter] = useState(undefined);
  useEffect(() => {
    const printerList = getPrinters();
    const chosenPrinter = printerGet();
    console.log(printerList, chosenPrinter);
    setPrinterList(printerList);
    setchosenPrinter(chosenPrinter);
  }, []);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    const { balieprinter, keukenprinter } = values;
    printerSet(balieprinter, keukenprinter);
  };
  const optionsArr = !printerList
    ? []
    : printerList.map((printer) => (
        <Option i={printer.name} value={printer.name}>
          {printer.name}
        </Option>
      ));

  if (chosenPrinter !== undefined && chosenPrinter.balie !== undefined) {
    form.setFieldsValue({
      balieprinter: chosenPrinter.balie,
    });
  }
  if (chosenPrinter !== undefined && chosenPrinter.keuken !== undefined) {
    form.setFieldsValue({
      keukenprinter: chosenPrinter.keuken,
    });
  }
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <h3>Balie Printer</h3>
        <Form.Item
          name="balieprinter"
          rules={[
            {
              required: true,
              message: 'Kies een printer als je Balie Printer!',
            },
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>
        <h3>Keuken Printer</h3>
        <Form.Item
          name="keukenprinter"
          rules={[
            {
              required: true,
              message: 'Kies een printer als je keuken printer!',
            },
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PrinterForm;
