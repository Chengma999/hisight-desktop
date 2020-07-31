const React = require('react');
import styles from './worker.css';
const queryString = require('query-string');
const { changeFormat } = require('../../utils/gegevens');
const { restaurantType } = require('../../../shared/gegevens');
let { data } = queryString.parse(global.location.search);
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
  date,
  time,
  number_of_persons,
  name,
  mail_address,
  tel_number,
  opmerking,
} = data;
const WorkerLobby = () => {
  if (cus_orderId)
    return (
      <div className={styles.content}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>{cus_orderId}</b>
              </td>
              <td className={styles.rightAlign}>
                <b>
                  {orderType.toUpperCase()} {takeTime}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.dottedLine}></div>
        <table
          style={{
            width: '100%',
            wordBreak: 'break-all',
            wordWrap: 'break-all',
          }}
        >
          <tbody>
            <tr>
              <td>Naam:</td>
              <td className={styles.rightAlign}> {customerName}</td>
            </tr>
            {!bedrijfsnaam ? null : (
              <tr>
                <td>Bedrijfsnaam:</td>
                <td className={styles.rightAlign}> {bedrijfsnaam}</td>
              </tr>
            )}
            <tr>
              <td>E-mailadres:</td>
              <td className={styles.rightAlign}>{email}</td>
            </tr>
            <tr>
              <td>Telefoon:</td>
              <td className={styles.rightAlign}>{telefoon}</td>
            </tr>
          </tbody>
          {orderType === 'afhalen' ? null : (
            <tbody style={{ width: '100%' }}>
              <tr>
                <td>Adres:</td>
                <td className={styles.rightAlign}>{adres}</td>
              </tr>
              <tr>
                <td>postcode:</td>
                <td className={styles.rightAlign}> {postcode}</td>
              </tr>
              {!cityname ? null : (
                <tr>
                  <td>Plaatsnaam:</td>
                  <td className={styles.rightAlign}>{cityname}</td>
                </tr>
              )}
            </tbody>
          )}
          {!notes ? null : (
            <tbody style={{ width: '100%' }}>
              <tr>
                <td>Opmerking:</td>
                <td className={styles.rightAlign}> {notes}</td>
              </tr>
            </tbody>
          )}
        </table>
        <div className={styles.dottedLine}></div>
        <table
          style={{ width: '100%',  wordWrap: 'break-all' ,lineHeight:1.8}}
        >
          <tbody>
            {cartProducts.map((cartProduct) => {
              const { quantity, title, option, chi_cha} = cartProduct;
              const  artikelnr = restaurantType === "Japans"&& chi_cha?chi_cha:null
              return (
                <tr>
                  <td style={{wordBreak: 'break-word'}}>
                    {quantity} {artikelnr} {title} {option ? option.title : ''}
                  </td>
                  <td className={styles.rightAlign}>
                    {changeFormat(cartProduct.subTotal)}
                  </td>
                </tr>
              );
            })}
            {orderType === 'afhalen' ? null : (
              <tr>
                <td>Bezorgkosten:</td>
                <td className={styles.rightAlign}>
                  {changeFormat(deliveryFee)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.dottedLine}></div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>Totaalprijs:</b>
              </td>
              <td className={styles.rightAlign}>
                <b>{changeFormat(totalPrice)}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <div className={styles.dottedLine}></div>

        <table
          style={{
            width: '100%',
            wordBreak: 'break-all',
            wordWrap: 'break-all',
            fontSize: '12px',
          }}
        >
          <tbody>
            <tr>
              <td>BTW-CODE</td>
              <td className={styles.centerAlign}>EXCL.BTW</td>
              <td className={styles.rightAlign}>BTW</td>
            </tr>
            <tr>
              <td>9,00%</td>
              <td className={styles.centerAlign}>
                {changeFormat(totalPrice / (1 + 0.09))}
              </td>
              <td className={styles.rightAlign}>
                {changeFormat((totalPrice / (1 + 0.09)) * 0.09)}
              </td>
            </tr>
            <tr>
              <td>TOT.EXCL.BTW</td>
              <td className={styles.centerAlign}>TOT.BTW</td>
              <td className={styles.rightAlign}>TOT.INCL.BTW</td>
            </tr>
            <tr>
              <td>{changeFormat(totalPrice / (1 + 0.09))}</td>
              <td className={styles.centerAlign}>
                {changeFormat((totalPrice / (1 + 0.09)) * 0.09)}
              </td>
              <td className={styles.rightAlign}>{changeFormat(totalPrice)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ paddingTop: '40px', color: 'white' }}>
          <p>end</p>
        </div>
      </div>
    );
  if (!cus_orderId)
    return (
      <div className={styles.content}>
        <b>Nieuwe Reservering:</b>
        <br />
        <br />
        <table
          style={{
            width: '100%',
            wordBreak: 'break-all',
            wordWrap: 'break-all',
          }}
        >
          <tbody>
            <tr>
              <td>
                <b>Datum:</b>
              </td>
              <td className={styles.rightAlign}>
                <b>{date}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Tijd:</b>
              </td>
              <td className={styles.rightAlign}>
                <b>{time}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Aantal personen:</b>
              </td>
              <td className={styles.rightAlign}>
                <b>{number_of_persons}</b>
              </td>
            </tr>
            <tr>
              <td>Naam:</td>
              <td className={styles.rightAlign}>{name}</td>
            </tr>
            <tr>
              <td>email:</td>
              <td className={styles.rightAlign}>{mail_address}</td>
            </tr>
            <tr>
              <td>telefoonnummer:</td>
              <td className={styles.rightAlign}>{tel_number}</td>
            </tr>
            {!opmerking ? null : (
              <tr>
                <td>Opmerking:</td>
                <td className={styles.rightAlign}>{opmerking}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};
export default WorkerLobby;
