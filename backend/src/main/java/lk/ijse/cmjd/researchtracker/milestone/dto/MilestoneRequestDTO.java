package lk.ijse.cmjd.researchtracker.milestone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for creating/updating milestones
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneRequestDTO {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Due date is required")
    private LocalDate dueDate;
    
    private Boolean isCompleted;
    
    @NotBlank(message = "Created by user ID is required")
    private String createdById;
}
