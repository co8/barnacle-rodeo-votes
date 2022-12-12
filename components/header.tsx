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
              We Are Barnacle Rodeo, a Genesis 🉐 Kujira Validator, and We Are
              Excited to Present Our First 100 Governance Votes! To Celebrate
              This Milestone, We Have Included Bonus Artwork in Place of
              Non-Voting Proposals.
              <div>
                <em>
                  Metadata Includes Motive, Transaction Hash and Link to 🉐
                  Kujira Finder.
                </em>
              </div>
              <div>
                Join Us in Celebrating Our Voting Record and the Power of
                Governance in Action!
              </div>
            </div>
            <a
              href="https://app.stargaze.zone/marketplace/stars1ax3afmw0kl8yvknrxml9glcfffpakdjxz678t58k3kzc2qcc272qxm4hpp"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="stargaze_link"
                src="/static/stargaze.png"
                width="600"
                height="167"
                alt="Get Your Votes on Stargaze"
              />
            </a>
          </h2>
        </div>
      </div>
    </>
  );
}
