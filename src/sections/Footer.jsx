import { socialImgs } from "../constants";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="flex flex-col justify-center">
                    <p>Terms & Conditions</p>
                </div>
                <div className="socials">
                    {socialImgs.map(({ imgPath, link, name }, i) =>
                        link ? (
                            <a
                                key={i}
                                className="icon"
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name ?? "social link"}
                            >
                                <img src={imgPath} alt={name ?? "social icon"} />
                            </a>
                        ) : (
                            <div key={i} className="icon" aria-hidden>
                                <img src={imgPath} alt="" />
                            </div>
                        )
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Shokhrukh(Tyler) Talatov. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;