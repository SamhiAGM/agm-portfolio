package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="skills") @Getter @Setter @NoArgsConstructor
public class Skill {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,length=100) private String category;
    @Column(nullable=false,length=100) private String level;
    @ManyToOne(optional=false) @JoinColumn(name="technology_id") private Technology technology;
    @Column(name="sort_order") private int sortOrder;
}
