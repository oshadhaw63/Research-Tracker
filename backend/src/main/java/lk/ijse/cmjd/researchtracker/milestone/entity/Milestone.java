package lk.ijse.cmjd.researchtracker.milestone.entity;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.project.entity.Project;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Milestone Entity representing project milestones
 */
@Entity
@Table(name = "milestones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Milestone {
    
    @Id
    @Column(length = 50)
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private LocalDate dueDate;
    
    @Column(nullable = false)
    private Boolean isCompleted = false;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
    
    @PrePersist
    protected void onCreate() {
        if (id == null || id.isEmpty()) {
            id = "MLS-" + System.currentTimeMillis();
        }
        if (isCompleted == null) {
            isCompleted = false;
        }
    }
}
