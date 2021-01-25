import React, { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
  useEffect(() => {
    axios.get("/transactions").then((res) => {
      setTemp([...res.data]);
    });
  }, []);
  const [temp, setTemp] = useState([]);
  return (
    <div className="ml-4 p-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Transaction</th>
            <th>Trans Date</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {temp.map((item, index) => {
            let color = {};
            if (item.transValue.includes("-")) {
              color = { color: "red" };
            } else {
              color = { color: "green" };
            }
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td style={color}>{item.transValue}</td>
                <td>{item.transactionDate}</td>
                <td>{item.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
