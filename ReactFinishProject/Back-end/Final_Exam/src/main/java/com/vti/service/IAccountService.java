package com.vti.service;

import com.vti.entity.Account;
import com.vti.form.account.AccountFilterForm;
import com.vti.form.account.CreatingAccountForm;
import com.vti.form.account.UpdatingAccountForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IAccountService extends UserDetailsService {
    Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm filterForm);

    Account getAccountById(int id);

    Account createAccount(CreatingAccountForm form);

    Account updateAccount(int id, UpdatingAccountForm form);

    void deleteAccount(int id);

    boolean isAccountExistsByUsername(String username);

    void deleteAccounts(List<Integer> ids);

    Account getAccountByUsername(String username);

    Account getAccountByEmail(String email);

    boolean isAccountExistsByEmail(String email);
}
