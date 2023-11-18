package net.alienzone.bookStoreApi.services;

import lombok.Data;
import net.alienzone.bookStoreApi.dto.UserDto;
import net.alienzone.bookStoreApi.model.User;
import net.alienzone.bookStoreApi.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@Data
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public UUID createUser(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);

        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setId(null);

        User newUser = userRepository.saveAndFlush(user);
        return newUser.getId();
    }


    public UserDto getUserByEmail(String email) {
        User userByEmail = userRepository.findByEmail(email);

        if (Objects.isNull(userByEmail)) {
            throw new RuntimeException("User with email: " + email + " not found");
        }

        return modelMapper.map(userByEmail, UserDto.class);
    }
}
