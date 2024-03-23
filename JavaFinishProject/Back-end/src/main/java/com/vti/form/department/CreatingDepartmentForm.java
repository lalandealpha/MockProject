package com.vti.form.department;

import com.vti.entity.Department;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CreatingDepartmentForm {

	private String name;

	private Department.Type type;

	private List<Integer> accountIds;

}
