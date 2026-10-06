package com.samhi.portfolio.service;
import com.samhi.portfolio.dto.response.ProjectResponse;
import com.samhi.portfolio.dto.response.CatalogResponses.*;
import java.util.List;
public interface PortfolioService {
    List<ProjectResponse> projects(boolean featuredOnly);
    ProjectResponse project(String slug);
    List<SkillGroup> skills();
    List<EducationItem> education();
    List<ExperienceItem> experience();
    List<CertificationItem> certifications();
    List<SocialItem> socialLinks();
}
