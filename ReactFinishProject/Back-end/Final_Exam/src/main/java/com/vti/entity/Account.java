package com.vti.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "`Account`")
@Data
@NoArgsConstructor
public class Account implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "AccountID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Username", length = 18, nullable = false, unique = true)
    private String username;

    @Column(name = "Email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "`Password`", length = 800, nullable = false)
    private String password;

    @Column(name = "FirstName", length = 50, nullable = false)
    private String firstName;

    @Column(name = "LastName", length = 50, nullable = false)
    private String lastName;

    @Formula("CONCAT(FirstName, ' ', LastName)")
    private String fullName;

    @Column(name = "`Role`", nullable = false)
    @Convert(converter = AccountRoleConverter.class)
    private Role role;

    @Column(name = "CreateDate", nullable = false)
    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    public enum Role {
        ADMIN("Admin"), EMPLOYEE("Employee"), MANAGER("Manager");

        private String roleSQL;

        private Role(String roleSQL) {
            this.roleSQL = roleSQL;
        }

        public String getRoleSQL() {
            return roleSQL;
        }

        public static Role toEnum(String roleSQL) {
            for (Account.Role role : Account.Role.values()) {
                if (role.getRoleSQL().equals(roleSQL)) {
                    return role;
                }
            }
            return null;
        }

    }

    @PrePersist
    public void prePersist() {
        if(this.role == null) {
            role = Role.EMPLOYEE;
        }

        if(password == null) {
            password = new BCryptPasswordEncoder().encode("123456");
        }
    }

}
