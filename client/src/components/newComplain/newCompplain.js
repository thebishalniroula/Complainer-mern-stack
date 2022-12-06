import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "./newComplain.css";

const NewCompplain = () => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const checkboxRef = useRef();
  const [message, setMessage] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    console.log(checkboxRef.current.checked);
    setMessage("");
    if (!titleRef.current.value || !bodyRef.current.value) {
      setMessage("Title and body cannot be empty.");

      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/complains", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          title: titleRef.current.value,
          body: bodyRef.current.value,
          anonymous: checkboxRef.current.checked,
        }),
      });
      console.log(await res.text());
      if (res.status === 201) {
        setMessage("Complain registered successfully.");
        titleRef.current.value = "";
        bodyRef.current.value = "";
      } else {
        setMessage("Could not register complain");
      }
    } catch (error) {
      console.log(error);
      setMessage("Could not register complain.");
    }
  };
  return (
    <div className="newComplain">
      <h2>Register your complain</h2>
      <p className="message">{message}</p>
      <form>
        <label>
          Title
          <input type="text" ref={titleRef} />
        </label>
        <label>
          Body
          <textarea ref={bodyRef} />
        </label>
        <p>
          <input type="checkbox" ref={checkboxRef} /> Write anonymously
        </p>

        <button className="btn" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewCompplain;
