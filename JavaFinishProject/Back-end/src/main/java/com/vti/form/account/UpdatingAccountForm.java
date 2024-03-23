package com.vti.form.account;

import com.vti.entity.Account;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingAccountForm {

	private int id;
	
	private Account.Role role;

	private int departmentId;

}
