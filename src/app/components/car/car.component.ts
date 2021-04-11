import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/car-detail';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/customerDetail';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[];
  carImages: CarImage[] = [];
  path = 'https://localhost:44322/wwwroot';
  currentCar: CarDetail = {
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
  currentCarImage: CarImage;
  dataLoaded = false;
  carFilterText: string;
  customers: CustomerDetail[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByBrandAndColor(params['brandId'], params['colorId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }
  setCurrentCar(car: CarDetail) {
    this.currentCar = car;
  }
  getCarImageById(carId: number) {
    this.carService
      .getCarImageByCarId(this.currentCar.carId)
      .subscribe((response) => {
        this.carImages = response.data;
        this.dataLoaded = true;
        console.log(this.carImages);
      });
      this.toastrService.success("details viewed")
  }
  getCurrentCarImage(carId: number) {
    this.carService
      .getCarImageByCarId(this.currentCar.carId)
      .subscribe((response) => {
        this.currentCarImage = response.data[0];
        this.dataLoaded = true;
      });
  }
  getCurrentSlideClass(carImage: CarImage) {
    if (carImage == this.carImages[0]) {
      return 'carousel-item active';
    }
    return 'carousel-item';
  }
  getDateTime = function () {
    return new Date().toLocaleDateString('%A, %B %e, %Y');
  };
}
