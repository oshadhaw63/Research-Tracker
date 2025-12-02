package lk.ijse.cmjd.researchtracker.user.repository;

import lk.ijse.cmjd.researchtracker.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
