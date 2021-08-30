import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import NotFound from "../NotFound/NotFound";
import styles from "./ItemPage.module.scss";

interface ParamTypes {
  menu: string;
  item: string;
}

const ItemPage = () => {
  const { menu, item } = useParams<ParamTypes>();
  const itemObj = useSelector((state: RootState) => {
    return state.menu.menus
      .find((menuObj) => menuObj.name === menu)
      ?.items.find((itemObj) => itemObj.name === item);
  });

  return (
    <div className={styles.container}>
      {!itemObj ? (
        <NotFound />
      ) : (
        <div>
          <div className={styles.header}>
            <h3>Menu:</h3>
            <Link to={"/" + itemObj.menu} className={styles.link}>
              <div className={styles.linkDiv}>
                <h3>
                  {itemObj.menu}
                  <i className="fa fa-external-link"></i>
                </h3>
              </div>
            </Link>
          </div>
          <div className={styles.body}>
            <div className={styles.imgDiv}>
              <img src={itemObj.img} alt="" />
            </div>
            <div className={styles.text}>
              <h2>{itemObj.name}</h2>
              <p>We dont have description ... lol</p>
              <h1>{itemObj.price} &euro;</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
