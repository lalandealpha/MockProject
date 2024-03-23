package com.vti.entity;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class AccountRoleConverter implements AttributeConverter<Account.Role, String> {
    @Override
    public String convertToDatabaseColumn(Account.Role role) {
        if (role == null) {
            return null;
        }
        return role.getRoleSQL();
    }

    @Override
    public Account.Role convertToEntityAttribute(String roleSQL) {
        if (roleSQL == null) {
            return null;
        }
        return Account.Role.toEnum(roleSQL);
    }
}
