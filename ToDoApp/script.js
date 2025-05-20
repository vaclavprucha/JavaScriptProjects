
let ulozeneUkoly = JSON.parse(localStorage.getItem('ukoly')) || [];

function vykresliUkoly() {
    const seznam = document.getElementById('seznamUkolu');
    seznam.innerHTML = '';
    ulozeneUkoly.forEach((ukol, index) => {
      const li = document.createElement('li');
      li.className = ukol.hotovo ? 'hotovo' : '';
      li.innerHTML = `
        <div>
          <span onclick="prepniHotovo(${index})">${ukol.text}</span><br>
          <small>${ukol.datum}</small>
        </div>
        <button onclick="smazatUkol(${index})">✖</button>
      `;
      seznam.appendChild(li);
    });
  }

function pridejUkol() {
    const input = document.getElementById('ukolInput');
    const text = input.value.trim();
    if (text === '') return;
  
    const datum = new Date();
    const datumText = datum.toLocaleDateString('cs-CZ') + ' ' + datum.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  
    ulozeneUkoly.push({ text, hotovo: false, datum: datumText });
    input.value = '';
    ulozit();
    vykresliUkoly();
  }

function smazatUkol(index) {
    ulozeneUkoly.splice(index, 1);
    ulozit();
    vykresliUkoly();
}

function prepniHotovo(index) {
    ulozeneUkoly[index].hotovo = !ulozeneUkoly[index].hotovo;
    ulozit();
    vykresliUkoly();
}

function ulozit() {
    localStorage.setItem('ukoly', JSON.stringify(ulozeneUkoly));
}

window.onload = vykresliUkoly;