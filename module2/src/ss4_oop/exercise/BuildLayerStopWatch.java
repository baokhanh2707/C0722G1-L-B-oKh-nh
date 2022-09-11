package ss4_oop.exercise;

public class BuildLayerStopWatch {
    private long starTime;
    private long endTime;


    public void  star() {
        this.starTime = System.currentTimeMillis();
    }

    public void  stop() {
        this.endTime = System.currentTimeMillis();
    }
    public long  getElapsedTime(){
        return endTime-starTime;
    }

    public static void main(String[] args) {
        BuildLayerStopWatch buildLayerStopWatch  = new BuildLayerStopWatch();
        buildLayerStopWatch.star();
        for (int i = 0; i < 1000000000; i++) {
            for (int j = 0; j < 1000000000; j++) {

            }
        }
        buildLayerStopWatch.stop();

        System.out.println(buildLayerStopWatch.getElapsedTime()+" milliseconds");

    }
}

