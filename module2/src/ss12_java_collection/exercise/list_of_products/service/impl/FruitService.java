package ss12_java_collection.exercise.list_of_products.service.impl;

import ss12_java_collection.exercise.list_of_products.model.Fruit;
import ss12_java_collection.exercise.list_of_products.service.IFruitService;
import ss12_java_collection.exercise.list_of_products.service.PriceComparatorRaise;
import ss12_java_collection.exercise.list_of_products.service.PriceComparatorReduce;

import java.util.*;

public class FruitService implements IFruitService {
    private static Scanner scanner = new Scanner(System.in);
    public static List<Fruit> fruitList = new ArrayList<>();

    public Fruit infoFruit() {
        System.out.println("mời bạn nhập id trái cây");
        String code = scanner.nextLine();
        System.out.println("mời bạn nhập tên trái cây");
        String name = scanner.nextLine();
        System.out.println("mời bạn nhập giá của trái cây");
        double price = Double.parseDouble(scanner.nextLine());
        Fruit fruit = new Fruit(code, name, price);
        return fruit;
    }

    @Override
    public void addFruit() {
        Fruit fruit = this.infoFruit();
        fruitList.add(fruit);
        System.out.println("Thêm mới thành công");
    }

    @Override
    public void editFruit() {
        System.out.println("nhập mã trái cần sửa đổi");
        String code = scanner.nextLine();
        for (int i = 0; i < fruitList.size(); i++) {
            if (fruitList.get(i).getCode().equals(code)) {
                System.out.println("mời bạn nhập tên mới trái cây");
                String name = scanner.nextLine();
                fruitList.get(i).setName(name);
                System.out.println("mời bạn nhập giá mới của trái cây");
                double price = Double.parseDouble(scanner.nextLine());
                fruitList.get(i).setPrice(price);
                System.out.println("sửa đổi thành công");
            }
        }
    }

    @Override
    public void removeFruit() {
        System.out.println("Nhập mã trái cần xóa: ");
        String code = scanner.nextLine();
        boolean flagDelete = false;
        for (int i = 0; i < fruitList.size(); i++) {
            if (fruitList.get(i).getCode().equals(code)) {
                System.out.println("Bạn muốn xóa loại trái cây này không ? Nhập Y: yes, N: no ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    fruitList.remove(i);
                    System.out.println("Xóa thành công!");
                }
                flagDelete = true;
                break;
            }
        }
        if (!flagDelete) {
            System.out.println("Không tìm thấy trái cây cần xóa!");
        }

    }

    @Override
    public void displayFruit() {
        for (Fruit fruit : fruitList) {
            System.out.println(fruit);
        }
    }

    @Override
    public void searchFruit() {
        System.out.println("mời bạn nhập mã trái cây ");
        String code = scanner.nextLine();
        for (int i = 0; i < fruitList.size(); i++) {
            if (fruitList.get(i).getCode().contains(code)) {
                System.out.println(fruitList.get(i));
            }
        }
    }

    @Override
    public void sortFruitRaise() {
        PriceComparatorRaise priceComparatorRaise = new PriceComparatorRaise();
        fruitList.sort(priceComparatorRaise);
        displayFruit();

    }

    @Override
    public void sortFruitReduce() {
        PriceComparatorReduce priceComparatorReduce = new PriceComparatorReduce();
        fruitList.sort(priceComparatorReduce);
        displayFruit();
    }
}


