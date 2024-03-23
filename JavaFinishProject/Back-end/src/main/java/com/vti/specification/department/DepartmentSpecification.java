package com.vti.specification.department;

import com.vti.entity.Department;
import com.vti.form.department.DepartmentFilterForm;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.*;
import java.util.Date;

public class DepartmentSpecification {

	private static String formatSearch(String search) {
		search = search.trim();

		while (search.contains("  ")) {
			search = search.replace("  ", " ");
		}

		return search;
	}

	@SuppressWarnings("deprecation")
	public static Specification<Department> buildWhere(String search, DepartmentFilterForm filterForm) {
		
		Specification<Department> where = null;
		
		if (!StringUtils.isEmpty(search)) {
			search = formatSearch(search);
			CustomSpecification name = new CustomSpecification("name", search);
			where = Specification.where(name);
		}

		// if there is filter by min created date
		if (filterForm != null && filterForm.getMinCreateDate() != null) {
			CustomSpecification minCreateDate = new CustomSpecification("minCreateDate", filterForm.getMinCreateDate());
			if (where == null) {
				where = minCreateDate;
			} else {
				where = where.and(minCreateDate);
			}
		}		
				
		// if there is filter by max created date
		if (filterForm != null && filterForm.getMaxCreateDate() != null) {
			CustomSpecification maxCreateDate = new CustomSpecification("maxCreateDate", filterForm.getMaxCreateDate());
			if (where == null) {
				where = maxCreateDate;
			} else {
				where = where.and(maxCreateDate);
			}
		}

		// if there is filter by type
		if (filterForm != null && filterForm.getType() != null) {
			CustomSpecification type = new CustomSpecification("type", filterForm.getType());
			if (where == null) {
				where = type;
			} else {
				where = where.and(type);
			}
		}
		
		return where;
	}
}

@SuppressWarnings("serial")
@RequiredArgsConstructor
class CustomSpecification implements Specification<Department> {

	@NonNull
	private String field;
	@NonNull
	private Object value;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Predicate toPredicate(
			Root<Department> root,
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {

		if (field.equalsIgnoreCase("name")) {
			return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
		}
		
		
		if (field.equalsIgnoreCase("minCreateDate")) {
			return criteriaBuilder.greaterThanOrEqualTo(
					root.get("createDate").as(java.sql.Date.class),
					(Date) value);
		}
	
		if (field.equalsIgnoreCase("maxCreateDate")) {
			return criteriaBuilder.lessThanOrEqualTo(
					root.get("createDate").as(java.sql.Date.class),
					(Date) value);
		}
		
		if (field.equalsIgnoreCase("type")) {
			return criteriaBuilder.equal(root.get("type"), value);
		}
		
		return null;
	}
}

