CREATE DATABASE IF NOT EXISTS sewing_admin_db;
USE sewing_admin_db;

CREATE TABLE IF NOT EXISTS employers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Active'
);

-- Insert sample data
INSERT INTO employers (name, email, role, status) 
VALUES ('John Doe', 'john@example.com', 'Manager', 'Active');