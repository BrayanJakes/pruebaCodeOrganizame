import { Component, Input, OnInit } from '@angular/core';
import { Computadora, Vehiculo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-data-info',
  templateUrl: './data-info.component.html',
  styleUrls: ['./data-info.component.scss']
})
export class DataInfoComponent implements OnInit {

  @Input() data: any = {};
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
