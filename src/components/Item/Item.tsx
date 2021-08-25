import React from "react";
import styles from "./Item.module.scss";
import ItemEdit from "../ItemEdit/ItemEdit";
import { Link } from "react-router-dom";

const Item = (props: any) => {
  const [showItemEdit, setShowItemEdit] = React.useState(false);
  const width =
    window.location.pathname === "/" + props.menu
      ? { width: "246px" }
      : { width: "168px" };
  const onClick = () => setShowItemEdit(!showItemEdit);

  return (
    <div className={styles.container}>
      <div id={styles.item} style={width}>
        <div className={styles.imgBox}>
          {window.location.pathname === "/edit" ? (
            <button className={styles.menuButton} onClick={onClick}>
              <i className="fa fa-ellipsis-v"></i>
            </button>
          ) : null}
          <img src={URL.createObjectURL(props.img)} alt="" />
        </div>
        <div className={styles.text}>
          {props.menu === "" ? (
            <div className={styles.name}>{props.name}</div>
          ) : (
            <Link to={`/${props.menu}/${props.name}`} className={styles.name}>
              {props.name}
            </Link>
          )}
          <h2>{props.price} &euro;</h2>
        </div>
      </div>
      {showItemEdit ? (
        <ItemEdit
          name={props.name}
          price={props.price}
          menu={props.menu}
          img={props.img}
        />
      ) : null}
    </div>
  );
};
export default Item;
