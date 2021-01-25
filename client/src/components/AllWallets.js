import React,{useState,useEffect} from "react";
import axios from "axios";

const AllWallets = () => {
  useEffect(() => {
    axios.get('/users').then((res) => {
      setTemp([...res.data])
    })

  }, [])
  const [temp, setTemp] = useState([])
  return (
    <div className="ml-4 p-2">
      {temp.length === 0 && <h5>No Wallets to display or fetching from database</h5>}
      <table className="table table-striped table-hover">

        <thead>
          <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {
          temp.map((item,index) => {
            return (
              <tr key={item._id}>
                <td title={item._id}>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td>{item.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllWallets;
