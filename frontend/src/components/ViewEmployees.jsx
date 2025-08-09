import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/SalarySystem.json";
import { CONTRACT_ADDRESS } from "../contract/config";

const ViewEmployees = () => {
  const [wallet, setWallet] = useState("");
  const [employee, setEmployee] = useState(null);

const handleView = async () => {
  try {
    if (!ethers.isAddress(wallet)) {
      alert("Please enter a valid Ethereum address.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    console.log("Connected to network:", network.name);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);
    const exists = await contract.isEmployee(wallet);
    console.log("Employee exists:", exists);

    const result = await contract.getEmployee(wallet);
    console.log("Employee data:", result);

    setEmployee({ salary: result[0].toString(), isEmployed: result[1] });
  } catch (error) {
    console.error("Error fetching employee:", error);
    alert("Error: " + error.message);
    setEmployee(null);
  }
};



  return (
    <div>
      <h2>View Employee</h2>
      <input placeholder="Wallet Address" value={wallet} onChange={(e) => setWallet(e.target.value)} />
      <button onClick={handleView}>Check</button>
      {employee && (
        <div>
          <p>Salary: {ethers.formatEther(employee.salary)} ETH</p>
          <p>Status: {employee.isEmployed ? "Employed" : "Not Employed"}</p>
        </div>
      )}
    </div>
  );
};



export default ViewEmployees;
