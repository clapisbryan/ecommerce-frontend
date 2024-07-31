# Technical Specifications Document

## Title Page

- **Project Name:** Course Booking System
- **Version:** 1.0
- **Date:** 07/19/2024
- **Author(s):** Bryan Clapis

## Table of Contents

- [Introduction](#introduction)
- [Overall Description](#overall-description)
- [Visual Mockup Reference](#visual-mockup-reference)
- [Features](#features)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Data Requirements](#data-requirements)
- [External Interface Requirements](#external-interface-requirements)
- [Glossary](#glossary)
- [Appendices](#appendices)

## Introduction

- **Purpose:** This document outlines the technical specifications for the Course Booking System, detailing its functionalities, requirements, and interfaces.
- **Scope:** The system allows users to browse courses, book seats, and manage bookings. It does not handle payment processing.
- **Definitions, Acronyms, and Abbreviations:**
  - Course Booking System (CBS)

## Overall Description

- **Product Perspective:** The CBS is a standalone web application that interfaces with a course management database.
- **Product Functions:** Users can view course details, register for courses, and receive booking confirmations.
- **User Classes and Characteristics:**
  - Students: Search and book courses.
  - Administrators: Manage course listings and bookings.
- **Operating Environment:**
  - **Hardware:** Standard PCs, tablets, and smartphones.
  - **Software:** Web browsers (Chrome, Firefox, Safari).
  - **Network:** Internet connectivity required.
- **Assumptions and Dependencies:** Assumes availability of course data from an external database.

## Visual Mockup Reference

- **Link or Screenshot:** [Insert link or attach screenshot of visual mockup.]
  - **Login Page:** 
  ![Untitled](frontend/src/assets/images/login.png)

## Features

- **Feature 1: Course Search**
  - **Description:** Allows users to search for courses based on various criteria.
- **Feature 2: Booking Management**
  - **Description:** Enables users to view and manage their course bookings.
- **Feature 3: Admin Dashboard**
  - **Description:** Provides administrators with tools to manage course listings and user bookings.

## Functional Requirements

### Use Cases

- **Use Case 1: Course Registration**
  - **Title:** Course Registration
  - **Description:** Allows students to register for a course.
  - **Actors:** Student
  - **Preconditions:** Student is logged in and course is available.
  - **Postconditions:** Student receives a booking confirmation.
  - **Main Flow:**
    1. Student selects course.
    2. Student confirms booking details.
    3. System records booking and confirms registration.
  - **Alternate Flows:**
    - If course is full, display waitlist option.

### System Features

- **Feature 1: Booking Confirmation**
  - **Description:** System sends confirmation email upon successful booking.
  - **Priority:** High
  - **Inputs:** Booking details
  - **Processing:** Validate and store booking information.
  - **Outputs:** Confirmation email to user.
  - **Error Handling:** Notify user if booking fails.

## Non-Functional Requirements

- **Performance:** System shall handle concurrent user requests without significant latency.
- **Security:** User data shall be encrypted during transmission.
- **Usability:** Intuitive UI with clear navigation.
- **Reliability:** System shall be available 99% of the time.
- **Supportability:** Maintenance updates shall be deployable without downtime.

## Data Requirements

- **Data Models:** Entity-Relationship Diagram (ERD) depicting course, user, and booking relationships.
- **Database Requirements:** MySQL database with tables for courses, users, and bookings.
- **Data Storage and Retrieval:** Data shall be stored securely and accessed via SQL queries.

## External Interface Requirements

- **User Interfaces:** Responsive web interface with mobile compatibility.
- **API Interfaces:** None specified.
- **Hardware Interfaces:** None specified.
- **Software Interfaces:** Integration with external course management database via API.

## Glossary

- **Term 1:** CBS - Course Booking System
- **Term 2:** GUI - Graphical User Interface

## Appendices

- **Supporting Information:** Include any additional diagrams or technical details.
- **Revision History:**
  - Version 1.0 (08/03/2024): Initial version.
