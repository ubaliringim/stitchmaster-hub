CREATE DATABASE IF NOT EXISTS sewing_admin_db;
USE sewing_admin_db;

CREATE TABLE IF NOT EXISTS employers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  dailyDate DATE NOT NULL,
  dailyCollection DECIMAL(10,2) NOT NULL,
  dailyReturning DECIMAL(10,2) NOT NULL,
  totalTarget DECIMAL(10,2) NOT NULL,
  totalDue DECIMAL(10,2) NOT NULL,
  amountToPay DECIMAL(10,2) NOT NULL,
  accountName VARCHAR(255) NOT NULL,
  accountNumber VARCHAR(50) NOT NULL,
  bankName VARCHAR(255) NOT NULL,
  payeeName VARCHAR(255) NOT NULL
);

-- Insert sample data
INSERT INTO employers (
  name, role, email, status, dailyDate, 
  dailyCollection, dailyReturning, totalTarget, 
  totalDue, amountToPay, accountName, 
  accountNumber, bankName, payeeName
) VALUES 
(
  'John Doe', 'Manager', 'john@example.com', 'Active', 
  CURRENT_DATE(), 1000.00, 200.00, 5000.00, 
  3000.00, 2000.00, 'John Doe', 
  '1234567890', 'Sample Bank', 'John Doe'
);