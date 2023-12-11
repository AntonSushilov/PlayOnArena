import classNames from "classnames";
import { NavLink } from "react-router-dom";

import styles from "./NavItem.module.css";

type TNavItemProps = {
  children: string | JSX.Element | JSX.Element[];
  route_to: string;
};

const NavItem = ({ route_to, children }: TNavItemProps): JSX.Element => {
  return (
    <div className={styles.nav_item}>
      <NavLink
        to={route_to}
        className={({ isActive }) =>
          isActive ? styles.topBotomBordersOut_isActive : styles.topBotomBordersOut
        }
      >
        <p>{children}</p>
      </NavLink>
    </div>
    // <div className={classNames(styles.nav_item, styles.topBotomBordersOut)}>
    //   <p>{children}</p>
    // </div>
  );
};

export default NavItem;
