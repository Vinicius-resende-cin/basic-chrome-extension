import * as githubDOM from "../utils/githubDOMUtils.js";
import * as githubArrow from "../utils/githubDiffArrowUtils.js";

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

  githubArrow.drawArrow(fileDiff, fromLineIndex, toLineIndex, lineList.length);
}

main();
