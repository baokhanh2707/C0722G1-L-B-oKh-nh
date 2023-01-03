import {Component, OnInit} from '@angular/core';
import {Img} from '../img';

@Component({
  selector: 'app-img-slide',
  templateUrl: './img-slide.component.html',
  styleUrls: ['./img-slide.component.css']
})
export class ImgSlideComponent implements OnInit {
  n = 0;
  img?: Img[] = [{
    id: 1,
    link: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf756791ff8b8c407/60dec10dcc810807a32d9b94/fe1a7a39fa9940a8ac4ab404780fff0b355c126e.jpg?auto=webp&format=jpg&quality=60&w=1280'
  },
    {
      id: 2,
      link: 'https://znews-photo.zingcdn.me/w660/Uploaded/dqmblcvo/2022_07_04/real_madrid_5.jpg'
    },
    {id: 3, link: 'https://vtv1.mediacdn.vn/zoom/700_438/2019/1/14/real-madrid--15474231631551617097803.jpg'},
    {
      id: 4,
      link: 'https://i.pinimg.com/originals/12/84/08/1284085ae102c18701c35d329d44f820.jpg'
    }];
  size: number | undefined  = this.img?.length;

  constructor() {
  }

  ngOnInit(): void {
  }

  previous(): void {
    if (this.n < this.size - 1) {
      this.n = this.n + 1;
    }
  }

  back(): void {
    if (this.n > 0) {
      this.n = this.n - 1;
    }
  }

}
