package com.taskmanager.controller;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // ✅ GET PROJECTS
    @GetMapping
    public List<Project> getProjects(Authentication auth) {

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == User.Role.ADMIN) {
            return projectRepository.findAll();
        }

        return projectRepository.findByOwnerId(user.getId());
    }

    // ✅ CREATE PROJECT (IMPORTANT FIX)
    @PostMapping
    public Project createProject(@RequestBody Project project, Authentication auth) {

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 SET OWNER (MOST IMPORTANT LINE)
        project.setOwner(user);

        return projectRepository.save(project);
    }

    // ✅ DELETE PROJECT
    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id, Authentication auth) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        // 🔐 SECURITY CHECK
        if (user.getRole() != User.Role.ADMIN &&
                !project.getOwner().getId().equals(user.getId())) {

            throw new RuntimeException("Not allowed");
        }

        projectRepository.deleteById(id);
        return "Deleted";
    }
}