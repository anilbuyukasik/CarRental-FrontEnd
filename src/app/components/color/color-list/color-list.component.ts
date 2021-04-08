import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors:Color[];
  selectedColor:Color={colorId:0,colorName:""};
  colorUpdateForm:FormGroup;
  colorFilterText:string;
  constructor(private colorService:ColorService,private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorUpdateForm();
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    });
  }
  setSelectedColor(color:Color){
    this.selectedColor = color;
    this.createColorUpdateForm();
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[this.selectedColor.colorId,Validators.required],
      colorName:[this.selectedColor.colorName,Validators.required]
    })
  }
  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      this.colorService.update(colorModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
    }else{
      this.toastrService.error("Form is invalid")
    }
  }
}
