import { Injectable } from '@angular/core';
import {Dictionary} from '../dictionary-page/dictionary';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DictionaryServiceService {
dictionary: Dictionary[] = [
  {id: 1 , word: 'hello' , mean: 'xin chào'},
  {id: 2 , word: 'you' , mean: 'bạn'},
  {id: 3 , word: 'me' , mean: 'tôi'},
];
  constructor() { }

  // tslint:disable-next-line:typedef
  getAll() {
    return this.dictionary;
  }

  // tslint:disable-next-line:variable-name
  findById(number: number): Dictionary | null {
    // tslint:disable-next-line:no-shadowed-variable
    const temp = this.dictionary.filter( element => element.id === number);
    // tslint:disable-next-line:triple-equals
    if (temp.length == 0 ){
      return null;
    }
    return temp[0];
  }
}
