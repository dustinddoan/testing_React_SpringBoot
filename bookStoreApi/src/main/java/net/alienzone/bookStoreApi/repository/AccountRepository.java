package net.alienzone.bookStoreApi.repository;

import net.alienzone.bookStoreApi.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {
    Account findByEmail(String email);
}
