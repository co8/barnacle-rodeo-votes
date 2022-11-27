import { getBRVotesList } from "../libs/sheets";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export async function getStaticProps(context) {
  const votes_api = await getBRVotesList();
  //console.log(votes_api);
  return {
    props: {
      votes_api: votes_api.slice(1, votes_api.length).reverse(), // remove sheet header + reverse order d
    },
    revalidate: 86400, // In seconds
  };
}

export default function JsonPage({ votes_api }) {
  return (
    <div>
      <JSONPretty
        id="json-pretty"
        mainStyle="background:#000"
        data={votes_api}
      ></JSONPretty>
    </div>
  );
}
