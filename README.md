# Doctor & Patient Management System

Spring Boot 3 + JWT + role-based security + MySQL backend, with a Vite React frontend.

## Prerequisites

**Local development**

- Java 17+
- Maven 3.8+
- MySQL 8+
- Node.js 18+

**Docker (alternative)**

- Docker Desktop or Docker Engine
- Docker Compose v2

## Docker (recommended for quick start)

Run the full stack (MySQL + Spring Boot + React UI) with one command. No local Java, Maven, or Node required.

### 1. Configure environment

```bash
cp .env.example .env
```

Edit `.env` if you want to change the MySQL root password or JWT secret (optional for local use).

### 2. Start all services

From the project root:

```bash
docker compose up --build
```

Wait until the backend logs show `Started DoctorPatientJwtApplication`.

| Service  | URL                      |
|----------|--------------------------|
| Web UI   | http://localhost         |
| REST API | http://localhost:8080    |
| MySQL    | localhost:3306 (optional)|

The UI is served by Nginx and proxies `/api` to the backend. Login with the seed users below.

### 3. Stop services

```bash
docker compose down
```

To remove the database volume as well (fresh DB on next start):

```bash
docker compose down -v
```

### Docker architecture

- **mysql** — database `doctor_patient_db` (auto-created)
- **backend** — Spring Boot on port 8080
- **frontend** — production React build + Nginx on port 80

---

## Local development

### Database setup

```sql
CREATE DATABASE doctor_patient_db;
```

Update credentials in `src/main/resources/application.properties` if needed (default: `root` / `root`).

## Run backend

```bash
mvn spring-boot:run
```

API runs at `http://localhost:8080`.

### Seed users

| Username | Password   | Role   |
|----------|------------|--------|
| admin    | admin123   | ADMIN  |
| doctor   | doctor123  | DOCTOR |

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

UI runs at `http://localhost:5173`. API calls are proxied to the backend via Vite (`/api` → `8080`).

## Role-based access

| Role   | Doctors API | Patients API        |
|--------|-------------|---------------------|
| ADMIN  | Full CRUD   | Full CRUD           |
| DOCTOR | Forbidden   | GET only (read-only)|

## API endpoints

```
POST   /api/auth/login
GET    /api/doctors
POST   /api/doctors
PUT    /api/doctors/{id}
DELETE /api/doctors/{id}
GET    /api/patients
POST   /api/patients
PUT    /api/patients/{id}
DELETE /api/patients/{id}
```

Protected routes require header: `Authorization: Bearer <jwt>`.

## Postman testing

1. `POST http://localhost:8080/api/auth/login` with body `{"username":"admin","password":"admin123"}`
2. Copy `token` from response
3. Set Authorization → Bearer Token → paste token
4. Call doctor/patient APIs

## Build for production

**Without Docker**

```bash
mvn package -DskipTests
cd frontend && npm run build
```

**With Docker**

```bash
docker compose up --build -d
```
