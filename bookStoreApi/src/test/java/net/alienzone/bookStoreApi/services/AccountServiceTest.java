package net.alienzone.bookStoreApi.services;

import net.alienzone.bookStoreApi.dto.AccountDto;
import net.alienzone.bookStoreApi.model.Account;
import net.alienzone.bookStoreApi.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @InjectMocks
    AccountService accountService; // real UserService - which nedded to be tested

    @Mock
    ModelMapper modelMapper; // mock

    @Mock
    AccountRepository accountRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Test
    public void shouldReturnUserIdWhenCalledWithUserData() {
        UUID uuid = UUID.randomUUID();
        when(accountRepository.saveAndFlush(any())).thenReturn(getUser(uuid));
        when(modelMapper.map(any(), any())).thenReturn(getUser(uuid));
        UUID newUserId = accountService.createUser(getUserDto());

        assertThat(newUserId).isNotNull();
        assertThat(newUserId).isEqualTo(uuid);
    }

    @Test
    public void shouldReturnUserWhenCalledWithUserEmail() {
        UUID uuid = UUID.randomUUID();
        when(accountRepository.findByEmail(anyString())).thenReturn(getUser(uuid));
        when(modelMapper.map(any(), any())).thenReturn(getUserDto());

        AccountDto userByEmail = accountService.getUserByEmail("email");

        assertThat(userByEmail).isNotNull();
        assertThat(userByEmail.getEmail()).isEqualTo("email");
    }

    @Test
    public void shouldThrowExceptionWhenEmailNoExist() {
        UUID uuid = UUID.randomUUID();
        when(accountRepository.findByEmail(anyString())).thenThrow(new RuntimeException("error"));

        assertThatThrownBy(() -> accountService.getUserByEmail("email")).isInstanceOf(RuntimeException.class);
    }


    private AccountDto getUserDto() {
        return AccountDto.builder()
                .id(UUID.randomUUID())
                .name("username")
                .password("password")
                .email("email")
                .build();
    }

    private Account getUser(UUID uuid) {
        return Account.builder()
                .id(uuid)
                .name("username")
                .password("password")
                .email("email")
                .build();
    }

}