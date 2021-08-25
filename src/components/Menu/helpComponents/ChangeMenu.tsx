import styles from "./helpMenu.module.scss";
import { useDispatch } from "react-redux";
import { changeMenusName } from "../../../app/menuSlice";
import React from "react";

const ChangeMenu = (props: any) => {
  const [name, setName] = React.useState(props.name);
  const onClick = (val: string) => setName(val.trim());
  const dispatch = useDispatch();
  const clicked = (val: boolean) => {
    if (val === true) {
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
          onChange={(e) => onClick(e.target.value)}
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
