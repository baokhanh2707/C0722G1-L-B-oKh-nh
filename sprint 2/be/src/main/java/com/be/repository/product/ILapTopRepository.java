package com.be.repository.product;

import com.be.model.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ILapTopRepository extends JpaRepository<Laptop, Long> {
    @Query(value = "select * from laptop where flag_delete=false"
            , nativeQuery = true)
    Page<Laptop> getAllLaptop(Pageable pageable);
}
