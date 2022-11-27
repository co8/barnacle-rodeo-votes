import { google } from "googleapis";
export async function getBRVotesList() {
  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "brvotes", //sheet name
    });

    const rows = response.data.values;

    if (rows.length) {
      return rows.map((row) => ({
        id: row[0],
        vote: row[1],
        alt: "Barnacle Rodeo Votes #" + row[0],
        title: "Barnacle Rodeo Votes #" + row[0],
        motive: row[2],
        src: "/images/" + row[0] + ".jpg",
        width: 128,
        height: 96,
        description: row[4],
        caption: row[4],
        //customOverlay: false,
        hash: row[5] || "",
        finder: row[5] ? "https://finder.kujira.app/kaiyo-1/tx/" + row[5] : "",
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
