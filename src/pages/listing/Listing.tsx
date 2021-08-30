import React from "react";
import Menu from "../../components/Menu/Menu";
import MenuList from "../../components/MenuList/MenuList";
import SearchMenu from "../../components/SearchMenu/SearchMenu";
import styles from "./Listing.module.scss";
import { MenuType } from "../../app/menuSlice";

interface MenusProps {
  menus: MenuType[];
}

const Listing = ({ menus }: MenusProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const changeShowMenu = () => setShowMenu(!showMenu);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchArr, setSearchArr] = React.useState<any[]>([]);
  const setArr = (arr: any) => setSearchArr(arr);
  const onSearchTermChange = (string: string) => {
    setSearchTerm(string);
    const arr: any[] = [];
    menus.forEach((menu) => {
      if (menu.name.toLowerCase().includes(string)) arr.push(menu.name);
    });
    menus.forEach((menu) => {
      menu.items.forEach((item) => {
        if (item.name.toLowerCase().includes(string)) {
          arr.push({ name: item.name, menu: menu.name });
        }
      });
    });
    setArr(arr);
  };

  return (
    <div>
      <div className={styles.searchbar}>
        <div className={styles.btnDiv}>
          <button onClick={changeShowMenu}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <h2>Search for menu or item</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value.toLowerCase())}
        />
        {searchTerm ? (
          <button
            onClick={() => setSearchTerm("")}
            className={styles.btnRemoveSearch}
          >
            <i className="fa fa-times"></i>
          </button>
        ) : null}
        {searchTerm ? (
          <div className={styles.searchMenuContainer}>
            <SearchMenu values={searchArr} searchTerm={searchTerm} />
          </div>
        ) : null}
      </div>
      {showMenu ? <MenuList /> : null}
      {menus.map((menu) => (
        <Menu {...menu} key={menu.name} />
      ))}
    </div>
  );
};

export default Listing;
