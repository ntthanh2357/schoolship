package d01rt6.scholarship.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import d01rt6.scholarship.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByUserId(String userId);

    User findByEmail(String email);

    List<User> findByRole(String role);

    @Query(value = "SELECT DATE(created_at) as date, COUNT(*) as count FROM users GROUP BY DATE(created_at) ORDER BY date ASC", nativeQuery = true)
    List<Object[]> countUserByCreatedDate();

}
