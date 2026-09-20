CREATE TABLE `actions` (
	`id` varchar(64) NOT NULL,
	`incidentId` varchar(64) NOT NULL,
	`doctorId` varchar(64),
	`hospitalId` varchar(64),
	`actionType` enum('CALL_DOCTOR','CALL_112','NAVIGATE','SHARE_LOCATION','COPY_SUMMARY') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`phoneLabel` varchar(255) NOT NULL,
	`specialty` varchar(255) NOT NULL,
	`hospitalId` varchar(64) NOT NULL,
	`isOnCall` tinyint NOT NULL DEFAULT 0,
	`isVerified` tinyint NOT NULL DEFAULT 0,
	`lastVerifiedAt` timestamp NOT NULL,
	`sourceUrl` text NOT NULL,
	`sourceLabel` varchar(255) NOT NULL,
	CONSTRAINT `doctors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hospitals` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` text NOT NULL,
	`latitude` double NOT NULL,
	`longitude` double NOT NULL,
	`phone` varchar(32) NOT NULL,
	`emergencyAvailable` tinyint NOT NULL DEFAULT 0,
	`status` enum('TRUSTED_RESOURCE','UNVERIFIED') NOT NULL DEFAULT 'UNVERIFIED',
	`capabilities` text NOT NULL,
	`isVerified` tinyint NOT NULL DEFAULT 0,
	`lastVerifiedAt` timestamp NOT NULL,
	`sourceUrl` text NOT NULL,
	`sourceLabel` varchar(255) NOT NULL,
	CONSTRAINT `hospitals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` varchar(64) NOT NULL,
	`patientRelation` varchar(100) NOT NULL,
	`rawText` text NOT NULL,
	`language` varchar(80) NOT NULL,
	`urgency` enum('EMERGENCY','URGENT','GENERAL') NOT NULL,
	`careCategory` varchar(64) NOT NULL,
	`latitude` double NOT NULL,
	`longitude` double NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `incidents_id` PRIMARY KEY(`id`)
);
