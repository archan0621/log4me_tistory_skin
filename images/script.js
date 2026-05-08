(function () {
  var root = document.documentElement;
  var storageKey = "log4me-theme";
  var savedTheme = null;

  root.classList.add("log4me-tistory");

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  function getTheme() {
    if (root.dataset.theme === "dark" || root.dataset.theme === "light") {
      return root.dataset.theme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  } else {
    root.dataset.theme = getTheme();
  }

  function setButtonState(button) {
    var nextTheme = getTheme() === "dark" ? "light" : "dark";

    button.setAttribute("aria-label", nextTheme === "dark" ? "다크 모드로 전환" : "라이트 모드로 전환");
    button.setAttribute("title", nextTheme === "dark" ? "다크 모드로 전환" : "라이트 모드로 전환");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");

    if (!button) {
      return;
    }

    setButtonState(button);

    button.addEventListener("click", function () {
      var nextTheme = getTheme() === "dark" ? "light" : "dark";

      root.dataset.theme = nextTheme;

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // Ignore storage failures; the current page can still switch themes.
      }

      setButtonState(button);
    });
  });
})();
