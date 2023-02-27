package com.be.jwt.userprincal;


import com.be.model.account.Account;
import com.be.repository.account.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailService implements UserDetailsService {

    @Autowired
    IAccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Account không tìm thấy -> username hoặc password" + username));

        return AccountPrinciple.build(account);
    }
}
