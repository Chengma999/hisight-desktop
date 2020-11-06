import React, { useState } from "react";
import styles from "../../admin.less";
import { List, Divider } from "antd";
import moment from "moment";
import { daysOptions } from "../timeOptions";
const arr = [];
const a = 8;
const n = 23.75;
const index = (n - a) / 0.25;
for (let i = 0; i < index + 1; i++) {
  arr.push(a + i * 0.25);
}

function openingstijdenAddForm({ openingstijden, addOpeningstijden }) {
  const [day, setDay] = useState(null);
  const [begin, setBegin] = useState(null);
  const [end, setEnd] = useState(null);
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "day") {
      setDay(value);
      return;
    }
    if (name === "begin") {
      setBegin(value);
      return;
    }
    if (name === "end") {
      setEnd(value);
      return;
    }
  };

  const valid = () => {
    return day && begin && end;
  };
  const optionsDay = daysOptions.map(({ value, text }) => {
    return <option value={value}>{text} </option>;
  });
  const optionsTime = arr.map((time) => {
    const label = moment(
      (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
      "hmm"
    ).format("HH:mm");
    return <option value={time}>{label}</option>;
  });
  const daysTips = [
    "0 -zondag",
    "1 -maandag",
    "2 -dinsdag",
    "3 -woensdag",
    "4 -donderdag",
    "5 -vrijdag",
    "6 -zaterdag",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const index = openingstijden.findIndex(
      (openingstijd) => openingstijd.day === Number(day)
    );
    if (index > -1) {
      setErr("De ingevoerde day bestaat al. Bedenk een nieuwe day svp.");
      return;
    }
    addOpeningstijden({
      day,
      begin,
      end,
    }).then((a) => console.log(a));

    setDay("");
    setBegin("");
    setEnd("");
    setErr(null);
  };

  return (
    <div style={{ margin: "auto auto", width: "80%" }}>
      <Divider orientation="left">Openingstijden</Divider>
      <div style={{ marginBottom: "20px" }}>
        <List
          header="Dagen en bijbehorende getallen"
          bordered
          dataSource={daysTips}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <select
            className="form-control"
            onChange={handleChange}
            placeholder="Vul day in."
            name="day"
            value={day}
          >
            {optionsDay}
          </select>
        </div>
        <div className="form-group mr-1">
          <select
            className="form-control"
            onChange={handleChange}
            placeholder="Vul bezorgkosten in."
            name="begin"
            value={begin}
          >
            {optionsTime}
          </select>
        </div>
        <div className="form-group mr-1">
          <select
            className="form-control mdb-select md-form colorful-select dropdown-primary"
            name="end"
            placeholder="Vul minimumbestelwaarde in."
            onChange={handleChange}
            value={end}
          >
            {optionsTime}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!valid()}>
          Toevoegen
        </button>
      </form>

      <div className={styles.error}> {err}</div>
    </div>
  );
}

export default openingstijdenAddForm;
