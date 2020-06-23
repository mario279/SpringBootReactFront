package com.banking.app.MyBankingApp.security;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.banking.app.MyBankingApp.services.CustomUserDetailService;

import static com.banking.app.MyBankingApp.security.SecurityConstants.SIGN_UP_URLS;
import static com.banking.app.MyBankingApp.security.SecurityConstants.H2_URLS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		securedEnabled = true,
		jsr250Enabled = true,
		prePostEnabled = true
		)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private CustomUserDetailService customUserDetailService;
	
	//here is an instance of the object
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//here is the object and I will hold on to it, until you request it
	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}
	
    @Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		 auth.userDetailsService(customUserDetailService).passwordEncoder(bCryptPasswordEncoder);
	}
    
    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception{
    	return super.authenticationManager();
    }


	@Override
    protected void configure(HttpSecurity http) throws Exception {
       http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
               .and()
               .headers().frameOptions().sameOrigin()
               .and()
               .authorizeRequests()
               .antMatchers("/",
                       "/favicon.ico",
                       "/**/*.png",
                       "/**/*.gif",
                     "/**/*.svg",
                       "/**/*.jpg",
                       "/**/*.html",
                       "/**/*.css",
                       "/**/*.jss"               
               ).permitAll().antMatchers(SIGN_UP_URLS).permitAll()
               .antMatchers(H2_URLS).permitAll()
               .anyRequest().authenticated();
       
       http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
    }

}
