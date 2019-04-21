import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-pet',
  templateUrl: './history-pet.component.html',
  styleUrls: ['./history-pet.component.css']
})
export class HistoryPetComponent implements OnInit {

  option: any;
  radio: any;
  constructor() { }

  ngOnInit() {
    this.option = 'option1';
    this.radio = 'MALE';
  }

}
