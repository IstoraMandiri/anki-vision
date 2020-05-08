import config from "../package.json";
const Footer = () => {
  return (
    <>
      <a target="_blank" href="https://anki.vision">
        AnkiVision
      </a>{" "}
      {config.version}
      {" | "}
      <a target="_blank" href="https://github.com/hitchcott/anki-vision">
        Github
      </a>
      {" | "}
      <a target="_blank" href="https://github.com/hitchcott/anki-vision">
        Help
      </a>
    </>
  );
};

export default Footer;
