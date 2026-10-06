package com.samhi.portfolio;
import com.samhi.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import java.net.*;
import java.net.http.*;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT) @ActiveProfiles("test")
class PortfolioIntegrationTest {
    @LocalServerPort int port;
    @Autowired ContactMessageRepository messages;
    final HttpClient client=HttpClient.newHttpClient();
    HttpResponse<String> get(String path) throws Exception { return client.send(HttpRequest.newBuilder(URI.create("http://localhost:"+port+"/api/v1"+path)).GET().build(),HttpResponse.BodyHandlers.ofString()); }
    HttpResponse<String> post(String body) throws Exception { return client.send(HttpRequest.newBuilder(URI.create("http://localhost:"+port+"/api/v1/contact")).header("Content-Type","application/json").POST(HttpRequest.BodyPublishers.ofString(body)).build(),HttpResponse.BodyHandlers.ofString()); }
    @Test void seededCatalogAndNotFound() throws Exception {
        for(String path:new String[]{"/projects","/projects/featured","/projects/lankacare","/skills","/education","/experience","/certifications","/social-links"}) {
            var response=get(path);assertEquals(200,response.statusCode(),path);assertTrue(response.body().contains("\"success\":true"));
        }
        assertTrue(get("/projects").body().contains("glucose-forecasting"));assertEquals(404,get("/projects/missing").statusCode());
    }
    @Test void contactPersistsAndRejectsInvalidInput() throws Exception {
        long before=messages.count();
        assertEquals(201,post("{\"name\":\"Recruiter\",\"email\":\"recruiter@example.com\",\"subject\":\"Internship opportunity\",\"message\":\"We would like to discuss an engineering internship.\"}").statusCode());
        assertEquals(before+1,messages.count());
        var invalid=post("{\"name\":\" \",\"email\":\"invalid\",\"subject\":\" \",\"message\":\"short\"}");assertEquals(400,invalid.statusCode());assertTrue(invalid.body().contains("email"));
        assertEquals(before+1,messages.count());assertEquals(400,post("{bad json").statusCode());
        assertEquals(413,post("x".repeat(33000)).statusCode());
    }
    @Test void corsAllowsConfiguredOriginAndRejectsOthers() throws Exception {
        var allowed=client.send(HttpRequest.newBuilder(URI.create("http://localhost:"+port+"/api/v1/contact")).header("Origin","http://localhost:3000").header("Access-Control-Request-Method","POST").method("OPTIONS",HttpRequest.BodyPublishers.noBody()).build(),HttpResponse.BodyHandlers.ofString());
        assertEquals(200,allowed.statusCode());assertEquals("http://localhost:3000",allowed.headers().firstValue("Access-Control-Allow-Origin").orElse(""));
        var denied=client.send(HttpRequest.newBuilder(URI.create("http://localhost:"+port+"/api/v1/contact")).header("Origin","https://untrusted.example").header("Access-Control-Request-Method","POST").method("OPTIONS",HttpRequest.BodyPublishers.noBody()).build(),HttpResponse.BodyHandlers.ofString());assertEquals(403,denied.statusCode());
    }
}
