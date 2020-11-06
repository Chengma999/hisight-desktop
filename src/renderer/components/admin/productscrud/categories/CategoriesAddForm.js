import React, { useState } from "react";
import axios from "axios";
import styles from "../../admin.less";

function CategoriesAddForm(props) {
  const { categories, addCategorie } = props;
  const [cat_code, setCatCode] = useState("");
  const [cat_name, setCatName] = useState("");
  const [sort_number, setSortNumber] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "cat_code") {
      setCatCode(value);
      return;
    }
    if (name === "cat_name") {
      setCatName(value);
      return;
    }
    if (name === "sort_number") {
      setSortNumber(value);
      return;
    }
  };

  const valid = () => {
    return cat_code && cat_name && sort_number;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categories.findIndex((cat) => cat.cat_code === cat_code) > -1) {
      setErr(
        "De ingevoerde cat_code bestaat al. Bedenk een nieuwe cat_code svp."
      );
      return;
    }
    addCategorie({
      cat_code,
      cat_name,
      sort_number,
    }).then((a) => console.log(a));
    // const { status } = await axios.post("/api/admincrud/insertcategorie", {
    //   cat_code,
    //   cat_name,
    //   sort_number,
    // });
    // if (status === 200) {
    //   const newCategories = [...categories];

    //   newCategories.push({
    //     cat_code,
    //     cat_name,
    //     sort_number,
    //   });
    //   // setCategories(newCategories);
    // }
    setCatCode("");
    setCatName("");
    setSortNumber("");
    setErr(null);
  };

  return (
    <div>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="cat + getal"
            name="cat_code"
            value={cat_code}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="vul categoriesnaam in"
            name="cat_name"
            value={cat_name}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="number"
            className="form-control mdb-select md-form colorful-select dropdown-primary"
            name="sort_number"
            placeholder="vul volgorde in"
            onChange={handleChange}
            value={sort_number}
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

export default CategoriesAddForm;
