package net.alienzone.bookStoreApi.services;

import lombok.Data;
import net.alienzone.bookStoreApi.dto.AccountDto;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Data
@Service
public class AccountDetail implements UserDetailsService {
    private final AccountService accountService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountDto userByEmail = accountService.getUserByEmail(username);

        return new User(userByEmail.getEmail(), userByEmail.getPassword(), new ArrayList<>());
    }
}
