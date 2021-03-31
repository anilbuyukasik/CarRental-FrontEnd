import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[];
  selectedBrand:Brand;
  allBrands:Brand={brandId:0,brandName:""};
  brandFilterText:string;


  colors:Color[];
  selectedColor:Color;
  allColors:Color
  colorFilterText:string;

  constructor(private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    });
  }
  setCurrentBrand(brand:Brand){
      this.selectedBrand=brand;
      console.log(brand.brandId)
   
  }
  setCurrentColor(color:Color){
      this.selectedColor = color;
   
  }
  allBrandsSelected(){
    return this.selectedBrand == undefined ? true:false;
  }
  allColorsSelected(){
    return this.selectedColor == undefined ? true:false;
  }
  // currentBrandId(event: any) {
  //   this.brandId=event;
  // }

  // currentColorId(event: any) {
  //   this.colorId=event;
  // }

  getSelectedBrand(brand: Brand) {
    if (this.selectedBrand == brand) {
      return "selected";
      console.log(brand.brandId)
    }
    else {
      return "";
    }
  }

  getSelectedColor(color: Color) {
    if (this.selectedColor == color) {
      return "selected";
    }
    else {
      return "";
    }
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedBrand = event.target.value;
    console.log(this.selectedBrand);
}
}
