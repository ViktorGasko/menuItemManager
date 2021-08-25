import styles from './NavBar.module.scss'
import { NavLink } from 'react-router-dom'

export function NavBar() {

  return (
    <div className={styles.navbar}>
      <NavLink className={styles.navlink} activeClassName={styles.active} to="/edit">Edit</NavLink>
      <span>|</span>
      <NavLink className={styles.navlink} activeClassName={styles.active} to="/" exact>Listing</NavLink>
    </div>
  );
}