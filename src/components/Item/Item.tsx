import React from "react";
import styles from "./Item.module.scss";
import ItemEdit from "../ItemEdit/ItemEdit";
import { Link } from "react-router-dom";

interface ItemProps {
  name: string;
  price: string;
  img: string;
  menu: string;
}

const Item = (props: ItemProps) => {
  const [itemEditVisible, setItemEditVisible] = React.useState(false);
  const size =
    window.location.pathname === "/" + props.menu
      ? { width: "246px", height: "410px" }
      : { width: "168px", height: "280px" };

  const showItemEdit = () => setItemEditVisible(!itemEditVisible);

  return (
    <div className={styles.container}>
      <div id={styles.item} style={size}>
        <div className={styles.imgBox}>
          {window.location.pathname === "/edit" ? (
            <button className={styles.menuButton} onClick={showItemEdit}>
              <i className="fa fa-ellipsis-v"></i>
            </button>
          ) : null}
          <img src={props.img} alt="" />
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
      {itemEditVisible ? (
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
