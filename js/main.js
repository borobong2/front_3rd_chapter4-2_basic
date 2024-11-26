function showTopBar() {
  let country = "France";
  let vat = 20;
  setTimeout(() => {
    document.querySelector(
      "section.country-bar"
    ).innerHTML = `<p>Orders to <b>${country}</b> are subject to <b>${vat}%</b> VAT</p>`;
    document.querySelector("section.country-bar").classList.remove("hidden");
  }, 1000);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker 등록 성공:", registration.scope);

      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        console.log("PWA 설치 가능");

        const installBtn = document.querySelector("#installPwa");
        if (installBtn) {
          installBtn.style.display = "block";
          installBtn.addEventListener("click", async () => {
            const result = await e.prompt();
            console.log(`설치 ${result.outcome}`);
            installBtn.style.display = "none";
          });
        }
      });
    } catch (err) {
      console.error("ServiceWorker 등록 실패:", err);
    }
  });
}

showTopBar();
