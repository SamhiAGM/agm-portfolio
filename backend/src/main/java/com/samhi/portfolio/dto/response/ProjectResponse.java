package com.samhi.portfolio.dto.response;
import java.time.Instant;
import java.util.List;
public record ProjectResponse(Long id,String slug,String title,String subtitle,String category,
    String shortDescription,String fullDescription,String githubUrl,String liveUrl,String imageUrl,
    String status,String color,boolean featured,List<String> technologies,List<String> features,
    List<String> architecture,String problem,String solution,String challenges,String contribution,
    String improvements,Instant createdAt,Instant updatedAt) {}
