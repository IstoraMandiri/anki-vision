import { WarningTwoTone } from "@ant-design/icons";

const words = [
  "Apologies",
  "Erm...",
  "Error",
  "Frick",
  "Mistakes happen",
  "Oops",
  "So, about that...",
  "Uh Oh, SpaghettiOs",
  "Something didn't quite go as expected",
  "Unfortunately...",
  "We done goofed",
  "We regret to inform you",
  "Whoops",
  "Whoopsie Doopsie",
  "ええと",
];

const Warning = ({ text, info = false }) => {
  return (
    <>
      <h1>
        <WarningTwoTone style={{ fontSize: "40px" }} />
        <br />
        {!info && words[Math.floor(Math.random() * (words.length + 1))]}
      </h1>
      <p>{text}</p>
    </>
  );
};

export default Warning;
