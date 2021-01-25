import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const P2p = () => {
  let [options, setOptions] = useState([]);
  const [details, setDetails] = useState({ payee: "", receiver: "" });
  const [amount, setAmount] = useState("");

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

  const handleSend = () => {
    if (details.payee === details.receiver) {
      alert("Cannot Send to yourself!!");
      return;
    } else if (amount === "") {
      alert("Enter amount to send");
      return;
    } else {
      axios.put(`/spendfunds`, { user: details.payee, amount }).then((res) => {
        if (res.data === "Cannot spend less than available balance") {
          alert("You dont have enough funds");
          return;
        }
        axios
          .put(`/addfunds`, { user: details.receiver, amount })
          .then((res) => {
            setAmount("");
            alert(res.data);
          });
      });
    }
  };

  return (
    <div className="ml-4 p-2">
      <div className="d-flex align-items-center justify-content-around">
        <Select
          onChange={(user) => setDetails({ ...details, payee: user.value })}
          options={options}
          classNamePrefix="my"
        />
        <span className="mx-2">to</span>
        <Select
          onChange={(user) => setDetails({ ...details, receiver: user.value })}
          options={options}
          classNamePrefix="my"
        />
      </div>
      <input
        type="text"
        className="form-control m-3 d-inline"
        style={{ width: "200px" }}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn btn-primary btn-sm" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default P2p;
