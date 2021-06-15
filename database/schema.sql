DROP DATABASE IF EXISTS turkey_bowl;

CREATE DATABASE turkey_bowl;

USE turkey_bowl;

CREATE TABLE trivia (
  id int NOT NULL AUTO_INCREMENT,
  question text NOT NULL,
  true_answer text NOT NULL,
  false_answer1 text NOT NULL,
  false_answer2 text NOT NULL,
  false_answer3 text NOT NULL,
  PRIMARY KEY (id)
);