package ss8_clean_code.exercise;

public class Refactoring {
    public static final String LOVE = "Love";
    public static final String FIFTEEN = "Fifteen";
    public static final String THIRTY = "Thirty";
    public static final String FORTY = "Forty";

    public static String getScore(String player1Name, String player2Name, int score1, int score2) {
        StringBuilder score = new StringBuilder();
        int tempScore;
        if (score1 == score2) {
            switch (score1) {
                case 0:
                    score = new StringBuilder("LoveAll");
                    break;
                case 1:
                    score = new StringBuilder("FifteenAll");
                    break;
                case 2:
                    score = new StringBuilder("ThirtyAll");
                    break;
                case 3:
                    score = new StringBuilder("FortyAll");
                    break;
                default:
                    score = new StringBuilder("Deuce");
                    break;

            }
        } else if (score1 >= 4 || score2 >= 4) {
            int minusResult = score1 - score2;
            if (minusResult == 1) score = new StringBuilder("Advantage player1");
            else if (minusResult == -1) score = new StringBuilder("Advantage player2");
            else if (minusResult >= 2) score = new StringBuilder("Win for player1");
            else score = new StringBuilder("Win for player2");
        } else {
            for (int i = 1; i < 3; i++) {
                if (i == 1) tempScore = score1;
                else {
                    score.append("-");
                    tempScore = score2;
                }
                switch (tempScore) {
                    case 0:
                        score.append(LOVE);
                        break;
                    case 1:
                        score.append(FIFTEEN);
                        break;
                    case 2:
                        score.append(THIRTY);

                        break;
                    case 3:
                        score.append(FORTY);
                        break;
                }
            }
        }
        return score.toString();
    }
}
