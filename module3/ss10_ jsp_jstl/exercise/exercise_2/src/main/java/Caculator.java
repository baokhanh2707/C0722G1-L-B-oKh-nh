
public class Caculator {


    public static float calculate(float firstOperand, float secondOperand, char operator ){
        switch (operator){
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                if(secondOperand != 0)
                    return firstOperand / secondOperand;
                else
                    throw new RuntimeException("Không thể  chia  cho 0");
            default:
                throw new RuntimeException("Không hợp lệ");
        }
    }
}
