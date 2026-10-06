package com.samhi.portfolio.controller;
import com.samhi.portfolio.dto.request.ContactRequest;
import com.samhi.portfolio.dto.response.ApiResponse;
import com.samhi.portfolio.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/v1/contact") @RequiredArgsConstructor
public class ContactController {
    private final ContactService service;
    @PostMapping public ResponseEntity<ApiResponse<Void>> submit(@Valid @RequestBody ContactRequest request) {
        service.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Message successfully submitted.",null));
    }
}
