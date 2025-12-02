package lk.ijse.cmjd.researchtracker.document.repository;

import lk.ijse.cmjd.researchtracker.document.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Document entity
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, String> {
    List<Document> findByProjectId(String projectId);
}
