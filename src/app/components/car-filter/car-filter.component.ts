import { Component, OnInit } from '@angular/core';
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
  selectedBrand:number;
  brandFilterText:string;

  colors:Color[];
  selectedColor:number=1;
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
  getSelectedBrand(brandId: Number) {
    if (this.selectedBrand == brandId) {
      return "selected";
    }
    else {
      return "";
    }
  }

  getSelectedColor(colorId: Number) {
    if (this.selectedColor == colorId) {
      return "selected";
    }
    else {
      return "";
    }
  }

}
