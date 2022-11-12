import { useEffect, useState } from "react";
import { ethers } from "ethers";
export default function TransactionsHistory({ data }) {
  const { address, IsMeta, TFContract } = data;
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    async function GetRecords() {
      if (IsMeta && address) {
        let Records = await TFContract.GetTransactions();
        setTransactions(Records);
      }
    }
    GetRecords();
  });

  return (
    <div className="TransactionMainContainer">
      <h1>Transactions</h1>
      {transactions != undefined ? (
        <>
          {transactions.map((rec, id) => {
            return (
              <div className="TransactionRecord" key={id}>
                <h4>
                  Block
                  <br />
                  {`${rec.BlockNum}`}
                </h4>
                <h4>
                  from
                  <br />
                  {rec.SenderAddress}
                </h4>
                <h4>
                  to
                  <br />
                  {rec.RecieverAddress}
                </h4>
                <h4>
                  Amount
                  <br />
                  {`${ethers.utils.formatEther(rec.EthAmount)}`} ETH
                </h4>
                <a
                  target="_blank"
                  href={`https://goerli.etherscan.io/tx/${rec.TxHash}`}
                >
                  <button>view</button>
                </a>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
