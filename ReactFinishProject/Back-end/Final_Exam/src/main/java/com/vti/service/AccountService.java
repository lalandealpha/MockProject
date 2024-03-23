package com.vti.service;

import com.vti.entity.Account;
import com.vti.form.account.AccountFilterForm;
import com.vti.form.account.CreatingAccountForm;
import com.vti.form.account.UpdatingAccountForm;
import com.vti.repository.IAccountRepository;
import com.vti.specification.account.AccountSpecification;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AccountService implements IAccountService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm filterForm) {
        Specification<Account> where = AccountSpecification.buildWhere(search, filterForm);
        return accountRepository.findAll(where, pageable);
    }

    @Override
    public Account getAccountById(int id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public Account createAccount(CreatingAccountForm form) {
        // convert form to entity
        TypeMap<CreatingAccountForm, Account> typeMap = modelMapper.getTypeMap(CreatingAccountForm.class, Account.class);
        if(typeMap == null) {
            modelMapper.addMappings(new PropertyMap<CreatingAccountForm, Account>() {
                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }

        Account account = modelMapper.map(form, Account.class);

        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(int id, UpdatingAccountForm form) {
        // convert form to entity
        TypeMap<UpdatingAccountForm, Account> typeMap = modelMapper.getTypeMap(UpdatingAccountForm.class, Account.class);
        if(typeMap == null) {
            modelMapper.addMappings(new PropertyMap<UpdatingAccountForm, Account>() {
                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }

        Account newAccount = modelMapper.map(form, Account.class);
        newAccount.setId(id);

        //Get account's old properties
        Account oldAccount = getAccountById(id);
        newAccount.setPassword(oldAccount.getPassword());
        newAccount.setFullName(oldAccount.getFullName());
        newAccount.setCreateDate(oldAccount.getCreateDate());
        return accountRepository.save(newAccount);
    }

    @Override
    public void deleteAccount(int id) {
        Account account = getAccountById(id);
        accountRepository.delete(account);
    }

    @Override
    public boolean isAccountExistsByUsername(String username) {
        return accountRepository.existsAccountByUsername(username);
    }

    @Override
    public boolean isAccountExistsByEmail(String email) {
        return accountRepository.existsAccountByEmail(email);
    }

    @Override
    public void deleteAccounts(List<Integer> ids) {

        ArrayList<Account> accounts = new ArrayList<Account>();
        for (Integer id: ids) {
            Account account = getAccountById(id);
            accounts.add(account);
        }
        accountRepository.deleteByIds(ids);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);

        if (account == null) {
            // 401
            throw new UsernameNotFoundException(username);
        }

        return new User(
                account.getUsername(),
                account.getPassword(),
                AuthorityUtils.createAuthorityList(account.getRole().toString()));
    }

    @Override
    public Account getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public Account getAccountByEmail(String email) { return accountRepository.findByEmail(email); }

}
