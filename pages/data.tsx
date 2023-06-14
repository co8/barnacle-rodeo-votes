import { useState } from "react";
import Head from "next/head";
import { read } from "../libs/read";

export default function DataPage({ data }: { data: object }) {
  const [index, setIndex] = useState(-1);
  print(data);
}

export async function getStaticProps() {
  const data: object = await read();
  return {
    props: {
      data: data, // remove sheet header
    },
    revalidate: 3600, // In seconds = Every Hour: 3600 ; 1 Year: 31536000
  };
}
