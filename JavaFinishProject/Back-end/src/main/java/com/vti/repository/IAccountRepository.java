package com.vti.repository;

import com.vti.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IAccountRepository extends JpaRepository<Account, Integer> , JpaSpecificationExecutor<Account> {
    boolean existsAccountByUsername(String username);

    Page<Account> getAccountsByDepartmentIsNull(Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM Account WHERE id IN(:ids)")
    void deleteByIds(@Param("ids") List<Integer> ids);

    Account findByUsername(String username);
}
