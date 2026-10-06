package com.samhi.portfolio.mapper;
import com.samhi.portfolio.dto.response.ProjectResponse;
import com.samhi.portfolio.dto.response.CatalogResponses.*;
import com.samhi.portfolio.dto.request.ContactRequest;
import com.samhi.portfolio.entity.*;
import org.springframework.stereotype.Component;
import java.util.*;
@Component
public class PortfolioMapper {
    public ProjectResponse project(Project p) {
        return new ProjectResponse(p.getId(),p.getSlug(),p.getTitle(),p.getSubtitle(),p.getCategory(),p.getShortDescription(),p.getFullDescription(),p.getGithubUrl(),p.getLiveUrl(),p.getImageUrl(),p.getStatus(),p.getColor(),p.isFeatured(),p.getTechnologies().stream().map(Technology::getName).toList(),List.copyOf(p.getFeatures()),List.copyOf(p.getArchitecture()),p.getProblem(),p.getSolution(),p.getChallenges(),p.getContribution(),p.getImprovements(),p.getCreatedAt(),p.getUpdatedAt());
    }
    public List<SkillGroup> skills(List<Skill> skills) {
        Map<String,List<Skill>> groups=new LinkedHashMap<>();
        skills.forEach(skill->groups.computeIfAbsent(skill.getCategory(),key->new ArrayList<>()).add(skill));
        return groups.entrySet().stream().map(entry->new SkillGroup(entry.getKey(),entry.getValue().getFirst().getLevel(),entry.getValue().stream().map(s->s.getTechnology().getName()).toList())).toList();
    }
    public EducationItem education(Education e) { return new EducationItem(e.getId(),e.getInstitution(),e.getDegree(),e.getStatus(),e.getLocation(),List.copyOf(e.getFocus())); }
    public ExperienceItem experience(Experience e) { return new ExperienceItem(e.getId(),e.getTitle(),e.getOrganization(),e.getDescription()); }
    public CertificationItem certification(Certification c) { return new CertificationItem(c.getId(),c.getTitle(),c.getIssuer(),c.getType(),c.getCredentialId()); }
    public ContactMessage contact(ContactRequest request) {
        ContactMessage message=new ContactMessage(); message.setName(request.name()); message.setEmail(request.email()); message.setSubject(request.subject()); message.setMessage(request.message()); return message;
    }
}
