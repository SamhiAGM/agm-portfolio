package com.samhi.portfolio.service.impl;
import com.samhi.portfolio.dto.response.ProjectResponse;
import com.samhi.portfolio.dto.response.CatalogResponses.*;
import com.samhi.portfolio.exception.ResourceNotFoundException;
import com.samhi.portfolio.mapper.PortfolioMapper;
import com.samhi.portfolio.repository.*;
import com.samhi.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service @RequiredArgsConstructor @Transactional(readOnly=true)
public class PortfolioServiceImpl implements PortfolioService {
    private final ProjectRepository projects;
    private final SkillRepository skills;
    private final EducationRepository education;
    private final ExperienceRepository experience;
    private final CertificationRepository certifications;
    private final SocialLinkRepository socialLinks;
    private final PortfolioMapper mapper;
    public List<ProjectResponse> projects(boolean featuredOnly) { return (featuredOnly?projects.findByFeaturedTrueOrderBySortOrderAsc():projects.findAllByOrderBySortOrderAsc()).stream().map(mapper::project).toList(); }
    public ProjectResponse project(String slug) { return mapper.project(projects.findBySlug(slug).orElseThrow(()->new ResourceNotFoundException("Project not found."))); }
    public List<SkillGroup> skills() { return mapper.skills(skills.findAllByOrderBySortOrderAsc()); }
    public List<EducationItem> education() { return education.findAll().stream().map(mapper::education).toList(); }
    public List<ExperienceItem> experience() { return experience.findAllByOrderBySortOrderAsc().stream().map(mapper::experience).toList(); }
    public List<CertificationItem> certifications() { return certifications.findAll().stream().map(mapper::certification).toList(); }
    public List<SocialItem> socialLinks() { return socialLinks.findAll().stream().map(s->new SocialItem(s.getPlatform(),s.getUrl())).toList(); }
}
