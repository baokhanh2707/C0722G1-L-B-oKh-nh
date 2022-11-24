package com.products.reponsitory.impl;

import com.products.model.Products;
import com.products.reponsitory.IProductsRepository;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProductsRepository implements IProductsRepository {
    private static final Map<Integer, Products> productsList;

    static {
        productsList = new HashMap<>();
        productsList.put(1, new Products(1, "cam", 3000, "cam sành", "mỹ"));
        productsList.put(2, new Products(2, "ổi", 3000, "ổi non ", "hàn"));
        productsList.put(3, new Products(3, "xoài", 3000, "xoài chín", "trung"));
    }

    @Override
    public List<Products> findAll() {
        Session session = null;
        List<Products> productsList = null;
        try {
            session = ConnectionUtil.sessionFactory.openSession();
            productsList = session.createQuery("FROM Products ").getResultList();
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return productsList;
    }

    @Override
    public void add(Products products) {
        Session session = null;
        Transaction transaction = null;
        try {
            session = ConnectionUtil.sessionFactory.openSession();
            transaction = session.beginTransaction();
            session.save(products);
            transaction.commit();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public void update(Products products) {
        Session session = null;
        Transaction transaction = null;
        try {
            session = ConnectionUtil.sessionFactory.openSession();
            transaction = session.beginTransaction();
            session.merge(products);
            transaction.commit();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public Products findById(int idProducts) {
        Session session = null;
        Products products = null;
        try {
            session = ConnectionUtil.sessionFactory.openSession();
            products = (Products) session.createQuery("from Products p where id = : id").setParameter("id", idProducts).getSingleResult();
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return products;
    }


    @Override
    public void delete(Products products) {
        Session session = null;
        Transaction transaction = null;
        try {
            session = ConnectionUtil.sessionFactory.openSession();
            transaction = session.beginTransaction();
            session.delete(products);
            transaction.commit();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public List<Products> search(String nameProducts) {
        Session session = null;
        List<Products> productsList = null;
        try {
            session = ConnectionUtil.sessionFactory.openSession();
            productsList = session.createQuery("from Products p where name  like :names ").setParameter("names", "%" + nameProducts + "%").getResultList();

        } finally {
            if (session != null) {
                session.close();
            }
        }
        return productsList;
    }
}