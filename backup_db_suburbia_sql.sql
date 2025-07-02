-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Apr 2024 pada 19.15
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_suburbia_sql`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `profilePhoto` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `artists`
--

INSERT INTO `artists` (`id`, `firstName`, `lastName`, `slug`, `profilePhoto`, `createdAt`, `updatedAt`) VALUES
(2, 'Naja Fatimah', 'Setyanoor', 'naja-fatimah-setyanoor', 'images/1696516998436.png', '2023-10-05 14:43:18', '2023-10-05 14:43:18'),
(3, 'Dewa Akmal', 'Nugraha', 'dewa-akmal-nugraha', 'images/1697215610872.png', '2023-10-13 16:46:50', '2023-10-13 16:46:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `profilePhoto` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `authors`
--

INSERT INTO `authors` (`id`, `firstName`, `lastName`, `slug`, `profilePhoto`, `createdAt`, `updatedAt`) VALUES
(1, 'Dewa Akmal', 'Nugraha', 'dewa-akmal-nugraha', 'images/1696514943761.png', '2023-10-05 14:09:03', '2023-10-05 14:09:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Menelisik', 'menelisik', '2023-10-04 16:41:31', '2023-10-04 16:41:31'),
(2, 'Rea Reo Ria', 'rea-reo-ria', '2023-10-05 14:29:01', '2023-10-05 14:29:01'),
(3, 'Kupatisme', 'kupatisme', '2023-10-05 14:29:06', '2023-10-05 14:29:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `imagemerchandises`
--

CREATE TABLE `imagemerchandises` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `merchandiseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `imagemerchandises`
--

INSERT INTO `imagemerchandises` (`id`, `imageUrl`, `isDefault`, `createdAt`, `updatedAt`, `merchandiseId`) VALUES
(1, 'images/1696516394403.png', 1, '2023-10-05 14:33:14', '2023-10-05 14:33:14', 1),
(2, 'images/1696516412641.png', 0, '2023-10-05 14:33:32', '2023-10-05 14:33:32', 1),
(3, 'images/1696516459030.png', 0, '2023-10-05 14:34:19', '2023-10-05 14:34:19', 1),
(4, 'images/1696516525828.png', 1, '2023-10-05 14:35:25', '2023-10-05 14:35:25', 2),
(5, 'images/1696516541434.png', 1, '2023-10-05 14:35:41', '2023-10-05 14:35:41', 3),
(6, 'images/1696516613303.png', 1, '2023-10-05 14:36:53', '2023-10-05 14:36:53', 5),
(7, 'images/1696516627520.png', 1, '2023-10-05 14:37:07', '2023-10-05 14:37:07', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `isHeader` tinyint(1) NOT NULL DEFAULT 0,
  `category` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemId` int(11) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `images`
--

INSERT INTO `images` (`id`, `imageUrl`, `isDefault`, `isHeader`, `category`, `createdAt`, `updatedAt`, `itemId`, `artistId`) VALUES
(6, 'images/1696517153377.png', 1, 0, 'artwork', '2023-10-05 14:45:53', '2023-10-05 14:45:53', 3, 2),
(7, 'images/1696517175224.png', 0, 1, 'photo', '2023-10-05 14:46:15', '2023-10-05 14:46:15', 3, 2),
(8, 'images/1696517287889.png', 1, 0, 'artwork', '2023-10-05 14:48:07', '2023-10-05 14:48:07', 4, 2),
(9, 'images/1696517310558.png', 0, 1, 'photo', '2023-10-05 14:48:30', '2023-10-05 14:48:30', 4, 2),
(10, 'images/1696517390134.png', 1, 0, 'artwork', '2023-10-05 14:49:50', '2023-10-05 14:49:50', 5, 2),
(11, 'images/1696517404220.png', 0, 1, 'photo', '2023-10-05 14:50:04', '2023-10-05 14:50:04', 5, 2),
(12, 'images/1697215681449.png', 0, 0, 'photo', '2023-10-13 16:48:01', '2023-10-13 16:48:01', 3, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL DEFAULT 'Indonesia',
  `date` date NOT NULL,
  `startHour` time NOT NULL,
  `endHour` time NOT NULL,
  `organizer` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `ticket` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `items`
--

INSERT INTO `items` (`id`, `title`, `slug`, `artist`, `location`, `city`, `country`, `date`, `startHour`, `endHour`, `organizer`, `description`, `ticket`, `createdAt`, `updatedAt`, `categoryId`) VALUES
(3, 'Menelisik day 1', 'menelisik-day-1', 'Modernheads, Lunarways, LOR, The Caroline\'s', 'Djajan Kopi', 'Surabaya', 'Indonesia', '2023-10-03', '21:44:00', '22:45:00', 'Suburbia', '<p>But also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;<br />\r\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem&nbsp;<br />\r\nIpsum passages, and more recently with desktop publishing software like Aldus&nbsp;<br />\r\nPageMaker including versions of Lorem Ipsum. Why do we use it?</p>\r\n', 'https://www.youtube.com/', '2023-10-05 14:44:30', '2023-10-05 14:44:30', 1),
(4, 'Menelisik day 2', 'menelisik-day-2', 'Modernheads, Lunarways, LOR, The Caroline\'s', 'Djajan Kopi', 'Surabaya', 'Indonesia', '2023-10-19', '21:44:00', '00:47:00', 'Suburbia', '<p>But also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;<br />\r\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem&nbsp;<br />\r\nIpsum passages, and more recently with desktop publishing software like Aldus&nbsp;<br />\r\nPageMaker including versions of Lorem Ipsum. Why do we use it?</p>\r\n', '-', '2023-10-05 14:45:01', '2023-10-05 14:45:01', 1),
(5, 'Menelisik day 3', 'menelisik-day-3', 'Modernheads, Lunarways, LOR, The Caroline\'s', 'Djajan Kopi', 'Surabaya', 'Indonesia', '2023-10-27', '21:45:00', '23:47:00', 'Suburbia', '<p>But also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;<br />\r\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem&nbsp;<br />\r\nIpsum passages, and more recently with desktop publishing software like Aldus&nbsp;<br />\r\nPageMaker including versions of Lorem Ipsum. Why do we use it?</p>\r\n', '-', '2023-10-05 14:45:36', '2023-10-05 14:45:36', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `merchandises`
--

CREATE TABLE `merchandises` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `size` varchar(255) NOT NULL,
  `shopeeUrl` varchar(255) NOT NULL,
  `tokopediaUrl` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `isSold` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `merchandises`
--

INSERT INTO `merchandises` (`id`, `title`, `slug`, `price`, `size`, `shopeeUrl`, `tokopediaUrl`, `description`, `isSold`, `createdAt`, `updatedAt`) VALUES
(1, 'Merch Lunarways Balada Distorsi', 'merch-lunarways-balada-distorsi', 150000, 'L, XL, S, M', 'https://shopee.co.id/', 'https://www.tokopedia.com/', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 0, '2023-10-05 14:33:04', '2023-10-05 14:33:04'),
(2, 'Merch Modernheads', 'merch-modernheads', 150000, 'L, XL, S, M', 'https://shopee.co.id/', 'https://www.tokopedia.com/', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 0, '2023-10-05 14:34:47', '2023-10-05 14:34:47'),
(3, 'Merch Menelisik', 'merch-menelisik', 150000, 'L, XL, S, M', 'https://shopee.co.id/', 'https://www.tokopedia.com/', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 0, '2023-10-05 14:35:12', '2023-10-05 14:35:12'),
(4, 'Merch Felines', 'merch-felines', 180000, 'L, XL, S, M', 'https://shopee.co.id/', 'https://www.tokopedia.com/', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 0, '2023-10-05 14:36:03', '2023-10-05 14:36:03'),
(5, 'Merch Fiore', 'merch-fiore', 180000, 'L, XL, S, M', 'https://shopee.co.id/', 'https://www.tokopedia.com/', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 0, '2023-10-05 14:36:23', '2023-10-05 14:36:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `artist`, `date`, `description`, `imageUrl`, `type`, `createdAt`, `updatedAt`, `authorId`) VALUES
(1, 'Lunarways x Fourbunch', 'lunarways-x-fourbunch', 'Lunarways', '2023-10-05', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516205428.png', 'news', '2023-10-05 14:30:05', '2023-10-05 14:30:05', 1),
(2, 'Electric Bird \"Fly High\"', 'electric-bird-fly-high', 'Electric Bird', '2023-10-03', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516243224.png', 'press', '2023-10-05 14:30:43', '2023-10-05 14:30:43', 1),
(3, 'Modernheads Tour Jawa Barat', 'modernheads-tour-jawa-barat', 'Modernheads', '2023-10-01', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516289597.png', 'news', '2023-10-05 14:31:29', '2023-10-05 14:31:29', 1),
(4, '.Felines Rilis Musik Bertemakan Cinta', 'felines-rilis-musik-bertemakan-cinta', 'Felines', '2023-10-03', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516343112.png', 'news', '2023-10-05 14:32:23', '2023-10-05 14:32:23', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `roosters`
--

CREATE TABLE `roosters` (
  `id` int(11) NOT NULL,
  `nameBand` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL DEFAULT 'Indonesia',
  `instagram` varchar(255) NOT NULL,
  `spotify` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `roosters`
--

INSERT INTO `roosters` (`id`, `nameBand`, `slug`, `city`, `genre`, `country`, `instagram`, `spotify`, `description`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(1, 'Lunarways', 'lunarways', 'Surabaya', 'Rock', 'Indonesia', 'https://www.instagram.com/lunarwayspop/', 'https://open.spotify.com/artist/6AWZXBmWfcahTpjzyx6UKJ?si=rsN9AdT_QteIdj3IgXXCQA', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516020824.png', '2023-10-05 14:27:00', '2023-10-05 14:27:00'),
(2, 'Modernheads', 'modernheads', 'Surabaya', 'Pop', 'Indonesia', 'https://www.instagram.com/lunarwayspop/', 'https://open.spotify.com/artist/6AWZXBmWfcahTpjzyx6UKJ?si=rsN9AdT_QteIdj3IgXXCQA', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516045194.png', '2023-10-05 14:27:25', '2023-10-05 14:27:25'),
(3, 'Fiore', 'fiore', 'Surabaya', 'Pop', 'Indonesia', 'https://www.instagram.com/lunarwayspop/', 'https://open.spotify.com/artist/6AWZXBmWfcahTpjzyx6UKJ?si=rsN9AdT_QteIdj3IgXXCQA', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516065014.png', '2023-10-05 14:27:45', '2023-10-05 14:27:45'),
(4, 'Flourish', 'flourish', 'Lampung', 'Rock', 'Indonesia', 'https://www.instagram.com/lunarwayspop/', 'https://open.spotify.com/artist/6AWZXBmWfcahTpjzyx6UKJ?si=rsN9AdT_QteIdj3IgXXCQA', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516082896.png', '2023-10-05 14:28:02', '2023-10-05 14:28:02'),
(5, 'Beeswax', 'beeswax', 'Lamongan', 'Rock', 'Indonesia', 'https://www.instagram.com/lunarwayspop/', 'https://open.spotify.com/artist/6AWZXBmWfcahTpjzyx6UKJ?si=rsN9AdT_QteIdj3IgXXCQA', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516108508.png', '2023-10-05 14:28:28', '2023-10-05 14:28:28'),
(6, 'Felines', 'felines', 'Surabaya', 'Pop', 'Indonesia', 'https://www.instagram.com/lunarwayspop/', 'https://open.spotify.com/artist/6AWZXBmWfcahTpjzyx6UKJ?si=rsN9AdT_QteIdj3IgXXCQA', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s&nbsp;<br />\r\nstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&nbsp;<br />\r\na type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining&nbsp;<br />\r\nessentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum&nbsp;<br />\r\npassages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem&nbsp;<br />\r\nIpsum.</p>\r\n', 'images/1696516129915.png', '2023-10-05 14:28:49', '2023-10-05 14:28:49');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `imagemerchandises`
--
ALTER TABLE `imagemerchandises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `merchandiseId` (`merchandiseId`);

--
-- Indeks untuk tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemId` (`itemId`),
  ADD KEY `artistId` (`artistId`);

--
-- Indeks untuk tabel `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indeks untuk tabel `merchandises`
--
ALTER TABLE `merchandises`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`);

--
-- Indeks untuk tabel `roosters`
--
ALTER TABLE `roosters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `imagemerchandises`
--
ALTER TABLE `imagemerchandises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `merchandises`
--
ALTER TABLE `merchandises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `roosters`
--
ALTER TABLE `roosters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `imagemerchandises`
--
ALTER TABLE `imagemerchandises`
  ADD CONSTRAINT `imagemerchandises_ibfk_1` FOREIGN KEY (`merchandiseId`) REFERENCES `merchandises` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`artistId`) REFERENCES `artists` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
