import React, { useState, useEffect } from "react";
import axios from "axios";

const CheckBalance = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const reqBalance = (e) => {
    setUser(e.target.value);
    setLoading(true);
    axios
      .get(`/balance?user_id=${user}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setBalance(res.data.balance);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="ml-4 p-2">
      <select
        className="custom-select"
        style={{ width: "20rem" }}
        onChange={reqBalance}
      >
        {/* <option value="">Select User</option> */}
        {users.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>
      {balance}
      {loading && <p>loading...</p>}
    </div>
  );
};

export default CheckBalance;
