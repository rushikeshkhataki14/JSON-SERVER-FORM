import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formdata:any;
  infos:any;

   constructor(private api:ApiService){

   }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      id: new FormControl(""),
      yourname: new FormControl("", Validators.required),
      youremail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),


    })
    this.api.get("users").subscribe((result: any) => {
      this.infos = result;
    });
  }

  save(data: any) {

    if (data.id == "") {
      // data.id = Date().toString();
      this.api.post("users", data).subscribe((result: any) => {
        this.load();
      });
    } else {
      this.api.put("users", data).subscribe((result: any) => {
        this.load();
      });
    }
  }

  edit(data: any) {
    this.formdata = new FormGroup({
      id: new FormControl(data.id),
      yourname: new FormControl(data.yourname, Validators.required),
      youremail: new FormControl(data.youremail, Validators.required),
      password: new FormControl(data.password, Validators.required)
    });
  }

  delete(data:any) {
    if(confirm("Sure to delete?")){
      this.api.delete("users", data).subscribe((result: any) => {
        this.load();
      });
    }
  }
}










