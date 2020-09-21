import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Collapse,
  Pagination,
  Button,
  Modal,
  Row,
  Col,
  Popover,
  Typography,
} from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import styles from '../admin.less';
import { orderPrint, reservationsFetch } from '../../../actions/index';
import moment from 'moment';
import AdminPage from '../AdminPage';
import DatePickerForm from '../order/DatePickerForm';
import WebsocketNotification from '../order/WebsocketNotification';
const restaurantType = localStorage.getItem('restaurantType');
const isLooping = false;
const { print } = require('../../../services/print');

const { Title } = Typography;
const pageSize = 8;

class ReservationOverview extends Component {
  static propTypes = {};
  state = {
    visible: false,
    order: {},
    chosenDate: moment(),
    current: 1,
    reservations_all: [],
    reservations_in_panels: [],
  };

  componentDidMount() {
    this.props.reservationsFetch().then((data) => {
      console.log(data);
      const newData = data.filter((reservation) =>
        moment().isSame(moment(reservation.date), 'day'),
      );

      this.setState({
        reservations_all: data,
        reservations_in_panels: newData,
      });
    });
  }

  onFinish = (values) => {
    const { reservations_all } = this.state;
    console.log('Success:', values.date);
    const newData = reservations_all.filter((reservation) =>
      values.date.isSame(moment(reservation.date), 'day'),
    );

    this.setState({
      chosenDate: values.date,
      reservations_in_panels: newData,
    });
  };
  onChange = (page) => {
    this.setState({
      current: page,
    });
  };

  listenReservations = (reserVation) => {
    const { reservations_in_panels, reservations_all, chosenDate } = this.state;
    const new_reservations_all = [...reservations_all];
    const new_reservations_in_panels = [...reservations_in_panels];
    const index = new_reservations_all.findIndex(
      (order_in_panels) => order_in_panels._id === reserVation._id,
    );
    if (index > -1) {
      return;
    }
    new_reservations_in_panels.push(reserVation);
    new_reservations_all.push(reserVation);
    this.setState(
      {
        reservations_all: new_reservations_all,
      },
      () => {
        console.log(this.state.reservations_all);
      },
    );
    const isSame = chosenDate.isSame(moment(reserVation.date), 'day');
    if (isSame) {
      this.setState({
        reservations_in_panels: new_reservations_in_panels,
      });
    }
  };

  handleClick = (order, isLooping, restaurantType) => {
    print(order, isLooping, restaurantType);
  };
  reload = () => window.location.reload();

  render() {
    const {
      visible,
      order,
      chosenDate,
      current,
      reservations_in_panels,
    } = this.state;
    const { loading, admincrud, orderPrint } = this.props;
    const allPanels = reservations_in_panels.map((reserVation, i) => {
      const header = (
        <Row>
          <Col span={6}>
            <b>{reserVation.tel_number}</b>
          </Col>
          <Col span={6}>
            <b>{reserVation.time}</b>
          </Col>
          <Col span={6}>
            <b>{reserVation.name}</b>
          </Col>
          <Col span={6}>
            <b>{reserVation.number_of_persons} personen</b>
          </Col>
        </Row>
      );
      return (
        <Collapse.Panel header={header} key={i}>
          <div className={styles.productsHeader}>
            <Row>
              <Col span={12}>
                <i>E-mailadres:</i>
              </Col>
              <Col span={12}>
                <i>Opmerking:</i>
              </Col>
            </Row>
          </div>
          <br />
          {
            <div className={styles.productsHeader}>
              <Row>
                <Col span={12}>{reserVation.mail_address}</Col>
                <Col span={12}>{reserVation.opmerking}</Col>
              </Row>
            </div>
          }
          <div className={styles.printer}>
            <span style={{ paddingRight: '20px' }}>
              <Button
                type="primary"
                shape="circle"
                icon={<PrinterOutlined />}
                // onClick={()=>orderPrint(order)}
                onClick={() =>
                  this.handleClick(reserVation, isLooping, restaurantType)
                }
              ></Button>
            </span>
          </div>
        </Collapse.Panel>
      );
    });

    return (
      <div>
        <AdminPage page="reservation_overview" />
        <WebsocketNotification listenReservations={this.listenReservations} />
        <div className={styles.ordersFull}>
          <div style={{ textAlign: 'center' }}>
            <Button type="danger" onClick={this.reload}>
              Refresh
            </Button>
          </div>
          <DatePickerForm onFinish={this.onFinish} />

          <Collapse bordered={true} defaultActiveKey={['0']}>
            {allPanels.filter(
              (a, i) =>
                i >= (current - 1) * pageSize && i <= current * pageSize - 1,
            )}
          </Collapse>
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
      </div>
    );
  }
}

const mapStateToProps = ({ loading, admincrud }) => ({
  loading,
  admincrud,
});

export default connect(mapStateToProps, { orderPrint, reservationsFetch })(
  ReservationOverview,
);
