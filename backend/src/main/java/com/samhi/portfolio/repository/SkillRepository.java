package com.samhi.portfolio.repository;
import com.samhi.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface SkillRepository extends JpaRepository<Skill,Long> { List<Skill> findAllByOrderBySortOrderAsc(); }
