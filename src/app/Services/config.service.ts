import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  CryptoJS = require("crypto-js");

  base64ToString(cadena : any)
  {
    var words = this.CryptoJS.enc.Base64.parse(cadena);
    var decode = this.CryptoJS.enc.Utf8.stringify(words)

    return decode;
  }

  getStringB64(): string{
    return 'aHR0cHM6Ly9sb2NhbGhvc3Q6ODA4MQ=='
  }

}
