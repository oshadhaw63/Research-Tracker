package lk.ijse.cmjd.researchtracker.milestone.repository;

import lk.ijse.cmjd.researchtracker.milestone.entity.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Milestone entity
 */
@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, String> {
    List<Milestone> findByProjectId(String projectId);
}
