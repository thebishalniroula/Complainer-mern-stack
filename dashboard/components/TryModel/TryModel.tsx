import React, { ReactNode, Dispatch, SetStateAction } from "react";
import styles from "./TryModel.module.css";
const TryModel = ({
  children,
  clickHandler,
}: {
  children: ReactNode;
  clickHandler: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.div} onClick={() => clickHandler(false)}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default TryModel;
