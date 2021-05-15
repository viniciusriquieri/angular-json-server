import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    constructor() { }


    tabChanger = (tabObj: any, tab: string) => {
      for (const key in tabObj){
          if (key !== tab){
              tabObj[key] = false;
          }
          else{
              tabObj[key] = true;
          }
      }
      return;
  }


}
