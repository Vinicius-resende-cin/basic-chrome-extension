import { computePosition, flip, offset, autoUpdate } from "@floating-ui/dom";

function createPopup(popupHTML: string) {
  const separator = document.createElement("span");
  separator.style.padding = "0 8px 0 0";

  const popUpContainer = document.createElement("span");
  popUpContainer.id = "dependency-alert-popup-container";
  popUpContainer.style.border = "1px solid black";
  popUpContainer.style.position = "relative";
  popUpContainer.style.display = "table-cell";
  popUpContainer.style.width = "10%";
  popUpContainer.style.padding = "0";
  popUpContainer.style.border = "0";

  const popoverButton = document.createElement("button");
  popoverButton.innerText = "Alert";
  popoverButton.style.width = "100%";
  popoverButton.style.padding = "0";
  popoverButton.style.border = "0";
  popoverButton.style.fontSize = "10px";
  popoverButton.style.backgroundColor = "red";

  const popover = document.createElement("div");
  popover.style.position = "absolute";
  popover.style.margin = "0px";
  popover.style.padding = "0 5px 0 5px";
  popover.style.width = "max-content";
  popover.style.left = "0";
  popover.style.top = "0";
  popover.innerHTML = popupHTML;
  popover.style.whiteSpace = "nowrap";
  popover.style.border = "1px solid black";
  popover.style.color = "black";
  popover.style.backgroundColor = "#ffe785";

  popUpContainer.appendChild(separator);
  popUpContainer.appendChild(popoverButton);
  popUpContainer.appendChild(popover);

  return { popUpContainer, popoverButton, popover };
}

export function insertPopup(element: Element, popupHTML: string) {
  if (element.querySelector("#dependency-alert-popup-container") !== null) return;

  const { popUpContainer, popoverButton, popover } = createPopup(popupHTML);
  element.appendChild(popUpContainer);

  const updatePosition = () => {
    computePosition(popUpContainer, popover, {
      placement: "left",
      middleware: [offset(10), flip()]
    }).then(({ x, y }: { x: number; y: number }) => {
      Object.assign(popover.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  };

  const clean = autoUpdate(popUpContainer, popover, updatePosition);
}
