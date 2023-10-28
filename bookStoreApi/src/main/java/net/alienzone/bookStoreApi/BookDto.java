package net.alienzone.bookStoreApi;

import io.swagger.v3.oas.annotations.media.Schema;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
// deal with Business Layer (controllers/UI)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "All details about book")
public class BookDto {
    @Schema(
            description = "Unique identifier for the book",
            example = "123e4567-e89b-12d3-a456-426614174001",
            required = true
    )
    private UUID id;

    @Schema(
            description = "Title of the book",
            example = "The Great Gatsby",
            required = true
    )
    private String title;

    @Schema(
            description = "Description of the book",
            example = "A novel by F. Scott Fitzgerald",
            required = true
    )
    private String description;

    @Schema(
            description = "Release year of the book",
            example = "1925",
            required = true
    )
    private int releaseYear;
}
