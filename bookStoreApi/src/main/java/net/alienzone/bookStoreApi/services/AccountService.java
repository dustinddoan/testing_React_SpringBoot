package net.alienzone.bookStoreApi.services;

import lombok.Data;
import net.alienzone.bookStoreApi.dto.AccountDto;
import net.alienzone.bookStoreApi.model.Account;
import net.alienzone.bookStoreApi.repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@Data
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public UUID createUser(AccountDto accountDto) {
        Account user = modelMapper.map(accountDto, Account.class);

        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setId(null);

        Account newUser = accountRepository.saveAndFlush(user);
        return newUser.getId();
    }


    public AccountDto getUserByEmail(String email) {
        Account userByEmail = accountRepository.findByEmail(email);

        if (Objects.isNull(userByEmail)) {
            throw new RuntimeException("User with email: " + email + " not found");
        }

        return modelMapper.map(userByEmail, AccountDto.class);
    }
}
