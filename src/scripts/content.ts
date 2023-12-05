function getAllFileDiffs() {
  return document.querySelectorAll("div[id^=diff-]");
}

function getFileDiff(filePath: string, diffList: NodeListOf<Element> = getAllFileDiffs()) {
  for (let fileDiff of diffList) {
    if (fileDiff.getAttribute("data-tagsearch-path") === filePath) {
      return fileDiff;
    }
  }
  return null;
}

function getDiffVisibleLines(fileDiff: Element) {
  return fileDiff.querySelectorAll("tbody tr:not(.js-expandable-line)");
}

function getDiffLine(lineList: Element | NodeListOf<Element>, lineNumber: number) {
  if (lineList instanceof Element) {
    return lineList.querySelector(`tr:has(:nth-child(2):is(td[data-line-number="${lineNumber}"]))`);
  }

  for (let line of lineList) {
    if (line.querySelector(`:nth-child(2):is(td[data-line-number="${lineNumber}"])`) !== null) {
      return line;
    }
  }
  return null;
}

function getLineIndex(lineList: NodeListOf<Element>, lineNumber: number) {
  for (let i = 0; i < lineList.length; i++) {
    if (lineList[i].querySelector(`td[data-line-number="${lineNumber}"]`) !== null) {
      return i;
    }
  }
  return null;
}

function insertCanvas(fileDiff: Element) {
  const container = fileDiff.querySelector("div:has(> table)") as HTMLDivElement;
  if (container === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the container of the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  const canvas = container.querySelector("#arrow-canvas");
  if (canvas !== null) return canvas as HTMLCanvasElement;

  container.style.position = "relative";

  const newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", "arrow-canvas");
  newCanvas.setAttribute("width", "22px");
  newCanvas.setAttribute("height", container.scrollHeight.toString());
  newCanvas.style.position = "absolute";
  newCanvas.style.top = "0";
  newCanvas.style.left = "0";
  container.appendChild(newCanvas);
  return newCanvas;
}

/*TODO: get the Y coodinate from the line Element, not the list index,
        as the fileDiff can have revision comments in between lines */
function drawArrow(fileDiff: Element, fromLine: number, toLine: number, diffLength: number) {
  const canvas = insertCanvas(fileDiff);
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    throw new Error("[EXT_ERROR] Could not get the context of the canvas");
  }

  const expandableLine = fileDiff.querySelector("tbody tr:is(.js-expandable-line)");
  const expandableLineHeight = expandableLine === null ? 0 : expandableLine.scrollHeight;

  const lineHeigth = (canvas.scrollHeight - 2 * expandableLineHeight) / diffLength;
  const fromY = expandableLineHeight + lineHeigth * fromLine + lineHeigth / 2;
  const toY = expandableLineHeight + lineHeigth * toLine + lineHeigth / 2;

  const leftSpace = 11;

  const startHeadRadius = 2;
  const endHeadRadius = 4;

  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(leftSpace, fromY, startHeadRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(leftSpace, toY, endHeadRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(leftSpace, fromY);
  ctx.lineTo(leftSpace, toY);
  ctx.stroke();
  ctx.closePath();
}

//TODO: make api calls to the github app so that the file and the line number can be passed in
function main() {
  const fileDiff = getFileDiff("src/main/java/Text.java");
  if (fileDiff === null) {
    throw new Error("[EXT_WARNING] No diff found in this page");
  }

  const lineList = getDiffVisibleLines(fileDiff);
  if (lineList === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the list of lines in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  const fromLineIndex = getLineIndex(lineList, 34);
  const toLineIndex = getLineIndex(lineList, 35);
  if (fromLineIndex === null || toLineIndex === null) {
    throw new Error(
      `[EXT_ERROR] Could not find the line index of the modified line in the diff ${fileDiff.getAttribute(
        "data-tagsearch-path"
      )}`
    );
  }

  drawArrow(fileDiff, fromLineIndex, toLineIndex, lineList.length);
}

main();
