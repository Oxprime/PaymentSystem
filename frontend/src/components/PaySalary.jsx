import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/SalarySystem.json";
import { CONTRACT_ADDRESS } from "../contract/config";

const PaySalary = () => {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");

  const handlePay = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);

    const tx = await contract.paySalary(wallet, {
      value: ethers.parseEther(amount),
    });
    await tx.wait();
    alert("Salary paid!");
  };

  return (
    <div>
      <h2>Pay Salary</h2>
      <input placeholder="Employee Wallet" value={wallet} onChange={(e) => setWallet(e.target.value)} />
      <input placeholder="Amount in ETH" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default PaySalary;
