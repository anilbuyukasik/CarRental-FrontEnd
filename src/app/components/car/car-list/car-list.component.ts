import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/car-detail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: CarDetail[];
  selectedCar: CarDetail = {
    carId: 0,
    carName: '',
    brandId: 0,
    colorId: 0,
    brandName: '',
    colorName: '',
    modelYear: 0,
    dailyPrice: 0,
    description: '',
    imagePaths: [],
  };
  carUpdateForm: FormGroup;
  carFilterText: string;
  brands: Brand[];
  colors: Color[];
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.createCarUpdateForm();
    this.getColors();
    this.getBrands();
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  setSelectedCar(car: CarDetail) {
    this.selectedCar = car;
    this.createCarUpdateForm();
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [this.selectedCar.carId, Validators.required],
      carName: [
        this.selectedCar.carName,
        Validators.required,
        Validators.length > 2,
      ],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      dailyPrice: [this.selectedCar.dailyPrice, Validators.required],
      modelYear: [this.selectedCar.modelYear, Validators.required],
      descriptions: [this.selectedCar.description, Validators.required],
    });
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success');
          this.getCars();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Problem'
              );
            }
          }
        }
      );
    }
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
}
