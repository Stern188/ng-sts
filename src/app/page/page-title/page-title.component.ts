import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() title:string;
  @Input() subtitle:string;
  constructor() { }

  ngOnInit() {
  }

}
