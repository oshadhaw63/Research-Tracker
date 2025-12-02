package lk.ijse.cmjd.researchtracker.milestone.service;

import lk.ijse.cmjd.researchtracker.milestone.dto.MilestoneRequestDTO;
import lk.ijse.cmjd.researchtracker.milestone.dto.MilestoneResponseDTO;
import lk.ijse.cmjd.researchtracker.milestone.entity.Milestone;
import lk.ijse.cmjd.researchtracker.milestone.repository.MilestoneRepository;
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
public class MilestoneService {
    
    private final MilestoneRepository milestoneRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    
    public List<MilestoneResponseDTO> getMilestonesByProjectId(String projectId) {
        return milestoneRepository.findByProjectId(projectId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public MilestoneResponseDTO createMilestone(String projectId, MilestoneRequestDTO requestDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User createdBy = userRepository.findById(requestDTO.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Milestone milestone = new Milestone();
        milestone.setProject(project);
        milestone.setTitle(requestDTO.getTitle());
        milestone.setDescription(requestDTO.getDescription());
        milestone.setDueDate(requestDTO.getDueDate());
        milestone.setIsCompleted(requestDTO.getIsCompleted() != null ? requestDTO.getIsCompleted() : false);
        milestone.setCreatedBy(createdBy);
        
        Milestone savedMilestone = milestoneRepository.save(milestone);
        return convertToDTO(savedMilestone);
    }
    
    @Transactional
    public MilestoneResponseDTO updateMilestone(String id, MilestoneRequestDTO requestDTO) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone not found"));
        
        User createdBy = userRepository.findById(requestDTO.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        milestone.setTitle(requestDTO.getTitle());
        milestone.setDescription(requestDTO.getDescription());
        milestone.setDueDate(requestDTO.getDueDate());
        milestone.setIsCompleted(requestDTO.getIsCompleted() != null ? requestDTO.getIsCompleted() : false);
        milestone.setCreatedBy(createdBy);
        
        Milestone updatedMilestone = milestoneRepository.save(milestone);
        return convertToDTO(updatedMilestone);
    }
    
    @Transactional
    public void deleteMilestone(String id) {
        if (!milestoneRepository.existsById(id)) {
            throw new RuntimeException("Milestone not found");
        }
        milestoneRepository.deleteById(id);
    }
    
    private MilestoneResponseDTO convertToDTO(Milestone milestone) {
        UserDTO createdByDTO = new UserDTO(
                milestone.getCreatedBy().getId(),
                milestone.getCreatedBy().getUsername(),
                milestone.getCreatedBy().getFullName(),
                milestone.getCreatedBy().getRole(),
                milestone.getCreatedBy().getCreatedAt()
        );
        
        return new MilestoneResponseDTO(
                milestone.getId(),
                milestone.getProject().getId(),
                milestone.getTitle(),
                milestone.getDescription(),
                milestone.getDueDate(),
                milestone.getIsCompleted(),
                createdByDTO
        );
    }
}
