import Image from "next/image";

export default function HeaderComponent() {
  return (
    <div class="header">
      <h1>Barnacle Rodeo Votes</h1>
      <h2>
        <span>An NFT Collection of Governance Votes by Barnacle Rodeo</span>
      </h2>
      <Image
        src="/images/89.jpg"
        width="432"
        height="324"
        alt="Barnacle Rodeo Votes"
      />
      <div class="subhead">
        <h2>
          <div class="subtitle">
            Barnacle Rodeo is a genesis Kujira validator
            <br /> and we're celebrating our governance votes and voting record!
            <br />
            Bonus Artwork Celebrating our Milestones have Replaced Failed
            Proposal Deposits
          </div>
          <a href="https://twitter.com/BarnacleRodeo" target="_new">
            @BarnacleRodeo
          </a>{" "}
          |{" "}
          <a href="#" target="_new">
            Grab Your Vote on Stargaze
          </a>
        </h2>
      </div>
    </div>
  );
}
