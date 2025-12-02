package lk.ijse.cmjd.researchtracker.project.dto;

import lk.ijse.cmjd.researchtracker.common.enums.Status;
import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO for Project responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseDTO {
    private String id;
    private String title;
    private String summary;
    private Status status;
    private UserDTO pi;
    private String tags;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
