import { Car } from "./car";
import { CarImage } from "./carImage";

export interface CarDetail extends Car{
    colorName:string;
    brandName:string;
    imagePaths:CarImage[];
}