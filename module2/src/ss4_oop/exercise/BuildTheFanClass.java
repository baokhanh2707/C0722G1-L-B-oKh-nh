package ss4_oop.exercise;

public class BuildTheFanClass {
    final int SLOW = 1;
    final int MEDIUM = 2;
    final int FAST = 3;
    private int speed = SLOW;
    private boolean on = false;
    private double radius = 5;
    private String color = "blue";

    public BuildTheFanClass() {
    }

    public BuildTheFanClass(int speed, boolean on, double radius, String color) {
        this.speed = speed;
        this.radius = radius;
        this.on = on;
        this.color = color;
    }

    public int getSLOW() {
        return SLOW;
    }

    public int getSpeed() {
        return speed;
    }

    public boolean geton() {
        return on;
    }

    public double getRadius() {
        return radius;
    }

    public String getColor() {
        return color;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public void setOn(boolean on) {
        this.on = on;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "BuildTheFanClass{" +
                "speed=" + speed +
                ", on=" + on +
                ", radius=" + radius +
                ", color='" + color + '\'' +
                '}';
    }

    public static void main(String[] args) {
        BuildTheFanClass fan0=new BuildTheFanClass();
        System.out.println(fan0);
        BuildTheFanClass fan1=new BuildTheFanClass(3,true,10,"yellow");
        System.out.println(fan1);
        BuildTheFanClass fan2=new BuildTheFanClass(2,false,5,"blue");
        System.out.println(fan2);

    }
}


