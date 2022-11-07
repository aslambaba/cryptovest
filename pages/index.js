import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Header from "../components/header";

export default function Home() {
  const [IsMeta, setIsMeta] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  async function CheckWallet() {
    if (!window.ethereum) {
      alert("Walled not Detected !!");
      return;
    }
    setIsMeta(true);
  }

  async function ConnectToWallet() {
    const providers = new ethers.providers.Web3Provider(window.ethereum);
    let accounts = await providers.send("eth_requestAccounts", []);
    let balance = await providers.getBalance(accounts[0]);
    let BalanceInEth = `${ethers.utils.formatEther(balance)}`;
    setCurrentAddress(accounts[0]);
    setCurrentBalance(BalanceInEth);
  }

  useEffect(() => {
    CheckWallet();
  });

  useEffect(() => {
    async function accountsChange() {
      window.ethereum.on("accountsChanged", async function () {
        const account = await window.ethereum.request({
          method: "eth_accounts",
        });
        const providers = new ethers.providers.Web3Provider(window.ethereum);
        let balance = await providers.getBalance(account[0]);
        let BalanceInEth = `${ethers.utils.formatEther(balance)}`;
        if (account.length) {
          setCurrentAddress(account[0]);
          setCurrentBalance(BalanceInEth);
        } else {
          window.location.reload();
        }
      });
    }
    accountsChange();
  }, []);

  return (
    <div>
      <Header
        data={{ address: currentAddress, balance: currentBalance, IsMeta }}
        ConnectToWallet={ConnectToWallet}
      />
    </div>
  );
}
