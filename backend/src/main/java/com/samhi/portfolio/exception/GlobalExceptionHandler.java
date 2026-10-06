package com.samhi.portfolio.exception;
import com.samhi.portfolio.dto.response.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import java.util.*;
@RestControllerAdvice @Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiErrorResponse> invalid(MethodArgumentNotValidException exception) {
        Map<String,String> errors=new LinkedHashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error->errors.putIfAbsent(error.getField(),error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(ApiErrorResponse.of("Please check the submitted fields.",errors));
    }
    @ExceptionHandler({ResourceNotFoundException.class,NoResourceFoundException.class})
    ResponseEntity<ApiErrorResponse> missing(Exception exception) { return ResponseEntity.status(404).body(ApiErrorResponse.of("Resource not found.",Map.of())); }
    @ExceptionHandler({HttpMessageNotReadableException.class,ValidationException.class})
    ResponseEntity<ApiErrorResponse> malformed(Exception exception) { return ResponseEntity.badRequest().body(ApiErrorResponse.of("Invalid request body.",Map.of())); }
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    ResponseEntity<ApiErrorResponse> method(Exception exception) { return ResponseEntity.status(405).body(ApiErrorResponse.of("Method not allowed.",Map.of())); }
    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiErrorResponse> unexpected(Exception exception) {
        log.error("Unhandled API error",exception);
        return ResponseEntity.status(500).body(ApiErrorResponse.of("The service is temporarily unavailable. Please try again.",Map.of()));
    }
}
