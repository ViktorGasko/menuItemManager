import styles from "./helpMenu.module.scss";
import { useDispatch } from "react-redux";
import { removeMenu } from "../../../app/menuSlice";

const DeleteMenu = (props: any) => {
  const dispatch = useDispatch();
  const clicked = (val: boolean) => {
    if (val === true) {
      dispatch(removeMenu(props.name));
    }
    props.onclick();
  };
  return (
    <div className={styles.background}>
      <div className={styles.body}>
        <div className={styles.text}>
          Do you really want to delete menu {props.name}?
        </div>
        <div className={styles.buttonDiv}>
          <button onClick={() => clicked(true)}>Confirm</button>
          <button onClick={() => clicked(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenu;
