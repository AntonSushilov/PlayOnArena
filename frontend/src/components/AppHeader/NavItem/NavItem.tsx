import classNames from 'classnames';
import styles from "./NavItem.module.css";


type TNavItemProps = {
  children: string | JSX.Element | JSX.Element[];
};

const NavItem = ({ children }: TNavItemProps): JSX.Element => {
  return (
    <div className={classNames(styles.nav_item)}>{children}</div>
  );
};

export default NavItem;
