import * as githubDOM from "../utils/githubDOMUtils.js";
import { insertPopup } from "../utils/popup.js";

//TODO: make api calls to the github app so that the file and the line number can be passed in
function main() {
  const fileDiff = githubDOM.getFileDiff("src/main/java/Text.java");
  if (fileDiff === null) {
    throw new Error("[EXT_WARNING] No diff found in this page");
  }

  const lineList = githubDOM.getDiffVisibleLines(fileDiff);
  if (lineList === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the list of lines in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  const fromLineIndex = githubDOM.getLineIndex(lineList, 34);
  const toLineIndex = githubDOM.getLineIndex(lineList, 35);
  if (fromLineIndex === null || toLineIndex === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the line index of the modified line in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  const fromLine = lineList[fromLineIndex];
  const toLine = lineList[toLineIndex];

  const fromLineText = fromLine.querySelector("td.js-file-line") as HTMLTableCellElement;
  const toLineText = toLine.querySelector("td.js-file-line") as HTMLTableCellElement;
  if (fromLineText === null || toLineText === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the line text in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  const fromLineNumberMatch = fromLine.children[1].id.match(`${fileDiff.id}R(\\d+)`);
  const toLineNumberMatch = toLine.children[1].id.match(`${fileDiff.id}R(\\d+)`);
  if (fromLineNumberMatch === null || toLineNumberMatch === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the line number in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  const fromLineNumber = parseInt(fromLineNumberMatch[1]);
  const toLineNumber = parseInt(toLineNumberMatch[1]);

  insertPopup(
    fromLineText,
    `This is the source for line <a href='#${toLineNumberMatch[0]}'>${toLineNumber}</a>`
  );
  insertPopup(
    toLineText,
    `This is the sink from line <a href='#${fromLineNumberMatch[0]}'>${fromLineNumber}</a>`
  );
}

main();
