import { Injectable } from '@angular/core';
import { ConfigModel } from '../Models/config.model';
import { ConfigService } from '../Services/config.service';

@Injectable()

export class Config{

  public Configuration:ConfigModel;

  constructor(public configService:ConfigService){
    this.Configuration = new ConfigModel(configService.getStringB64());
  }

  getUrlServices(){
    return this.configService.base64ToString(this.Configuration.servicesUrl);
  }

}
