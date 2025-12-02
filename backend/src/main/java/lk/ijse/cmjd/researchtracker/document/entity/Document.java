package lk.ijse.cmjd.researchtracker.document.entity;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.project.entity.Project;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    
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
    
    @Column(nullable = false, length = 500)
    private String urlOrPath;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime uploadedAt;
    
    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
        if (id == null || id.isEmpty()) {
            id = "DOC-" + System.currentTimeMillis();
        }
    }
}
