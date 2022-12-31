import React from "react";
import styles from "../styles/Profile.module.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { useAppDispatch } from "../store/hooks";
import { setEditProfileModel } from "../features/counter/modelsSlice";
const profile = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileImage}>
        <CgProfile size={100} color="rgb(86, 91, 95)" />
        Upload photo
      </div>
      <div className={styles.profileDetails}>
        <h3>Bishal Niroula</h3>
        <p>
          <span>@</span> thebishalniroula
        </p>
        <p>
          <AiOutlineMail />
          thebishalniroula@gmail.com
        </p>
      </div>
      <div className={styles.editProfile}>
        <button onClick={() => dispatch(setEditProfileModel())}>
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default profile;
