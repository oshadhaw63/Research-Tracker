package lk.ijse.cmjd.researchtracker.auth.service;

import lk.ijse.cmjd.researchtracker.auth.dto.AuthResponseDTO;
import lk.ijse.cmjd.researchtracker.auth.dto.LoginRequestDTO;
import lk.ijse.cmjd.researchtracker.auth.dto.SignupRequestDTO;
import lk.ijse.cmjd.researchtracker.common.enums.UserRole;
import lk.ijse.cmjd.researchtracker.config.JwtService;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lk.ijse.cmjd.researchtracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public AuthResponseDTO signup(SignupRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(UserRole.MEMBER);
        
        User savedUser = userRepository.save(user);
        
        String jwtToken = jwtService.generateToken(user);
        
        return new AuthResponseDTO(
                jwtToken,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getFullName(),
                savedUser.getRole()
        );
    }
    
    public AuthResponseDTO login(LoginRequestDTO request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        
        // Get user details
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generate JWT token
        String jwtToken = jwtService.generateToken(user);
        
        return new AuthResponseDTO(
                jwtToken,
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole()
        );
    }
}
