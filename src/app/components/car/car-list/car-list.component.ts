import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/car-detail';
import { CarImage } from 'src/app/models/carImage';
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
  uploadImageForm:FormGroup;
  carFilterText: string;
  brands: Brand[];
  colors: Color[];
  carImages: CarImage[] = [];
  currentCarImage:CarImage;
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
      carName: [this.selectedCar.carName,Validators.required],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      dailyPrice: [this.selectedCar.dailyPrice, Validators.required],
      modelYear: [this.selectedCar.modelYear, Validators.required],
      description: [this.selectedCar.description, Validators.required],
    });
  }
  update() {
    console.log("update")
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe((response) => {
          this.toastrService.success(response.message, 'Success');
          this.getCars();
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Problem'
              );
            }
          }
        }
      );
    }else{
      this.toastrService.error("Form is invalid")
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
  getCarImageById(carId: number) {
    this.carService
      .getCarImageByCarId(this.selectedCar.carId)
      .subscribe((response) => {
        this.carImages = response.data;
        console.log(this.carImages);
      });
      this.toastrService.success("details viewed")
  }
}
