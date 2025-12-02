package lk.ijse.cmjd.researchtracker.user.controller;

import lk.ijse.cmjd.researchtracker.common.dto.ResponseDTO;
import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lk.ijse.cmjd.researchtracker.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDTO<List<UserDTO>>> getAllUsers() {
        try {
            List<UserDTO> users = userService.getAllUsers();
            return ResponseEntity.ok(ResponseDTO.success("Users retrieved successfully", users));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<UserDTO>> getUserById(@PathVariable String id) {
        try {
            UserDTO user = userService.getUserById(id);
            return ResponseEntity.ok(ResponseDTO.success("User retrieved successfully", user));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDTO<UserDTO>> updateUserRole(
            @PathVariable String id,
            @RequestBody java.util.Map<String, String> request
    ) {
        try {
            String role = request.get("role");
            if (role == null || role.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(ResponseDTO.error("Role is required"));
            }
            UserDTO user = userService.updateUserRole(id, role);
            return ResponseEntity.ok(ResponseDTO.success("User role updated successfully", user));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDTO<Void>> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(ResponseDTO.success("User deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
}
