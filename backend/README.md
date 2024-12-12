# backend

> 

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## DATA TABLES

Here’s the list of tables and their purpose:

### 1. users Table

**Purpose:** Store basic user authentication details.

| Column | Data Type | Constraints |
|:-------|:----------|:------------|
| id     | INT       | PRIMARY KEY, AUTO_INCREMENT |
| email  | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| role   | ENUM('mentor', 'mentee') | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 2. profiles Table

**Purpose:** Store user-specific profile details like skills, interests, and bio.

| Column | Data Type | Constraints |
|:-------|:----------|:------------|
| id     | INT       | PRIMARY KEY, AUTO_INCREMENT |
| user_id | INT       | FOREIGN KEY (users.id) |
| bio    | TEXT      | NULLABLE |
| skills | JSON      | NULLABLE |
| interests | JSON    | NULLABLE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 3. mentorship_requests Table

**Purpose:** Track mentorship connection requests between users.

| Column | Data Type | Constraints |
|:-------|:----------|:------------|
| id     | INT       | PRIMARY KEY, AUTO_INCREMENT |
| sender_id | INT     | FOREIGN KEY (users.id) |
| receiver_id | INT   | FOREIGN KEY (users.id) |
| status  | ENUM     | DEFAULT 'pending' |
|         |          | ('pending', 'accepted', 'declined') |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 4. notifications Table

**Purpose:** Store notifications for mentorship requests and updates.

| Column | Data Type | Constraints |
|:-------|:----------|:------------|
| id     | INT       | PRIMARY KEY, AUTO_INCREMENT |
| user_id | INT      | FOREIGN KEY (users.id) |
| message | VARCHAR(500) | NOT NULL |
| is_read | BOOLEAN  | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 5. matches Table

**Purpose:** Store the results of the matching algorithm for potential mentors/mentees.

| Column | Data Type | Constraints |
|:-------|:----------|:------------|
| id     | INT       | PRIMARY KEY, AUTO_INCREMENT |
| mentor_id | INT     | FOREIGN KEY (users.id) |
| mentee_id | INT    | FOREIGN KEY (users.id) |
| match_score | FLOAT  | NULLABLE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |


## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/backend
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
