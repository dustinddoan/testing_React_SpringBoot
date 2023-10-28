package net.alienzone.bookStoreApi.services;

import net.alienzone.bookStoreApi.BookDto;
import net.alienzone.bookStoreApi.model.Book;
import net.alienzone.bookStoreApi.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {
    @Mock
    private BookRepository bookRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private BookService bookService;

    @Test
    void shouldReturnListOfBookDto() {
        // mock
        List<Book> books = new ArrayList<>();

        Book book = getBook();
        books.add(book);

        BookDto bookDto = getBookDto();

        when(bookRepository.findAll()).thenReturn(books);
        when(modelMapper.map(book, BookDto.class)).thenReturn(bookDto);

        //actual - return List<BookDto>
        List<BookDto> bookDtoList = bookService.getBooks();

        // assert
        assertThat(1).isEqualTo(bookDtoList.size());

        assertThat(bookDtoList.get(0))
                .isNotNull()
                .hasFieldOrPropertyWithValue("title", "Test title")
                .hasFieldOrPropertyWithValue("description", "Test description")
                .hasFieldOrPropertyWithValue("releaseYear", 2018);
    }

    private Book getBook() {
        return Book.builder()
                .id(UUID.randomUUID())
                .title("Test title")
                .description("Test description")
                .releaseYear(2018)
                .build();
    }

    private BookDto getBookDto() {
        return BookDto.builder()
                .id(UUID.randomUUID())
                .title("Test title")
                .description("Test description")
                .releaseYear(2018)
                .build();

    }
}
