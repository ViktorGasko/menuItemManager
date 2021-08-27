import styles from "./MenuList.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const MenuList = (props: any) => {
  const { menus } = useSelector((state: RootState) => state.menu);

  return (
    <div className={styles.menuList}>
      <ul>
        {menus.map((menu: any) => (
          <li key={menu.name}>
            <NavLink
              to={"/" + menu.name}
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
            >
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
