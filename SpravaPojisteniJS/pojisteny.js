class Pojisteny {
    constructor(jmeno, prijmeni, vek, telefon, druh) {
      this.id = Date.now(); 
      this.jmeno = jmeno;
      this.prijmeni = prijmeni;
      this.vek = vek;
      this.telefon = telefon;
      this.druh = druh;
    }
  
    toString() {
      return `${this.jmeno} ${this.prijmeni}, věk: ${this.vek}, tel: ${this.telefon}, pojištění: ${this.druh}`;
    }
  }