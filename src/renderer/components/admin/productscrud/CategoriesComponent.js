import React from "react";
import styles from "../../admin/admin.less";
import CategoriesAddForm from "./categories/CategoriesAddForm";
import CategoriesTable from "./categories/CategoriesTable";

const CategoriesComponent = ({
  categories,
  addCategorie,
  updateCategorie,
  deleteCategorie,
}) => {
  return (
    <div className={styles.table}>
      <CategoriesAddForm categories={categories} addCategorie={addCategorie} />
      <CategoriesTable
        categories={categories}
        updateCategorie={updateCategorie}
        deleteCategorie={deleteCategorie}
      />
    </div>
  );
};

export default CategoriesComponent;
