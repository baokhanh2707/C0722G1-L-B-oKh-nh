import {Component, OnInit} from '@angular/core';
import {DataFormService} from "../service/data-form.service";
import {DataForm} from "../data-form";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page = 0;
  content = '';
  totalElement = 0;
  totalPage = 0;
  dataFormPage: DataForm[] = [];

  constructor(private dataFormService: DataFormService) {
  }

  ngOnInit(): void {
    this.searchByContent(this.content)
  }

  searchByContent(content: string) {
    this.content = content;
    this.dataFormService.searchByContent(this.content, this.page).subscribe(data => {
      this.dataFormPage = data.content;
      this.totalElement = data.totalElements;
      this.totalPage = data.totalPages;
    })
  }
  previousPage() {
    if (this.page == 0) {

    } else {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  nextPage() {
    if (this.page == this.totalPage - 1) {

    } else {
      this.page = this.page + 1;
      this.ngOnInit();
    }
  }
}
