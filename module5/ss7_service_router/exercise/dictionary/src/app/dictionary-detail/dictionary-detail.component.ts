import {Component, OnInit} from '@angular/core';
import {DictionaryServiceService} from '../service/dictionary-service.service';
import {ActivatedRoute} from '@angular/router';
import {Dictionary} from '../dictionary-page/dictionary';


@Component({
  selector: 'app-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.css']
})
export class DictionaryDetailComponent implements OnInit {
  dictionaries?: Dictionary | null;

  constructor(private dictionaryService: DictionaryServiceService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        // tslint:disable-next-line:radix
        this.dictionaries = this.dictionaryService.findById(parseInt(id));
      }
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
  }

}
