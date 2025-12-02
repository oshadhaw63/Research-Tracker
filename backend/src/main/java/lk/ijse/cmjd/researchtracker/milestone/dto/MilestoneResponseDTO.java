package lk.ijse.cmjd.researchtracker.milestone.dto;

import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Milestone responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneResponseDTO {
    private String id;
    private String projectId;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Boolean isCompleted;
    private UserDTO createdBy;
}
