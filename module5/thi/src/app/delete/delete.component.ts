import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoHang} from '../lo-hang';
import {ThiService} from '../list/thi.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input()
  loHang: LoHang | undefined = {};
  @Output()
  eventDelete = new EventEmitter();

  constructor(private thiService: ThiService) {
  }

  ngOnInit(): void {
  }

  delete(): any {
    if (this.loHang !== undefined) {
      const id = this.loHang.id;
      this.thiService.delete(id).subscribe(data => {
        document.getElementById('exampleModal')?.click();
        this.eventDelete.emit();
        alert('xóa thành công');
      });
    }
  }
}
