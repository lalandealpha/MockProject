package com.vti.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class AccountDTO {

    private int id;

    private String username;

    private String email;

    private  String firstName;

    private String lastName;

    private String fullName;

    private String role;

    private Date createDate;

}
