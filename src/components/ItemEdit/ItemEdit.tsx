import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./ItemEdit.module.scss";
import { addItem, removeItem, changeItem } from "../../app/menuSlice";

const ItemEdit = (props: any) => {
  const dispatch = useDispatch();
  const [img, setImg] = React.useState<File>();
  const [name, setName] = React.useState(props.name);
  const [price, setPrice] = React.useState(props.price);

  useEffect(() => {
    if (props.img) {
      setImg(props.img);
    }
  }, []);
  const onClick = () => setImg(undefined);
  const onClick2 = (val: string) => setName(val.trim());
  const onClick3 = (val: string) => setPrice(val);
  const clear = () => {
    onClick();
    onClick2("");
    onClick3("");
  };
  const checkImg = (img: any) => {
    if (img && (img.type === "image/png" || img.type === "image/jpeg")) {
      Object.defineProperty(img, "name", {
        writable: true,
        value: "profilePic",
      });
      setImg(img);
    } else {
      console.log("Choose file of type .png or .jpeg");
      setImg(undefined);
    }
  };

  return (
    <div className={styles.editContainer}>
      <div>
        {img === undefined ? (
          <div className={styles.fileDropArea}>
            <span className={styles.fakeBtn}>Choose file</span>
            <span className={styles.msg}>or drag and drop files here</span>
            <input
              className={styles.fileInput}
              type="file"
              onChange={(e) => {
                if (e.target.files) checkImg(e.target.files[0]);
              }}
            />
          </div>
        ) : (
          <div className={styles.imgBox}>
            <button className={styles.removeButton} onClick={onClick}>
              <i className="fa fa-times"></i>
            </button>
            <img src={URL.createObjectURL(img)} alt="" />
          </div>
        )}
        <div className={styles.body}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder={props.name ? props.name : "Item's name"}
            value={name}
            onChange={(e) => onClick2(e.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder={props.price ? props.price : "Item's Price"}
            value={price}
            onChange={(e) => onClick3(e.target.value)}
          />
          {!props.name ? (
            [
              <button
                key="0"
                onClick={() =>
                  dispatch(
                    addItem({
                      img: img,
                      name: name,
                      price: Math.abs(parseFloat(price)).toFixed(2),
                      menu: props.menu,
                    })
                  )
                }
              >
                Add item
              </button>,
              img || name || price ? (
                <button key="1" onClick={clear}>
                  Clear
                </button>
              ) : null,
            ]
          ) : (
            <div>
              <button
                onClick={() =>
                  dispatch(removeItem({ name: name, menu: props.menu }))
                }
              >
                Remove Item
              </button>
              <button
                onClick={() =>
                  dispatch(
                    changeItem({
                      oldName: props.name,
                      img: img,
                      name: name,
                      price: price,
                      menu: props.menu,
                    })
                  )
                }
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemEdit;
