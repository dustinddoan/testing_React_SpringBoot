package net.alienzone.bookStoreApi.services;

import net.alienzone.bookStoreApi.dto.UserDto;
import net.alienzone.bookStoreApi.model.User;
import net.alienzone.bookStoreApi.repository.UserRepository;
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
class UserServiceTest {

    @InjectMocks
    UserService userService; // real UserService - which nedded to be tested

    @Mock
    ModelMapper modelMapper; // mock

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Test
    public void shouldReturnUserIdWhenCalledWithUserData() {
        UUID uuid = UUID.randomUUID();
        when(userRepository.saveAndFlush(any())).thenReturn(getUser(uuid));
        when(modelMapper.map(any(), any())).thenReturn(getUser(uuid));
        UUID newUserId = userService.createUser(getUserDto());

        assertThat(newUserId).isNotNull();
        assertThat(newUserId).isEqualTo(uuid);
    }

    @Test
    public void shouldReturnUserWhenCalledWithUserEmail() {
        UUID uuid = UUID.randomUUID();
        when(userRepository.findByEmail(anyString())).thenReturn(getUser(uuid));
        when(modelMapper.map(any(), any())).thenReturn(getUserDto());

        UserDto userByEmail = userService.getUserByEmail("email");

        assertThat(userByEmail).isNotNull();
        assertThat(userByEmail.getEmail()).isEqualTo("email");
    }

    @Test
    public void shouldThrowExceptionWhenEmailNoExist() {
        UUID uuid = UUID.randomUUID();
        when(userRepository.findByEmail(anyString())).thenThrow(new RuntimeException("error"));

        assertThatThrownBy(() -> userService.getUserByEmail("email")).isInstanceOf(RuntimeException.class);
    }


    private UserDto getUserDto() {
        return UserDto.builder()
                .id(UUID.randomUUID())
                .name("username")
                .password("password")
                .email("email")
                .build();
    }

    private User getUser(UUID uuid) {
        return User.builder()
                .id(uuid)
                .name("username")
                .password("password")
                .email("email")
                .build();
    }

}