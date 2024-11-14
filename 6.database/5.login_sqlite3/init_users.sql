-- 1회성 초기화 방식
-- sqlite3 users.db < init_users.sql

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 기본값은 현재 시간, 
    role TEXT DEFAULT 'user'
);

-- 초기 사용자 추가
-- INSERT INTO users (username, password) VALUES ('user', 'password');
-- INSERT INTO users (username, password) VALUES ('user', 'password');
INSERT INTO users (username, password, email, role) VALUES 
    ('admin', '12qw34er', 'ceo@company.com', 'admin'),
    ('user1', 'pass1', 'user1@naver.com', 'user');

INSERT INTO users (username, password, email) VALUES
    ('user2', 'pass2', 'user2@naver.com'),
    ('user3', 'pass3', 'user3@naver.com');