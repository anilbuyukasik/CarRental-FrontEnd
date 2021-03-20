import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[];
  currenColor:Color;
  dataLoaded = false;

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
      this.dataLoaded = true;
    });
  }
  setCurrentColor(color:Color){
    this.currenColor=color;
  }
  getCurrentColorClass(color:Color){
    if(color == this.currenColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  getAllColorClass(){
    if(!this.currenColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
