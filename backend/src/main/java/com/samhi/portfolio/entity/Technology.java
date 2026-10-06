package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="technologies") @Getter @Setter @NoArgsConstructor
public class Technology {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=100) private String name;
    public Technology(String name) { this.name=name; }
}
