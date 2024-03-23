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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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

    @GetMapping(value ="/email/{email}/exists")
    public boolean isAccountExistByEmail(@PathVariable(name = "email") String email) {
        return service.isAccountExistsByEmail(email);
    }

    @GetMapping(value="/username/{username}")
    public AccountDTO getAccountByUsername(@PathVariable(name = "username") String username) {
        Account account = service.getAccountByUsername(username);
        AccountDTO dto = modelMapper.map(account, AccountDTO.class);
        return dto;
    }

    @GetMapping(value="/email/{email}")
    public AccountDTO getAccountByEmail(@PathVariable(name = "email") String email) {
        Account account = service.getAccountByEmail(email);
        AccountDTO dto = modelMapper.map(account, AccountDTO.class);
        return dto;
    }

    @PostMapping()
    public AccountDTO createAccount(@RequestBody CreatingAccountForm form) {
        Account account = service.createAccount(form);
        String fullName = "";
        fullName = account.getFirstName().concat(" ").concat(account.getLastName());
        AccountDTO dto = modelMapper.map(account, AccountDTO.class);
        dto.setFullName(fullName);
        return dto;
    }

    @PutMapping(value = "/{id}")
    public AccountDTO updateAccount(@PathVariable(name = "id") int id, @RequestBody UpdatingAccountForm form) {
        Account account = service.updateAccount(id, form);
        String fullName = "";
        fullName = account.getFirstName().concat(" ").concat(account.getLastName());
        AccountDTO dto = modelMapper.map(account, AccountDTO.class);
        dto.setFullName(fullName);
        return dto;
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
