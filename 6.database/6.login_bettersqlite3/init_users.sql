-- 1회성 초기화 방식
-- sqlite3 users.db < init_users.sql

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
);

-- 초기 사용자 추가
-- INSERT INTO users (username, password) VALUES ('user', 'password');
-- INSERT INTO users (username, password) VALUES ('user', 'password');
INSERT INTO users (username, password) VALUES 
    ('admin', '12qw34er'),
    ('user1', 'pass1'),
    ('user2', 'pass2'),
    ('user3', 'pass3');