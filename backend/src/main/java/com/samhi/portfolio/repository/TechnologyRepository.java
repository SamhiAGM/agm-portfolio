package com.samhi.portfolio.repository;
import com.samhi.portfolio.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface TechnologyRepository extends JpaRepository<Technology,Long> { Optional<Technology> findByName(String name); }
