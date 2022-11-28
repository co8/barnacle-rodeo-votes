// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBRVotesList } from "../../libs/sheets";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getStaticProps(context: any) {
  const votes_api = await getBRVotesList();
  //console.log(votes_api);
  return {
    props: {
      votes_api: votes_api.slice(1, votes_api.length).reverse(), // remove sheet header + reverse order d
    },
    revalidate: 86400, // In seconds
  };
}

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(votes_api);
}
