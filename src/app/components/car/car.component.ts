import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[];
  carImages:CarImage[]=[];
  path = "https://localhost:44322/wwwroot";
  currentCar:Car={ carId:0,carName:"", brandName:"",colorName:"",modelYear:0,dailyPrice:0,description:""};
  currentCarImage:CarImage;
  dataLoaded = false;
  

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else{
        this.getCars();
      }
    })
    
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }
  setCurrentCar(car:Car){
    this.currentCar=car
  }
  getCarImageById(carId:number){
    this.carService.getCarImageByCarId(this.currentCar.carId).subscribe(response=>{
      this.carImages=response.data
      this.dataLoaded = true;
      console.log(this.carImages);
    })
  }
  getCurrentCarImage(carId:number){
    this.carService.getCarImageByCarId(this.currentCar.carId).subscribe(response=>{
      this.currentCarImage=response.data[0]
      this.dataLoaded = true;
    })
  }
  getCurrentSlideClass(carImage:CarImage){
    if (carImage == this.carImages[0]) {
      return "carousel-item active"
    }
    return "carousel-item"
  }
}
