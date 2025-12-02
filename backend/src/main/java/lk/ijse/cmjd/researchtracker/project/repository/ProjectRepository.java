package lk.ijse.cmjd.researchtracker.project.repository;

import lk.ijse.cmjd.researchtracker.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Project entity
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
    List<Project> findByPiId(String piId);
}
