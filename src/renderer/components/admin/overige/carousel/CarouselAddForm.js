import React, { useState } from "react";
import styles from "../../admin.less";
import { Divider } from "antd";

function CarouselImageAddForm({ carouselImages, addCarouselImage }) {
  const [name, setName] = useState(null);
  const [src, setSrc] = useState(null);
  const [sort_number, setSortNumber] = useState(null);
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "name") {
      setName(value);
      return;
    }
    if (name === "src") {
      setSrc(value);
      return;
    }
    if (name === "sort_number") {
      setSortNumber(value);
      return;
    }
  };

  const valid = () => {
    return name && src && sort_number;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const index = carouselImages.findIndex(
      (image) => image.name === name
    );
    if (index > -1) {
      setErr("De ingevoerde name bestaat al. Bedenk een nieuwe name svp.");
      return;
    }
    addCarouselImage({
      name,
      src,
      sort_number,
    }).then((a) => console.log(a));

    setName("");
    setSrc("");
    setSortNumber("");
    setErr(null);
  };

  return (
    <div style={{ margin: "auto auto", width: "80%" }}>
      <Divider orientation="left">Carousel Images</Divider>
      <div style={{ marginBottom: "20px" }}></div>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Vul naam de afbeelding in."
            name="name"
            value={name}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Vul URL van de afbeelding in."
            name="src"
            value={src}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="number"
            step="any"
            className="form-control mdb-select md-form colorful-select dropdown-primary"
            name="sort_number"
            placeholder="Vul sort_number in."
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

export default CarouselImageAddForm;
