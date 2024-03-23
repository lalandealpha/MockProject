-- Drop the database if it already exists
DROP DATABASE IF EXISTS ReactJS_Final_Exam;
-- Create database
CREATE DATABASE IF NOT EXISTS ReactJS_Final_Exam;
USE ReactJS_Final_Exam;

-- create table: Account
DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account`(
	AccountID				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Email					VARCHAR(50) NOT NULL UNIQUE KEY,
    Username				VARCHAR(18) NOT NULL UNIQUE KEY,
	`Password` 				VARCHAR(800) NOT NULL,
    FirstName				NVARCHAR(50) NOT NULL,
    LastName				NVARCHAR(50) NOT NULL,
    `Role` 					ENUM('Admin','Employee','Manager') NOT NULL DEFAULT 'Employee',
    CreateDate				DATE NOT NULL
);

-- Add data Account
-- Password: 123456
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (1,'folivetta0@gmail.com', 'folivetta0', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Francisco', 'Olivetta', 'Admin', '1999-06-30');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (2,'vwhitwell1@spotify.com', 'vwhitwell1', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Vin', 'Whitwell', 'Manager', '2000-09-30');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (3,'abercevelo2@gmail.com', 'abercevelo2', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Abner', 'Bercevelo', 'Manager', '2003-12-13');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (4,'wmonketon3@hotmail.com', 'wmonketon3', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Waring', 'Monketon', 'Employee', '2018-01-15');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (5,'pfylan4@gmail.com', 'pfylan4', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Prentiss', 'Fylan', 'Admin', '2008-07-25');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (6,'dporkiss5@outlook.com', 'dporkiss5', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Dru', 'Porkiss', 'Admin', '1996-10-09');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (7,'lnicolson6@gmail.com', 'lnicolson6', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Louie', 'Nicolson', 'Manager', '2000-11-19');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (8,'nwybern7@vti.com', 'nwybern7', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nigel', 'Wybern', 'Admin', '1999-12-21');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (9,'fhortop8@gmail.com', 'fhortop8', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fields', 'Hortop', 'Admin', '2005-04-03');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (10,'sbampton9@co.jp', 'sbampton9', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Sim', 'Bampton', 'Manager', '2011-04-11');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (11,'fbennella@gnu.org', 'fbennella', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Frank', 'Bennell', 'Employee', '1998-02-19');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (12,'blickorishb@gmail.com', 'blickorishb', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brodie', 'Lickorish', 'Employee', '2004-09-05');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (13,'qcasperric@gmail.com', 'qcasperric', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Quill', 'Casperri', 'Manager', '2008-09-29');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (14,'bangelld@outlook.com', 'bangelld', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brose', 'Angell', 'Admin', '2020-08-18');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (15,'nkeijsere@gmail.com', 'nkeijsere', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nikos', 'Keijser', 'Manager', NOW());
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (16,'bbalthasarf@gmail.com', 'bbalthasarf', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Brady', 'Balthasar', 'Manager', '2010-07-03');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (17,'rpoeg@gmail.com', 'rpoeg', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Rhys', 'Poe', 'Employee', '2011-04-11');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (18,'fcasserlyh@so-net.ne.jp', 'fcasserlyh', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fergus', 'Casserly', 'Admin', '1998-01-17');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (19,'hshatfordi@gmail.com', 'hshatfordi', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Hamilton', 'Shatford', 'Admin', NOW());
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (20,'fharrildj@4shared.com', 'fharrildj', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Fonsie', 'Harrild', 'Employee', NOW());
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (21,'rmarrisonk@aol.com', 'rmarrisonk', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Randie', 'Marrison', 'Manager', '2004-11-17');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (22,'mmattusovl@gmail.com', 'mmattusovl', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Marco', 'Mattusov', 'Admin', '2009-07-12');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (23,'mliddingtonm@gmail.com', 'mliddingtonm', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Moore', 'Liddington', 'Employee', NOW());
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (24,'hfinicjn@gmail.com', 'hfinicjn', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Herold', 'Finicj', 'Employee', '2013-11-02');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (25,'omowburyo@gmail.com', 'omowburyo', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ogdon', 'Mowbury', 'Employee', NOW());
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (26,'opetitp@comcast.net', 'opetitp', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Osgood', 'Petit', 'Admin', '1998-06-25');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (27,'cbrewisq@gmail.com', 'cbrewisq', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Clarance', 'Brewis', 'Employee', '2000-11-16');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (28,'gbickertonr@nsw.gov.au', 'gbickertonr', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Gerri', 'Bickerton', 'Manager', '1997-09-30');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (29,'hambages@moonfruit.com', 'hambages', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Haskel', 'Ambage', 'Manager', '2001-06-23');
insert into `Account` (AccountID, Email, Username, `Password`, FirstName, LastName, `Role`, CreateDate) values (30,'burlingt@gmail.com', 'burlingt', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Barry', 'Urling', 'Manager', '2008-07-10');