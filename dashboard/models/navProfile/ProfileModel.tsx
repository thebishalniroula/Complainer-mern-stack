import styles from "./profilemodel.module.css";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsTriangleFill } from "react-icons/bs";
import Link from "next/link";

const ProfileModel = () => {
  return (
    <div className={styles.profileModel}>
      <BsTriangleFill className={styles.arrow} />
      <Link href="/profile">
        <CgProfile size={22} />
        Profile
      </Link>
      <Link href="#">
        <FiLogOut size={22} />
        Logout
      </Link>
    </div>
  );
};

export default ProfileModel;
