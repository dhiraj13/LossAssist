document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach((el) => {
    fetch(el.getAttribute("data-include"))
      .then((res) => res.text())
      .then((html) => {
        el.innerHTML = html;
        // Execute any scripts in the included HTML
        el.querySelectorAll("script").forEach((script) => {
          const newScript = document.createElement("script");
          newScript.text = script.text;
          document.body.appendChild(newScript).remove();
        });
      });
  });
});
