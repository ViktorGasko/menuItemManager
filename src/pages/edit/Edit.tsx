import Menu from "../../components/Menu/Menu";
import NewMenu from "../../components/NewMenu/NewMenu";
import styles from "./Edit.module.scss";
import { MenuType } from "../../app/menuSlice";

interface MenusProps {
  menus: MenuType[];
}

const Edit = ({ menus }: MenusProps) => {
  return (
    <div>
      <NewMenu />
      {menus.length > 0 ? <div className={styles.searchbar}></div> : null}
      {menus.map((menu) => (
        <Menu {...menu} key={menu.name} />
      ))}
    </div>
  );
};

export default Edit;
