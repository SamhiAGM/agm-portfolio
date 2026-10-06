package com.samhi.portfolio.security;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.*;
import java.time.Instant;
import java.util.*;
/** Bounded request bodies and an in-process limiter. Trusts the direct peer only. */
@Component
public class RequestProtectionFilter extends OncePerRequestFilter {
    private static final int MAX_BODY=32768;
    private static final long WINDOW=600_000;
    private final Map<String,Window> clients=new HashMap<>();
    private final int limit;
    public RequestProtectionFilter(@Value("${portfolio.contact-limit:5}") int limit) { this.limit=limit; }
    @Override protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain) throws ServletException,IOException {
        response.setHeader("X-Content-Type-Options","nosniff");response.setHeader("X-Frame-Options","DENY");response.setHeader("Referrer-Policy","no-referrer");response.setHeader("Cache-Control","no-store");
        if(!request.getMethod().equals("POST")||!request.getRequestURI().equals("/api/v1/contact")) { chain.doFilter(request,response);return; }
        if(!allowed(request.getRemoteAddr())) { response.setHeader("Retry-After","600");error(response,429,"Too many messages. Please try again later.");return; }
        byte[] body=request.getInputStream().readNBytes(MAX_BODY+1);
        if(body.length>MAX_BODY) { error(response,413,"The request is too large.");return; }
        chain.doFilter(new BodyRequest(request,body),response);
    }
    private synchronized boolean allowed(String peer) {
        long now=System.currentTimeMillis();clients.entrySet().removeIf(e->now-e.getValue().start>=WINDOW);
        Window window=clients.get(peer);
        if(window==null) { if(clients.size()>=10000)return false;clients.put(peer,new Window(now,1));return true; }
        if(window.count>=limit)return false;window.count++;return true;
    }
    private void error(HttpServletResponse response,int status,String message) throws IOException {
        response.setStatus(status);response.setContentType("application/json");response.getWriter().write("{\"success\":false,\"message\":\""+message+"\",\"data\":null,\"timestamp\":\""+Instant.now()+"\",\"errors\":{}}");
    }
    private static final class Window { final long start;int count;Window(long start,int count) { this.start=start;this.count=count; } }
    private static final class BodyRequest extends HttpServletRequestWrapper {
        private final byte[] body;
        BodyRequest(HttpServletRequest request,byte[] body) { super(request);this.body=body; }
        @Override public ServletInputStream getInputStream() {
            var stream=new ByteArrayInputStream(body);
            return new ServletInputStream() {
                @Override public int read() { return stream.read(); }
                @Override public boolean isFinished() { return stream.available()==0; }
                @Override public boolean isReady() { return true; }
                @Override public void setReadListener(ReadListener listener) { throw new UnsupportedOperationException("Synchronous endpoint"); }
            };
        }
        @Override public BufferedReader getReader() { return new BufferedReader(new InputStreamReader(getInputStream(),java.nio.charset.StandardCharsets.UTF_8)); }
    }
}
