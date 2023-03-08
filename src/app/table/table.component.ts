import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  info:any;
  infos:any;

  constructor(private api:ApiService, private http:HttpClient){

  }
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.info = new FormGroup({
      id: new FormControl(""),
      firstname: new FormControl("", Validators.required),
      lastname:new FormControl(''),
      companyname:new FormControl(''),
      adress:new FormControl(''),
      email:new FormControl(''),
      phone:new FormControl(''),
      additionalinformation:new FormControl(''),
    })
    this.api.get("profile").subscribe((result: any) => {
      this.infos = result;
    });
  }

  submit(data: any) {

    if (data.id == "") {

      this.api.post("profile", data).subscribe((result: any) => {
        this.load();
      });
    } else {
      this.api.put("profile", data).subscribe((result: any) => {
        this.load();
      });
    }
  }
}
