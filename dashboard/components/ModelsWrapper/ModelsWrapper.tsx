import { useEffect, useLayoutEffect } from "react";
import styles from "./ModelsWrapper.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import EditProfile from "../../models/editProfile/EditProfile";
import { resetAllmodel } from "../../features/counter/modelsSlice";

const Models = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state) => state.models);
  //This code works but need to refactor it later
  const atLeastOneModelActive = Object.values(models).find(
    (value, idx) => idx !== 0 && value === true
  );

  useEffect(() => {
    if (typeof window !== "undefined" && atLeastOneModelActive) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
  }, [atLeastOneModelActive]);

  return (
    <>
      {" "}
      <div
        className={atLeastOneModelActive && styles.modeloverlay}
        onClick={() => dispatch(resetAllmodel())}
      ></div>
      {models.editProfileModel && <EditProfile />}
    </>
  );
};

export default Models;
