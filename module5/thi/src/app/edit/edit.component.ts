import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SanPham} from '../san-pham';
import {ThiService} from '../list/thi.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formEdit: FormGroup;
  tenSanPham: SanPham[] = [];

  constructor(private thiService: ThiService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.formEdit = new FormGroup({
      id: new FormControl(''),
      maLoHang: new FormControl('', [Validators.required, Validators.pattern('LH-[0-9]{4}')]),
      tenSanpham: new FormControl('', [Validators.required]),
      soLuong: new FormControl('', [Validators.required, Validators.min(0)]),
      ngayNhapHang: new FormControl('', [Validators.required]),
      ngaySanXuat: new FormControl('', [Validators.required]),
      ngayHetHan: new FormControl('', [Validators.required]),
    });
    this.thiService.getSanPham().subscribe(data => {
      this.tenSanPham = data;
    });
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.getLoHang(+id);
      }
    });
  }

  get maLoHang(): any {
    return this.formEdit.get('maLoHang');
  }

  get tenSanpham(): any {
    return this.formEdit.get('tenSanpham');
  }

  get soLuong(): any {
    return this.formEdit.get('soLuong');
  }

  get ngayNhapHang(): any {
    return this.formEdit.get('ngayNhapHang');
  }

  get ngaySanXuat(): any {
    return this.formEdit.get('ngaySanXuat');
  }

  get ngayHetHan(): any {
    return this.formEdit.get('ngayHetHan');
  }

  ngOnInit(): void {
  }

  private getLoHang(id: number): void {
    this.thiService.findById(id).subscribe(data => {
      this.formEdit.patchValue(data);
    });
  }

  edit(): void {
    this.thiService.edit(this.formEdit.value).subscribe(data => {
      console.log( data);
      alert('sửa thành công');
      this.route.navigateByUrl('');
    });
  }
}
