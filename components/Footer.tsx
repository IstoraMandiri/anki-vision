import config from "../package.json";
const Footer = () => {
  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href="https://anki.vision">
        Anki.Vision
      </a>{" "}
      {config.version}
      {" | "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/hitchcott/anki-vision"
      >
        Github
      </a>
    </>
  );
};

export default Footer;
