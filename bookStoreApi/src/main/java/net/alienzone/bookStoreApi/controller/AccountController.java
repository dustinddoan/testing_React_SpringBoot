package net.alienzone.bookStoreApi.controller;

import jakarta.validation.Valid;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import net.alienzone.bookStoreApi.config.JwtUtil;
import net.alienzone.bookStoreApi.dto.AuthenticationRequest;
import net.alienzone.bookStoreApi.dto.AuthenticationResponse;
import net.alienzone.bookStoreApi.dto.AccountDto;
import net.alienzone.bookStoreApi.services.AccountDetail;
import net.alienzone.bookStoreApi.services.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Data
@Log4j2
@Validated
public class AccountController {
    private final AuthenticationManager authenticationManager;
    private final AccountDetail accountDetail;
    private final JwtUtil jwtUtil;
    private final AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            log.info("---DUSTIN: {}", request.getEmail());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException exception) {
            log.error("Exception during authentication: {}", exception.getMessage());

            throw new RuntimeException("Username or Password is incorrect");
        }

        UserDetails userDetails = accountDetail.loadUserByUsername(request.getEmail());

        log.info("__DUSTIN userdetails: {}", userDetails);
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse("Bearer " + token));
    }

    @PostMapping("/register")
    public ResponseEntity<UUID> addUser(@Valid @RequestBody AccountDto accountDto) {
        UUID uuid = accountService.createUser(accountDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(uuid);
    }
}
