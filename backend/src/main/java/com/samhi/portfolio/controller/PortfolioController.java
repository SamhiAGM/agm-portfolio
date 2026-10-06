package com.samhi.portfolio.controller;
import com.samhi.portfolio.dto.response.*;
import com.samhi.portfolio.dto.response.CatalogResponses.*;
import com.samhi.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/v1") @RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService service;
    @GetMapping("/projects") public ApiResponse<List<ProjectResponse>> projects() { return ApiResponse.ok("Projects retrieved.",service.projects(false)); }
    @GetMapping("/projects/featured") public ApiResponse<List<ProjectResponse>> featured() { return ApiResponse.ok("Featured projects retrieved.",service.projects(true)); }
    @GetMapping("/projects/{slug}") public ApiResponse<ProjectResponse> project(@PathVariable String slug) { return ApiResponse.ok("Project retrieved.",service.project(slug)); }
    @GetMapping("/skills") public ApiResponse<List<SkillGroup>> skills() { return ApiResponse.ok("Skills retrieved.",service.skills()); }
    @GetMapping("/education") public ApiResponse<List<EducationItem>> education() { return ApiResponse.ok("Education retrieved.",service.education()); }
    @GetMapping("/experience") public ApiResponse<List<ExperienceItem>> experience() { return ApiResponse.ok("Experience retrieved.",service.experience()); }
    @GetMapping("/certifications") public ApiResponse<List<CertificationItem>> certifications() { return ApiResponse.ok("Memberships and activities retrieved.",service.certifications()); }
    @GetMapping("/social-links") public ApiResponse<List<SocialItem>> socialLinks() { return ApiResponse.ok("Social links retrieved.",service.socialLinks()); }
}
