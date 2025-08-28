-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2025 at 05:38 AM
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
(5, 'IANNO', 'PURA', '09283882123', 'Feb 13, 2025', 'Joseph Martinez', '09828182383', 2222, 'images/members/5.png', 'images/qrcodes/2121.png', 1),
(6, 'MARK', 'RODRIGUEZ', '09832212312', 'May 08, 2025', 'Maricar Reyes', '09228121223', 3123, 'images/members/6.png', 'images/qrcodes/3123.png', 2),
(7, 'ZXSADSA', 'DSADSAD', '22213123123', 'Jun 27, 2025', 'adsad', '23213123213', 223232, 'images/members/7.png', 'images/qrcodes/223232.png', 1),
(8, 'ASDASD', 'SASADSAD', '21321312321', 'Apr 14, 2025', 'asdasdasdsa', '21312321321', 313123, 'images/members/8.png', 'images/qrcodes/313123.png', 2),
(9, 'DASDAS', 'DSADAS', '32132142142', 'May 13, 2025', 'asdsadsa', '32132142142', 421232, 'images/members/9.png', 'images/qrcodes/421232.png', 2),
(10, 'ASDASDSA', 'DSADASDSA', '53125312412', 'Aug 06, 2025', 'asdsadas', '3213123213', 213213, 'images/members/10.png', 'images/qrcodes/213213.png', 1),
(11, 'ASDASDASDSA', 'ASDSADSADSA', '23213213213', 'Aug 14, 2025', 'asdasdas', '21321321323', 312312, 'images/members/11.png', 'images/qrcodes/312312.png', 2),
(12, 'SADZXCZXC', 'SADSAD', '41231232131', 'Jun 17, 2025', 'safsadsads', '23112312321', 321321, 'images/members/12.png', 'images/qrcodes/321321.png', 2),
(13, 'John', 'Mendoza', '09172373737', 'Jul 02, 2025', 'Jonathan Mendoza', '09218381882', 213212, 'images/members/13.png', 'images/qrcodes/332123.png', 1),
(14, 'JOHN MICHEAL', 'MENDOZA', '09172372173', 'Aug 07, 2025', 'Jonathan De Guzman', '09123821838', 123443, 'images/members/14.png', 'images/qrcodes/123443.png', 1),
(15, 'TESTING', 'LANG', '09237817238', 'Aug 02, 2023', 'jsldkjsalkjkj', '09382838288', 202033, 'images/members/15.png', 'images/qrcodes/202033.png', 1),
(16, 'ASDASDAS', '123123123', '09273713892', 'Aug 06, 2025', 'adasdsa', '09237278318', 123123, 'images/members/16.png', 'images/qrcodes/123123.png', 2),
(17, 'MARK', 'ROXAS', '09238283812', 'Aug 14, 2025', 'john marquez', '09218281281', 19219, 'images/members/17.png', 'images/qrcodes/019219.png', 1),
(18, '213213', 'ASDASD', '09238128382', 'Jun 02, 2025', 'sajksaj askjdkj', '09238283183', 8882, 'images/members/18.png', 'images/qrcodes/8882.png', 1),
(19, 'ASDASKJHHAJK', 'AJKDHASKJ', '12321382881', 'Aug 02, 2025', 'asahdj kjhjkash', '09382183828', 222333, 'images/members/19.png', 'images/qrcodes/222333.png', 2),
(20, 'ASDSADAS', 'SADASD', '09238128381', 'Aug 05, 2025', 'john doe', '09238718238', 232323, 'images/members/20.png', 'images/qrcodes/232323.png', 1),
(21, 'ASDASKLJD', 'MARQUEZ', '09217382183', 'Feb 06, 2025', 'john marquez', '09273172372', 333122, 'images/members/21.png', 'images/qrcodes/333122.png', 2),
(22, '123829818188828282', 'MENDOZA', '09218381283', 'Aug 02, 2025', 'joseph morgan', '09231828381', 332121, 'images/members/22.png', 'images/qrcodes/332121.png', 1),
(23, 'ASDASDSA', 'MENDOZA', '09218381283', 'Aug 23, 2025', 'joseph margarito', '09312838288', 223132, 'images/members/23.png', 'images/qrcodes/223132.png', 1),
(24, 'SADASD', 'DSADA', '09281271828', 'Aug 08, 2025', 'Jomary Espiritu', '09128192718', 312131, NULL, NULL, 1),
(25, 'DJALKJ', 'LKASJDLK', '09281673812', 'Feb 06, 2025', 'joahnna mae', '09288172813', 121231, NULL, NULL, 2),
(26, 'JOHN', 'MIICHEAL', '09281821927', 'Feb 06, 2025', 'jane doe', '09182817821', 203821, NULL, NULL, 1),
(27, 'ASDASHJ', 'SAKJLDJLK', '09238192182', 'Jul 30, 2025', 'jane doe', '09182818218', 818218, NULL, NULL, 1),
(28, 'JOAHNNA', 'MAE', '09283712838', 'Aug 04, 2025', 'john doe', '09712818181', 412321, 'images/members/.png', 'images/qrcodes/412321.png', 1),
(29, 'KLASJDLKSAJ', 'LAKSDJASLK', '09182817281', 'Aug 13, 2025', 'jane doe', '09272171828', 212131, 'images/members/29.png', 'images/qrcodes/212131.png', 1),
(30, 'ASDHASJKH', 'ASJLKDSJ', '09127182712', 'Jun 02, 2025', 'jane doe', '09237182188', 29928, 'images/members/30.png', 'images/qrcodes/029928.png', 1),
(31, 'ASDASDHJ', 'JLKASDJALK', '09218182818', 'Jun 02, 2025', 'jone doe', '09127172818', 121728, 'images/members/31.png', 'images/qrcodes/121728.png', 1),
(32, 'ASDJLLAKS', 'SALKDJASLK', '09282381281', 'Aug 20, 2025', 'samantha maricar', '09127182182', 127127, 'images/members/32.png', 'images/qrcodes/127127.png', 1),
(33, 'ASDJLLAKS', 'SALKDJASLK', '09282381281', 'Aug 20, 2025', 'samantha maricar', '09127182182', 127127, 'images/members/33.png', 'images/qrcodes/127127.png', 1),
(34, 'AKDJSALK', 'ADFASFSAFAS', '09128717218', 'JUN 19, 2023', 'jane doe', '09127172188', 215626, 'images/members/34.png', 'images/qrcodes/215626.png', 1),
(35, 'ASDASDSAD', 'JOASNDJKASH', '09281828188', 'AUG 22, 2025', 'jdsakjdwi jijskal', '09281776381', 126716, 'images/members/35.png', 'images/qrcodes/126716.png', 1),
(36, 'ASDASD', 'ADSSADAS', '09273728891', 'AUG 07, 2025', 'sadjhaks asjkdhkj', '09273718281', 121312, 'images/members/36.png', 'images/qrcodes/121312.png', 1),
(37, 'ASDSADJKL', 'LAKSDJALSKJ', '09283821831', 'FEB 12, 2025', 'joasjdkasj aksjdkla', '09278172178', 288182, 'images/members/37.png', 'images/qrcodes/288182.png', 1),
(38, 'JOSEPH', 'PARUILO', '09271728187', 'MAY 22, 2025', 'joanne mattias', '09271261827', 928172, 'images/members/38.png', 'images/qrcodes/928172.png', 1),
(39, 'ASDASDSADSA', 'AJKSDJALSK', '09128127818', 'JUN 02, 2025', 'jaskldj alkasjdl', '09237172382', 127221, 'images/members/39.png', 'images/qrcodes/127221.png', 1),
(40, 'WDASDKJL', 'IAJSDOIJ', '09283717277', 'AUG 15, 2025', 'asjdhjk asdlkj', '09271721828', 127172, 'images/members/40.png', 'images/qrcodes/127172.png', 1),
(41, 'SADASD', 'ASDSAD', '09287178281', 'AUG 23, 2025', 'adskajl asdasklj', '09273717188', 126371, 'images/members/41.png', 'images/qrcodes/126371.png', 1),
(42, 'ASDASD', 'ASDAS', '09281291821', 'AUG 08, 2025', 'asdasd asdasd', '09271782818', 125162, 'images/members/42.png', 'images/qrcodes/125162.png', 1),
(43, 'JASKLDJSALK', 'KSALJDLKAS', '09127121728', 'AUG 15, 2025', 'asdas jsalkj', '09271728181', 127187, 'images/members/43.png', 'images/qrcodes/127187.png', 1),
(44, 'SADAS', 'SADSA', '09273162382', 'AUG 26, 2025', 'asdasd asdas', '09271727181', 121562, 'images/members/44.png', 'images/qrcodes/121562.png', 1),
(45, 'SADASD', 'ASDASDSA', '09278172718', 'AUG 16, 2025', 'asjdkl alksdjlk', '09127127817', 121626, 'images/members/45.png', 'images/qrcodes/121626.png', 1),
(46, 'ASD', 'ASD', '09123456789', 'JUL 29, 2025', 'asd asd asd', '09123456789', 32223, 'images/members/46.png', 'images/qrcodes/32223.png', 1),
(47, 'SADSA', 'ASKDASO', '09123456672', 'AUG 14, 2025', 'asdsadsa', '09123456672', 232322, 'images/members/47.png', 'images/qrcodes/232322.png', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
