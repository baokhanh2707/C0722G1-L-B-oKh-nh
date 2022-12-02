package com.container.dto;

import java.util.HashMap;
import java.util.Map;

public class CartDto {
    private Map<ProductDto, Integer> productMap = new HashMap<>();

    public CartDto() {
    }

    public Map<ProductDto, Integer> getProductMap() {
        return productMap;
    }

    public void setProductMap(Map<ProductDto, Integer> productMap) {
        this.productMap = productMap;
    }

    public void addProduct(ProductDto productDto) {
        if (productMap.containsKey(productDto)) {
            Integer currentValue = productMap.get(productDto);
            productMap.replace(productDto, currentValue + 1);
        } else {
            productMap.put(productDto, 1);
        }
    }

    public int countTotalPayment() {
        int payment = 0;
        for (Map.Entry<ProductDto, Integer> entry : productMap.entrySet()) {
            payment += entry.getKey().getPrice() * (double) entry.getValue();
        }
        return payment;
    }

    public void decreaseProduct(ProductDto productDto) {
        if (productMap.containsKey(productDto)) {
            Integer currentValue = productMap.get(productDto);
            if (currentValue > 1) {
                productMap.replace(productDto, currentValue - 1);
            } else {
                productMap.remove(productDto);
            }
        }
    }

    public void payCart() {
        productMap.clear();
    }
}
