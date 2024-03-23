package com.vti.service;

import com.vti.entity.Account;
import com.vti.entity.Department;
import com.vti.form.account.AccountFilterForm;
import com.vti.form.account.CreatingAccountForm;
import com.vti.form.account.UpdatingAccountForm;
import com.vti.repository.IAccountRepository;
import com.vti.repository.IDepartmentRepository;
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

import java.util.List;

@Service
@Transactional
public class AccountService implements IAccountService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAccountRepository repository;

    @Autowired
    private IDepartmentRepository departmentRepository;

    @Override
    public Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm filterForm) {
        Specification<Account> where = AccountSpecification.buildWhere(search, filterForm);
        return repository.findAll(where, pageable);
    }

    @Override
    public Page<Account> getAccountsByDepartmentIsNull(Pageable pageable) {
        return repository.getAccountsByDepartmentIsNull(pageable);
    }

    @Override
    public Account getAccountById(int id) {
        return repository.findById(id).get();
    }

    @Override
    public void createAccount(CreatingAccountForm form) {
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

        Department department = departmentRepository.getById(form.getDepartmentId());
        account.setDepartment(department);

        repository.save(account);
    }

    @Override
    public void updateAccount(int id, UpdatingAccountForm form) {
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

        Department department = departmentRepository.getById(form.getDepartmentId());
        newAccount.setDepartment(department);

        //Get account's old properties
        Account oldAccount = getAccountById(id);
        newAccount.setUsername(oldAccount.getUsername());
        newAccount.setFirstName((oldAccount.getFirstName()));
        newAccount.setLastName(oldAccount.getLastName());
        newAccount.setPassword(oldAccount.getPassword());

        repository.save(newAccount);
    }

    @Override
    public void deleteAccount(int id) {
        Account account = getAccountById(id);
        repository.delete(account);
    }

    @Override
    public boolean isAccountExistsByUsername(String username) {
        return repository.existsAccountByUsername(username);
    }

    @Override
    public void deleteAccounts(List<Integer> ids) {
        repository.deleteByIds(ids);
    }

    @Override
    public Account getAccountByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = repository.findByUsername(username);

        if (account == null) {
            // 401
            throw new UsernameNotFoundException(username);
        }

        return new User(
                account.getUsername(),
                account.getPassword(),
                AuthorityUtils.createAuthorityList(account.getRole().toString()));
    }
}
