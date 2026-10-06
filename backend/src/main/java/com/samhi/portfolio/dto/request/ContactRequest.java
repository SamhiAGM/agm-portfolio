package com.samhi.portfolio.dto.request;
import jakarta.validation.constraints.*;
public record ContactRequest(
    @NotBlank @Size(min=2,max=100) String name,
    @NotBlank @Email @Size(max=254) String email,
    @NotBlank @Size(min=3,max=150) String subject,
    @NotBlank @Size(min=20,max=5000) String message
) {
    public ContactRequest { name=trim(name); email=trim(email); subject=trim(subject); message=trim(message); }
    private static String trim(String value) { return value==null ? null : value.strip(); }
}
