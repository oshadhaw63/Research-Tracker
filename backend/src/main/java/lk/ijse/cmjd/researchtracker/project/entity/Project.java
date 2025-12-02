package lk.ijse.cmjd.researchtracker.project.entity;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.common.enums.Status;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Project Entity representing research projects
 */
@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @Column(length = 50)
    private String id;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String summary;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pi_id", nullable = false)
    private User pi; // Principal Investigator
    
    @Column(length = 500)
    private String tags;
    
    @Column(nullable = false)
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (id == null || id.isEmpty()) {
            id = "PRJ-" + System.currentTimeMillis();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
