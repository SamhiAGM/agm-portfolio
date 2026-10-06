package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="experiences") @Getter @Setter @NoArgsConstructor
public class Experience {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String title;
    private String organization;
    @Column(length=2000) private String description;
    @Column(name="sort_order") private int sortOrder;
}
