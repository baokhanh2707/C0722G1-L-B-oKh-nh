import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/token/token.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roles: String[]=[];
  checkLogin = false;
  name: string | null | undefined;
  idAccount: string | null | undefined;

  constructor(private tokenService:TokenService,
              private route: Router,
              private toast:ToastrService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName();
      this.roles = this.tokenService.getRole();
      this.idAccount = this.tokenService.getIdAccount();
    }
  }
  logOut(): void {
    window.localStorage.clear();
    this.route.navigateByUrl('/').then(() => {
      location.reload();
    });
    this.toast.info('Đăng xuất thành công', ' Thông báo',{
      timeOut: 3000,
      extendedTimeOut: 1500
    });
  }
}
