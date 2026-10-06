package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;
@Entity @Table(name="education") @Getter @Setter @NoArgsConstructor
public class Education {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String institution;
    private String degree;
    private String status;
    private String location;
    @ElementCollection @CollectionTable(name="education_focus",joinColumns=@JoinColumn(name="education_id")) @Column(name="focus",length=100) @OrderColumn(name="position")
    private List<String> focus=new ArrayList<>();
}
