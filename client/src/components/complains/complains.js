import React, { useEffect, useState } from "react";
import "./complains.css";
const Complains = () => {
  const [complains, setComplains] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5000/api/complains", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      setComplains(data);
    })();
  }, []);
  console.log(complains);
  const deleteComplain = async (id) => {
    const res = await fetch("http://localhost:5000/api/complains/" + id, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    });
    const data = await res.json();

    setComplains((complains) =>
      complains.filter((item) => item._id != data._id)
    );
  };

  return (
    <div className="complains">
      <h2 style={{ textAlign: "center" }}>Complains registered</h2>
      {complains.length > 0 &&
        complains.map((complain) => {
          return (
            <div className="complain">
              <h3>{complain.title}</h3>
              <p>{complain.body}</p>
              <div className="meta">
                <p>
                  Submitted by:{" "}
                  <span>
                    {complain.submittedBy || "Anonymouus"} ({complain.role})
                  </span>
                </p>
                <p className="date">
                  Submitted at: <span>{complain.at}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  deleteComplain(complain._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      {complains.length == 0 && (
        <p style={{ textAlign: "center" }}>No complains available</p>
      )}
    </div>
  );
};

export default Complains;
