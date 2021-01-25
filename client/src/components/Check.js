import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../styles/select.css";

const Check = () => {
  const [balance, setBalance] = useState(null);
  let [options, setOptions] = useState([]);

  const handleChange = (user) => {
    axios.get(`/balance?user_id=${user.value}`).then((res) => {
      setBalance(res.data.balance);
    });
  };

  useEffect(() => {
    let bar = [];
    axios.get("/users").then((res) => {
      let temp = res.data;
      for (let i of temp) {
        bar = [...bar, { value: i._id, label: i.name }];
      }
      setOptions(bar);
    });
  }, []);

  return (
    <div className="ml-4 p-2">
      <div className="d-flex align-items-center mt-3">
        <h5 className="m-2">Select or search user</h5>
        <Select
          onChange={handleChange}
          options={options}
          classNamePrefix="my"
        />
      </div>
      <div className="d-flex ml-2 mt-3">
        <h5>User Balance is: </h5>
        <h5 className="ml-4">Rs.{balance}</h5>
      </div>
    </div>
  );
};

export default Check;
