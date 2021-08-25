import styles from "./MenuList.module.scss";
import { NavLink } from "react-router-dom";

const MenuList = (props: any) => {
  return (
    <div className={styles.menuList}>
      <ul>
        {props.names.map((name: string) => (
          <li key={name}>
            <NavLink
              to={"/" + name}
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
