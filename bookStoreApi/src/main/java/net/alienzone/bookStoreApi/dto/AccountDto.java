package net.alienzone.bookStoreApi.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {
    private UUID id;

    @NotNull
    private String name;


    @NotNull
    private String email;

    @NotNull
    private String password;
}
