import React from "react";
import styles from "./NewMenu.module.scss";
import ItemEdit from "../ItemEdit/ItemEdit";
import { useDispatch, useSelector } from "react-redux";
import { addMenu } from "../../app/menuSlice";

import Item from "../Item/Item";
import { RootState } from "../../app/store";

const NewMenu = (props: any) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [name, setName] = React.useState("");
  const onClick = () => setShowMenu(!showMenu);
  const onClick2 = (val: string) => setName(val.trim());
  const dispatch = useDispatch();
  const { newMenu } = useSelector((state: RootState) => state.menu);
  return (
    <div>
      <div className={styles.header}>
        <button onClick={onClick}>
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
              onChange={(e) => onClick2(e.target.value)}
            />
          </div>
          <div className={styles.items}>
            <div className={styles.itemEditContainer}>
              <ItemEdit name="" price="" menu="" />
            </div>
            {newMenu.items.map((item: any) => (
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
