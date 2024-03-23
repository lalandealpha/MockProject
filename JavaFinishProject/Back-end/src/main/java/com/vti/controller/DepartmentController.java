package com.vti.controller;

import com.vti.dto.DepartmentDTO;
import com.vti.entity.Department;
import com.vti.form.department.CreatingDepartmentForm;
import com.vti.form.department.DepartmentFilterForm;
import com.vti.form.department.UpdatingDepartmentForm;
import com.vti.service.IDepartmentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/departments")
public class DepartmentController {

    @Autowired
    private IDepartmentService service;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<DepartmentDTO> getAllDepartments(
            Pageable pageable,
            @RequestParam(value = "search", required = false) String search,
            DepartmentFilterForm filterForm) {
        Page<Department> entityPages = service.getAllDepartments(pageable, search, filterForm);

        // convert entities --> dtos
        List<DepartmentDTO> dtos = modelMapper.map(
                entityPages.getContent(),
                new TypeToken<List<DepartmentDTO>>() {}.getType());

        for(DepartmentDTO dto : dtos) {
            if(dto.getType() == "SCRUM_MASTER") {
                dto.setType("Scrum Master");
            }
        }

        Page<DepartmentDTO> dtoPages = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

        return dtoPages;
    }

    @GetMapping(value = "/{id}")
    public DepartmentDTO getDepartmentById(@PathVariable(name = "id") int id) {
        Department department = service.getDepartmentById(id);
        DepartmentDTO dto = modelMapper.map(department, DepartmentDTO.class);
        return dto;
    }

    @GetMapping(value ="/name/{name}/exists")
    public boolean isDepartmentExistsByName(@PathVariable(name = "name") String name) {
        return service.isDepartmentExistsByName(name);
    }

    @GetMapping(value ="/name/{name}")
    public DepartmentDTO getDepartmentByName(@PathVariable(name = "name") String name) {
        Department department = service.getDepartmentByName(name);
        DepartmentDTO dto = modelMapper.map(department, DepartmentDTO.class);
        return dto;
    }

    @PostMapping()
    public void createDepartment(@RequestBody CreatingDepartmentForm form) {
        service.createDepartment(form);
    }

    @PutMapping(value = "/{id}")
    public void updateDepartment(@PathVariable(name = "id") int id, @RequestBody UpdatingDepartmentForm form) {
        service.updateDepartment(id, form);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteDepartment(@PathVariable(name = "id") int id) {
        service.deleteDepartment(id);
    }

    @DeleteMapping
    public void deleteAccounts(@RequestParam(name = "ids") List<Integer> ids) {
        service.deleteDepartments(ids);
    }

}
