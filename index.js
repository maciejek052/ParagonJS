// wyswietlanie naglowka z data
let naglowek = document.createElement('h2');
naglowek.style.textAlign = "center";
var d = new Date();
var aktualnaData = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");;
naglowek.textContent = "Paragon z dnia " + aktualnaData;
document.body.prepend(naglowek);

class Produkt {
  constructor(nazwa, ilosc, cena) {
    this.nazwa = nazwa;
    this.ilosc = ilosc;
    this.cena = cena;
    this.suma = (ilosc * cena);
  };
};

let listaProduktow = [];
const tabela = document.getElementById("tabela");
document.body.onload = wczytajLocalStorage();

// funkcja odpowiedzialna za dodanie produktu do listy
const formularz = document.getElementById("formularz");
function nowyProdukt() {
  let prod = new Produkt(formularz.nazwa.value, formularz.ilosc.value, formularz.cena.value);
  listaProduktow.push(prod);
  dodajDoTabeli(listaProduktow.length - 1, prod);
  localStorage.paragon = JSON.stringify(listaProduktow);
}

// funkcja odpowiedzialna za wyświetlenie produktu w tabeli na stronie
function dodajDoTabeli(id, produkt) {
  let wiersz = tabela.insertRow();
  let lp = wiersz.insertCell(0);
  let nazwa = wiersz.insertCell(1);
  let ilosc = wiersz.insertCell(2);
  let cena = wiersz.insertCell(3);
  let suma = wiersz.insertCell(4);
  let usun = wiersz.insertCell(5);
  let edytuj = wiersz.insertCell(6);
  lp.innerHTML = id + 1;
  nazwa.innerHTML = produkt.nazwa;
  ilosc.innerHTML = produkt.ilosc;
  cena.innerHTML = produkt.cena;
  suma.innerHTML = produkt.suma;
  usun.innerHTML = "<button class='btn btn-danger' onclick='usunProdukt(this)'>Usuń</button>";
  edytuj.innerHTML = "<button class='btn btn-warning'>Edytuj</button>";
};

// funkcja odpowiedzialna za wczytanie produktów z local storage
function wczytajLocalStorage() {
  if (localStorage.paragon) {
    listaProduktow = JSON.parse(localStorage.paragon);
    listaProduktow.forEach((produkt, id) => dodajDoTabeli(id, produkt));
  }
}

// funkcja odpowiedzialna za usuwanie produktów
function usunProdukt(prod) {
  var usuwany = prod.parentNode.parentNode.rowIndex;
  document.getElementById("tabela").deleteRow(usuwany);
  listaProduktow.splice(usuwany - 1, 1);
  localStorage.paragon = JSON.stringify(listaProduktow);
}

