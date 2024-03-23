package com.vti.service;

import com.vti.entity.Account;
import com.vti.entity.Department;
import com.vti.form.department.CreatingDepartmentForm;
import com.vti.form.department.DepartmentFilterForm;
import com.vti.form.department.UpdatingDepartmentForm;
import com.vti.repository.IAccountRepository;
import com.vti.repository.IDepartmentRepository;
import com.vti.specification.department.DepartmentSpecification;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService implements IDepartmentService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IDepartmentRepository departmentRepository;

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public Page<Department> getAllDepartments(Pageable pageable, String search, DepartmentFilterForm filterForm) {
        Specification<Department> where = DepartmentSpecification.buildWhere(search, filterForm);
        return departmentRepository.findAll(where, pageable);
    }

    @Override
    public List<Department> getDepartmentList() {
        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(int id) {
        return departmentRepository.findById(id).get();
    }

    @Override
    public Department getDepartmentByName(String name) {
        return departmentRepository.findByName(name);
    }

    @Override
    public void createDepartment(CreatingDepartmentForm form) {
        // convert form to entity
        TypeMap<CreatingDepartmentForm, Department> typeMap = modelMapper.getTypeMap(CreatingDepartmentForm.class, Department.class);
        if(typeMap == null) {
            modelMapper.addMappings(new PropertyMap<CreatingDepartmentForm, Department>() {
                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }

        Department department = modelMapper.map(form, Department.class);

        // save department
        departmentRepository.save(department);

        // get account list from input form
        List<Integer> accountIds = form.getAccountIds();

        // add department to account
        List<Account> accounts = new ArrayList<>();
        if(!accountIds.isEmpty()) {
            for(Integer id : accountIds) {
                Account account = accountRepository.findById(id).get();
                account.setDepartment(department);
                accounts.add(account);
            }
        }
        accountRepository.saveAll(accounts);
    }

    @Override
    public void updateDepartment(int id, UpdatingDepartmentForm form) {
        // convert form to entity
        TypeMap<UpdatingDepartmentForm, Department> typeMap = modelMapper.getTypeMap(UpdatingDepartmentForm.class, Department.class);
        if(typeMap == null) {
            modelMapper.addMappings(new PropertyMap<UpdatingDepartmentForm, Department>() {
                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }

        Department newDepartment = modelMapper.map(form, Department.class);
        newDepartment.setId(id);

        //Get department's old properties
        Department oldDepartment = getDepartmentById(id);
        newDepartment.setName(oldDepartment.getName());
        newDepartment.setCreateDate(oldDepartment.getCreateDate());
        newDepartment.setAccounts(oldDepartment.getAccounts());

        // save new department
        departmentRepository.save(newDepartment);

        // get account list from input form
        List<Integer> accountIds = form.getAccountIds();
        List<Account> accounts = new ArrayList<>();

//        List<Account> oldAccounts = oldDepartment.getAccounts();
//        if(!oldAccounts.isEmpty() && oldAccounts != null) {
//            for (Account oldAccount : oldAccounts) {
//                accounts.add(oldAccount);
//            }
//        }
        if(!accountIds.isEmpty() && accountIds != null) {
            for(Integer accountId : accountIds) {
                Account account = accountRepository.findById(accountId).get();
                account.setDepartment(newDepartment);
                accounts.add(account);
            }
        }
        accountRepository.saveAll(accounts);

    }

    @Override
    public void deleteDepartment(int id) {
        Department department = getDepartmentById(id);
        departmentRepository.delete(department);
    }

    @Override
    public boolean isDepartmentExistsByName(String name) {
        return departmentRepository.existsDepartmentByName(name);
    }

    @Override
    public void deleteDepartments(List<Integer> ids) {
        departmentRepository.deleteByIds(ids);
    }
}
