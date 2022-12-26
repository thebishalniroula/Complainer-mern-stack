import Image from "next/image";
import styles from "./Hero.module.css";
const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Get to know your customers better</h1>
          <p>
            We offer you a new way of collecting feedbacks from your customers
            so that you don't have to lose your customer again
          </p>
        </div>
        <div className={styles.right}>
          <Image src={"/rectangle.png"} height={250} width={400} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
