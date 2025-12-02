package lk.ijse.cmjd.researchtracker.user.service;

import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lk.ijse.cmjd.researchtracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }
    
    public void deleteUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Prevent deleting ADMIN users
        if (user.getRole() == lk.ijse.cmjd.researchtracker.common.enums.UserRole.ADMIN) {
            throw new RuntimeException("Cannot delete an admin user");
        }
        
        userRepository.deleteById(id);
    }
    
    public UserDTO updateUserRole(String id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Prevent changing role of ADMIN users
        if (user.getRole() == lk.ijse.cmjd.researchtracker.common.enums.UserRole.ADMIN) {
            throw new RuntimeException("Cannot change the role of an admin user");
        }
        
        try {
            user.setRole(lk.ijse.cmjd.researchtracker.common.enums.UserRole.valueOf(role));
            User updatedUser = userRepository.save(user);
            return convertToDTO(updatedUser);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + role);
        }
    }
    
    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
