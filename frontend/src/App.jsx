import React, { useState } from "react";
import AddEmployee from "./components/AddEmployee";
import PaySalary from "./components/PaySalary";
import ViewEmployees from "./components/ViewEmployees";
import { connect, getAccount } from '@wagmi/core';
import { config } from "./wallet";
import { injected } from '@wagmi/connectors';

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      await connect(config, { connector: injected() });
      const account = getAccount(config);
      setWalletAddress(account.address);
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1>💼 Salary System</h1>
        <button
          onClick={connectWallet}
          disabled={walletAddress !== ""}
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            backgroundColor: walletAddress ? "#e0e0e0" : "#4CAF50",
            color: walletAddress ? "#444" : "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: walletAddress ? "default" : "pointer",
          }}
        >
          {walletAddress
            ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </div>

      {/* App Content */}
      <AddEmployee />
      <PaySalary />
      <ViewEmployees />
    </div>
  );
}

export default App;
