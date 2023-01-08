import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SanPham} from '../san-pham';
import {ThiService} from '../list/thi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formLohang: FormGroup;
  sanPhams: SanPham[] = [];


  constructor(private thiService: ThiService, private route: Router) {
    this.formLohang = new FormGroup({
      maLoHang: new FormControl('', [Validators.required, Validators.pattern('LH-[0-9]{4}')]),
      tenSanpham: new FormControl('', [Validators.required]),
      soLuong: new FormControl('', [Validators.required, Validators.min(0)]),
      ngayNhapHang: new FormControl('', [Validators.required]),
      ngaySanXuat: new FormControl('', [Validators.required]),
      ngayHetHan: new FormControl('', [Validators.required]),

    });
    this.thiService.getSanPham().subscribe(data => {
      this.sanPhams = data;
    });
  }

  get maLoHang(): any {
    return this.formLohang.get('maLoHang');
  }

  get tenSanpham(): any {
    return this.formLohang.get('tenSanpham');
  }

  get soLuong(): any {
    return this.formLohang.get('soLuong');
  }

  get ngayNhapHang(): any {
    return this.formLohang.get('ngayNhapHang');
  }

  get ngaySanXuat(): any {
    return this.formLohang.get('ngaySanXuat');
  }

  get ngayHetHan(): any {
    return this.formLohang.get('ngayHetHan');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.thiService.save(this.formLohang.value).subscribe(data => {
      alert('Thêm Thành công');
      this.route.navigateByUrl('');
    });
  }
}
