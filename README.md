# AvailabilityShield

External traffic protection system for monitoring, analyzing, and protecting the availability of a web service under abnormal load or controlled DoS-like traffic.

## Project Overview

AvailabilityShield is a project that demonstrates how service availability can be protected during abnormal traffic load without embedding the main protection logic directly inside the website itself.

The project includes a sample web application with a frontend and backend, and an additional external protection component that sits in front of the web service. This external component monitors incoming traffic, calculates system load and health metrics, and activates dynamic rules such as request slowing, prioritization, waiting queue, temporary blocking, or limiting heavy operations.

The goal is to compare the behavior of a system without external protection against a system protected by AvailabilityShield.

## Project Goals

- Build a controlled web environment for availability testing.
- Monitor incoming requests in real time.
- Calculate system load and health metrics.
- Detect abnormal load or aggressive traffic patterns.
- Apply dynamic protection rules based on system state.
- Preserve basic service availability under heavy load.
- Display metrics, alerts, and active protection actions in a dashboard.
- Compare system behavior with and without AvailabilityShield.

## General Architecture

```text
Traffic Generator / Users
          |
          v
AvailabilityShield Gateway
          |
          v
Target Web Application
          |
          v
Database
```

## System Components

### 1. Target Web Application

A sample web application that acts as the protected system.

The application may include:

- Basic frontend.
- Backend API.
- Multiple endpoints.
- Regular operations.
- Heavy operations that simulate server load.
- Optional database connection.
- Response time and error measurement.

Example operations:

- Login.
- View data.
- Request standard information.
- Run a heavy operation.
- Generate a report or perform a complex search.

### 2. AvailabilityShield Gateway

An external protection layer that sits before the target web application.

Main responsibilities:

- Receive incoming requests before they reach the target server.
- Monitor request rate.
- Detect abnormal traffic load.
- Slow down requests when needed.
- Prioritize basic operations.
- Limit heavy operations during high load.
- Activate a waiting queue.
- Temporarily block problematic sources.
- Send real-time data to the dashboard.

### 3. Monitoring & Detection Engine

A component that collects and calculates real-time system metrics.

Possible metrics:

- Requests per second.
- Average response time.
- Error rate.
- Server load.
- Requests per source.
- Number of delayed requests.
- Number of blocked requests.
- General system health score.

### 4. Dynamic Rule Engine

A rule engine that decides which protection actions should be activated according to the current system load.

Example policy:

```text
Health Score 80-100:
Normal state, monitoring only.

Health Score 60-80:
Light slowing of suspicious traffic.

Health Score 40-60:
Limit heavy operations and prioritize basic requests.

Health Score 20-40:
Activate waiting queue and stronger request slowing.

Health Score 0-20:
Temporarily block problematic sources and allow only critical operations.
```

### 5. Dashboard

An admin dashboard that displays the system state in real time.

The dashboard may show:

- Current system status.
- Health Score.
- Incoming request rate.
- Response times.
- Error rate.
- Active protection rules.
- Delayed requests.
- Blocked requests.
- System alerts.
- Comparison between normal mode and protected mode.

### 6. Traffic Generator

A controlled traffic generator used for demonstration and testing.

It will generate:

- Normal traffic.
- Gradual traffic increase.
- Abnormal load.
- Requests to basic endpoints.
- Requests to heavy endpoints.

The traffic simulation will be performed only in a local and controlled environment.

## Suggested Technologies

### Frontend

- React
- HTML / CSS / JavaScript
- Real-time dashboard with charts

### Backend

- Node.js
- Express
- REST API

### External Gateway / Protection Layer

- Python
- PyDivert or Scapy for packet-level traffic handling and analysis
- Optional Proxy / Gateway implementation
- Dynamic rule engine

### Database

- SQLite / PostgreSQL / MongoDB  
Depending on the final project scope.

### Monitoring

- Internal metric collection
- WebSocket or polling for real-time dashboard updates
- Admin dashboard

## Demonstration Scenario

The project demo will present three main states.

### State 1: Normal Load

The system works normally.

Expected behavior:

- Normal response times.
- No abnormal errors.
- No active protection rules.
- High Health Score.

### State 2: Abnormal Load Without Protection

Controlled abnormal traffic is sent directly to the target web application without AvailabilityShield.

The demo will show:

- Increased response times.
- Increased error rate.
- Reduced availability.
- Degraded user experience.
- Difficulty handling heavy load.

### State 3: Abnormal Load With AvailabilityShield

The same traffic load is sent through AvailabilityShield.

The demo will show:

- Real-time load detection.
- Activation of dynamic protection rules.
- Request slowing.
- Prioritization of basic operations.
- Limiting heavy operations.
- Improved service availability compared to the unprotected state.

## Example Dynamic Rules

```text
If requests per second exceed the threshold:
    Activate gradual request slowing.

If response time exceeds the threshold:
    Limit heavy operations.

If error rate increases:
    Activate waiting queue.

If a specific source sends too many requests:
    Slow down or temporarily block that source.

If the system returns to a healthy state:
    Gradually remove restrictions.
```

## Project Scope

The project will be implemented in a local and controlled environment only.

The system is not intended for attacking real services.  
It is designed for educational demonstration of:

- Service availability.
- Traffic monitoring.
- Load detection.
- Dynamic response.
- External protection around a web system.

## Suggested Folder Structure

```text
AvailabilityShield/
│
├── frontend/
│   └── React dashboard and client UI
│
├── backend/
│   └── Target web application API
│
├── shield/
│   └── External AvailabilityShield gateway
│
├── traffic-generator/
│   └── Controlled traffic simulation
│
├── docs/
│   └── Architecture, diagrams and project documentation
│
└── README.md
```

## Expected Deliverables

- Sample target web application.
- External AvailabilityShield component.
- Load monitoring mechanism.
- Health Score mechanism.
- Dynamic rule engine.
- Admin dashboard.
- Controlled traffic simulation.
- Comparison between protected and unprotected system behavior.
- Architecture and demo documentation.

## Project Status

The project is currently in the architecture and planning phase.

The approved direction is to implement an external protection layer around the web system, rather than embedding the main protection mechanisms directly inside the website.

## Project Name

AvailabilityShield

## Short Description

External traffic protection system for service availability under controlled DoS-like load.
