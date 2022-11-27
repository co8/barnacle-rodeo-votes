import Head from "next/head";
import { getBRVotesList } from "../libs/sheets";
import { Gallery } from "react-grid-gallery";
import HeaderComponent from "../components/header";

export default function IndexPage({ votes_api }) {
  return (
    <>
      <Head>
        <title>Barnacle Rodeo Votes : NFTs on Stargaze</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeaderComponent />
      <div id="media">
        <Gallery images={votes_api} />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const votes_api: object = await getBRVotesList();
  //console.log(votes_api);
  return {
    props: {
      votes_api: votes_api.slice(1, votes_api.length).reverse(), // remove sheet header + reverse order d
    },
    revalidate: 86400, // In seconds
  };
}
