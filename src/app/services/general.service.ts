import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  // Formatea un ID con formato 001, 010, 100, siempre con 3 dígitos sea cual sea el ID
  public formatId(id: number): string {

    var idFormatted: string = "";

    if (id < 10) {
      idFormatted = "00" + id.toString();
    } else if (id >= 10 && id < 100) {
      idFormatted = "0" + id.toString();
    } else {
      idFormatted = id.toString();
    }
    return idFormatted;
  }
}
