-- BuimbPay dev database initialisation
-- Run once when the container first starts

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create test database
SELECT 'CREATE DATABASE buimbpay_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'buimbpay_test')\gexec
