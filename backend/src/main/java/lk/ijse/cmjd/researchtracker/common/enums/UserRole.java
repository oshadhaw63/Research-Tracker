package lk.ijse.cmjd.researchtracker.common.enums;

/**
 * Enum representing user roles in the system
 * ADMIN - Full system access
 * PI - Principal Investigator, manages own projects
 * MEMBER - Can create milestones and upload documents
 * VIEWER - Read-only access
 */
public enum UserRole {
    ADMIN,
    PI,
    MEMBER,
    VIEWER
}
