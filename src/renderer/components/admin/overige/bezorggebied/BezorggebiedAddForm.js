import React, { useState } from "react";
import styles from "../../admin.less";
const restaurant_id = localStorage.getItem('restaurant_id');

function BezorggebiedAddForm({ bezorggebied, addBezorggebied }) {
  const [postcode, setPostcode] = useState(null);
  const [fee, setFee] = useState(null);
  const [min_value, setMinValue] = useState(null);
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "postcode") {
      setPostcode(value);
      return;
    }
    if (name === "fee") {
      setFee(value);
      return;
    }
    if (name === "min_value") {
      setMinValue(value);
      return;
    }
  };

  const valid = () => {
    return postcode && fee && min_value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      bezorggebied.findIndex(
        (bezorggebied) => bezorggebied.postcode === postcode
      ) > -1
    ) {
      setErr(
        "De ingevoerde postcode bestaat al. Bedenk een nieuwe postcode svp."
      );
      return;
    }
    addBezorggebied({
      postcode,
      fee,
      min_value,
      restaurant_id,
    }).then((a) => console.log(a));
    // const { status } = await axios.post("/api/admincrud/insertcategorie", {
    //   postcode,
    //   fee,
    //   min_value,
    // });
    // if (status === 200) {
    //   const newCategories = [...categories];

    //   newCategories.push({
    //     postcode,
    //     fee,
    //     min_value,
    //   });
    //   // setCategories(newCategories);
    // }
    setPostcode("");
    setFee("");
    setMinValue("");
    setErr(null);
  };

  return (
    <div style={{margin:"auto auto",width:"80%"}}>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <input
            type="number"
            step="any"
            className="form-control"
            onChange={handleChange}
            placeholder="Vul postcode in."
            name="postcode"
            value={postcode}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="number"
            step="any"
            className="form-control"
            onChange={handleChange}
            placeholder="Vul bezorgkosten in."
            name="fee"
            value={fee}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="number"
            step="any"
            className="form-control mdb-select md-form colorful-select dropdown-primary"
            name="min_value"
            placeholder="Vul minimumbestelwaarde in."
            onChange={handleChange}
            value={min_value}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!valid()}>
          Toevoegen
        </button>
      </form>
      <div className={styles.error}> {err}</div>
    </div>
  );
}

export default BezorggebiedAddForm;
