package com.samhi.portfolio.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final String[] origins;
    public WebConfig(@Value("${portfolio.frontend-url}") String origin) { origins=origin.split(","); }
    @Override public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**").allowedOrigins(origins).allowedMethods("GET","POST","OPTIONS").allowedHeaders("Content-Type").allowCredentials(false).maxAge(3600);
    }
}
