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

// funkcja odpowiedzialna za wyświetlenie kosztu zakupów
function sumuj() {
  let sumaCalosci = 0;
  listaProduktow.forEach(produkt => {
    sumaCalosci += produkt.suma;
  });
  document.getElementById("suma").innerHTML = parseFloat(sumaCalosci).toFixed(2);
}
sumuj();

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
  cena.innerHTML = parseFloat(produkt.cena).toFixed(2);
  suma.innerHTML = parseFloat(produkt.suma).toFixed(2);
  usun.innerHTML = "<button class='btn btn-danger' onclick='usunProdukt(this)'>Usuń</button>";
  edytuj.innerHTML = "<button class='btn btn-warning' onclick='edytujProdukt(this)'>Edytuj</button>";
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
  tabela.deleteRow(usuwany);
  listaProduktow.splice(usuwany - 1, 1);
  localStorage.paragon = JSON.stringify(listaProduktow);
  // poprawienie wyświetlania lp
  for (var i = 1; i <= listaProduktow.length; i++)
    tabela.rows[i].cells[0].innerHTML = i;
  sumuj();
}

// funkcja odpowiedzialna za edycję produktów
const formularzEdycji = document.getElementById("formularzEdycji");
function edytujProdukt(prod) {
  document.getElementsByClassName("formularzEdycji")[0].style.visibility = "visible";
  var edytowanyId = prod.parentNode.parentNode.rowIndex - 1;
  var produktEdytowany = listaProduktow[edytowanyId];
  formularzEdycji.nazwa.value = produktEdytowany.nazwa;
  formularzEdycji.ilosc.value = produktEdytowany.ilosc;
  formularzEdycji.cena.value = produktEdytowany.cena;
  formularzEdycji.onsubmit = (event) => {
    produktEdytowany.nazwa = formularzEdycji.nazwa.value;
    produktEdytowany.ilosc = formularzEdycji.ilosc.value;
    produktEdytowany.cena = formularzEdycji.cena.value;
    produktEdytowany.suma = formularzEdycji.ilosc.value * formularzEdycji.cena.value;
    listaProduktow[edytowanyId] = produktEdytowany;
    localStorage.paragon = JSON.stringify(listaProduktow);
  }
}

// funkcja odpowiedzialna za zmianę kolejności produktów
let sortujRosnaco = []
function sortuj(n) {
  /* funkcja sort sortuje od najmniejszej do największej wartości, dlatego
  kiedy użytkownik spróbuje posortować jeszcze raz tablica się odwróci */
  sortujRosnaco[n] == false ? sortujRosnaco[n] = true : sortujRosnaco[n] = false;
  if (n == 0) {
    // sortowanie po lp, odwracamy tablicę
    listaProduktow.reverse();
  }
  if (n == 1) {
    listaProduktow.sort((a, b) => a.nazwa.localeCompare(b.nazwa));
  }
  if (n == 2) {
    listaProduktow.sort((a, b) => a.ilosc - b.ilosc);
  }
  if (n == 3) {
    listaProduktow.sort((a, b) => a.cena - b.cena);
  }
  if (n == 4) {
    listaProduktow.sort((a, b) => a.suma - b.suma);
  }

  if (sortujRosnaco[n] && n != 0)
    listaProduktow.reverse();
  // usuwamy starą tabelę i rysujemy nową
  for (var i = 0; i < listaProduktow.length; i++) {
    tabela.deleteRow(1)
  }
  listaProduktow.forEach((produkt, id) => dodajDoTabeli(id, produkt));
  localStorage.paragon = JSON.stringify(listaProduktow);
}