import styles from "./SearchMenu.module.scss";
import { Link } from "react-router-dom";

const SearchMenu = (props: any) => {
  const getHighlightedText = (text: string) => {
    const parts = text.split(new RegExp(`(${props.searchTerm})`, "i"));
    return (
      <p>
        {parts.map((part) =>
          part.toLowerCase() === props.searchTerm ? (
            <b key={part + Math.floor(Math.random() * 100000).toString()}>
              {part}
            </b>
          ) : (
            part
          )
        )}
      </p>
    );
  };

  return (
    <div className={styles.menu}>
      {props.menu ? (
        <ul>
          {props.values.map((item: string) => (
            <li
              key={
                props.menu +
                item +
                Math.floor(Math.random() * 100000).toString()
              }
            >
              <Link to={"/" + props.menu + "/" + item} className={styles.link}>
                {getHighlightedText(item)}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {props.values.map((item: any) =>
            item.name ? (
              <li
                key={
                  item.menu +
                  item.name +
                  Math.floor(Math.random() * 100000).toString()
                }
              >
                <Link
                  to={"/" + item.menu + "/" + item.name}
                  className={styles.link}
                >
                  {getHighlightedText(item.name)}
                </Link>
              </li>
            ) : (
              <li
                key={
                  "menu" + item + Math.floor(Math.random() * 100000).toString()
                }
              >
                <Link to={"/" + item} className={styles.link}>
                  {getHighlightedText(item)} <h6> menu</h6>
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchMenu;
