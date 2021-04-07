import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[];
  selectedBrand:Brand={brandId:0,brandName:""};
  brandUpdateForm:FormGroup;
  brandFilterText:string;
  constructor(private brandService:BrandService,private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandUpdateForm();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  // getById(brandId:number){
  //   this.brandService.getById(brandId).subscribe((response)=>{
  //     this.brands = response.data
  //   })
  // }
  setSelectedBrand(brand:Brand){
    this.selectedBrand=brand;
    this.createBrandUpdateForm();
  }
  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:[this.selectedBrand.brandId,Validators.required],
      brandName:[this.selectedBrand.brandName,Validators.required]
    })
  }
  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value) 
      this.brandService.update(brandModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      
    }else{
      this.toastrService.error("Form is invalid")
    }
  }
  
}
