package net.alienzone.bookStoreApi.repository;

import net.alienzone.bookStoreApi.model.Book;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.stream.StreamSupport;

@ExtendWith(SpringExtension.class)
@DataJpaTest // below notation will allow executing same SQL query multiple times
public class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    @Sql(scripts = {"classpath:InsertInitialBookRecordForTest.sql"})
    void shouldAbleToFetchBooksDB() {
        Iterable<Book> books = bookRepository.findAll();
        Long totalCount = StreamSupport.stream(books.spliterator(), false).count();

        Assertions.assertEquals(totalCount, 2);
    }

    @Test
    @Sql(scripts = {"classpath:InsertInitialBookRecordForTest.sql"})
    void shouldReturnOneBookWithTestTitle() {
        List<Book> books = bookRepository.findBooksByTitle("test title");

        Assertions.assertEquals(books.size(), 1);
    }
}
