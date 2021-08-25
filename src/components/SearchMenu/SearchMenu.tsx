import styles from "./SearchMenu.module.scss";
import { Link } from "react-router-dom";

const SearchMenu = (props: any) => {
  return (
    <div className={styles.menu}>
      <ul>
        {props.menu
          ? props.values.map((item: any) => (
              <li>
                <Link
                  to={"/" + props.menu + "/" + item}
                  className={styles.link}
                >
                  <p>{item}</p>
                </Link>
              </li>
            ))
          : props.values.map((item: any) => (
              <li>
                {item.name ? (
                  <Link
                    to={"/" + item.menu + "/" + item.name}
                    className={styles.link}
                  >
                    <p>{item.name}</p>
                  </Link>
                ) : (
                  <Link to={"/" + item} className={styles.link}>
                    <p> {item}</p> <h6> menu</h6>
                  </Link>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default SearchMenu;
