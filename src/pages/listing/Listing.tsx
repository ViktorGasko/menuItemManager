import React from "react";
import Menu from "../../components/Menu/Menu";
import MenuList from "../../components/MenuList/MenuList";
import SearchMenu from "../../components/SearchMenu/SearchMenu";
import styles from "./Listing.module.scss";

const Listing = ({ menus }: any) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const onClick = () => setShowMenu(!showMenu);
  const [name, setName] = React.useState("");
  const [searchArr, setSearchArr] = React.useState<any[]>([]);
  const setArr = (arr: any) => setSearchArr(arr);
  const onChange = (val: string) => {
    setName(val.trim());
    const arr: any[] = [];
    menus.forEach((obj: any) => {
      if (obj.name.startsWith(val)) arr.push(obj.name);
    });
    menus.forEach((obj: any) => {
      obj.items.forEach((objItem: any) => {
        if (objItem.name.startsWith(val)) {
          arr.push({ name: objItem.name, menu: obj.name });
        }
      });
    });
    setArr(arr);
  };

  return (
    <div>
      <div className={styles.searchbar}>
        <div className={styles.btnDiv}>
          <button onClick={onClick}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <h2>Search for menu or item</h2>
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
            <SearchMenu values={searchArr} />
          </div>
        ) : null}
      </div>
      {showMenu ? <MenuList /> : null}
      {menus.map((menu: any) => (
        <Menu {...menu} key={menu.name} />
      ))}
    </div>
  );
};

export default Listing;
