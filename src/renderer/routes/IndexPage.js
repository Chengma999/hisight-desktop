import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Select } from 'antd';
import styles from './IndexPage.css';
import { getPrinters } from '../services/print';
const { Option } = Select;

class IndexPage extends Component {
  state = {
    printerList: undefined,
  };
  componentDidMount() {
    const printerList = getPrinters();
    console.log(printerList);
    this.setState({ printerList });
  }

  render() {
    const { printerList } = this.state;
    const options = !printerList
      ? []
      : printerList.map((printer) => (
        <Option i={printer.name} value={printer.name}>{printer.name}</Option>
      ));

    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Welcome to Pinter Software</h1>

      <h3>Printer Balie</h3>
      <Select>{options}</Select>
      <h3>Printer Keuken</h3>
        <Select>{options}</Select>

        <Link to="/login">Go to Login Page</Link>
      </div>
    );
  }
}

export default connect()(IndexPage);
