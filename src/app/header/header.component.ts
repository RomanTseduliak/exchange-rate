import { Component } from '@angular/core';
import { AppService } from 'src/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  data: any;
  result: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getData().subscribe(
      (response) => {
        this.data = response;
        this.getFilteredItems(this.data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  getFilteredItems(data: any[]) {
    this.result = data.filter((data) => data.cc === 'USD' || data.cc === 'EUR');
  }
}
