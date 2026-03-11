const calculators = [
  {
    id: "iul_index",
    title: "IUL Index Performance Calculator",
    file: "iul_index_historical.html",
    note: "Illustrates how Indexed Universal Life (IUL) performs over time.",
  },
  {
    id: "compound",
    title: "Compound Interest Explorer",
    file: "compound_interest.html",
    note: "Illustrates how contributions grow over time at a fixed rate.",
  },
  {
    id: "retirement_distribution",
    title: "Retirement Distribution",
    file: "retirement_distribution_projection.html",
    note: "Illustrates longevity of asset distribution over retirement",
  },
  {
    id: "tax_impacts_advanced",
    title: "Tax Impacts",
    file: "tax_impacts_advanced.html",
    note: "Illustrates taxes impact your growth potential",
  },
  {
    id: "why65",
    title: "Why 65%",
    file: "why_65.html",
    note: "Why 65%",
  },
  {
    id: "Tax_Impacts_Advanced_Chinese",
    title: "Tax Impacts Advanced Chinese",
    file: "Tax_Impacts_Advanced_Chinese.html",
    note: "",
  }
];

function initCalculators() {
  const select = document.getElementById("calculatorSelect");
  const frame = document.getElementById("calculatorFrame");
  const title = document.getElementById("calculatorTitle");
  const yearEl = document.getElementById("year");
  const calculatorOpener = document.getElementById("calculator-opener");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (!select || !frame || !title) return;

  select.innerHTML = "";

  function loadCalculator(calc) {
    frame.src = `calculators/${calc.file}`;
    title.textContent = calc.title;
    select.value = calc.id;
    calculatorOpener.href = `calculators/${calc.file}`;
    calculatorOpener.target = "_blank";
    calculatorOpener.rel = "noopener noreferrer";
  }

  calculators.forEach((calc, index) => {
    const option = document.createElement("option");
    option.value = calc.id;
    option.textContent = calc.title;
    option.title = calc.note || "";
    select.appendChild(option);

    if (index === 0) {
      loadCalculator(calc);
    }
  });

  const loadCalculatorDescription = () => {
    const selected = calculators.find((c) => c.id === select.value);
    if (selected) {
      loadCalculator(selected);
      const calculatorDescription = document.getElementById("calculatorDescription");
      calculatorDescription.innerHTML = selected.note;
    }
  };
  
  window.addEventListener('load', loadCalculatorDescription);

  select.addEventListener("change", loadCalculatorDescription);
}

document.addEventListener("DOMContentLoaded", initCalculators);

