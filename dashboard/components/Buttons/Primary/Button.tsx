import styles from "../Buttons.module.css";
type PropTypes = {
  text: string;
  onClickHandler?: () => any;
};
const PrimaryButton = ({ text, onClickHandler }: PropTypes) => {
  return (
    <button
      onClick={onClickHandler}
      className={`${styles.button} ${styles.primary}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
