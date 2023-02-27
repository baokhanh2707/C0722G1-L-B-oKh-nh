package com.be.dto.acount.response;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtResponse {
    private Long idAccount;
    private String token;
    private String type = "Bearer";
    private String name;
    private String usernameAccount;
    private String email;
    private Collection<? extends GrantedAuthority> roles;

    public JwtResponse() {
    }

    public JwtResponse(String token, String type, String name, Collection<? extends GrantedAuthority> roles) {
        this.token = token;
        this.type = type;
        this.name = name;
        this.roles = roles;
    }

    public JwtResponse(String token, String name, Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.name = name;
        this.roles = authorities;
    }

    public JwtResponse(String token, String name, Collection<? extends GrantedAuthority> authorities, String usernameAccount, Long idAccount, String email) {
        this.token = token;
        this.name = name;
        this.roles = authorities;
        this.usernameAccount = usernameAccount;
        this.idAccount = idAccount;
        this.email = email;
    }


    public Long getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(Long idAccount) {
        this.idAccount = idAccount;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }
}
