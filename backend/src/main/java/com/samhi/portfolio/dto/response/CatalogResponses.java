package com.samhi.portfolio.dto.response;
import java.util.List;
public final class CatalogResponses {
    private CatalogResponses() {}
    public record SkillGroup(String category,String level,List<String> technologies) {}
    public record ExperienceItem(Long id,String title,String organization,String description) {}
    public record EducationItem(Long id,String institution,String degree,String status,String location,List<String> focus) {}
    public record CertificationItem(Long id,String title,String issuer,String type,String credentialId) {}
    public record SocialItem(String platform,String url) {}
}
