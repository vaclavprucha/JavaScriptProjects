let transakce = JSON.parse(localStorage.getItem("transakce")) || [];
let aktualniFilter = "vse";

document.getElementById("formular").addEventListener("submit", pridatTransakci);
window.onload = zobrazTransakce;

function pridatTransakci(e) {
  e.preventDefault();
  const nazev = document.getElementById("nazev").value.trim();
  const castka = parseFloat(document.getElementById("castka").value);

  if (!nazev || isNaN(castka)) return;

  transakce.push({ nazev, castka, id: Date.now() });
  ulozit();
  e.target.reset();
  zobrazTransakce();
}

function zobrazTransakce() {
  const seznam = document.getElementById("seznamTransakci");
  seznam.innerHTML = "";

  let filtrované = transakce;
  if (aktualniFilter === "prijem") {
    filtrované = transakce.filter(t => t.castka > 0);
  } else if (aktualniFilter === "vydaj") {
    filtrované = transakce.filter(t => t.castka < 0);
  }

  filtrované.forEach(t => {
    const li = document.createElement("li");
    li.className = t.castka >= 0 ? "prijem" : "vydaj";
    li.innerHTML = `
      <span>${t.nazev} (${t.castka >= 0 ? "+" : ""}${t.castka} Kč)</span>
      <button class="smazat-btn" onclick="smazatTransakci(${t.id})">✖</button>
    `;
    seznam.appendChild(li);
  });

  aktualizujZustatek();
}

function aktualizujZustatek() {
  const zustatek = transakce.reduce((sum, t) => sum + t.castka, 0);
  document.getElementById("zustatek").textContent = `${zustatek} Kč`;
}

function smazatTransakci(id) {
  transakce = transakce.filter(t => t.id !== id);
  ulozit();
  zobrazTransakce();
}

function nastavFilter(filter) {
  aktualniFilter = filter;
  zobrazTransakce();
}

function ulozit() {
  localStorage.setItem("transakce", JSON.stringify(transakce));
}