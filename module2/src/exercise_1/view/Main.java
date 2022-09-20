package exercise_1.view;

import exercise_1.controller.CarController;
import exercise_1.controller.MotorcycleController;
import exercise_1.controller.TruckController;
import exercise_1.model.Car;
import exercise_1.model.Motorcycle;

public class Main {

    public static void main(String[] args) {
        TruckController truckController =new TruckController();
       truckController.menuTruck();
    }
}
