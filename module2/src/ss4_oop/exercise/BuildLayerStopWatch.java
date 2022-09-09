package ss4_oop.exercise;

public class BuildLayerStopWatch {
    private long starTime;
    private long endTime;


    public void getStarTime() {
        this.starTime = System.currentTimeMillis();
    }

    public void getEndTime() {
        this.endTime = System.currentTimeMillis();
    }
    public long  getElapsedTime(){
        return endTime-starTime;
    }

    public static void main(String[] args) {
        BuildLayerStopWatch buildLayerStopWatch  = new BuildLayerStopWatch();
        buildLayerStopWatch.getStarTime();
        for (int i = 0; i < 1000000000; i++) {
            for (int j = 0; j < 1000000000; j++) {

            }
        }
        buildLayerStopWatch.getEndTime();

        System.out.println(buildLayerStopWatch.getElapsedTime()+" milliseconds");

    }
}

