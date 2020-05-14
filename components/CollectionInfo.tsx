import { Table } from "antd";

const CollectionInfo = ({ state: { info } }) => {
  const data = [
    { title: <b>Cards</b>, value: info.cards },
    { title: <b>Revisions</b>, value: info.revisions },
    { title: <b>Notes</b>, value: info.notes },
    { title: <b>Decks</b>, value: info.decks.length },
    { title: <b>Tags</b>, value: info.tags.length },
    { title: <b>Note Types</b>, value: info.noteTypes.length },
    {
      title: <b>First Revision</b>,
      value: new Date(info.firstRevision).toLocaleDateString(),
    },
    {
      title: <b>Latest Revision</b>,
      value: new Date(info.lastRevision).toLocaleDateString(),
    },
  ];
  return (
    <>
      <h1>Collection Loaded</h1>
      <Table
        size="small"
        dataSource={data}
        columns={[
          { align: "right", dataIndex: "title" },
          { dataIndex: "value" },
        ]}
        pagination={false}
        showHeader={false}
      />
    </>
  );
};

export default CollectionInfo;

// {
//   "info": {
//     "cards": 31449,
//     "revisions": 180530,
//     "notes": 28081,
//     "firstRevision": 1531157715051,
//     "lastRevision": 1588320007485,
//     "decks": [
//       {
//         "id": 1565506291638,
//         "name": "Archive"
//       },
//       {
//         "id": 1546936345526,
//         "name": "Archive::Characters"
//       },
//       {
//         "id": 1538041629583,
//         "name": "Archive::Characters::Kana"
//       },
//       {
//         "id": 1531157365064,
//         "name": "Archive::Characters::RTK"
//       },
//       {
//         "id": 1540365075922,
//         "name": "Archive::English"
//       },
//       {
//         "id": 1547687579434,
//         "name": "Archive::English::People"
//       },
//       {
//         "id": 1550891190436,
//         "name": "Archive::English::Words"
//       },
//       {
//         "id": 1546936319881,
//         "name": "Archive::Listening"
//       },
//       {
//         "id": 1558608352288,
//         "name": "Archive::Listening::Core 2000"
//       },
//       {
//         "id": 1545490736154,
//         "name": "Archive::Listening::Mining"
//       },
//       {
//         "id": 1541751897082,
//         "name": "Archive::Listening::Tango"
//       },
//       {
//         "id": 1579431384944,
//         "name": "Jtest4you"
//       },
//       {
//         "id": 1579431385044,
//         "name": "Jtest4you::N1"
//       },
//       {
//         "id": 1579431385001,
//         "name": "Jtest4you::N2"
//       },
//       {
//         "id": 1579431384974,
//         "name": "Jtest4you::N3"
//       },
//       {
//         "id": 1579431384952,
//         "name": "Jtest4you::N4"
//       },
//       {
//         "id": 1579431384945,
//         "name": "Jtest4you::N5"
//       },
//       {
//         "id": 1554127945700,
//         "name": "Reading"
//       },
//       {
//         "id": 1555657203726,
//         "name": "Reading::Attack on Titan"
//       },
//       {
//         "id": 1573008357367,
//         "name": "Reading::Harry Potter"
//       },
//       {
//         "id": 1566825125898,
//         "name": "Reading::Mined Vocab"
//       },
//       {
//         "id": 1558716651885,
//         "name": "Reading::Mukashi"
//       },
//       {
//         "id": 1,
//         "name": "Reading::Polar Bear Cafe"
//       }
//     ],
//     "tags": [
//       {
//         "id": " Attack_on_Titan_with_English_Translations_01 ",
//         "name": "Attack_on_Titan_with_English_Translations_01"
//       },
//       {
//         "id": " Attack_on_Titan_with_English_Translations_02 ",
//         "name": "Attack_on_Titan_with_English_Translations_02"
//       },
//       {
//         "id": " Attack_on_Titan_with_English_Translations_03 ",
//         "name": "Attack_on_Titan_with_English_Translations_03"
//       },
//       {
//         "id": " C2K ",
//         "name": "C2K"
//       },
//       {
//         "id": " Core2k ",
//         "name": "Core2k"
//       },
//       {
//         "id": " custom ",
//         "name": "custom"
//       },
//       {
//         "id": " Expl ",
//         "name": "Expl"
//       },
//       {
//         "id": " hiragana ",
//         "name": "hiragana"
//       },
//       {
//         "id": " kana ",
//         "name": "kana"
//       },
//       {
//         "id": " kanji ",
//         "name": "kanji"
//       },
//       {
//         "id": " katakana ",
//         "name": "katakana"
//       },
//       {
//         "id": " leech ",
//         "name": "leech"
//       },
//       {
//         "id": " marked ",
//         "name": "marked"
//       },
//       {
//         "id": " mining ",
//         "name": "mining"
//       },
//       {
//         "id": " N1 ",
//         "name": "N1"
//       },
//       {
//         "id": " N2 ",
//         "name": "N2"
//       },
//       {
//         "id": " N3 ",
//         "name": "N3"
//       },
//       {
//         "id": " N4 ",
//         "name": "N4"
//       },
//       {
//         "id": " N5 ",
//         "name": "N5"
//       },
//       {
//         "id": " reading ",
//         "name": "reading"
//       },
//       {
//         "id": " rtk1 ",
//         "name": "rtk1"
//       },
//       {
//         "id": " rtk3 ",
//         "name": "rtk3"
//       },
//       {
//         "id": " shirokuma_01 ",
//         "name": "shirokuma_01"
//       },
//       {
//         "id": " shirokuma_02 ",
//         "name": "shirokuma_02"
//       },
//       {
//         "id": " shirokuma_03 ",
//         "name": "shirokuma_03"
//       },
//       {
//         "id": " shirokuma_04 ",
//         "name": "shirokuma_04"
//       },
//       {
//         "id": " shirokuma_05 ",
//         "name": "shirokuma_05"
//       },
//       {
//         "id": " shirokuma_06 ",
//         "name": "shirokuma_06"
//       },
//       {
//         "id": " shirokuma_07 ",
//         "name": "shirokuma_07"
//       },
//       {
//         "id": " shirokuma_08 ",
//         "name": "shirokuma_08"
//       },
//       {
//         "id": " shirokuma_09 ",
//         "name": "shirokuma_09"
//       },
//       {
//         "id": " shirokuma_10 ",
//         "name": "shirokuma_10"
//       },
//       {
//         "id": " shirokuma_11 ",
//         "name": "shirokuma_11"
//       },
//       {
//         "id": " shirokuma_12 ",
//         "name": "shirokuma_12"
//       },
//       {
//         "id": " shirokuma_13 ",
//         "name": "shirokuma_13"
//       },
//       {
//         "id": " shirokuma_14 ",
//         "name": "shirokuma_14"
//       },
//       {
//         "id": " shirokuma_15 ",
//         "name": "shirokuma_15"
//       },
//       {
//         "id": " shirokuma_16 ",
//         "name": "shirokuma_16"
//       },
//       {
//         "id": " shirokuma_17 ",
//         "name": "shirokuma_17"
//       },
//       {
//         "id": " shirokuma_18 ",
//         "name": "shirokuma_18"
//       },
//       {
//         "id": " shirokuma_19 ",
//         "name": "shirokuma_19"
//       },
//       {
//         "id": " shirokuma_20 ",
//         "name": "shirokuma_20"
//       },
//       {
//         "id": " shirokuma_21 ",
//         "name": "shirokuma_21"
//       },
//       {
//         "id": " shirokuma_22 ",
//         "name": "shirokuma_22"
//       },
//       {
//         "id": " shirokuma_23 ",
//         "name": "shirokuma_23"
//       },
//       {
//         "id": " shirokuma_24 ",
//         "name": "shirokuma_24"
//       },
//       {
//         "id": " shirokuma_25 ",
//         "name": "shirokuma_25"
//       },
//       {
//         "id": " shirokuma_26 ",
//         "name": "shirokuma_26"
//       },
//       {
//         "id": " shirokuma_27 ",
//         "name": "shirokuma_27"
//       },
//       {
//         "id": " shirokuma_28 ",
//         "name": "shirokuma_28"
//       },
//       {
//         "id": " shirokuma_29 ",
//         "name": "shirokuma_29"
//       },
//       {
//         "id": " shirokuma_30 ",
//         "name": "shirokuma_30"
//       },
//       {
//         "id": " shirokuma_31 ",
//         "name": "shirokuma_31"
//       },
//       {
//         "id": " shirokuma_32 ",
//         "name": "shirokuma_32"
//       },
//       {
//         "id": " shirokuma_33 ",
//         "name": "shirokuma_33"
//       },
//       {
//         "id": " shirokuma_34 ",
//         "name": "shirokuma_34"
//       },
//       {
//         "id": " shirokuma_35 ",
//         "name": "shirokuma_35"
//       },
//       {
//         "id": " shirokuma_36 ",
//         "name": "shirokuma_36"
//       },
//       {
//         "id": " shirokuma_37 ",
//         "name": "shirokuma_37"
//       },
//       {
//         "id": " shirokuma_38 ",
//         "name": "shirokuma_38"
//       },
//       {
//         "id": " shirokuma_39 ",
//         "name": "shirokuma_39"
//       },
//       {
//         "id": " shirokuma_40 ",
//         "name": "shirokuma_40"
//       },
//       {
//         "id": " shirokuma_41 ",
//         "name": "shirokuma_41"
//       },
//       {
//         "id": " shirokuma_42 ",
//         "name": "shirokuma_42"
//       },
//       {
//         "id": " shirokuma_43 ",
//         "name": "shirokuma_43"
//       },
//       {
//         "id": " shirokuma_44 ",
//         "name": "shirokuma_44"
//       },
//       {
//         "id": " shirokuma_45 ",
//         "name": "shirokuma_45"
//       },
//       {
//         "id": " shirokuma_46 ",
//         "name": "shirokuma_46"
//       },
//       {
//         "id": " shirokuma_47 ",
//         "name": "shirokuma_47"
//       },
//       {
//         "id": " shirokuma_48 ",
//         "name": "shirokuma_48"
//       },
//       {
//         "id": " shirokuma_49 ",
//         "name": "shirokuma_49"
//       },
//       {
//         "id": " shirokuma_50 ",
//         "name": "shirokuma_50"
//       },
//       {
//         "id": " 単語N4 ",
//         "name": "単語N4"
//       },
//       {
//         "id": " 単語N5 ",
//         "name": "単語N5"
//       }
//     ],
//     "noteTypes": [
//       {
//         "id": "1546252838429",
//         "name": "Audio Mining"
//       },
//       {
//         "id": 1342706442507,
//         "name": "Core 2000"
//       },
//       {
//         "id": "1540365234350",
//         "name": "English"
//       },
//       {
//         "id": 1448098852224,
//         "name": "Japanese + subs2srs"
//       },
//       {
//         "id": 1459450892726,
//         "name": "Japanese jTest"
//       },
//       {
//         "id": 1342695665470,
//         "name": "Kana"
//       },
//       {
//         "id": 1455531004306,
//         "name": "Kanji"
//       },
//       {
//         "id": "1547687898933",
//         "name": "People"
//       },
//       {
//         "id": "1567736204644",
//         "name": "Roleplay"
//       },
//       {
//         "id": 1525985463680,
//         "name": "Tango"
//       },
//       {
//         "id": "1566825364120",
//         "name": "Vocab Mining"
//       }
//     ],
//     "ready": true,
//     "loading": false
//   }
// }
