import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-test-cn',
  templateUrl: './test-cn.component.html',
  styleUrls: ['./test-cn.component.css']
})

export class TestCNComponent implements OnInit {

  public results: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/assets/data/data-login.json').subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.results = data;
    });
  }

}
