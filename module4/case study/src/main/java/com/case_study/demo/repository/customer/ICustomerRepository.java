package com.case_study.demo.repository.customer;

import com.case_study.demo.model.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ICustomerRepository extends JpaRepository<Customer,Integer> {
//    @Query(value = "select * from customer c where c.name like concat('%',:name,'%')",
//            countQuery ="select * from customer c where c.name like concat('%',:name,'%')"
//            ,nativeQuery = true)
//    Page<Customer> searchByName(@Param("name") String name, Pageable pageable);

    @Query(value = "select * from customer as c where (c.flag_delete = false ) and (c.name like concat('%',:name,'%') and c.email like concat('%',:email,'%') " +
            "and c.customer_type_id like concat ('%',:customerTypeId,'%') )"
            , countQuery = "select * from customer as c where (c.flag_delete = false ) and (c.name like concat('%',:name,'%') and c.email like concat('%',:email,'%') " +
            "and c.customer_type_id like concat ('%',:customerTypeId,'%') )"
            , nativeQuery = true)
    Page<Customer> searchByName(@Param("name") String name, @Param("email") String email, @Param("customerTypeId") String customerTypeId, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update customer c set c.flag_delete = true where c.id = :id", nativeQuery = true)
    void delete(@Param("id") Integer id);
}
