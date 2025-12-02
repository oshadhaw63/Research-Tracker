package lk.ijse.cmjd.researchtracker.project.service;

import lk.ijse.cmjd.researchtracker.common.enums.Status;
import lk.ijse.cmjd.researchtracker.project.dto.ProjectRequestDTO;
import lk.ijse.cmjd.researchtracker.project.dto.ProjectResponseDTO;
import lk.ijse.cmjd.researchtracker.project.entity.Project;
import lk.ijse.cmjd.researchtracker.project.repository.ProjectRepository;
import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lk.ijse.cmjd.researchtracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    
    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProjectResponseDTO getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return convertToDTO(project);
    }
    
    @Transactional
    public ProjectResponseDTO createProject(ProjectRequestDTO requestDTO, String piId) {
        User pi = userRepository.findById(piId)
                .orElseThrow(() -> new RuntimeException("Principal Investigator not found"));
        
        Project project = new Project();
        project.setTitle(requestDTO.getTitle());
        project.setSummary(requestDTO.getSummary());
        project.setStatus(requestDTO.getStatus());
        project.setPi(pi);
        project.setTags(requestDTO.getTags());
        project.setStartDate(requestDTO.getStartDate());
        project.setEndDate(requestDTO.getEndDate());
        
        Project savedProject = projectRepository.save(project);
        return convertToDTO(savedProject);
    }
    
    @Transactional
    public ProjectResponseDTO updateProject(String id, ProjectRequestDTO requestDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User pi = userRepository.findById(requestDTO.getPiId())
                .orElseThrow(() -> new RuntimeException("Principal Investigator not found"));
        
        project.setTitle(requestDTO.getTitle());
        project.setSummary(requestDTO.getSummary());
        project.setStatus(requestDTO.getStatus());
        project.setPi(pi);
        project.setTags(requestDTO.getTags());
        project.setStartDate(requestDTO.getStartDate());
        project.setEndDate(requestDTO.getEndDate());
        
        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }
    
    @Transactional
    public ProjectResponseDTO updateProjectStatus(String id, Status status) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        project.setStatus(status);
        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }
    
    @Transactional
    public void deleteProject(String id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }
        projectRepository.deleteById(id);
    }
    
    private ProjectResponseDTO convertToDTO(Project project) {
        UserDTO piDTO = new UserDTO(
                project.getPi().getId(),
                project.getPi().getUsername(),
                project.getPi().getFullName(),
                project.getPi().getRole(),
                project.getPi().getCreatedAt()
        );
        
        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getSummary(),
                project.getStatus(),
                piDTO,
                project.getTags(),
                project.getStartDate(),
                project.getEndDate(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}
