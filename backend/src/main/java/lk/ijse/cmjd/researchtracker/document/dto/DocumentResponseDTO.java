package lk.ijse.cmjd.researchtracker.document.dto;

import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Document responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponseDTO {
    private String id;
    private String projectId;
    private String title;
    private String description;
    private String urlOrPath;
    private UserDTO uploadedBy;
    private LocalDateTime uploadedAt;
}
