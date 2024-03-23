package com.vti.dto;

import com.vti.entity.Account;
import lombok.Data;

@Data
public class LoginInfoDto {

	private int id;

	private String username;

	private  String firstName;

	private String lastName;

	private String fullName;

	private Account.Role role;

}
