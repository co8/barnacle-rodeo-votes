import Image from "next/image";

export default function FooterComponent() {
  return (
    <>
      <footer>
        <div className="flex-wrapper">
          <div className="flex-container">
            <a
              href="https://app.stargaze.zone/marketplace/stars1ax3afmw0kl8yvknrxml9glcfffpakdjxz678t58k3kzc2qcc272qxm4hpp"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="footer-stargaze"
                src="/static/stargaze-getVotes-whale.png"
                width="300"
                height="210"
                alt="Get Your Votes on Stargaze"
              />
            </a>
          </div>
          <div className="flex-container">
            <a href="https://barnacle.rodeo" target="_blank" rel="noreferrer">
              <Image
                className="footer-barnacle"
                src="/static/barnacle-rodeo-footer.png"
                width="304"
                height="208"
                alt="Barnacle Rodeo 🉐 Kujira Validator"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
