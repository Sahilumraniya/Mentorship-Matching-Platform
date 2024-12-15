# Mentorship Website Documentation

## Overview
This document outlines the functionality, database schema, and design requirements for the mentorship website. The platform connects mentors and mentees, facilitating skill-sharing and professional growth.

---

## Database Schema
### 1. **users Table**
Purpose: Store basic user authentication details.

| Column       | Data Type      | Constraints                                 |
|--------------|----------------|---------------------------------------------|
| id           | INT            | PRIMARY KEY, AUTO_INCREMENT                |
| email        | VARCHAR(255)   | UNIQUE, NOT NULL                           |
| password     | VARCHAR(255)   | NOT NULL                                   |
| role         | ENUM('mentor', 'mentee') | NOT NULL                          |
| profile      | INT            | FOREIGN KEY (profiles.id)                  |
| created_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP                  |
| updated_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 2. **profiles Table**
Purpose: Store user-specific profile details like skills, interests, and bio.

| Column       | Data Type      | Constraints                                 |
|--------------|----------------|---------------------------------------------|
| id           | INT            | PRIMARY KEY, AUTO_INCREMENT                |
| bio          | TEXT           | NULLABLE                                   |
| skills       | JSON           | NULLABLE                                   |
| interests    | JSON           | NULLABLE                                   |
| created_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP                  |
| updated_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 3. **mentorship_requests Table**
Purpose: Track mentorship connection requests between users.

| Column       | Data Type      | Constraints                                 |
|--------------|----------------|---------------------------------------------|
| id           | INT            | PRIMARY KEY, AUTO_INCREMENT                |
| sender_id    | INT            | FOREIGN KEY (users.id)                     |
| receiver_id  | INT            | FOREIGN KEY (users.id)                     |
| status       | ENUM('pending', 'accepted', 'declined') | DEFAULT 'pending' |
| created_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP                  |
| updated_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 4. **notifications Table**
Purpose: Store notifications for mentorship requests and updates.

| Column       | Data Type      | Constraints                                 |
|--------------|----------------|---------------------------------------------|
| id           | INT            | PRIMARY KEY, AUTO_INCREMENT                |
| sender_id    | INT            | FOREIGN KEY (users.id)                     |
| receiver_id  | INT            | FOREIGN KEY (users.id)                     |
| content      | VARCHAR(500)   | NOT NULL                                   |
| is_read      | BOOLEAN        | DEFAULT FALSE                              |
| created_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP                  |

---

## Functional Requirements

### 1. **User Interface (UI) Design**
- **Design:** Clean, intuitive, and responsive interface using an existing CSS library (e.g., Bootstrap, Tailwind CSS).
- **Pages to Include:**
  - **User Registration and Login:** Page for secure user sign-up, login, and logout.
  - **Profile Setup:** Page to create and edit user profiles, specifying role (mentor/mentee), skills, interests, and bio.
  - **User Discovery:** Page to browse other profiles with filters for role, skills, and interests.
  - **Matchmaking:** Page to suggest mentorship matches based on preferences and profile information.

### 2. **Functionality**
- **User Authentication:**
  - Secure registration, login, and logout functionalities.
  - Input validation and error handling.
- **Profile Management:**
  - Create, edit, and delete profiles.
  - Ensure profile information is accurately displayed and updated.
- **Matching Algorithm:**
  - Suggest mentors or mentees based on skills and interests.
  - In this i am using a simple algorithm to match mentors and mentees based on their skills and interests (by sql query).
    - If a mentor has a skill that matches a mentee's interest, they are considered a match.
    - If a mentor has multiple skills that match a mentee's interests, they are considered a better match.
    - The algorithm can be further refined based on user feedback and performance metrics.
- **Connection Requests:**
  - Send, receive, accept, and decline mentorship requests.
  - Manage ongoing mentorship connections.
- **Notifications:**
  - Notify users of new mentorship requests or updates.

---

## Final Deliverables
1. **Database Implementation:**
   - Create and configure all required tables based on the schema provided.
   - Ensure data integrity with appropriate constraints.

2. **Frontend Development:**
   - Design and implement the specified UI using Tailwind CSS.
   - Ensure responsiveness and accessibility across devices.

3. **Backend Development:**
   - Implement secure user authentication and profile management.
   - Develop and test the matching algorithm for mentor/mentee connections.
   - Create endpoints for handling mentorship requests and notifications.

4. **Testing and Deployment:**
   - Perform rigorous testing to ensure all functionalities work as expected.
   - Deploy the application to a production-ready environment.

---

## Note
- **Please refer to the database schema and functional requirements when developing the mentorship website.**
- **Feel free to reach out if you have any questions or need further clarification.**
- **i am working on this project and will update the documentation as needed.**
---

