-- Drop the database if it already exists
DROP DATABASE IF EXISTS Java_Advanced_Final_Exam;
-- Create database
CREATE DATABASE IF NOT EXISTS Java_Advanced_Final_Exam;
USE Java_Advanced_Final_Exam;

-- Create table Department
DROP TABLE IF EXISTS 	`Department`;
CREATE TABLE IF NOT EXISTS `Department` (
	DepartmentId 			INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	DepartmentName 			NVARCHAR(50) NOT NULL UNIQUE KEY,
    TotalMember				INT UNSIGNED NOT NULL DEFAULT 0,
    DepartmentType			ENUM('Dev','Test','ScrumMaster','PM') NOT NULL,
    CreateDate				DATETIME DEFAULT NOW()
);

-- create table: Account
DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account`(
	AccountID				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Username				VARCHAR(18) NOT NULL UNIQUE KEY,
	`Password` 				VARCHAR(800) NOT NULL,
    FirstName				NVARCHAR(50) NOT NULL,
    LastName				NVARCHAR(50) NOT NULL,
    `Role` 					ENUM('Admin','Employee','Manager') NOT NULL DEFAULT 'Employee',
    DepartmentID 			INT UNSIGNED,
    FOREIGN KEY(DepartmentID) REFERENCES Department(DepartmentID) ON DELETE SET NULL
);

-- create after insert trigger
CREATE TRIGGER totalMember_after_insert 
AFTER INSERT ON `Account`
FOR EACH ROW
UPDATE `Department`
SET TotalMember = (SELECT COUNT(*) FROM `Account` WHERE `Account`.DepartmentID = `Department`.DepartmentID)
WHERE `Department`.DepartmentID = NEW.DepartmentID;

-- create after update trigger
CREATE TRIGGER totalMember_after_update_1 
AFTER UPDATE ON `Account`
FOR EACH ROW
UPDATE `Department`
SET TotalMember = (SELECT COUNT(*) FROM `Account` WHERE `Account`.DepartmentID = `Department`.DepartmentID)
WHERE `Department`.DepartmentID = NEW.DepartmentID;

CREATE TRIGGER totalMember_after_update_2 
AFTER UPDATE ON `Account`
FOR EACH ROW
UPDATE `Department`
SET TotalMember = (SELECT COUNT(*) FROM `Account` WHERE `Account`.DepartmentID = `Department`.DepartmentID)
WHERE `Department`.DepartmentID = OLD.DepartmentID;

-- create after delete trigger
CREATE TRIGGER totalMember_after_delete
AFTER DELETE ON `Account`
FOR EACH ROW
UPDATE `Department`
SET TotalMember = (SELECT COUNT(*) FROM `Account` WHERE `Account`.DepartmentID = `Department`.DepartmentID)
WHERE `Department`.DepartmentID = OLD.DepartmentID;


-- Add data Department
INSERT INTO Department(	DepartmentName,		DepartmentType,		CreateDate) 
VALUES
						(N'Marketing'	,		'Dev', 			'2010-03-05'),
						(N'Sale'		,		'Test', 		'2013-07-05'),
						(N'Security'	,		'ScrumMaster', 	'2018-11-20'),
						(N'HR'			,		'PM', 			'2015-06-08'),
						(N'Kỹ thuật'	,		'Dev', 			'2012-09-10'),
						(N'Tài chính'	,		'ScrumMaster', 	NOW()		),
						(N'Phó giám đốc',		'PM', 			NOW()		),
						(N'Giám đốc'	,		'Test', 		'2019-10-14'),
						(N'Thư kí'		,		'PM', 			'2020-12-22'),
						(N'Bán hàng'	,		'Dev', 			'2021-08-26'),
						(N'Hành chính'	,		'Test', 		'2020-11-01');
                        
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Legal', 'Dev', '2021-10-15');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Research and Development', 'Dev', '2019-02-06');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Support', 'Dev', '2019-10-21');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Accounting', 'ScrumMaster', '2021-07-26');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Human Resources', 'Test', '2020-03-19');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Engineering', 'ScrumMaster', '2019-02-16');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Training', 'Dev', '2021-09-14');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Services', 'Dev', '2021-08-09');
insert into Department (DepartmentName, DepartmentType, CreateDate) values ('Product Management', 'Dev', '2020-08-04');
                    
-- Add data Account
-- Password: 123456
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (1, 'folivetta0', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Francisco', 'Olivetta', 'Admin', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (2, 'vwhitwell1', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Vin', 'Whitwell', 'Manager', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (3, 'abercevelo2', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Abner', 'Bercevelo', 'Manager', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (4, 'wmonketon3', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Waring', 'Monketon', 'Employee', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (5, 'pfylan4', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Prentiss', 'Fylan', 'Admin', 9);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (6, 'dporkiss5', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Dru', 'Porkiss', 'Admin', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (7, 'lnicolson6', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Louie', 'Nicolson', 'Manager', 17);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (8, 'nwybern7', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nigel', 'Wybern', 'Admin', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (9, 'fhortop8', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fields', 'Hortop', 'Admin', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (10, 'sbampton9', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Sim', 'Bampton', 'Manager', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (11, 'fbennella', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Frank', 'Bennell', 'Employee', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (12, 'blickorishb', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brodie', 'Lickorish', 'Employee', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (13, 'qcasperric', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Quill', 'Casperri', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (14, 'bangelld', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brose', 'Angell', 'Admin', 5);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (15, 'nkeijsere', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nikos', 'Keijser', 'Manager', 5);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (16, 'bbalthasarf', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brady', 'Balthasar', 'Manager', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (17, 'rpoeg', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Rhys', 'Poe', 'Employee', 5);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (18, 'fcasserlyh', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fergus', 'Casserly', 'Admin', 9);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (19, 'hshatfordi', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Hamilton', 'Shatford', 'Admin', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (20, 'fharrildj', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fonsie', 'Harrild', 'Employee', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (21, 'rmarrisonk', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Randie', 'Marrison', 'Manager', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (22, 'mmattusovl', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Marco', 'Mattusov', 'Admin', 5);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (23, 'mliddingtonm', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Moore', 'Liddington', 'Employee', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (24, 'hfinicjn', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Herold', 'Finicj', 'Employee', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (25, 'omowburyo', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ogdon', 'Mowbury', 'Employee', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (26, 'opetitp', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Osgood', 'Petit', 'Admin', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (27, 'cbrewisq', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Clarance', 'Brewis', 'Employee', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (28, 'gbickertonr', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Gerri', 'Bickerton', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (29, 'hambages', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Haskel', 'Ambage', 'Manager', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (30, 'burlingt', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Barry', 'Urling', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (31, 'bkrzyzaniaku', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brockie', 'Krzyzaniak', 'Employee', 1);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (32, 'bdunnev', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Bailey', 'Dunne', 'Admin', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (33, 'oloblew', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Obidiah', 'Loble', 'Manager', 5);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (34, 'irungex', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ikey', 'Runge', 'Employee', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (35, 'abroeky', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Adriano', 'Broek', 'Employee', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (36, 'obrandlez', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Oswell', 'Brandle', 'Manager', 9);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (37, 'fpettiward10', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fletcher', 'Pettiward', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (38, 'lmoffatt11', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Leon', 'Moffatt', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (39, 'iskrzynski12', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ingemar', 'Skrzynski', 'Employee', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (40, 'vbehagg13', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Vladimir', 'Behagg', 'Admin', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (41, 'icrasford14', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ilaire', 'Crasford', 'Admin', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (42, 'aselwin15', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Antons', 'Selwin', 'Employee', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (43, 'lmynott16', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Louie', 'Mynott', 'Employee', 1);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (44, 'mmacpaik17', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Mario', 'MacPaik', 'Employee', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (45, 'ehallihane18', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Elia', 'Hallihane', 'Admin', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (46, 'rpeddar19', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Robby', 'Peddar', 'Manager', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (47, 'joldroyde1a', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Jason', 'Oldroyde', 'Manager', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (48, 'rwitts1b', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Rob', 'Witts', 'Employee', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (49, 'btromans1c', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Byram', 'Tromans', 'Admin', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (50, 'dlongridge1d', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Del', 'Longridge', 'Employee', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (51, 'sgumery1e', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Scott', 'Gumery', 'Manager', 15);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (52, 'aodea1f', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Arie', 'O''Dea', 'Manager', 16);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (53, 'ggullan1g', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Gareth', 'Gullan', 'Manager', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (54, 'egauch1h', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ely', 'Gauch', 'Admin', 18);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (55, 'pposen1i', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Peyter', 'Posen', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (56, 'cleggatt1j', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Chauncey', 'Leggatt', 'Employee', 1);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (57, 'gaikett1k', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Gardy', 'Aikett', 'Employee', 13);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (58, 'msadat1l', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Mattias', 'Sadat', 'Manager', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (59, 'jleas1m', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Justino', 'Leas', 'Manager', 19);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (60, 'lbraunds1n', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Liam', 'Braunds', 'Admin', 1);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (61, 'bkisby1o', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Basilius', 'Kisby', 'Manager', 16);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (62, 'aswaine1p', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Antonino', 'Swaine', 'Admin', 14);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (63, 'jduffield1q', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Jase', 'Duffield', 'Manager', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (64, 'geisikowitch1r', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Geordie', 'Eisikowitch', 'Admin', 19);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (65, 'amaevela1s', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Antone', 'Maevela', 'Employee', 18);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (66, 'oclinton1t', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Orton', 'Clinton', 'Admin', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (67, 'ealfonzo1u', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Etienne', 'Alfonzo', 'Employee', 9);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (68, 'ahartford1v', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Alfonse', 'Hartford', 'Manager', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (69, 'vstinchcombe1w', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Vic', 'Stinchcombe', 'Manager', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (70, 'tembury1x', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tyrone', 'Embury', 'Employee', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (71, 'hcoughan1y', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Howey', 'Coughan', 'Manager', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (72, 'tlandall1z', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Thornton', 'Landall', 'Employee', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (73, 'rkingh20', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Reynold', 'Kingh', 'Manager', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (74, 'spiers21', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Sinclare', 'Piers', 'Manager', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (75, 'icaddock22', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Isaak', 'Caddock', 'Admin', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (76, 'awhittaker23', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Alexandro', 'Whittaker', 'Employee', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (77, 'hgavahan24', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Hurley', 'Gavahan', 'Employee', 15);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (78, 'hsweatman25', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Hans', 'Sweatman', 'Admin', 17);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (79, 'ahulles26', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Aymer', 'Hulles', 'Employee', 1);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (80, 'reltringham27', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Richardo', 'Eltringham', 'Admin', 6);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (81, 'ctomczykiewicz28', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Cchaddie', 'Tomczykiewicz', 'Manager', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (82, 'hridgeway29', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Harlin', 'Ridgeway', 'Employee', 7);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (83, 'evoss2a', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Elliott', 'Voss', 'Employee', 19);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (84, 'csettle2b', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Chrisse', 'Settle', 'Manager', 13);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (85, 'rmaplethorpe2c', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Rustie', 'Maplethorpe', 'Employee', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (86, 'rmcian2d', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Rolf', 'McIan', 'Manager', 1);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (87, 'agowman2e', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Avrom', 'Gowman', 'Employee', 17);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (88, 'mleynton2f', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Mathew', 'Leynton', 'Admin', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (89, 'fgrowcock2g', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Felix', 'Growcock', 'Manager', 3);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (90, 'fmcgettrick2h', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Federico', 'McGettrick', 'Employee', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (91, 'cjeynes2i', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Clyde', 'Jeynes', 'Manager', 8);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (92, 'stilling2j', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Sol', 'Tilling', 'Admin', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (93, 'wsleney2k', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Wyatan', 'Sleney', 'Employee', 12);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (94, 'bcordeix2l', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Barnard', 'Cordeix', 'Manager', 2);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (95, 'bdismore2m', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Beck', 'Dismore', 'Employee', 16);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (96, 'tstruthers2n', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Truman', 'Struthers', 'Manager', 4);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (97, 'bogilvie2o', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Benny', 'Ogilvie', 'Employee', 10);
insert into `Account` (AccountID, Username, `Password`, FirstName, LastName, `Role`, DepartmentID) values (98, 'emcginley2p', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Earlie', 'McGinley', 'Admin', 18);

UPDATE `Java_Advanced_Final_Exam`.`Account` SET `DepartmentID` =  null WHERE AccountID IN (1, 4 ,7, 10, 15, 18, 22, 28, 33, 35, 37, 45, 48, 50, 51, 56, 62, 66, 69, 70, 73, 79, 81, 84, 90);

-- DELETE FROM `Account` WHERE AccountID IN (1, 2, 3);

-- DELETE FROM `Account` WHERE AccountID = 57;