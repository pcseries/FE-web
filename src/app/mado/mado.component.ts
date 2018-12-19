import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-mado',
  templateUrl: './mado.component.html',
  styleUrls: ['./mado.component.css']
})
export class MADOComponent implements OnInit {


  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
