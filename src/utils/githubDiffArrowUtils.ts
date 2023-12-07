/**
 * Utility functions for generating arrows between lines in a file diff in GitHub revision page.
 */

/**
 * Inserts a canvas element into the file diff container if it doesn't exist,
 * and returns the canvas element.
 * Throws an error if the container cannot be found.
 *
 * @param fileDiff - The element representing the file diff.
 * @returns The canvas element.
 */
export function insertCanvas(fileDiff: Element): HTMLCanvasElement {
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

/**
 * Draws an arrow on the canvas element within the file diff.
 * Throws an error if the canvas context cannot be obtained.
 *
 * @param fileDiff - The element representing the file diff.
 * @param fromLine - The starting line number.
 * @param toLine - The ending line number.
 * @param diffLength - The total number of lines in the diff.
 */
export function drawArrow(
  fileDiff: Element,
  fromLine: number,
  toLine: number,
  diffLength: number
): void {
  /*TODO: get the Y coodinate from the line Element, not the list index,
                            as the fileDiff can have revision comments in between lines */
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
