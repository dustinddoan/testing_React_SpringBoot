package net.alienzone.bookStoreApi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
//import org.hibernate.annotations.ColumnOrder;


import java.util.UUID;
// deal with DB
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    private UUID id;

    @NotNull
    private String title;


    @NotNull
    private String description;

    @NotNull
    private int releaseYear;

}
