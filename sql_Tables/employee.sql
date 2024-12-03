-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 06:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `krw`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `role`, `email`, `password`, `category_name`, `salary`, `address`, `photo`) VALUES
(13, 'suman', 'Admin', 'suman@gmail.com', '$2b$10$tWiretw0eZakeNGkirV77ufwvugdPnl2RKeccndMOJXwCWEgMMMZ.', 'Life Science', 12000, 'Mathura', 'photo_1732777219355.png'),
(15, 'manju', 'Employee', 'manju@gmail.com', '$2b$10$8qZgtCKV2nbcwJZpxkS43.7vRhrGS7Mkwi6Aok7EUxWVkkmpNRi9a', 'Life Science', 17000, 'Mathura', 'photo_1732778552286.png'),
(16, 'anuj kaushik', 'Employee', 'anuj@gmail.com', '$2b$10$g9nITCd8cwU0ySOvt9ibRuAqOMC7Jok9IfaJRkceTKB9g3NuhjaRu', 'Management', 14000, 'Mathura', 'photo_1732783692004.png'),
(17, 'ravi', 'Employee', 'ravi@gmail.com', '$2b$10$GtejH9KLGoOPIOWddBQcteFsLkr5AsP1DiuXB3SGrx3PVGIOkUlZm', 'Support', 15000, 'Mathura', 'photo_1732784958081.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_name` (`category_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
