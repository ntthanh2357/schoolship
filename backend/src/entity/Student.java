package entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String userId; // Liên kết với User

    @Column(name = "major")
    private String major;

    @Column(name = "year")
    private Integer year;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    public Student() {}

    public Student(String id, String userId, String major, Integer year, Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.userId = userId;
        this.major = major;
        this.year = year;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters và setters...
}