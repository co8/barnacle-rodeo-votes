import Image from "next/image";
import ReactPlayer from "react-player/file";
import dynamic from "next/dynamic";

export default function HeaderComponent() {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: true });
  return (
    <>
      <div className="header">
        <h1>Barnacle Rodeo Votes</h1>
        <h2>
          <span className="desktop">
            An NFT Collection of Governance Votes by Barnacle Rodeo
          </span>
          <span className="mobile">
            An NFT Collection of Governance Votes
            <br />
            by Barnacle Rodeo
          </span>
        </h2>
        {/* <Image
          src="/images/89.jpg"
          width="432"
          height="324"
          alt="Barnacle Rodeo Votes"
        /> */}
        <div className="preview">
          <ReactPlayer
            playing
            loop
            muted
            width="432px"
            height="324px"
            url="/images/main.mp4"
          />
        </div>
        <div className="subhead">
          <h2>
            <div className="subtitle">
              Barnacle Rodeo is a genesis Kujira validator and we&apos;re
              celebrating our governance votes and voting record!
              <div>
                Bonus Artwork Celebrating our Milestones have Replaced Failed
                Proposal Deposits
              </div>
            </div>
            {/* <a href="https://twitter.com/BarnacleRodeo" target="_new">
              @BarnacleRodeo
            </a>
            <br/> */}
            <a className="stargaze_link" href="#" target="_new">
              NOW ON STARGAZE
            </a>
          </h2>
        </div>
      </div>
    </>
  );
}
