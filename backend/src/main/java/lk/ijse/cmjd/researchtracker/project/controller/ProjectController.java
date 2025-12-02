package lk.ijse.cmjd.researchtracker.project.controller;

import jakarta.validation.Valid;
import lk.ijse.cmjd.researchtracker.common.dto.ResponseDTO;
import lk.ijse.cmjd.researchtracker.project.dto.ProjectRequestDTO;
import lk.ijse.cmjd.researchtracker.project.dto.ProjectResponseDTO;
import lk.ijse.cmjd.researchtracker.project.dto.ProjectStatusUpdateDTO;
import lk.ijse.cmjd.researchtracker.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    
    private final ProjectService projectService;
    
    @GetMapping
    public ResponseEntity<ResponseDTO<List<ProjectResponseDTO>>> getAllProjects() {
        try {
            List<ProjectResponseDTO> projects = projectService.getAllProjects();
            return ResponseEntity.ok(ResponseDTO.success("Projects retrieved successfully", projects));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<ProjectResponseDTO>> getProjectById(@PathVariable String id) {
        try {
            ProjectResponseDTO project = projectService.getProjectById(id);
            return ResponseEntity.ok(ResponseDTO.success("Project retrieved successfully", project));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<ProjectResponseDTO>> createProject(
            @Valid @RequestBody ProjectRequestDTO request,
            org.springframework.security.core.Authentication authentication
    ) {
        try {
            // Get authenticated user
            lk.ijse.cmjd.researchtracker.user.entity.User currentUser = (lk.ijse.cmjd.researchtracker.user.entity.User) authentication.getPrincipal();
            ProjectResponseDTO project = projectService.createProject(request, currentUser.getId());
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ResponseDTO.success("Project created successfully", project));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<ProjectResponseDTO>> updateProject(
            @PathVariable String id,
            @Valid @RequestBody ProjectRequestDTO request
    ) {
        try {
            ProjectResponseDTO project = projectService.updateProject(id, request);
            return ResponseEntity.ok(ResponseDTO.success("Project updated successfully", project));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<ProjectResponseDTO>> updateProjectStatus(
            @PathVariable String id,
            @Valid @RequestBody ProjectStatusUpdateDTO request
    ) {
        try {
            ProjectResponseDTO project = projectService.updateProjectStatus(id, request.getStatus());
            return ResponseEntity.ok(ResponseDTO.success("Project status updated successfully", project));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDTO<Void>> deleteProject(@PathVariable String id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok(ResponseDTO.success("Project deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
}
