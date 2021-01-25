import React, { useState } from "react";
import axios from "axios";

const NewWallet = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      axios.post("/user", { ...data }).then((res) => {
        setLoading(false);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          setData({ name: "", mobile: "", balance: "" });
        }, 2000);
        console.log(res.data);
      });
    }, 1000);
  };
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({ name: "", mobile: "", balance: "" });
  return (
    <div className="ml-4 p-2">
      <h5>Create New wallet</h5>
      <div>
        <form>
          <div
            className="my-2 d-flex align-items-center justify-content-around"
            style={{ width: "280px" }}
          >
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              style={{ width: "200px" }}
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>
          <div
            className="my-2 d-flex align-items-center justify-content-around"
            style={{ width: "280px" }}
          >
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              style={{ width: "200px" }}
              id="mobile"
              value={data.mobile}
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
            />
          </div>
          <div
            className="my-2 d-flex align-items-center justify-content-around"
            style={{ width: "280px" }}
          >
            <label htmlFor="balance" className="form-label">
              Balance
            </label>
            <input
              type="text"
              className="form-control"
              style={{ width: "200px" }}
              id="balance"
              value={data.balance}
              onChange={(e) => setData({ ...data, balance: e.target.value })}
            />
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginLeft: "4.5rem" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
          {loading && (
            <span className="badge badge-warning ml-2">Saving to database</span>
          )}
          {saved && <span className="badge badge-success ml-2">Saved</span>}
        </form>
      </div>
    </div>
  );
};

export default NewWallet;
