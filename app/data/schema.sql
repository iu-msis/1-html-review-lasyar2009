SHOW DATABASES;

CREATE DATABASE IF NOT EXISTS dbserver1;
USE dbserver1;

DROP TABLE IF EXISTS books;
CREATE TABLE books (
	bookID int PRIMARY KEY AUTO_INCREMENT,
	bookTitle varchar (50),
    author varchar (50),
    publisher varchar (100),
    yearPublished int,
    numPages int,
    MSRP decimal(18,2)
);

INSERT INTO books (bookTitle, author, publisher, yearPublished, numPages, MSRP) VALUES 
("The Power of Not Letting Go", 'John Purkiss', 'Orion Publishing Group', 2020, 208, 15.29),
("All the Light We Cannot See", 'Anthony Doerr', 'Scribner', 2014, 531, 10.74);

-- SELECT * FROM books;
-- COMMIT;

-- CREATE USER 'msisreader'@'%' IDENTIFIED BY 'msisreadonly';
-- GRANT SELECT ON * . * TO 'msisreader'@'%';