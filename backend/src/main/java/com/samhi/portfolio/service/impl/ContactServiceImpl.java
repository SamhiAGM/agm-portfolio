package com.samhi.portfolio.service.impl;
import com.samhi.portfolio.dto.request.ContactRequest;
import com.samhi.portfolio.mapper.PortfolioMapper;
import com.samhi.portfolio.repository.ContactMessageRepository;
import com.samhi.portfolio.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @RequiredArgsConstructor @Slf4j
public class ContactServiceImpl implements ContactService {
    private final ContactMessageRepository repository;
    private final PortfolioMapper mapper;
    @Transactional public void submit(ContactRequest request) {
        var saved=repository.save(mapper.contact(request));
        log.info("Contact message persisted: id={}",saved.getId());
    }
}
