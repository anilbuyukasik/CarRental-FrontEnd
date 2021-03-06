import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  brands: Brand[];
  selectedBrand: number = 0;
  allBrands: number = 0;
  brandFilterText: string;

  colors: Color[];
  selectedColor: number = 0;
  allColors: number = 0;
  colorFilterText: string;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  allBrandsSelected() {
    return this.selectedBrand == 0 ? true : false;
  }
  allColorsSelected() {
    return this.selectedColor == 0 ? true : false;
  }

  selectCurrentBrand(event: any) {
    //update the ui
    this.selectedBrand = event.target.value;
    console.log(this.selectedBrand);
  }
  selectCurrentColor(event: any) {
    //update the ui
    this.selectedColor = event.target.value;
    console.log(this.selectedColor);
  }
  setFilter(){
    if(this.selectedBrand != 0 && this.selectedColor != 0){
      this.router.navigate([
        'cars/brand/'+this.selectedBrand+'/color/'+this.selectedColor
      ]);
    }
    else if(this.selectedBrand != 0 && this.selectedColor == 0){
      this.router.navigate(['cars/brand/'+this.selectedBrand]);
    }
    else if(this.selectedBrand == 0 && this.selectedColor != 0){
      this.router.navigate(['cars/color/'+this.selectedColor]);
    }
    else{
      this.router.navigate(['cars/']);
    }
  }
  clearFilter(){
    this.router.navigate(['cars/']);
  }
}
