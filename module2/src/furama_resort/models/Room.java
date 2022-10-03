package furama_resort.models;

public class Room extends Facility {
 private String freeServiceIncluded ;

 public Room(String serviceName, double usableArea, double rentalCosts, int maximumNumberOfPeople, int rentalType, String freeServiceIncluded) {
  super(serviceName, usableArea, rentalCosts, maximumNumberOfPeople, rentalType);
  this.freeServiceIncluded = freeServiceIncluded;
 }

 public String getFreeServiceIncluded() {
  return freeServiceIncluded;
 }

 public void setFreeServiceIncluded(String freeServiceIncluded) {
  this.freeServiceIncluded = freeServiceIncluded;
 }

 @Override
 public String toString() {
  return "Room{" +
          "freeServiceIncluded='" + freeServiceIncluded + '\'' +
          '}'+super.toString();
 }
}
