import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Collapse,
  List,
  Pagination,
  Button,
  Modal,
  Row,
  Col,
  Popover,
  Typography,
} from 'antd';
import {
  PrinterOutlined,
  MessageOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import styles from '../admin.less';
import { orderPrint, smsSend, ordersFetch } from '../../../actions/index';
import SmsForm from '../form/SmsForm';
import moment from 'moment';
import AdminPage from '../AdminPage';
import DatePickerForm from './DatePickerForm';
import WebsocketNotification from './WebsocketNotification';
const { print, omzetbonPrint } = require('../../../services/print');
const convertInEuro = (totalPrice) => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(totalPrice);
};
const { Title } = Typography;
const pageSize = 6;

class Order extends Component {
  static propTypes = {};
  state = {
    visible: false,
    order: {},
    chosenDate: moment(),
    current: 1,
    orders_paid_all: [],
    orders_in_panels: [],
    totalSalesRevenue: 0,
    totalAfhaalRevenue: 0,
    totalBezorgenRevenue: 0,
  };

  componentDidMount() {
    this.props.ordersFetch().then((data) => {
      const newData = data.filter((order) =>
        moment().isSame(moment(order.createdDate), 'day'),
      );

      this.setState({
        orders_paid_all: data,
        orders_in_panels: newData,
      });
    });
  }
  omzetbonObject = (ordersArr) => {
    const { chosenDate } = this.state;
    let totalSalesRevenue = 0;
    let totalAfhaalRevenue = 0;
    let totalBezorgenRevenue = 0;
    ordersArr.forEach((order) => {
      totalSalesRevenue += order.totalPrice;
      if (order.orderType === 'afhalen') {
        totalAfhaalRevenue += order.totalPrice;
      }
      if (order.orderType === 'bezorgen') {
        totalBezorgenRevenue += order.totalPrice;
      }
    });
    return {
      totalSalesRevenue,
      totalAfhaalRevenue,
      totalBezorgenRevenue,
      aantal: ordersArr.length,
      date: chosenDate.format('dddd, MMMM Do YYYY, h:mm:ss,Z'),
    };
  };
  onFinish = (values) => {
    const { orders_paid_all } = this.state;
    console.log('Success:', values.date);
    const newData = orders_paid_all.filter((order) =>
      values.date.isSame(moment(order.createdDate), 'day'),
    );

    this.setState({
      chosenDate: values.date,
      orders_in_panels: newData,
    });
  };
  onChange = (page) => {
    this.setState({
      current: page,
    });
  };
  showModal = (order) => {
    this.setState({
      visible: true,
      order,
    });
  };
  listenOrders = (order) => {
    const { orders_in_panels, orders_paid_all } = this.state;
    const new_orders_paid_all = [...orders_paid_all];
    const new_orders_in_panels = [...orders_in_panels];
    const index = new_orders_in_panels.findIndex(
      (order_in_panels) => order_in_panels.orderId === order.orderId,
    );
    if (index > -1) {
      return;
    }
    new_orders_in_panels.push(order);
    new_orders_paid_all.push(order);
    this.setState({
      orders_in_panels: new_orders_in_panels,
      orders_paid_all: new_orders_paid_all,
    });
  };
  handleOk = () => {
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleClick = (order) => {
    print(order);
  };
  handleOmzetBonClick = (ordersArr) => {
    const obj = this.omzetbonObject(ordersArr);
    omzetbonPrint(obj);
  };
  reload = () => window.location.reload();

  render() {
    let totalSalesRevenue = 0;
    let totalAfhaalRevenue = 0;
    let totalBezorgenRevenue = 0;
    const {
      visible,
      order,
      chosenDate,
      current,
      orders_in_panels,
    } = this.state;
    const { loading, admincrud, orderPrint, smsSend } = this.props;
    //get all paid orders from DB
    // const allPaidOrders =
    //   loading.effects['admincrud/ordersFetch'] === false
    //     ? admincrud.ordersFetch.orders
    //     : [];
    // const limitedPaidOders = allPaidOrders.filter((order) =>
    //   chosenDate.isSame(moment(order.createdDate), 'day'),
    // );
    const allPanels = orders_in_panels.map((order, i) => {
      totalSalesRevenue += order.totalPrice;
      if (order.orderType === 'afhalen') {
        totalAfhaalRevenue += order.totalPrice;
      }
      if (order.orderType === 'bezorgen') {
        totalBezorgenRevenue += order.totalPrice;
      }
      const content = (
        <div>
          {order.orderType === 'bezorgen' ? (
            <div>
              <p>{order.adres}</p>
              <p>{order.postcode}</p>
              <p>{order.telefoon}</p>
              <p>{order.notes}</p>
              <p>{order.bedrijfsnaam}</p>
            </div>
          ) : (
            <div>
              <p>{order.telefoon}</p>
              <p>{order.notes}</p>
              <p>{order.bedrijfsnaam}</p>
            </div>
          )}
        </div>
      );

      const header = (
        <Row>
          <Col span={6}>
            <b>{order.cus_orderId}</b>
          </Col>
          <Col span={6}>
            <span onClick={(e) => e.stopPropagation()}>
              <Popover content={content} placement="leftTop" trigger="click">
                <InfoCircleOutlined />
              </Popover>
            </span>
            <b>
              {' '}
              {order.orderType} {order.takeTime}
            </b>
          </Col>
          <Col span={6}>
            <b>{order.customerName}</b>
          </Col>
          <Col span={6}>
            <b>{convertInEuro(order.totalPrice)}</b>
          </Col>
        </Row>
      );
      return (
        <Collapse.Panel header={header} key={i}>
          <div className={styles.productsHeader}>
            <Row>
              <Col span={6}>Aantal</Col>
              <Col span={6}>Title</Col>
              <Col span={6}>Optie</Col>
              <Col span={6}>Subtotal</Col>
            </Row>
          </div>
          <br />
          {order.cartProducts.map((cartProduct) => {
            return (
              <div className={styles.productsHeader}>
                <Row>
                  <Col span={6}>{cartProduct.quantity}</Col>
                  <Col span={6}>{cartProduct.title}</Col>
                  <Col span={6}>
                    {cartProduct.option !== undefined
                      ? cartProduct.option.title
                      : 'nvt'}
                  </Col>
                  <Col span={6}>{convertInEuro(cartProduct.subTotal)}</Col>
                </Row>
              </div>
            );
          })}
          <div className={styles.printer}>
            <span style={{ paddingRight: '20px' }}>
              <Button
                type="primary"
                shape="circle"
                icon={<PrinterOutlined />}
                // onClick={()=>orderPrint(order)}
                onClick={() => this.handleClick(order)}
              ></Button>
            </span>
            <span>
              {' '}
              <Button
                type="danger"
                shape="circle"
                icon={<MessageOutlined />}
                onClick={() => this.showModal(order)}
              ></Button>
            </span>
          </div>
        </Collapse.Panel>
      );
    });

    return (
      <div>
        <AdminPage page="orders" />
        <WebsocketNotification listenOrders={this.listenOrders} />
        <div className={styles.ordersFull}>
          <div style={{textAlign:"center"}}>
            <Button type="danger" onClick={this.reload}>Refresh</Button>
          </div>
          <DatePickerForm onFinish={this.onFinish} />

          <Collapse bordered={true} defaultActiveKey={['0']}>
            {allPanels.filter(
              (a, i) =>
                i >= (current - 1) * pageSize && i <= current * pageSize - 1,
            )}
          </Collapse>

          <Modal
            className={styles.modalOneButton}
            visible={visible}
            title={
              order.cus_orderId +
              ' ' +
              order.orderType +
              ' ' +
              order.customerName +
              ' ' +
              convertInEuro(order.totalPrice)
            }
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading.effects['admincrud/add'] === true}
                onClick={this.handleOk}
              >
                Submit
              </Button>,
            ]}
          >
            {/* <AddForm addInDb={addInDb} loading={loading} categories={categories} /> */}
            <SmsForm
              smsSend={smsSend}
              number={order.telefoon}
              orderType={order.orderType}
              orderId={order.cus_orderId}
              loading={loading}
              admincrud={admincrud}
            />
          </Modal>
        </div>
        <div className={styles.pagination}>
          <Pagination
            current={this.state.current}
            onChange={this.onChange}
            pageSize={pageSize}
            total={allPanels.length}
          />
          ;
        </div>
        <div className={styles.totalRevenue}>
          <Button
            type="primary"
            onClick={() =>
              this.handleOmzetBonClick(this.state.orders_in_panels)
            }
          >
            Print Dag Omzet
          </Button>
          <Row>
            <Col sm={8} xs={24}>
              <Title>AFhaal:{convertInEuro(totalAfhaalRevenue)}</Title>
            </Col>
            <Col sm={8} xs={24}>
              <Title>Bezorgen:{convertInEuro(totalBezorgenRevenue)}</Title>
            </Col>
            <Col sm={8} xs={24}>
              <Title>Totaal:{convertInEuro(totalSalesRevenue)}</Title>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, admincrud }) => ({
  loading,
  admincrud,
});

export default connect(mapStateToProps, { orderPrint, smsSend, ordersFetch })(
  Order,
);
