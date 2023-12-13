function createPopup(popupHTML) {
    const separator = document.createElement("span");
    separator.style.padding = "0 8px 0 0";
    const popUpContainer = document.createElement("span");
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
    popover.style.inset = "unset";
    popover.style.position = "absolute";
    popover.style.margin = "0px";
    popover.style.padding = "0 5px 0 5px";
    popover.style.width = "fit-content";
    popover.style.right = "100%";
    popover.style.top = "50%";
    popover.style.transform = "translateY(-50%)";
    popover.style.visibility = "hidden";
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
export function insertPopup(element, popupHTML) {
    const { popUpContainer, popoverButton, popover } = createPopup(popupHTML);
    element.appendChild(popUpContainer);
    popoverButton.addEventListener("click", () => {
        const newVisibility = popover.style.visibility === "visible" ? "hidden" : "visible";
        popover.style.visibility = newVisibility;
    });
}
