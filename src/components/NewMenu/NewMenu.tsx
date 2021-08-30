import React from "react";
import styles from "./NewMenu.module.scss";
import ItemEdit from "../ItemEdit/ItemEdit";
import { useDispatch, useSelector } from "react-redux";
import { addMenu } from "../../app/menuSlice";

import Item from "../Item/Item";
import { RootState } from "../../app/store";

const NewMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [name, setName] = React.useState("");
  const changeShowMenu = () => setShowMenu(!showMenu);
  const onMenuNameChange = (newMenuName: string) => setName(newMenuName.trim());
  const dispatch = useDispatch();
  const { newMenu } = useSelector((state: RootState) => state.menu);
  return (
    <div>
      <div className={styles.header}>
        <button onClick={changeShowMenu}>
          <h1>Create new menu</h1>
          <i className="fa fa-plus"></i>
        </button>
      </div>
      {showMenu ? (
        <div className={styles.body}>
          <div>
            <input
              type="text"
              placeholder="Choose name"
              className={styles.inputMenuTitle}
              onChange={(e) => onMenuNameChange(e.target.value)}
            />
          </div>
          <div className={styles.items}>
            <div className={styles.itemEditContainer}>
              <ItemEdit name="" price="" menu="" img="" />
            </div>
            {newMenu.items.map((item) => (
              <Item key={item.name} {...item} />
            ))}
          </div>
          <button
            className={styles.createMenuBtn}
            onClick={() => dispatch(addMenu(name))}
          >
            Create menu
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NewMenu;
