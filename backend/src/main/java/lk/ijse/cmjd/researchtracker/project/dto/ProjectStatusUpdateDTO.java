package lk.ijse.cmjd.researchtracker.project.dto;

import jakarta.validation.constraints.NotNull;
import lk.ijse.cmjd.researchtracker.common.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating project status
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectStatusUpdateDTO {
    
    @NotNull(message = "Status is required")
    private Status status;
}
