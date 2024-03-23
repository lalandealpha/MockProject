package com.vti.form.department;

import com.vti.entity.Department;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UpdatingDepartmentForm {

	private int id;

	private Department.Type type;

	private List<Integer> accountIds;

}
