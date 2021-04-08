import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:CarDetail[];
  selectedCar:CarDetail= {
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
  carAddForm:FormGroup;
  carFilterText:string;
  constructor(private carService:CarService,formBuilder:FormBuilder,toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  setSelectedCar(car: CarDetail) {
    this.selectedCar = car;
  }
}
