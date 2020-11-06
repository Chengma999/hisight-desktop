import React, { useState } from "react";
import axios from "axios";
import { Select } from "antd";
import styles from "../../admin.less";
import GroupsTable from "./GroupsTable";
const { Option } = Select;

function Groep(props) {
  const {
    handleSelectChange,
    options,
    addGroup,
    updateGroup,
    deleteGroup,
  } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind_of_choice, set_kind_of_choice] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setTitle(value);
      return;
    }
    if (name === "description") {
      setDescription(value);
      return;
    }
    if (name === "kind_of_choice") {
      set_kind_of_choice(value);
      return;
    }
  };

  const valid = () => {
    return title && description && kind_of_choice;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (options.findIndex((group) => group.title === title) > -1) {
      setErr(
        "De ingevoerde groepsnaam bestaat al. Bedenk een nieuwe groepsnaam svp."
      );
      return;
    }
    addGroup({
      title,
      description,
      kind_of_choice,
    }).then(() => {
      setTitle("");
      setDescription("");
      set_kind_of_choice("");
      setErr(null);
    });
  };

  return (
    <div>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Groepsnaam"
            name="title"
            value={title}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Omschrijving"
            name="description"
            value={description}
          />
        </div>
        <div className="form-group mr-1">
          <select
            className="form-control mdb-select md-form colorful-select dropdown-primary"
            name="kind_of_choice"
            onChange={handleChange}
            value={kind_of_choice}
          >
            <option value="" disabled selected hidden>
              Selecteer...
            </option>
            <option value="single">Engele keuze</option>
            <option value="multiple">Meer keuzen</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!valid()}>
          Toevoegen
        </button>
      </form>
      <div className={styles.error}> {err}</div>
      <GroupsTable
        options={options}
        updateGroup={updateGroup}
        deleteGroup={deleteGroup}
      />
      <Select placeholder="Selecteer een groep" onChange={handleSelectChange}>
        {options.map((option) => {
          return <Option value={option.title}>{option.title}</Option>;
        })}
      </Select>
    </div>
  );
}

export default Groep;
