import Head from "next/head";
import { getBRVotesList } from "../libs/sheets";
import { Gallery } from "react-grid-gallery";
import HeaderComponent from "../components/header";

export default function IndexPage({ votes_api }: { votes_api: object }) {
  return (
    <>
      <Head>
        <title>Barnacle Rodeo Votes : NFTs on Stargaze</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content=">Barnacle Rodeo Votes : NFTs on Stargaze"
        />
        <meta
          property="og:description"
          content="An NFT Collection of Governance Votes by Barnacle Rodeo"
        />
        <meta
          property="og:image"
          content="https://votes.barnacle.rodeo/images/89.jpg"
        />
        <meta property="og:url" content="https://votes.barnacle.rodeo" />
      </Head>
      <HeaderComponent />
      <div id="media">
        <Gallery images={Object.values(votes_api)} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const votes_api: object = await getBRVotesList();
  //console.log(votes_api);
  return {
    props: {
      votes_api: Object.values(votes_api).slice(1), // remove sheet header
    },
    revalidate: 31536000, // Every Hour, In seconds 3600 // 1 Year: 31536000
  };
}
