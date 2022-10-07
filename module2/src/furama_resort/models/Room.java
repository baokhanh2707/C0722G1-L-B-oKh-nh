package furama_resort.models;

public class Room extends Facility {
 private String freeServiceIncluded ;

 public Room(String serviceName, String serviceCode, Double usableArea, int rentalCosts, int maximumNumberOfPeople, String rentalType, String freeServiceIncluded) {
  super(serviceName, serviceCode, usableArea, rentalCosts, maximumNumberOfPeople, rentalType);
  this.freeServiceIncluded = freeServiceIncluded;
 }

 public Room(String freeServiceIncluded) {
  this.freeServiceIncluded = freeServiceIncluded;
 }

 public Room() {
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
