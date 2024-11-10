document.querySelectorAll(".footer-h3").forEach((item) => {
  item.addEventListener("click", (event) => {
    const content = event.target.nextElementSibling;
    const isVisible = content.style.display === "block";
    document.querySelectorAll(".sub-menus-footer").forEach((content) => {
      content.style.display = "none";
    });
    content.style.display = isVisible ? "none" : "block";
  });
});
