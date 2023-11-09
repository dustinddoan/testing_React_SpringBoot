package net.alienzone.bookStoreApi.controller;

import net.alienzone.bookStoreApi.BookDto;
import net.alienzone.bookStoreApi.services.BookService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookControllerTest {

    @InjectMocks
    private BookController bookController;

    @Mock
    private BookService bookService;

    @Test
    void shouldReturnBookDtoListWhenGetBookCall() {
        List<BookDto> bookDtoList = new ArrayList<BookDto>();
        BookDto bookDto = getBookDto();
        bookDtoList.add(bookDto);

        when(bookService.getBooks()).thenReturn(bookDtoList);

        ResponseEntity<List<BookDto>> bookDtoResponse = bookController.getBooks();

        assertThat(bookDtoResponse.getBody()).isNotNull();
        assertThat(bookDtoResponse.getBody().size()).isEqualTo(1);


    } @Test
    void shouldReturnBookDtoListWhenGetBookByTitleCall() {
        List<BookDto> bookDtoList = new ArrayList<BookDto>();
        BookDto bookDto = getBookDto();
        bookDtoList.add(bookDto);

        when(bookService.getBooksByTitle(anyString())).thenReturn(bookDtoList);

        ResponseEntity<List<BookDto>> bookDtoResponse = bookController.getBooksByTitle("test_title");

        assertThat(bookDtoResponse.getBody()).isNotNull();
        assertThat(bookDtoResponse.getBody().size()).isEqualTo(1);


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
