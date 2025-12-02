package lk.ijse.cmjd.researchtracker.auth.dto;

import lk.ijse.cmjd.researchtracker.common.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response with JWT token
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private String userId;
    private String username;
    private String fullName;
    private UserRole role;
}
