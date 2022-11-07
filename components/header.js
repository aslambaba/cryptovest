import CryptoImage from "../public/images/cryptopunk.png";
import Image from "next/image";
export default function Header({ data, ConnectToWallet }) {
  const { address, balance, IsMeta } = data;
  const shortAddress = `${address.substring(0, 5)}...${address.substr(
    address.length - 4
  )}`;
  return (
    <div className="headerBar">
      <h2>Cryptovest.</h2>

      <div className="WalletDetail">
        {IsMeta && !address ? (
          <button onClick={() => ConnectToWallet()}>Connect to Wallet</button>
        ) : (
          <>
            <p style={{ color: "#54B435", fontWeight: "bold" }}>
              {balance} ETH
            </p>
            &emsp;
            <p>{shortAddress}</p>
            <Image
              style={{ margin: "5px 10px" }}
              height={50}
              width={50}
              src={CryptoImage}
            />
          </>
        )}
      </div>

      {/* <h1>Hello Ethers {currentAddress}</h1>
      <b>Balance: {currentBalance}</b>
      <br />
      {IsMeta && !currentAddress ? (
        <button onClick={() => ConnectToWallet()}>Connect to Wallet</button>
      ) : (
        <></>
      )} */}
    </div>
  );
}
