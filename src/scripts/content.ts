function getAllFileDiffs() {
  return document.querySelectorAll("div[id^=diff-]");
}

function getFileDiff(filePath: string) {
  for (let fileDiff of getAllFileDiffs()) {
    if (fileDiff.getAttribute("data-tagsearch-path") === filePath) {
      return fileDiff;
    }
  }
  return null;
}

function getDiffLine(fileDiff: Element, lineNumber: number) {
  return fileDiff.querySelector(`tr:has(td[data-line-number="${lineNumber}"])`);
}

function changeLineText(line: Element, text: string) {
  const lineBody = line.querySelector("span[data-code-marker='+']");
  if (lineBody === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the line body in the line ${line.getAttribute(
        "data-line-number"
      )}`
    );
  }

  const lineText = lineBody.querySelector("span");
  if (lineText === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the line text in the line ${line.getAttribute(
        "data-line-number"
      )}`
    );
  }

  lineText.textContent = text;
}

//TODO: make api calls to the github app so that the file and the line number can be passed in
function main() {
  const fileDiff = getFileDiff("src/main/java/Text.java");
  if (fileDiff === null) {
    console.log("[EXT_WARNING] No diff found in this page");
    return;
  }

  const line = getDiffLine(fileDiff, 33);
  if (line === null) {
    throw new Error(
      `[EXT_ERROR] Could not find a modified line in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  changeLineText(line, "Hello World!");
}

main();
