chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    console.log("Listener called at: " + details.url);

    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ["./content.js"]
    });
  },
  { url: [{ urlMatches: "^https:\\/\\/github\\.com\\/.+\\/.+\\/pull\\/\\d+\\/files$" }] }
);
