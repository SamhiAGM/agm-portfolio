package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="certifications") @Getter @Setter @NoArgsConstructor
public class Certification {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String title;
    private String issuer;
    private String type;
    private String credentialId;
}
