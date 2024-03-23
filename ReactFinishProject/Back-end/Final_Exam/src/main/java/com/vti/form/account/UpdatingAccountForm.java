package com.vti.form.account;

import com.vti.entity.Account;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingAccountForm {

	private String username;

	private String email;

	private String firstName;

	private String lastName;

	private Account.Role role;

}
