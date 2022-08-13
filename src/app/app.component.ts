import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title:string = 'Library Meta Analysis';
  loading:boolean = false;

  updateLoading(value: boolean): void{
    this.loading = value;
  }

}


