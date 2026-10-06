package com.samhi.portfolio.dto.response;
import java.time.Instant;
import java.util.Map;
public record ApiErrorResponse(boolean success,String message,Object data,Instant timestamp,Map<String,String> errors) {
    public static ApiErrorResponse of(String message,Map<String,String> errors) { return new ApiErrorResponse(false,message,null,Instant.now(),errors); }
}
