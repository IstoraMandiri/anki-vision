import Dexie from "dexie";

const db = new Dexie("anki-stats-db") as any;

db.version(1).stores({ data: "id" });

export function loadFile(e) {
  return new Promise((resolve) => {
    const f = e.target.files[0];
    const r = new FileReader() as any;
    r.onload = async () => {
      const buffer = new Uint8Array(r.result);
      await db.data.put({ id: 1, buffer });
      resolve(buffer);
    };
    r.readAsArrayBuffer(f);
  });
}

export async function getSavedFile() {
  const data = await db.data.where("id").equals(1).first();
  if (data && data.buffer) {
    return data.buffer;
  } else {
    return false;
  }
}
