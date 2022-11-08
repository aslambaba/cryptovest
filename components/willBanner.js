import Image from "next/image";
import Eth from '../public/images/eth.png';

export default function WillBanner() {
  return (
    <div className="WillBanner">
      <div className="WillBannerPhoto">
        <Image src={Eth}/>
      </div>
      <div className="WillBannerText">
        <h3>Create a Will,&emsp;Share Your Crypto Asset before you left this world.</h3>
        <input placeholder="Owner Wallet Address"/>
        <input placeholder="Amount"/>
        <input placeholder="Number of Beneficiary"/>
        <button>Get Started</button>
      </div>
    </div>
  );
}
