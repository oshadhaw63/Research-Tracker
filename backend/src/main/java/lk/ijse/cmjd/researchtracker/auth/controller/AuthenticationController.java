package lk.ijse.cmjd.researchtracker.auth.controller;

import jakarta.validation.Valid;
import lk.ijse.cmjd.researchtracker.auth.dto.AuthResponseDTO;
import lk.ijse.cmjd.researchtracker.auth.dto.LoginRequestDTO;
import lk.ijse.cmjd.researchtracker.auth.dto.SignupRequestDTO;
import lk.ijse.cmjd.researchtracker.auth.service.AuthenticationService;
import lk.ijse.cmjd.researchtracker.common.dto.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    
    private final AuthenticationService authenticationService;
    
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO<AuthResponseDTO>> signup(@Valid @RequestBody SignupRequestDTO request) {
        try {
            AuthResponseDTO response = authenticationService.signup(request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ResponseDTO.success("User registered successfully", response));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ResponseDTO<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            AuthResponseDTO response = authenticationService.login(request);
            return ResponseEntity.ok(ResponseDTO.success("Login successful", response));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(ResponseDTO.error("Invalid credentials"));
        }
    }
}
