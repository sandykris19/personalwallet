import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
const SpendFunds = () => {
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  let [options, setOptions] = useState([]);
  const handleChange = (user) => {
    setUser(user.value);
  };

  const handleSubmit = () => {
    axios.put(`/spendfunds`, { user, amount }).then((res) => {
      setAmount("");
      alert(res.data);
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
      <div className="mt-3">
        <h5 className="m-2">Spend funds</h5>
        <Select
          onChange={handleChange}
          options={options}
          classNamePrefix="my"
        />
        <input
          type="text"
          id="amount"
          value={amount}
          className="form-control m-2"
          placeholder="Enter amount in Rs."
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button className="btn btn-primary btn-sm m-2" onClick={handleSubmit}>
          Spend
        </button>
      </div>
    </div>
  );
};

export default SpendFunds;
