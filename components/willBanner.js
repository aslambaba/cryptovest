import Image from "next/image";
import Eth from "../public/images/eth.png";
import { ethers } from "ethers";
import { useRef } from "react";

export default function WillBanner({ data }) {
  const { address, balance, IsMeta, TFContract } = data;
  const ethAmount = useRef("0");
  const RecieverAdd = useRef("");
  async function H() {
    let unformatEther = ethers.utils.parseEther(ethAmount.current.value);

    await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: RecieverAdd.current.value,
            value: unformatEther._hex,
          },
        ],
      })
      .then(async (txHash) => {
        await TFContract.NewTransaction(
          address,
          RecieverAdd.current.value,
          unformatEther._hex,
          txHash
        );
      })
      .then(() => {
        RecieverAdd.current.value = "";
        ethAmount.current.value = "";
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  return (
    <div className="WillBanner">
      <div className="WillBannerPhoto">
        <Image src={Eth} />
      </div>
      <div className="WillBannerText">
        <h3>Send Ethereum, Wherever you Want!</h3>
        {IsMeta && !address ? (
          <></>
        ) : (
          <>
            <input
              placeholder="Owner Wallet Address"
              value={address}
              disabled
            />
            <input placeholder="Amount" type="float" ref={ethAmount} />
            <input placeholder="Reciver Address" ref={RecieverAdd} />
            <button onClick={() => H()}>Get Started</button>
          </>
        )}
      </div>
    </div>
  );
}
