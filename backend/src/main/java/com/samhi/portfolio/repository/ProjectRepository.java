package com.samhi.portfolio.repository;
import com.samhi.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findAllByOrderBySortOrderAsc();
    List<Project> findByFeaturedTrueOrderBySortOrderAsc();
    Optional<Project> findBySlug(String slug);
}
