package com.samhi.portfolio.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.*;
@Entity @Table(name="projects") @Getter @Setter @NoArgsConstructor
public class Project {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=100) private String slug;
    @Column(nullable=false) private String title;
    private String subtitle;
    private String category;
    @Column(nullable=false,length=1000) private String shortDescription;
    @Column(length=5000) private String fullDescription;
    @Column(length=500) private String githubUrl;
    @Column(length=500) private String liveUrl;
    @Column(length=500) private String imageUrl;
    private String status;
    private String color;
    private boolean featured;
    @Column(name="sort_order") private int sortOrder;
    @Column(length=3000) private String problem;
    @Column(length=3000) private String solution;
    @Column(length=3000) private String challenges;
    @Column(length=3000) private String contribution;
    @Column(length=3000) private String improvements;
    @ManyToMany @JoinTable(name="project_technologies",joinColumns=@JoinColumn(name="project_id"),inverseJoinColumns=@JoinColumn(name="technology_id"))
    @OrderColumn(name="position") private List<Technology> technologies=new ArrayList<>();
    @ElementCollection @CollectionTable(name="project_features",joinColumns=@JoinColumn(name="project_id")) @Column(name="feature",length=500) @OrderColumn(name="position")
    private List<String> features=new ArrayList<>();
    @ElementCollection @CollectionTable(name="project_architecture",joinColumns=@JoinColumn(name="project_id")) @Column(name="step",length=500) @OrderColumn(name="position")
    private List<String> architecture=new ArrayList<>();
    @Column(nullable=false,updatable=false) private Instant createdAt;
    @Column(nullable=false) private Instant updatedAt;
    @PrePersist void onCreate() { createdAt=Instant.now(); updatedAt=createdAt; }
    @PreUpdate void onUpdate() { updatedAt=Instant.now(); }
}
