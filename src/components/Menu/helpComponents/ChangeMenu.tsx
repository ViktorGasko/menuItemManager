import styles from "./helpMenu.module.scss";
import { useDispatch } from "react-redux";
import { changeMenusName } from "../../../app/menuSlice";
import React from "react";

interface Props {
  name: string;
  onclick: () => void;
}

const ChangeMenu = (props: Props) => {
  const [name, setName] = React.useState(props.name);
  const dispatch = useDispatch();
  const clicked = (confirm: boolean) => {
    if (confirm) {
      dispatch(changeMenusName({ name: name, oldName: props.name }));
    }
    props.onclick();
  };
  return (
    <div className={styles.background}>
      <div className={styles.body}>
        <div className={styles.text}>Choose new name</div>
        <input
          type="text"
          name="name"
          placeholder={props.name}
          onChange={(e) => setName(e.target.value.trim())}
        />
        <div className={styles.buttonDiv}>
          <button onClick={() => clicked(true)}>Confirm</button>
          <button onClick={() => clicked(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default ChangeMenu;
