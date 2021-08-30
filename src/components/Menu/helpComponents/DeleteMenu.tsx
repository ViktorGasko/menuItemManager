import styles from "./helpMenu.module.scss";
import { useDispatch } from "react-redux";
import { removeMenu } from "../../../app/menuSlice";

interface Props {
  name: string;
  onclick: () => void;
}

const DeleteMenu = (props: Props) => {
  const dispatch = useDispatch();
  const clicked = (confirm: boolean) => {
    if (confirm) {
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
