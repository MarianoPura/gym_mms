-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2025 at 12:57 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym_mms`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `name`, `address`) VALUES
(1, 'Valenzuela', 'Valenzuela City'),
(2, 'QC', 'Quezon City');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `fname` varchar(200) NOT NULL,
  `lname` varchar(200) NOT NULL,
  `contact_no` varchar(200) NOT NULL,
  `membership_date` varchar(250) NOT NULL,
  `E_contact_person` varchar(200) NOT NULL,
  `e_contact_number` varchar(200) NOT NULL,
  `card_no` int(50) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `qr` varchar(250) DEFAULT NULL,
  `branch` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `fname`, `lname`, `contact_no`, `membership_date`, `E_contact_person`, `e_contact_number`, `card_no`, `photo`, `qr`, `branch`) VALUES
(1, 'MARIANO ', 'PURA III', '09328282828', 'Feb 06, 2025', 'Maricar', '09282828181', 2001, 'images/members/1.png', 'images/qrcodes/2001.png', 1),
(2, 'JOSEPH', 'ESTRELLA', '09382818818', 'Feb,06,2025', 'Jonathan De Guzman', '09271771273', 2006, 'images/members/2.png', 'images/qrcodes/2006.png', 2),
(3, 'JOEL', 'GAVILAN', '09281828828', 'May, 07, 2025', 'Jonathan De Guzman', '09281828383', 2004, 'images/members/3.png', 'images/qrcodes/2004.png', 2),
(4, 'MARK', 'RAMOS', '09281828383', 'Aug 08, 2025', 'Mike Ramos', '09281823818', 3322, 'images/members/4.png', 'images/qrcodes/2008.png', 1),
(5, 'IANNO', 'PURA', '09283882123', 'Feb 13, 2025', 'Joseph Martinez', '09828182383', 2222, 'images/members/5.png', 'images/qrcodes/2121.png', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
