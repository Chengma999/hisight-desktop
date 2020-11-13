const React = require('react');
import styles from './worker.css';
const queryString = require('query-string');
const { changeFormat } = require('../../../shared/gegevens');
const restaurantType = localStorage.getItem('restaurantType');
const search = global.location.search.replace(/&/gi, '*');
let { data } = queryString.parse(search);
data = JSON.parse(data);

console.log(data);
const {
  orderType,
  cus_orderId,
  takeTime,
  customerName,
  bedrijfsnaam,
  email,
  telefoon,
  adres,
  postcode,
  cityname,
  deliveryFee,
  notes,
  cartProducts,
  totalPrice,
  paymethod,
} = data;
cartProducts.sort((a, b) => a.sort_number - b.sort_number);
const WorkerKitchen = () => {
  return (
    <div className={styles.content}>
      <table style={{ width: '100%' }}>
        <tbody className={styles.orderInfo}>
          <tr>
            <td>{cus_orderId}</td>

            {paymethod !== 'cash' ? (
              <td></td>
            ) : (
              <td
                style={{ borderStyle: 'solid', borderWidth: '3px' }}
                className={styles.rightAlign}
              >
                {restaurantType !== 'chinees' ? 'NOG TE BETALEN' : '未付款'}
              </td>
            )}
          </tr>
          <tr>
            <td>
              {orderType === 'bezorgen'
                ? restaurantType !== 'chinees'
                  ? 'Bezorgen'
                  : '送餐'
                : restaurantType !== 'chinees'
                ? 'Afhalen'
                : '外卖'}
            </td>
            <td className={styles.rightAlign}>{takeTime}</td>
          </tr>
          <tr>
            <td>Naam</td>
            <td className={styles.rightAlign}>{customerName}</td>
          </tr>
          <tr>
            <td>{restaurantType !== 'chinees' ? 'Totaal' : '总计:'}</td>
            <td className={styles.rightAlign}>{changeFormat(totalPrice)}</td>
          </tr>
          {!notes ? null : (
            <tr>
              <td>{restaurantType !== 'chinees' ? 'Opmerking:' : '备注:'}</td>
              <td className={styles.rightAlign}>{notes}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginBottom: '10px' }} className={styles.dottedLine}></div>

      {cartProducts.map((cartProduct, index) => {
        const { quantity, title, chi_cha, option, sort_number } = cartProduct;
        const needDottedLine =
          index === cartProducts.length - 1
            ? false
            : sort_number !== cartProducts[index + 1].sort_number;

        return (
          <div className={styles.productText}>
            <table
              style={{
                width: '100%',
                wordWrap: 'break-all',
                lineHeight: 1.2,
                tableLayout: 'fixed',
                borderCollapse: 'separate',
                borderSpacing: '0 4px',
              }}
            >
              <tbody>
                <tr>
                  <td style={{ width: '8%', verticalAlign: 'top' }}>
                    {quantity}
                  </td>
                  <td style={{ wordBreak: 'break-word' }}>
                    {restaurantType !== 'chinees' ? title : chi_cha}{' '}
                    {!option
                      ? ''
                      : restaurantType !== 'chinees'
                      ? option.title
                      : option.chi_cha}
                  </td>
                  <td
                    className={styles.rightAlign}
                    style={{
                      verticalAlign: 'top',
                      width: '25%',
                      fontWeight:"500"
                    }}
                  >
                    {changeFormat(cartProduct.subTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
            {
              // <p>
              //   {quantity} {restaurantType !== 'chinees' ? title : chi_cha}{' '}
              //   {!option
              //     ? ''
              //     : restaurantType !== 'chinees'
              //     ? option.title
              //     : option.chi_cha}
              // </p>
            }
            {needDottedLine ? (
              <div
                style={{margin:"10px 0",width:"100%" }}
                className={styles.dashedLine}
              ></div>
            ) : null}
          </div>
        );
      })}

      <div className={styles.dottedLine}></div>
      <div style={{ paddingTop: '40px', color: 'white' }}>
        <p>end </p>
      </div>
    </div>
  );
};
export default WorkerKitchen;
