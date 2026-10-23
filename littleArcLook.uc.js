// ==UserScript==
// @name        Little Arc look
// @description Puts the macOS window buttons at the start of Little Zen's toolbar, like Little Arc.
// @include     main
// ==/UserScript==

(function () {
  "use strict";

  const LITTLE_WINDOW_ATTR = "zen-little-window";
  const root = document.documentElement;

  function placeWindowButtons() {
    if (root.getAttribute(LITTLE_WINDOW_ATTR) !== "true") {
      return;
    }
    const navBar = document.getElementById("nav-bar");
    // On macOS the native traffic lights are drawn wherever this element sits.
    const buttons = document.querySelector(".titlebar-buttonbox-container");
    if (navBar && buttons && navBar.firstElementChild !== buttons) {
      navBar.prepend(buttons);
    }
  }

  // Little Zen marks the window and rearranges the toolbar after startup, so
  // re-check whenever the window attribute or the toolbar's children change.
  new MutationObserver(placeWindowButtons).observe(root, {
    attributes: true,
    attributeFilter: [LITTLE_WINDOW_ATTR],
  });
  window.addEventListener(
    "load",
    () => {
      const navBar = document.getElementById("nav-bar");
      if (navBar) {
        new MutationObserver(placeWindowButtons).observe(navBar, { childList: true });
      }
      placeWindowButtons();
    },
    { once: true }
  );
})();
