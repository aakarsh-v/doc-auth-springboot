# Doctor & Patient Management System

Spring Boot 3 + JWT + role-based security + MySQL backend, with a Vite React frontend.

## Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8+
- Node.js 18+

## Database setup

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

```bash
mvn package -DskipTests
cd frontend && npm run build
```
