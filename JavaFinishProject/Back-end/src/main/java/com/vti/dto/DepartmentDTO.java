package com.vti.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vti.entity.Department;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class DepartmentDTO {

    private int id;

    private String name;

    private int totalMember;

    private String type;

    @JsonFormat(pattern = "dd/MM/yyy")
    private Date createDate;

    private List<AccountDTO> accounts;

    @Data
    @NoArgsConstructor
    private static class AccountDTO {

        private int id;

        private String username;

        private String fullName;

        private String role;
    }
}
