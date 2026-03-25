# Pro-Ad

## Project Title & Overview

**Title:** Pro-Ad

**Overview:**
A full-stack ad campaign management system that uses authentication, allows CRUD operations for pages and campaigns, and simulates budget spending over time.

---

## Features

* User authentication using JWT + cookies
* Full CRUD operations for Pages and Campaigns
* Responsive UI
* Budget spend simulation using cron jobs
* Protected routes using authentication middleware

---

## Tech Stack

* **Frontend:** Angular
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **ORM:** Drizzle ORM (for type-safe SQL queries and easier syntax)
* **Other:** JWT, Cookies

---

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/iamCoderMohit/pro-ad
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   bun install
   ```

3. Setup backend environment variables (`.env` file in backend):

   ```
   PORT=...
   DATABASE_URL=...
   JWT_SECRET=...
   ```

4. Run database migrations:

   ```bash
   npx drizzle-kit push
   ```
   or
   ```bash
   bunx drizzle-kit push
   ```

---

## How to Run the Project

### Frontend

```bash
node start
```
or
```bash
bun start
```
or
```bash
ng serve
```

### Backend

if using node
(compile down typescript to javascript)

```bash
npx tsc 
```
```bash
node dist/server.js
```
or
if using bun (run typescript directly)
```bash
bun src/server.ts
```

or

```bash
node src/server.ts
```

---

## URLs

* Frontend: http://localhost:4200
* Backend: http://localhost:3000 (or based on PORT value)

---

## Authentication Details

### Signup

* Enter a unique email, any name, and a minimum 6-character password
* Input validation is applied
* A JWT token is generated and stored in a cookie named `token`
* The token contains userId, email, and role

### Login

* Enter correct email and password
* Input validation is applied
* Cookie `token` is set again

### Logout

* Cookie is removed
* User is redirected to frontend login route

---

## Project Structure

```
frontend/
  ├── src/
      ├── app/
          ├── components/
          ├── services/
          ├── guards/

backend/
  ├── .env
  ├── src/
      ├── routes/
      ├── middleware/
      ├── index.ts
      ├── server.ts
```

---

## Key Decisions / Approach

* **Cookies vs LocalStorage:**
  Cookies allow automatic sending with requests and can be secured better compared to localStorage. A JWT token is stored in a cookie for authentication.

* **Angular:**
  Used Angular to align with company tech stack and to learn something new.

* **Express:**
  Used Express as it is part of the company stack and I am comfortable working with it.

* **Cron Jobs:**
  Implemented cron jobs to simulate real-world budget spending over time. These can be modified based on requirements.

---

## Known Issues

* Environment variables need to be configured manually in backend
* If default commands do not work:

  * Use `ng serve` for frontend
  * Use `bun src/server.ts` or `node src/server.ts` for backend
* Error handling is implemented at a basic level and may not always pinpoint exact issues

---

## Future Improvements

* Add refresh tokens
* Admin dashboard
* Pagination and improved budget simulation

---

## Screenshots

*Add screenshots for the following:*

* Login
* Signup
* Pages List
* Create Page
* Campaign Dashboard

---

## API Endpoints

* `/auth` → Handles login and signup
* `/page` → CRUD operations for pages
* `/campaign` → CRUD operations for campaigns
* `/spend` → Handles budget simulation logic
* `/page/admin` → Admin-level page operations
* `/campaign/admin` → Admin-level campaign operations

---
