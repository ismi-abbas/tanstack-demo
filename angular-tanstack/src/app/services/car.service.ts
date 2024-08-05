import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars() {
    return this.cars;
  }

  getCar(index: number) {
    return this.cars[index];
  }

  addCar(car: string) {
    this.cars.push(car);
  }

  removeCar(index: number) {
    this.cars.splice(index, 1);
  }
}
