import Link from "next/link";
import styles from "../styles/Nav.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "./SidebarModel/Sidebar";

const Nav = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const reset = () => setShowSidebar(() => false);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", reset);
    }
    return () => {
      window.removeEventListener("resize", reset);
    };
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Image src={"/logo.svg"} width={125} height={55} alt="logo" />
          </div>
          <div className={styles.links}>
            <Link href="#">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Usage</Link>
          </div>
          <div className={styles.cta}>
            <p className={styles.login}>Login</p>
            <button className="btn">Signup</button>
            {!showSidebar ? (
              <Image
                className={styles.hamburger}
                src={"/hamburger.svg"}
                height={25}
                width={25}
                alt="ham"
                onClick={() => setShowSidebar((prev) => !prev)}
              />
            ) : (
              <div
                className={styles.cross}
                onClick={() => setShowSidebar((prev) => !prev)}
              >
                <Image src={"/cross.png"} height={18} width={18} alt="" />
              </div>
            )}
          </div>
        </div>
      </nav>
      {showSidebar ? <Sidebar /> : <></>}
    </>
  );
};

export default Nav;
