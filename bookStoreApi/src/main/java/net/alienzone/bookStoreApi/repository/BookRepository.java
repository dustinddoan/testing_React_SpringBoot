package net.alienzone.bookStoreApi.repository;

import net.alienzone.bookStoreApi.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

//public interface BookRepository extends JpaRepository<Book, UUID> {
//}

public interface BookRepository extends CrudRepository<Book, UUID> {
    List<Book> findBooksByTitle(String title);

    List<Book> findBookByTitleIgnoreCase(String title);
}
