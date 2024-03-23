package com.vti.form.account;

import com.vti.entity.Account;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class AccountFilterForm {

	private Account.Role role;

	private Date startDate;

	private Date endDate;

}

