package net.alienzone.bookStoreApi.integrationTest;

import net.alienzone.bookStoreApi.BookStoreApiApplication;
import net.alienzone.bookStoreApi.config.JwtUtil;
import net.alienzone.bookStoreApi.dto.BookDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = BookStoreApiApplication.class, webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
// below notation will allow executing same SQL query multiple times
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BookControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    void setupHeader() {
        String token = jwtUtil.generateToken(
                new User("dustin@gmail.com", passwordEncoder.encode("dunglay"), new ArrayList<>()));

        testRestTemplate.getRestTemplate().setInterceptors(
                Collections.singletonList((request, body, execution) ->  {
                    request.getHeaders().add("Authorization", "Bearer " + token);

                    return execution.execute(request, body);
                })
        );

    }

    @Test
    @Sql(scripts = {"classPath:InsertInitialBookRecordForTest.sql"})
    void shouldReturnBooksWhenBookApiCalled() {
        setupHeader();
        BookDto[] listOfBooks = testRestTemplate.getForObject("http://localhost:" + port + "/api/v1/books", BookDto[].class);
        assertThat(listOfBooks).isNotNull();
        assertThat(listOfBooks.length).isEqualTo(18);
    }

    @Test
    @Sql(scripts = {"classPath:InsertInitialBookRecordForTest.sql"})
    void shouldReturnBooksWhenBookFilterBookApiCalled() {
        setupHeader();
        BookDto[] listOfBooks = testRestTemplate.getForObject("http://localhost:" + port + "/api/v1/books/test title", BookDto[].class);
        assertThat(listOfBooks).isNotNull();
        assertThat(listOfBooks.length).isEqualTo(1);
    }
}
