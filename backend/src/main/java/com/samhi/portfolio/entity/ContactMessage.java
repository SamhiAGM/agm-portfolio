package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
@Entity @Table(name="contact_messages") @Getter @Setter @NoArgsConstructor
public class ContactMessage {
    public enum Status { NEW, READ, REPLIED }
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,length=100) private String name;
    @Column(nullable=false,length=254) private String email;
    @Column(nullable=false,length=150) private String subject;
    @Column(nullable=false,length=5000) private String message;
    @Column(nullable=false,updatable=false) private Instant createdAt;
    @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private Status status=Status.NEW;
    @PrePersist void onCreate() { createdAt=Instant.now(); }
}
