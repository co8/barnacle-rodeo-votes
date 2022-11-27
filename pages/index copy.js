import Head from "next/head";
import Image from "next/image";
import { getBRVotesList } from "../libs/sheets";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Gallery } from "react-grid-gallery";

export default function IndexPage({ votes_api }) {
  return (
    <>
      <Head>
        <title>Barnacle Rodeo Votes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* Votes in Sheets: <strong>{votes_api.length}</strong> */}
      <Gallery images={votes_api} enableImageSelection="false" />
      {/* <VotesJson props={votes_api} /> */}
    </>
  );
}

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

// export function VotesJson(votes_api) {
//   //console.log(votes_api);
//   return (
//     <div>
//       <JSONPretty
//         id="json-pretty"
//         mainStyle="background:transparent"
//         data={votes_api}
//       ></JSONPretty>
//     </div>
//   );
// }

// export function Gallery(votes_api) {
//   //console.log(votes_api);
//   return (
//     <div class="Gallery">
//       <ul>
//         {Object.values(votes_api).map((votes_arr, index) => {
//           // console.log("type: " + typeof votes_arr[index]);
//           // console.log("length: " + votes_arr.length);
//           //votes_arr.forEach((vote) => console.log(vote));
//           const vote = votes_arr[index];
//           return (
//             <li key={vote.id} data-id={vote.id}>
//               <div>{vote.title}</div>
//               <Image src={vote.src} width="128" height="96" alt={vote.title} />
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export function Gallery(votes_api) {
//   //console.log(votes_api);
//   return (
//     <div class="Gallery">
//       <ul>
//         {Object.values(votes_api).map((votes_arr, index) => {
//           // console.log("type: " + typeof votes_arr[index]);
//           // console.log("length: " + votes_arr.length);
//           votes_arr.forEach((val) => console.log(val));
//           return (
//             <li key={votes_arr[index].id} data-id={votes_arr[index].id}>
//               <div>{votes_arr[index].title}</div>
//               <Image
//                 src={votes_arr[index].image}
//                 width="128"
//                 height="96"
//                 alt={votes_arr[index].title}
//               />
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
