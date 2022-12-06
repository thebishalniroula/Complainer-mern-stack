import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./form.css";
const Form = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [register, setRegister] = useState(false);
  const role = searchParams.get("role").toLocaleLowerCase() || "student";

  const submit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const endpoint = register ? "users" : "auth";
    const credentials = register
      ? {
          email: emailRef.current.value,
          role: role.toLocaleLowerCase(),
          username,
          password,
        }
      : {
          role: role.toLocaleLowerCase(),
          username,
          password,
        };
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (res.status === 200) {
        if (!register) {
          setMessage("Login successful. Redirecting...");
          const authToken = res.headers.get("X-auth-token");
          localStorage.setItem("auth-token", authToken);
          setTimeout(() => {
            window.location.href = role === "admin" ? "/admin" : "/complain";
          }, 1500);
        }
        if (register) {
          setMessage("*Registration successful. Redirecting to login...");
          setTimeout(() => {
            window.location.href = `/login?role=${role}`;
          }, 1500);
        }
      } else {
        if (register && res.status === 400) {
          setMessage(await res.text());
        }
        if (!register) {
          setMessage("Invalid username or password.");
        }
      }
    } catch (error) {
      console.log(error);
      setMessage("Server not responding. Try again!");
    }
  };
  return (
    <div className="login-form">
      <div>
        <h3>
          {" "}
          {role} {register ? "sign up" : "login"}
        </h3>
        {register &&
          role === "admin" &&
          "Registering as admin is only made availble for testing purposes."}

        <form>
          <p style={{ color: "darkred", height: "2.5rem", fontSize: "1rem" }}>
            {message}
          </p>
          <input type="text" placeholder="username" ref={usernameRef} />
          {register && (
            <input
              type="email"
              placeholder="email@example.com"
              ref={emailRef}
            />
          )}
          <input type="password" placeholder="password" ref={passwordRef} />

          <button className="btn" onClick={submit}>
            Submit
          </button>
        </form>
        <a
          onClick={() => setRegister((prev) => !prev)}
          style={{
            textDecoration: "underline",
            display: "block",
            marginTop: "2rem",
            cursor: "pointer",
          }}
        >
          {!register
            ? "Dont have a account? Register."
            : "Already have an account?"}
        </a>
      </div>
    </div>
  );
};

export default Form;
