import { useSelector } from "react-redux";
import Menu from "../../components/Menu/Menu";
import NewMenu from "../../components/NewMenu/NewMenu";
import styles from "./Edit.module.scss";
import { RootState } from "../../app/store";
import React from "react";

const Edit = () => {
  const { menus } = useSelector((state: RootState) => state.menu);

  return (
    <div>
      <NewMenu />
      {menus.length > 0 ? <div className={styles.searchbar}></div> : null}
      {menus.map((menu: any) => (
        <Menu {...menu} key={menu.name} />
      ))}
    </div>
  );
};

export default Edit;
