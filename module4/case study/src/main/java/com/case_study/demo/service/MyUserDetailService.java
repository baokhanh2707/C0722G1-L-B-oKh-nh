//package com.case_study.demo.service;
//
//import com.case_study.demo.model.login.MyUserDetail;
//import com.case_study.demo.model.login.User;
//import com.case_study.demo.repository.IUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class MyUserDetailService implements UserDetailsService {
//    @Autowired
//    private IUserRepository iUserRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = iUserRepository.findByUsername(username);
//
//        if (user == null) {
//            throw new UsernameNotFoundException("User name: " + username + " not found");
//        }
//
//        return new MyUserDetail(user);
//    }
//}
