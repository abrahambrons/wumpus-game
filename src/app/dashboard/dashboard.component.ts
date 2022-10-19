import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hide_menu:boolean = false;
  parent_data!:Config;
  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmit(f:NgForm){
    if(f.valid){
      this.parent_data = f.value;
      this.hide_menu = true;
    }
  }
}
