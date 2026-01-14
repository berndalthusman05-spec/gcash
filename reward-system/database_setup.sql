-- SQL Setup for Reward System Verification Page
-- This script creates the 'users' table and sets up security policies.

-- 1. Enable UUID extension for generating random IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the 'users' table
-- Columns match frontend payload exactly: country, phone, email, reward_code
CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    country text,
    phone text,
    email text,
    reward_code text,
    created_at timestamp with time zone DEFAULT now()
);

-- 3. Enable Row Level Security (RLS)
-- This locks down the table so only authorized requests can access it.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policy for Insert
-- We choose Option B: Enable RLS and create a specific policy for anon users.
-- Why: This is safer than disabling RLS completely. It allows public users (anon) 
-- to INSERT data (submit the form) but prevents them from reading or deleting 
-- other people's data.

CREATE POLICY "Enable insert for anon users" 
ON public.users 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 5. (Optional) Create Policy for Select
-- If you want to verify data via the dashboard only, no SELECT policy is needed for anon.
-- We do NOT add a SELECT policy for anon, ensuring user data remains private.

-- End of Setup
