package net.alienzone.bookStoreApi.services;

import lombok.extern.log4j.Log4j2;
import net.alienzone.bookStoreApi.dto.BookDto;
import net.alienzone.bookStoreApi.model.Book;
import net.alienzone.bookStoreApi.repository.BookRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Log4j2
public class BookService {

    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    // create bean Mapper in config
    public BookService(BookRepository bookRepository, ModelMapper modelMapper) {
        this.bookRepository = bookRepository;
        this.modelMapper = modelMapper;
    }

    public List<BookDto> getBooks() {
        Iterable<Book> allBooks = bookRepository.findAll();
        log.info("Books: " + allBooks);
        return StreamSupport.stream(allBooks.spliterator(), false)
                .map(convertBookModelToBookDto())
                .collect(Collectors.toList());
    }

    private Function<Book, BookDto> convertBookModelToBookDto() {
        return book -> modelMapper.map(book, BookDto.class);
    }

    public List<BookDto> getBooksByTitle(String title) {
        List<Book> books = bookRepository.findBookByTitleIgnoreCase(title);
        return books.stream().map(convertBookModelToBookDto()).collect(Collectors.toList());
    }
}
