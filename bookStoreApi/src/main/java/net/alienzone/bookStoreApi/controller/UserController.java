package net.alienzone.bookStoreApi.controller;

import lombok.extern.log4j.Log4j2;
import net.alienzone.bookStoreApi.config.JwtUtil;
import net.alienzone.bookStoreApi.dto.AuthenticationRequest;
import net.alienzone.bookStoreApi.dto.AuthenticationResponse;
import net.alienzone.bookStoreApi.services.UserDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Log4j2
public class UserController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailService userDetailService;
    private final JwtUtil jwtUtil;

    public UserController(AuthenticationManager authenticationManager, UserDetailService userDetailService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            log.info("---DUSTIN: {}", request.getEmail());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException exception) {
            log.error("Exception during authentication: {}", exception.getMessage());

            throw new RuntimeException("Username or Password is incorrect");
        }

        UserDetails userDetails = userDetailService.loadUserByUsername(request.getEmail());

        log.info("__DUSTIN userdetails: {}", userDetails);
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse("Bearer " + token));
    }
}
