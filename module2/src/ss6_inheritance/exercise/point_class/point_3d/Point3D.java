package ss6_inheritance.exercise.point_class.point_3d;

import ss6_inheritance.exercise.point_class.point_2d.Point2D;

public class Point3D extends Point2D {
    private float z =0.0f;


    public Point3D() {
    }

    public Point3D(float x, float y, float z) {
        super(x, y);
        this.z = z;
    }

    public float getZ() {
        return z;
    }

    public void setZ(float z) {
        this.z = z;
    }
    public void setXYZ(float x,float y,float z){
        setXY(x,y);
        this.z=z;
    }
    public float[] getXYZ(){
        return new float[]{getX(),getY(),this.z};
    }

    @Override
    public String toString() {
        return '"'+"Point3D(" +
                "x=" + getX() + ","+
                "y=" + getY() + ","+
                "z=" + getZ() +")"+'"';
    }
}
