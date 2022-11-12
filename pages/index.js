import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Header from "../components/header";
import TransactionsHistory from "../components/transactionsHistory";
import WillBanner from "../components/willBanner";
import TF_ABI from "../artifacts/contracts/transferFund.sol/TransferFund.json";

export default function Home() {
  const [IsMeta, setIsMeta] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [TFContract, setTFContract] = useState();

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
    const tfc = await new ethers.Contract(
      process.env.ContractAddress,
      TF_ABI.abi,
      providers.getSigner()
    );
    setTFContract(tfc);
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
      <WillBanner
        data={{
          address: currentAddress,
          balance: currentBalance,
          IsMeta,
          TFContract,
        }}
      />
      <TransactionsHistory
        data={{ address: currentAddress, IsMeta, TFContract }}
      />
    </div>
  );
}
