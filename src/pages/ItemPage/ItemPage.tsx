import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import NotFound from "../NotFound/NotFound";

import styles from "./ItemPage.module.scss";

const ItemPage = () => {
  const { menu, item }: any = useParams();
  const itemObj = useSelector((state: RootState) => {
    try {
      return state.menu.menus
        .find((obj: any) => obj.name === menu)
        .items.find((obj2: any) => obj2.name === item);
    } catch {
      console.log("Page not Found");
      return;
    }
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
              <h3>
                {itemObj.menu}
                <i className="fa fa-external-link"></i>
              </h3>
            </Link>
          </div>
          <div className={styles.body}>
            <div className={styles.imgDiv}>
              <img src={URL.createObjectURL(itemObj.img)} alt="" />
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
