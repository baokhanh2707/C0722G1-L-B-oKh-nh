import {Component, OnInit} from '@angular/core';
import {Dictionary} from './dictionary';
import {DictionaryServiceService} from '../service/dictionary-service.service';

@Component({
  selector: 'app-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.css']
})
export class DictionaryPageComponent implements OnInit {
  dictionary: Dictionary[] = [];

  constructor(private dictionaryService: DictionaryServiceService) {
    this.dictionary = this.dictionaryService.getAll();
  }

  ngOnInit(): void {
  }

}
