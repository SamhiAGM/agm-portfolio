package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="social_links") @Getter @Setter @NoArgsConstructor
public class SocialLink {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=100) private String platform;
    @Column(nullable=false,length=500) private String url;
}
