// wyswietlanie naglowka z data
let naglowek = document.createElement('h2');
naglowek.style.textAlign = "center"; 
var d = new Date(); 
var aktualnaData = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");;
naglowek.textContent = "Paragon z dnia " + aktualnaData; 
document.body.prepend(naglowek);
 
let listaProduktow=[]

const tablica=document.getElementById("tabela")
var id; 

const dodajWiersz=(id, produkt)=>
{
let wiersz=tablica.insertRow()
row.class="produkt"
let index=wiersz.insertCell(0)
let nazwa=wiersz.insertCell(1)
let ilosc=wiersz.insertCell(2)
let suma=wiersz.insertCell(3)


index.id="id"
nazwa.innerHTML=produkt.nazwa
ilosc.innerHTML=produkt.ilosc
suma.innerHTML=Math.round(produkt.ilosc*produkt.cena)
}


class Produkt {
  constructor(nazwa,ilosc,cena) {
    this.nazwa = nazwa;
    this.ilosc = ilosc;
    this.cena = cena;
  }
  suma() {
    return this.ilosc * this.cena;
  }
}
class Paragon{
    constructor()
    {
        this.tab=[]
    }


}
dodajProdukt( produkt)
{
    const 
    this.tab.push(produkt)

}
usunProdukt(id)
{
    this.array.slice(id, 1)
}
edytujProdukt(produkt)
{
    
}


let ar = []; 
