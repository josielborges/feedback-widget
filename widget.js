
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("feedback_given")) return;

  const widgetButton = document.createElement("div");
  widgetButton.className = "fixed right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-3 py-2 cursor-pointer text-xs font-semibold rotate-180 writing-mode-vertical z-50";
  widgetButton.innerText = "Rate your experience";

  const modal = document.createElement("div");
  modal.className = "fixed right-4 top-1/2 transform -translate-y-1/2 bg-white p-6 shadow-xl rounded-lg z-50 hidden";
  modal.innerHTML = `
    <p class="mb-3 font-semibold">How would you rate your experience?</p>
    <div class="flex justify-between space-x-2 text-2xl cursor-pointer">
      <span data-score="1">😠</span>
      <span data-score="2">😕</span>
      <span data-score="3">😐</span>
      <span data-score="4">🙂</span>
      <span data-score="5">😎</span>
    </div>
    <p id="thankyou-msg" class="text-green-600 text-sm mt-3 hidden">Thank you for your feedback!</p>
  `;

  widgetButton.onclick = () => {
    modal.classList.toggle("hidden");
  };

  modal.querySelectorAll("[data-score]").forEach(el => {
    el.onclick = () => {
      const score = el.getAttribute("data-score");
      localStorage.setItem("feedback_given", "true");
      modal.querySelector("#thankyou-msg").classList.remove("hidden");
      setTimeout(() => modal.classList.add("hidden"), 2000);

      fetch("https://sua-api.com/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          score: Number(score),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      }).catch(err => {
        console.error("Erro ao enviar feedback:", err);
      });
    };
  });

  document.body.appendChild(widgetButton);
  document.body.appendChild(modal);
});
