package com.samhi.portfolio.config;
import com.fasterxml.jackson.databind.*;
import com.samhi.portfolio.entity.*;
import com.samhi.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
@Component @RequiredArgsConstructor @Slf4j
@ConditionalOnProperty(name="portfolio.seed-enabled",havingValue="true",matchIfMissing=true)
public class DataSeeder implements CommandLineRunner {
    private final ProjectRepository projects;
    private final TechnologyRepository technologies;
    private final SkillRepository skills;
    private final ExperienceRepository experiences;
    private final EducationRepository education;
    private final CertificationRepository certifications;
    private final SocialLinkRepository socials;
    @Override @Transactional public void run(String... args) throws Exception {
        var mapper=new ObjectMapper();
        try(var stream=new ClassPathResource("content/portfolio.json").getInputStream()) {
            JsonNode data=mapper.readTree(stream);
            if(projects.count()==0) {
                int order=0;
                for(JsonNode node:data.get("projects")) {
                    Project p=mapper.treeToValue(withoutTechnologies(node),Project.class);
                    p.setSortOrder(order++);
                    for(JsonNode name:node.get("technologies")) p.getTechnologies().add(technology(name.asText()));
                    p.setFullDescription(p.getShortDescription()); projects.save(p);
                }
            }
            if(skills.count()==0) {
                int order=0;
                for(JsonNode group:data.get("skillGroups")) for(JsonNode name:group.get("technologies")) {
                    Skill s=new Skill();s.setCategory(group.get("category").asText());s.setLevel(group.get("level").asText());s.setTechnology(technology(name.asText()));s.setSortOrder(order++);skills.save(s);
                }
            }
            if(experiences.count()==0) { int order=0;for(JsonNode node:data.get("journey")) { Experience e=mapper.treeToValue(node,Experience.class);e.setSortOrder(order++);experiences.save(e); } }
            if(education.count()==0) { Education e=new Education();e.setInstitution("University of Ruhuna");e.setDegree("BSc. (Hons) Computer Engineering");e.setStatus("Undergraduate");e.setLocation("Sri Lanka");e.setFocus(List.of("Software Engineering","Computer Engineering","Machine Learning","Networking","DevOps","Backend Engineering","Database Systems"));education.save(e); }
            if(certifications.count()==0) {
                certification("IESL Student Member","Institution of Engineers, Sri Lanka","MEMBERSHIP","S-3388");
                certification("IEEE Xtreme","IEEE","PARTICIPATION",null);
                certification("RedCypher Competition","RedCypher","PARTICIPATION",null);
            }
            if(socials.count()==0) for(String platform:List.of("github","linkedin","organization")) { SocialLink link=new SocialLink();link.setPlatform(platform);link.setUrl(data.get("profile").get(platform).asText());socials.save(link); }
        }
        log.info("Portfolio catalog ready. Seed data is inserted only into empty tables.");
    }
    private JsonNode withoutTechnologies(JsonNode node) { var copy=node.deepCopy();((com.fasterxml.jackson.databind.node.ObjectNode)copy).remove("technologies");return copy; }
    private Technology technology(String name) { return technologies.findByName(name).orElseGet(()->technologies.save(new Technology(name))); }
    private void certification(String title,String issuer,String type,String credential) { Certification c=new Certification();c.setTitle(title);c.setIssuer(issuer);c.setType(type);c.setCredentialId(credential);certifications.save(c); }
}
