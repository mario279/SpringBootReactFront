package com.banking.app.MyBankingApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.app.MyBankingApp.domain.User;
import com.banking.app.MyBankingApp.repos.UserRepo;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username);
		
		if(user == null) new UsernameNotFoundException("this user does not exist");
		
		return user;
	}
	
	@Transactional
	public User loadUserById (Long id) {
		User user = userRepo.getById(id);
		if(user==null) new UsernameNotFoundException("We did not find any user with this id");
		return user;
	}

}
