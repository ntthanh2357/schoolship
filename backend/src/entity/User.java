package entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role; // student | advisor | admin

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "email_verified")
    private Boolean emailVerified = false;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "last_login")
    private Timestamp lastLogin;

    public User() {}

    // Getters and setters...

    // Bạn có thể thêm constructor, getter/setter đầy đủ ở đây
}