import Image from "next/image";
import ReactPlayer from "react-player/file";
import dynamic from "next/dynamic";

export default function HeaderComponent() {
  //ReactPlayer hydration error fix
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
              We Are Barnacle Rodeo, a Genesis Kujira Validator, and We Are
              Excited to Present Our First 100 Governance Votes! To Celebrate
              This Milestone, We Have Included Bonus Artwork in Place of
              Non-Voting Proposals.
              <div>
                Join Us in Celebrating Our Voting Record and the Power of
                Governance in Action!
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
