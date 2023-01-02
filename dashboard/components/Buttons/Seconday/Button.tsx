import styles from "../Buttons.module.css";
type PropTypes = {
  text: string;
  onClickHandler?: () => any;
};
const SecondayButton = ({ text, onClickHandler }: PropTypes) => {
  return (
    <button
      onClick={onClickHandler}
      className={`${styles.button} ${styles.secondary}`}
    >
      {text}
    </button>
  );
};

export default SecondayButton;
