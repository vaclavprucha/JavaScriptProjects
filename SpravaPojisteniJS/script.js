let pojisteni = [];
let upravovanyId = null;

document.getElementById("formular").addEventListener("submit", function (e) {
  e.preventDefault();

  const jmeno = document.getElementById("jmeno").value.trim();
  const prijmeni = document.getElementById("prijmeni").value.trim();
  const vek = parseInt(document.getElementById("vek").value);
  const telefon = document.getElementById("telefon").value.trim();
  const druh = document.getElementById("druh").value;

  if (upravovanyId) {
    const index = pojisteni.findIndex(p => p.id === upravovanyId);
    if (index !== -1) {
      pojisteni[index].jmeno = jmeno;
      pojisteni[index].prijmeni = prijmeni;
      pojisteni[index].vek = vek;
      pojisteni[index].telefon = telefon;
      pojisteni[index].druh = druh;
    }
    upravovanyId = null;
  } else {
    const osoba = new Pojisteny(jmeno, prijmeni, vek, telefon, druh);
    pojisteni.push(osoba);
  }

  ulozit();
  vykreslit();
  this.reset();
});

function vykreslit() {
  const seznam = document.getElementById("seznam");
  seznam.innerHTML = "";

  pojisteni.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.jmeno} ${p.prijmeni}</strong><br>
      Věk: ${p.vek}, Tel: ${p.telefon}<br>
      Pojištění: ${p.druh}
      <div class="seznam-ovladani">
        <button class="edit" onclick="upravit(${p.id})">Upravit</button>
        <button class="smazat" onclick="smazat(${p.id})">Smazat</button>
      </div>
    `;
    seznam.appendChild(li);
  });
}

function smazat(id) {
  pojisteni = pojisteni.filter(p => p.id !== id);
  ulozit();
  vykreslit();
}

function upravit(id) {
  const osoba = pojisteni.find(p => p.id === id);
  if (!osoba) return;

  document.getElementById("jmeno").value = osoba.jmeno;
  document.getElementById("prijmeni").value = osoba.prijmeni;
  document.getElementById("vek").value = osoba.vek;
  document.getElementById("telefon").value = osoba.telefon;
  document.getElementById("druh").value = osoba.druh;
  upravovanyId = id;
}

function ulozit() {
  localStorage.setItem("pojisteni", JSON.stringify(pojisteni));
}

function nacist() {
  const data = localStorage.getItem("pojisteni");
  if (data) {
    const nactene = JSON.parse(data);
    pojisteni = nactene.map(o => {
      const p = new Pojisteny(o.jmeno, o.prijmeni, o.vek, o.telefon, o.druh);
      p.id = o.id; 
      return p;
    });
    vykreslit();
  }
}

nacist();