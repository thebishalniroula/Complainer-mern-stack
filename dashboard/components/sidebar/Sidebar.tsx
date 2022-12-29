import styles from "./sidebar.module.css";
import { switchTab } from "../../features/counter/tabsSlice";
import TABS from "../../data/tabs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FaBars } from "react-icons/fa";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Sidebar = () => {
  const [isMaximized, setIsMaximized] = useState(true);
  const activeTabIndex = useAppSelector((state) => state.tabs.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useLayoutEffect(() => {
    const tab = TABS.filter(
      (item) => item.name.toLowerCase() === router.asPath.slice(1).toLowerCase()
    );
    if (tab[0]) {
      dispatch(switchTab(TABS.indexOf(tab[0])));
    }
  }, []);
  return (
    <div
      className={`${styles.sidebarContainer} ${
        isMaximized ? styles.maximize : styles.minimize
      }`}
    >
      <div className={styles.controls}>
        <div className={styles.close}>
          <FaBars size={25} onClick={() => setIsMaximized((prev) => !prev)} />
        </div>
        {isMaximized && <div className={styles.logo}>Bishal</div>}
      </div>
      {TABS.map((item, idx) => {
        const isActive = idx === activeTabIndex;
        return (
          <Link
            key={idx}
            href={item.path}
            className={
              isActive
                ? `${styles.sidebarItem} ${styles.active}`
                : `${styles.sidebarItem}`
            }
            onClick={() => dispatch(switchTab(idx))}
          >
            {isActive ? (
              <item.solid size={25} color="rebeccapurple" />
            ) : (
              <item.outline size={23} />
            )}
            {isMaximized &&
              item.name.split("")[0].toUpperCase() + item.name.slice(1)}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
