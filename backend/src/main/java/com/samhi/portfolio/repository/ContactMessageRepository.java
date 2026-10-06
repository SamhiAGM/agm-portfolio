package com.samhi.portfolio.repository;
import com.samhi.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ContactMessageRepository extends JpaRepository<ContactMessage,Long> {}
