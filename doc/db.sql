
 create database vogon;

CREATE TABLE  `vogon`.`watch` (
`id` INT NOT NULL AUTO_INCREMENT ,
`produto_id` INT NOT NULL ,
`valor` DECIMAL( 9, 2 ) NOT NULL ,
`email` VARCHAR( 90 ) NOT NULL ,
PRIMARY KEY (  `id` )
);
