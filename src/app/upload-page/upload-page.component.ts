import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.sass']
})
export class UploadPageComponent implements OnInit {

  loading:boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  updateLoading(value: boolean): void{
    this.loading = value;
  }
}
