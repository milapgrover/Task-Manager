package com.taskmanager.service;


import com.taskmanager.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final JwtUtil jwt;
    private final BCryptPasswordEncoder encoder;

    public String register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "Registered";
    }

    public String login(String email, String pass) {
        User u = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("EMAIL: " + email);
        System.out.println("INPUT PASS: " + pass);
        System.out.println("DB PASS: " + u.getPassword());

        boolean match = encoder.matches(pass, u.getPassword());
        System.out.println("MATCH: " + match);

        if (!match) {
            throw new RuntimeException("Wrong password");
        }

        return jwt.generateToken(u.getEmail(), u.getRole().name());

    }
}