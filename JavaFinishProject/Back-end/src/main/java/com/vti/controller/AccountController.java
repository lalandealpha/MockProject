package com.vti.controller;

import com.vti.dto.AccountDTO;
import com.vti.entity.Account;
import com.vti.form.account.AccountFilterForm;
import com.vti.form.account.CreatingAccountForm;
import com.vti.form.account.UpdatingAccountForm;
import com.vti.service.IAccountService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/accounts")
public class AccountController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAccountService service;

    @GetMapping
    public Page<AccountDTO> getAllAccounts(
            Pageable pageable,
            @RequestParam(value = "search", required = false) String search,
            AccountFilterForm filterForm) {
        Page<Account> entityPages = service.getAllAccounts(pageable, search, filterForm);

        // convert entities --> dtos
        List<AccountDTO> dtos = modelMapper.map(
                entityPages.getContent(),
                new TypeToken<List<AccountDTO>>() {}.getType());

        Page<AccountDTO> dtoPages = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

        return dtoPages;
    }

    @GetMapping(value = "/{id}")
    public AccountDTO getAccountById(@PathVariable(name = "id") int id) {
        Account account = service.getAccountById(id);
        AccountDTO dto = modelMapper.map(account, AccountDTO.class);
        return dto;
    }

    @GetMapping(value ="/username/{username}/exists")
    public boolean isAccountExistsByUsername(@PathVariable(name = "username") String username) {
        return service.isAccountExistsByUsername(username);
    }

    @GetMapping(value = "/department/null")
    public Page<AccountDTO> getAccountsByDepartmentIsNull(Pageable pageable) {

        Page<Account> entityPages = service.getAccountsByDepartmentIsNull(pageable);

        // convert entities --> dtos
        List<AccountDTO> dtos = modelMapper.map(
                entityPages.getContent(),
                new TypeToken<List<AccountDTO>>() {}.getType());

        Page<AccountDTO> dtoPages = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

        return dtoPages;
    }

    @PostMapping()
    public void createAccount(@RequestBody CreatingAccountForm form) {
        service.createAccount(form);
    }

    @PutMapping(value = "/{id}")
    public void updateAccount(@PathVariable(name = "id") int id, @RequestBody UpdatingAccountForm form) {
        service.updateAccount(id, form);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteAccount(@PathVariable(name = "id") int id) {
        service.deleteAccount(id);
    }

    @DeleteMapping
    public void deleteAccounts(@RequestParam(name = "ids") List<Integer> ids) {
        service.deleteAccounts(ids);
    }

}
