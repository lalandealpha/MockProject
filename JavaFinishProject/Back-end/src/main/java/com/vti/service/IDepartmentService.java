package com.vti.service;

import com.vti.entity.Account;
import com.vti.entity.Department;
import com.vti.form.department.CreatingDepartmentForm;
import com.vti.form.department.DepartmentFilterForm;
import com.vti.form.department.UpdatingDepartmentForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IDepartmentService {
    Page<Department> getAllDepartments(Pageable pageable, String search, DepartmentFilterForm filterForm);

    List<Department> getDepartmentList();

    Department getDepartmentById(int id);

    Department getDepartmentByName(String name);

    void createDepartment(CreatingDepartmentForm form);

    void updateDepartment(int id, UpdatingDepartmentForm form);

    void deleteDepartment(int id);

    boolean isDepartmentExistsByName(String name);

    void deleteDepartments(List<Integer> ids);
}
