import { useState } from "react";
import Head from "next/head";
//import Image from "next/image";
import { getBRVotesList } from "../libs/sheets";
import { Image, Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import HeaderComponent from "../components/header";
import FooterComponent from "../components/footer";

export interface CustomImage extends Image {
  original: string;
}

export default function IndexPage({ votes_api }: { votes_api: object }) {
  const [index, setIndex] = useState(-1);

  const images = Object.values(votes_api);
  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: CustomImage) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

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
          content="Barnacle Rodeo Kujira Validator First 100 Governance Votes!"
        />
        <meta
          property="og:image"
          content="https://votes.barnacle.rodeo/images/89.jpg"
        />
        <meta property="og:url" content="https://barnacle.rodeo/votes" />
      </Head>
      <HeaderComponent />
      <div id="media">
        <Gallery
          images={images}
          onClick={handleClick}
          enableImageSelection={false}
        />
        {!!currentImage && (
          /* @ts-ignore */
          <Lightbox
            enableZoom={false}
            mainSrc={currentImage.src}
            imageTitle={currentImage.caption}
            nextSrc={nextImage.src}
            prevSrc={prevImage.src}
            onCloseRequest={handleClose}
            onMovePrevRequest={handleMovePrev}
            onMoveNextRequest={handleMoveNext}
          />
        )}
      </div>
      <FooterComponent />
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
    revalidate: 31536000, // In seconds = Every Hour: 3600 ; 1 Year: 31536000
  };
}
