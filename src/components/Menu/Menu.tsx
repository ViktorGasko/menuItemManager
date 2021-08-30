import React from "react";
import styles from "./Menu.module.scss";
import Item from "../Item/Item";
import ItemEdit from "../ItemEdit/ItemEdit";
import ChangeMenu from "./helpComponents/ChangeMenu";
import DeleteMenu from "./helpComponents/DeleteMenu";
import { Link } from "react-router-dom";

interface MenuProps {
  name: string;
  items: { name: string; price: string; img: string; menu: string }[];
}

const Menu = (props: MenuProps) => {
  const [editMenuVisible, setEditMenuVisible] = React.useState(false);
  const [itemsMenuVisible, setItemsMenuVisible] = React.useState(true);
  const [itemsMenuClicked, setItemsMenuClicked] = React.useState(false);
  const [editNameVisible, setEditNameVisible] = React.useState(false);
  const [deleteMenuVisible, setDeleteMenuVisible] = React.useState(false);
  const changeItemsMenuClicked = () => setItemsMenuClicked(true);
  const changeEditMenuVisible = () => setEditMenuVisible(!editMenuVisible);
  const changeItemMenuVisible = () => setItemsMenuVisible(!itemsMenuVisible);
  const changeEditNameVisible = (visible: boolean) =>
    setEditNameVisible(visible);
  const changeDeleteMenuVisible = (visible: boolean) =>
    setDeleteMenuVisible(visible);
  const changeNameVisibleToFalse = () => {
    changeEditNameVisible(false);
  };
  const deleteMenuVisibleToFalse = () => {
    changeDeleteMenuVisible(false);
  };
  const showItems =
    props.items.length === 0 && window.location.pathname === "/";

  return (
    <div>
      <div className={styles.header}>
        {window.location.pathname === "/edit" ? (
          <i className="fa fa-ellipsis-v" onClick={changeEditMenuVisible}></i>
        ) : null}
        {showItems ? (
          <i className={styles.empty}>(empty)</i>
        ) : (
          <i
            className="fa fa-chevron-down"
            onClick={() => {
              changeItemMenuVisible();
              changeItemsMenuClicked();
            }}
          ></i>
        )}
        <Link to={"/" + props.name}>
          <div className={styles.linkDiv}>
            {props.name}
            <p className="fa fa-external-link"></p>
          </div>
        </Link>
        {editMenuVisible ? (
          <ul>
            <li
              onClick={() => {
                changeEditNameVisible(true);
                changeEditMenuVisible();
              }}
            >
              Change name
            </li>
            <li
              onClick={() => {
                changeDeleteMenuVisible(true);
                changeEditMenuVisible();
              }}
            >
              Delete menu
            </li>
          </ul>
        ) : null}
      </div>
      <div
        className={[
          showItems ? "" : styles.items,
          showItems
            ? ""
            : !itemsMenuClicked
            ? ""
            : itemsMenuVisible
            ? styles.itemsShow
            : styles.itemsHide,
        ].join(" ")}
      >
        {window.location.pathname === "/edit" ? (
          <div className={styles.itemEditContainer}>
            <ItemEdit name="" price="" menu={props.name} img="" />
          </div>
        ) : null}
        {props.items.map((item) => (
          <Item key={item.name} {...item} />
        ))}
      </div>
      {editNameVisible ? (
        <ChangeMenu
          name={props.name}
          onclick={changeNameVisibleToFalse}
        ></ChangeMenu>
      ) : null}
      {deleteMenuVisible ? (
        <DeleteMenu
          name={props.name}
          onclick={deleteMenuVisibleToFalse}
        ></DeleteMenu>
      ) : null}
    </div>
  );
};

export default Menu;
