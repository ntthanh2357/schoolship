package d01rt6.scholarship.backend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import d01rt6.scholarship.backend.entity.User;
import d01rt6.scholarship.backend.repository.UserRepository;
import d01rt6.scholarship.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {

    @Value("${google.clientId}")
    private String googleClientId;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleTokenRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Kiểm tra user đã tồn tại chưa
                User user = userRepository.findByEmail(email);
                if (user == null) {
                    // Tạo user mới
                    user = new User();
                    user.setEmail(email);
                    user.setName(name);
                    userRepository.save(user);
                }

                // Sinh JWT
                String jwt = jwtUtil.generateToken(user);

                return ResponseEntity.ok(new JwtResponse(jwt));
            } else {
                return ResponseEntity.badRequest().body("Invalid ID token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Google authentication failed: " + e.getMessage());
        }
    }

    // DTO cho request
    public static class GoogleTokenRequest {
        private String idToken;
        public String getIdToken() { return idToken; }
        public void setIdToken(String idToken) { this.idToken = idToken; }
    }

    // DTO cho response
    public static class JwtResponse {
        private String token;
        public JwtResponse(String token) { this.token = token; }
        public String getToken() { return token; }
    }
} 