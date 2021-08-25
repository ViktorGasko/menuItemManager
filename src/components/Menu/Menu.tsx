import React from "react";
import styles from "./Menu.module.scss";
import Item from "../Item/Item";
import ItemEdit from "../ItemEdit/ItemEdit";
import ChangeMenu from "./helpComponents/ChangeMenu";
import DeleteMenu from "./helpComponents/DeleteMenu";
import { Link } from "react-router-dom";

const Menu = (props: any) => {
  const [showChangeMenu, setShowChangeMenu] = React.useState(false);
  const [showChangeName, setshowChangeName] = React.useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = React.useState(false);
  const [showItemsMenu, setShowItemsMenu] = React.useState(true);
  const onClick_1 = () => setShowChangeMenu(!showChangeMenu);
  const onClick_2 = () => setShowItemsMenu(!showItemsMenu);
  const onClick_3 = (val: boolean) => setshowChangeName(val);
  const onClick_4 = (val: boolean) => setShowDeleteMenu(val);
  const handleChangeClick = () => {
    onClick_3(false);
  };
  const handleDeleteClick = () => {
    onClick_4(false);
  };

  return (
    <div>
      <div className={styles.header}>
        {window.location.pathname === "/edit" ? (
          <i className="fa fa-ellipsis-v" onClick={onClick_1}></i>
        ) : null}
        <i className="fa fa-chevron-down" onClick={onClick_2}></i>
        <Link to={"/" + props.name} className={styles.link}>
          <h3>
            {props.name}
            <i className="fa fa-external-link"></i>
          </h3>
        </Link>
        {showChangeMenu ? (
          <ul>
            <li
              onClick={() => {
                onClick_3(true);
                onClick_1();
              }}
            >
              Change name
            </li>
            <li
              onClick={() => {
                onClick_4(true);
                onClick_1();
              }}
            >
              Delete menu
            </li>
          </ul>
        ) : null}
      </div>
      <div className={showItemsMenu ? styles.items : styles.itemsHidden}>
        {window.location.pathname === "/edit" ? (
          <div className={styles.itemEditContainer}>
            <ItemEdit name="" price="" menu={props.name} />
          </div>
        ) : null}
        {props.items.map((item: any) => (
          <Item key={item.name} {...item} />
        ))}
      </div>
      {showChangeName ? (
        <ChangeMenu name={props.name} onclick={handleChangeClick}></ChangeMenu>
      ) : null}
      {showDeleteMenu ? (
        <DeleteMenu name={props.name} onclick={handleDeleteClick}></DeleteMenu>
      ) : null}
    </div>
  );
};

export default Menu;
