import React from "react";
import Item from "../../components/Item/Item";
import MenuList from "../../components/MenuList/MenuList";
import SearchMenu from "../../components/SearchMenu/SearchMenu";
import styles from "./SingleMenu.module.scss";

interface SingleMenuProps {
  name: string;
  items: { name: string; price: string; img: string; menu: string }[];
}

const SingleMenu = (props: SingleMenuProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const changeShowMenu = () => setShowMenu(!showMenu);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchArr, setSearchArr] = React.useState<string[]>([]);
  const setArr = (arr: string[]) => setSearchArr(arr);
  const onSearchTermChange = (string: string) => {
    setSearchTerm(string);
    const arr: string[] = [];
    props.items.forEach((item) => {
      if (item.name.toLowerCase().includes(string)) {
        arr.push(item.name);
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
            <button onClick={changeShowMenu}>
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
          <h2>Search for item in menu</h2>
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
              <SearchMenu
                values={searchArr}
                menu={props.name}
                searchTerm={searchTerm}
              />
            </div>
          ) : null}
        </div>
        {showMenu ? <MenuList /> : null}
      </div>
      <div className={styles.items}>
        {props.items.map((item) => (
          <Item key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SingleMenu;
