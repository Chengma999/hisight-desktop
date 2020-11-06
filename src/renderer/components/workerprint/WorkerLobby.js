const React = require('react');
import styles from './worker.css';
const queryString = require('query-string');
const { changeFormat } = require('../../utils/gegevens');
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
  transactieKosten,
  date,
  time,
  number_of_persons,
  name,
  mail_address,
  tel_number,
  opmerking,
  paymethod,
  discountAmount,
} = data;
const WorkerLobby = () => {
  if (cus_orderId)
    return (
      <div className={styles.content}>
        <table style={{ width: '100%' }}>
          <tbody>
            {paymethod !== 'cash' ? null : (
              <tr>
                <td></td>
                <td
                  style={{ borderStyle: 'solid', borderWidth: '3px' }}
                  className={styles.rightAlign}
                >
                  <b>NOG TE BETALEN</b>
                </td>
              </tr>
            )}
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
            {cartProducts.map((cartProduct) => {
              const { quantity, title, option, chi_cha } = cartProduct;
              const artikelnr =
                restaurantType === 'japans' && chi_cha ? chi_cha : null;
              return (
                <tr>
                  <td style={{ width: '8%', verticalAlign: 'top' }}>
                    {quantity}
                  </td>
                  <td style={{ wordBreak: 'break-word' }}>
                    <span>
                      {artikelnr} {title}
                    </span>{' '}
                    {option ? (
                      <span>
                        {' '}
                        <br />
                        {option.title}
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    className={styles.rightAlign}
                    style={{
                      verticalAlign: 'top',
                      width: '25%',
                    }}
                  >
                    {changeFormat(cartProduct.subTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.dottedLine}></div>
        <table
          style={{
            width: '100%',
            wordWrap: 'break-all',
            lineHeight: 1.2,
            tableLayout: 'fixed',
            borderCollapse: 'separate',
            borderSpacing: '0 5px',
            fontSize: '12px',
          }}
        >
          <tbody>
            {orderType === 'afhalen' ? null : (
              <tr>
                <td style={{ width: '8%', verticalAlign: 'top' }}>1</td>
                <td style={{ wordBreak: 'break-word' }}>Bezorgkosten:</td>
                <td className={styles.rightAlign}>
                  {changeFormat(deliveryFee)}
                </td>
              </tr>
            )}
            {paymethod === 'cash' ? null : (
              <tr>
                <td style={{ width: '8%', verticalAlign: 'top' }}>1</td>
                <td style={{ wordBreak: 'break-word' }}>Transactiekosten:</td>
                <td className={styles.rightAlign}>
                  {changeFormat(transactieKosten)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {paymethod === 'cash' ? null : (
          <div className={styles.dottedLine}></div>
        )}
        {!discountAmount||discountAmount === 0  ? null : (
          <div>
            <table
              style={{
                width: '100%',
                wordWrap: 'break-all',
                lineHeight: 1.2,
                tableLayout: 'fixed',
                borderCollapse: 'separate',
                borderSpacing: '0 5px',
                fontSize: '12px',
              }}
            >
              <tbody>
                <tr>
                  <td style={{ wordBreak: 'break-word' }}>Uw korting:</td>
                  <td
                    style={{ whiteSpace: 'nowrap' }}
                    className={styles.rightAlign}
                  >
                    - {changeFormat(discountAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.dottedLine}></div>
          </div>
        )}
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
            fontSize: '14px',
            lineHeight: '1',
          }}
        >
          <tbody>
            <tr>
              <td>
                <b>Datum:</b>
              </td>
              <td className={styles.reservationRight}>
                <b>{date}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Tijd:</b>
              </td>
              <td className={styles.reservationRight}>
                <b>{time}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Aantal personen:</b>
              </td>
              <td className={styles.reservationRight}>
                <b>{number_of_persons}</b>
              </td>
            </tr>
            <tr>
              <td>Naam:</td>
              <td className={styles.reservationRight}>{name}</td>
            </tr>
            <tr>
              <td>email:</td>
              <td className={styles.reservationRight}>{mail_address}</td>
            </tr>
            <tr>
              <td>telefoonnummer:</td>
              <td className={styles.reservationRight}>{tel_number}</td>
            </tr>
            {!opmerking ? null : (
              <tr>
                <td>Opmerking:</td>
                <td className={styles.reservationRight}>{opmerking}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ paddingTop: '20px', color: 'white' }}>
          <p>end</p>
        </div>
      </div>
    );
};
export default WorkerLobby;
