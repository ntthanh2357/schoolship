package entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String advisorId;

    @Column(name = "scheduled_time", nullable = false)
    private Timestamp scheduledTime;

    @Column(name = "status", nullable = false)
    private String status; // pending, confirmed, cancelled, completed

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    public Appointment() {}

    public Appointment(String id, String studentId, String advisorId, Timestamp scheduledTime, String status, Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.studentId = studentId;
        this.advisorId = advisorId;
        this.scheduledTime = scheduledTime;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters và setters...
    
}
