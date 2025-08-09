const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const SalarySystem = await hre.ethers.getContractFactory("SalarySystem");
  const contract = await SalarySystem.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Contract deployed to:", address);

  const frontendDir = path.resolve(__dirname, "../frontend/src/contract");


  const config = `export const CONTRACT_ADDRESS = "${address}";\n`;
  fs.writeFileSync(path.join(frontendDir, "config.js"), config);

  
  const artifactPath = path.resolve(__dirname, `../artifacts/contracts/Lock.sol/SalarySystem.json`);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  fs.writeFileSync(path.join(frontendDir, "SalarySystem.json"), JSON.stringify({ abi: artifact.abi }, null, 2));

  console.log("✅ ABI and contract address synced to frontend.");
}

main().catch((error) => {
  console.error("❌ Error deploying contract:", error);
  process.exitCode = 1;
});
