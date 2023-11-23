function changeText(text: string, comment: HTMLElement) {
  /**
   * Change a comments's text
   */
  comment.innerText = text;
}

function changeComments(newText: string) {
  /**
   * Add a text in the app's comments
   */
  // get all comments
  const comments = document.querySelectorAll(
    "div.js-comments-holder"
  ) as NodeListOf<HTMLDivElement>;

  if (comments.length === 0) return;

  // loop through comments to find the app's comments
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    // get the comment's author
    const authorTitle = comment.querySelector(
      "strong a.author.Link--primary.text-bold.css-overflow-wrap-anywhere"
    ) as HTMLAnchorElement;
    const authorName = authorTitle.innerText;

    if (authorName !== "basic-reviewer") continue;

    // change the comment's text
    const commentBody = comment.querySelector(
      "div.comment-body.markdown-body.js-comment-body.soft-wrap.css-overflow-wrap-anywhere.user-select-contain.d-block p"
    ) as HTMLParagraphElement;
    changeText(newText, commentBody);
  }
}

changeComments("This is a test comment");
