package lk.ijse.cmjd.researchtracker.document.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating/updating documents
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequestDTO {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotBlank(message = "URL or path is required")
    private String urlOrPath;
    
    @NotBlank(message = "Uploaded by user ID is required")
    private String uploadedById;
}
