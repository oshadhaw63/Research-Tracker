package lk.ijse.cmjd.researchtracker.user.dto;

import lk.ijse.cmjd.researchtracker.common.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for User responses (without password)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private String fullName;
    private UserRole role;
    private LocalDateTime createdAt;
}
