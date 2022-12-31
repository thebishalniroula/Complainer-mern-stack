import React, { FormEvent } from "react";
import styles from "./EditProfile.module.css";
const EditProfile = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="model">
      <h3 className={styles.heading}>Edit your details</h3>
      <div className={styles.editProfileModel}>
        <form>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              autoFocus={true}
              defaultValue={"thebishalniroula"}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              defaultValue={"thebishalniroula@gmail.com"}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
