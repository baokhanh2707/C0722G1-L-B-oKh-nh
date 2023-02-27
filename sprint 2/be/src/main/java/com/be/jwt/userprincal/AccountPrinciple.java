package com.be.jwt.userprincal;

import com.be.model.account.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AccountPrinciple implements UserDetails {

    private Long idAccount;

    private String name;

    private String usernameAccount;

    private String email;

    private String encryptPassword;

    private Collection<? extends GrantedAuthority> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    public AccountPrinciple() {
    }

    public AccountPrinciple(Long idAccount, String name, String usernameAccount, String email, String encryptPassword, Collection<? extends GrantedAuthority> roles) {
        this.idAccount = idAccount;
        this.name = name;
        this.usernameAccount = usernameAccount;
        this.email = email;
        this.encryptPassword = encryptPassword;
        this.roles = roles;
    }

    public static AccountPrinciple build(Account account) {
        System.out.println(account.getRoles());
        List<GrantedAuthority> authorities = account.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
        return new AccountPrinciple(
                account.getIdAccount(),
                account.getName(),
                account.getUsernameAccount(),
                account.getEmail(),
                account.getEncryptPassword(),
                authorities
        );
    }

    public Long getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(Long idAccount) {
        this.idAccount = idAccount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsernameAccount() {
        return usernameAccount;
    }

    public void setUsernameAccount(String usernameAccount) {
        this.usernameAccount = usernameAccount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncryptPassword() {
        return encryptPassword;
    }

    public void setEncryptPassword(String encryptPassword) {
        this.encryptPassword = encryptPassword;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }

    @Override
    public String getPassword() {
        return encryptPassword;
    }

    @Override
    public String getUsername() {
        return usernameAccount;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
