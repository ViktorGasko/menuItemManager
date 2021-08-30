import React from "react";
import { useDispatch } from "react-redux";
import styles from "./ItemEdit.module.scss";
import { addItem, removeItem, changeItem } from "../../app/menuSlice";
import { ItemType } from "../../app/menuSlice";

const ItemEdit = (props: ItemType) => {
  const dispatch = useDispatch();
  const [img, setImg] = React.useState<string>(props.img);
  const [name, setName] = React.useState(props.name);
  const [price, setPrice] = React.useState(props.price);

  const removeImage = () => setImg("");

  const clear = () => {
    removeImage();
    setName("");
    setPrice("");
  };
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const checkImg = (img: File) => {
    if (img && (img.type === "image/png" || img.type === "image/jpeg")) {
      Object.defineProperty(img, "name", {
        writable: true,
        value: "itemPic",
      });
      toBase64(img)
        .then((data) => setImg(data as string))
        .catch((error) => {
          console.log(error);
          removeImage();
        });
    } else {
      console.log("Choose file of type .png or .jpeg");
      removeImage();
    }
  };

  return (
    <div className={styles.editContainer}>
      <div>
        {!img ? (
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
            <button className={styles.removeButton} onClick={removeImage}>
              <i className="fa fa-times"></i>
            </button>
            <img src={img} alt="" />
          </div>
        )}
        <div className={styles.body}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder={props.name ? props.name : "Item's name"}
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder={props.price ? props.price : "Item's Price"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
                      price: Math.abs(parseFloat(price)).toFixed(2),
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
