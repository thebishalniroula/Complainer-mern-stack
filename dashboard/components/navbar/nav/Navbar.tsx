import ProfileModel from "../../../models/navProfile/ProfileModel";
import styles from "./Nav.module.css";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { toggleNavProfileModel } from "../../../features/counter/modelsSlice";
const Navbar = () => {
  const showNavProfileModel = useAppSelector(
    (state) => state.models.navProfileModel
  );
  const dispatch = useAppDispatch();
  return (
    <nav className={styles.navContainer}>
      <p>Hello, Bishal</p>
      <div className={styles.profileContainer}>
        <p
          className={styles.profilePhoto}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleNavProfileModel());
          }}
        >
          BN
        </p>
        {showNavProfileModel && (
          <div className={styles.navProfileModel}>
            <ProfileModel />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
