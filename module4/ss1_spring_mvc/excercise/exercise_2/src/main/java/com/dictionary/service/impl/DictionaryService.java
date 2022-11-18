package com.dictionary.service.impl;

import com.dictionary.service.IDictionaryService;
import org.springframework.stereotype.Service;

@Service
public class DictionaryService implements IDictionaryService {
    @Override


    public String tiengViet(String tiengAnh) {
        String result="";
        switch (tiengAnh) {
            case "one":
                result = "một";
                break;
            case "two":
                result = "hai";
                break;
            case "three":
                result = "ba";
                break;
            default:
                result = "Không tìm thấy";
        }
        return result;
    }
}
