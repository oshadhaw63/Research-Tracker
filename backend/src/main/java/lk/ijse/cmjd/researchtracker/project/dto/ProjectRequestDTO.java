package lk.ijse.cmjd.researchtracker.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lk.ijse.cmjd.researchtracker.common.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestDTO {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String summary;
    
    @NotNull(message = "Status is required")
    private Status status;
    
    private String piId;
    
    private String tags;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    private LocalDate endDate;
}
