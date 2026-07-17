-- database/schema.sql
-- Supabase / PostgreSQL Schema definition for AI Paper Companion

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Papers Table: Store paper metadata and text content
CREATE TABLE IF NOT EXISTS papers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    authors VARCHAR(255),
    publish_year INT,
    source_category VARCHAR(100) DEFAULT 'Sutskever List', -- 'Sutskever List', 'Papers.com', 'AI Canon'
    abstract TEXT,
    draft_content TEXT,           -- Sagan + Mer style AI generated draft
    reviewed_content TEXT,        -- User modified content
    original_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Quizzes Table: Active Recall questions for each paper
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paper_id UUID NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB,                -- Array of options for multiple choice [ "Opt A", "Opt B", "Opt C" ]
    correct_answer TEXT NOT NULL,
    explanation TEXT,             -- Sagan + Mer styled explanation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Paper Relations Table: Network connections between papers (Knowledge Graph)
CREATE TABLE IF NOT EXISTS paper_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_paper_id UUID NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    target_paper_id UUID NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    relation_type VARCHAR(100) DEFAULT 'cites', -- 'cites' (인용), 'inspires' (영감), 'successor' (후속)
    description TEXT,             -- Explanation of the connection
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_relation UNIQUE (source_paper_id, target_paper_id)
);

-- 4. User Progress Table: User-specific study state tracker
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paper_id UUID NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'reading', 'reviewed'
    is_quiz_passed BOOLEAN DEFAULT FALSE,
    study_duration_seconds INT DEFAULT 0,
    last_studied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_paper UNIQUE (paper_id) -- Assuming single user setup initially
);

-- Add sample triggers for automatic updated_at timestamp updates
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_papers_modtime
    BEFORE UPDATE ON papers
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
