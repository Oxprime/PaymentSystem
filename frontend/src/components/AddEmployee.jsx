import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/SalarySystem.json";
import { CONTRACT_ADDRESS } from "../contract/config";

const AddEmployee = () => {
  const [wallet, setWallet] = useState("");
  const [salary, setSalary] = useState("");

  const handleAdd = async () => {
    if (!window.ethereum) return alert("Install Metamask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);

    const tx = await contract.addEmployee(wallet, ethers.parseEther(salary));
    await tx.wait();
    alert("Employee added!");
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <input placeholder="Wallet Address" value={wallet} onChange={(e) => setWallet(e.target.value)} />
      <input placeholder="Salary in ETH" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddEmployee;
