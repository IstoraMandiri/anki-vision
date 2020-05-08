import Json from "./Json";
import MultiSelect from "./MultiSelect";
import DateRange from "./DateRange";
import { periods } from "../utils/periods";
import DropdownSelect from "./Dropdown";

import { selects } from "../utils/selects";
import { objectify } from "../utils/transforms";
const selectors = Object.keys(selects).map((id) => ({ ...selects[id], id }));

const BuildQuery = ({ state: { info, query }, actions: { updateQuery, runQuery } }) => {
  return (
    <>
      - Selectors
      <div>
        <MultiSelect
          name="Selectors"
          items={selectors}
          onChange={(i) => updateQuery({ select: objectify(i) })}
        />
      </div>
      - Filters
      <div>
        <MultiSelect
          name="Tags"
          items={info.tags}
          onChange={(i) => updateQuery({ filter: { tags: objectify(i) } })}
        />
        <MultiSelect
          name="Decks"
          items={info.decks}
          onChange={(i) => updateQuery({ filter: { decks: objectify(i) } })}
        />
        <MultiSelect
          name="Note Types"
          items={info.noteTypes}
          onChange={(i) => updateQuery({ filter: { noteTypes: objectify(i) } })}
        />
        <DateRange
          start={info.firstRevision}
          end={info.lastRevision}
          onChange={(_res) => {
            const res = _res || [];
            updateQuery({
              filter: {
                time: {
                  ...(res[0] && { start: res[0].valueOf() }),
                  ...(res[1] && { end: res[1].valueOf() }),
                },
              },
            });
          }}
        />
        <DropdownSelect
          items={periods}
          selected={query.period}
          onChange={(period) => updateQuery({ period })}
        />
        <hr />
        <button onClick={runQuery}>Run!</button>
      </div>
    </>
  );
};

export default BuildQuery;
