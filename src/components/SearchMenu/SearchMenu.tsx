import styles from "./SearchMenu.module.scss";
import { Link } from "react-router-dom";

const SearchMenu = (props: any) => {
  const getHighlightedText = (text: string) => {
    const parts = text.split(new RegExp(`(${props.searchTerm})`, "i"));
    return (
      <p>
        {parts.map((part) =>
          part.toLowerCase() === props.searchTerm ? <b>{part}</b> : part
        )}
      </p>
    );
  };

  return (
    <div className={styles.menu}>
      <ul>
        {props.menu
          ? props.values.map((item: string) => (
              <li key={"/" + props.menu + "/" + item}>
                <Link
                  to={"/" + props.menu + "/" + item}
                  className={styles.link}
                >
                  {getHighlightedText(item)}
                </Link>
              </li>
            ))
          : props.values.map((item: any) => (
              <li
                key={item.name ? "/" + item.menu + "/" + item.name : "/" + item}
              >
                {item.name ? (
                  <Link
                    to={"/" + item.menu + "/" + item.name}
                    className={styles.link}
                  >
                    {getHighlightedText(item.name)}
                  </Link>
                ) : (
                  <Link to={"/" + item} className={styles.link}>
                    {getHighlightedText(item)} <h6> menu</h6>
                  </Link>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default SearchMenu;
