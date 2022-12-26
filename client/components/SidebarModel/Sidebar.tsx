import styles from "./Sidebar.module.css";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.links}>
        <Link href="#">Home</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
        <Link href="#">Usage</Link>
      </div>
    </div>
  );
};

export default Sidebar;
