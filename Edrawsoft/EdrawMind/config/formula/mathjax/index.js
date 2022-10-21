window.MathJax = {
  loader: {
    load: ["[tex]/color", "[tex]/require", "[tex]/boldsymbol"],
  },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    processEscapes: true,
  },
};

// Load MathJax
const script = document.createElement("script");
script.src = "./mathjax/tex-svg.js";
script.setAttribute("id", "MathJax-script");
document.head.appendChild(script);
