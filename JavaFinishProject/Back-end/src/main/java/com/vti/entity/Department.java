package com.vti.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Department")
@Data
@NoArgsConstructor
public class Department implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "DepartmentID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "DepartmentName", length = 50, nullable = false, unique = true, updatable = false)
    private String name;

    @Column(name = "TotalMember", nullable = false, updatable = false)
    private int totalMember;

    @Column(name = "DepartmentType", nullable = false)
    @Convert(converter = DepartmentTypeConverter.class)
    private Type type;

    @Column(name = "CreateDate", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @OneToMany(mappedBy = "department")
    private List<Account> accounts;

    public enum Type {
        DEV("Dev"), TEST("Test"), SCRUM_MASTER("ScrumMaster"), PM("PM");

        private String value;

        private Type(String sqlValue) {
            this.value = sqlValue;
        }

        public String getValue() {
            return value;
        }

        public static Type toEnum(String sqlValue) {
            for (Type type : Type.values()) {
                if (type.getValue().equals(sqlValue)) {
                    return type;
                }
            }
            return null;
        }

    }

    @PreRemove
    public void preRemove() {
        for (Account account : accounts) {
            account.setDepartment(null);
        }
    }

}
