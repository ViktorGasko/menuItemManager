import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Item from "../../components/Item/Item";
import MenuList from "../../components/MenuList/MenuList";
import SearchMenu from "../../components/SearchMenu/SearchMenu";
import styles from "./SingleMenu.module.scss";

const SingleMenu = (props: any) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const onClick = () => setShowMenu(!showMenu);
  const { menus } = useSelector((state: RootState) => state.menu);
  const [name, setName] = React.useState("");
  const [searchArr, setSearchArr] = React.useState<any[]>([]);
  const setArr = (arr: any) => setSearchArr(arr);
  const onChange = (val: string) => {
    setName(val.trim());
    const arr: any[] = [];
    props.items.forEach((obj: any) => {
      if (obj.name.startsWith(name)) {
        arr.push(obj.name);
      }
    });
    setArr(arr);
  };

  return (
    <div>
      <h1 className={styles.title}>{props.name}</h1>
      <div className={styles.body}>
        <div className={styles.searchbar}>
          <div className={styles.btnDiv}>
            <button onClick={onClick}>
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
          <h2>Search for item in menu</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange(e.target.value)}
          />
          {name ? (
            <button
              onClick={() => setName("")}
              className={styles.btnRemoveSearch}
            >
              <i className="fa fa-times"></i>
            </button>
          ) : null}
          {name ? (
            <div className={styles.searchMenuContainer}>
              <SearchMenu values={searchArr} menu={props.name} />
            </div>
          ) : null}
        </div>
        {showMenu ? (
          <MenuList names={menus.map((menu: any) => menu.name)} />
        ) : null}
      </div>
      <div className={styles.items}>
        {props.items.map((item: any) => (
          <Item key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SingleMenu;
