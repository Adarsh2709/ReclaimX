# ReclaimX ♻️
### Advanced E-Waste Management & Circular Recycling Network

ReclaimX is a premium, full-stack digital ecosystem designed to streamline and audit electronic waste (e-waste) logistics. It connects households and corporations (**Eco-Citizens**) with certified **Recycling Facilities** under a transparent **Administrative Control Center**, backed by real-time EPA carbon offset calculations and data visualization curves.

---

## 🏗️ Architecture & Core Workspace

The repository is structured as a clean multi-tier workspace separating concern layers:

```
ReclaimX/
├── backend/          # Spring Boot REST API Service
│   ├── src/          # Java controller, service, JPA repositories, entities
│   └── build.gradle  # Gradle project specifications (Java 21, boot 3.5.3)
│
├── frontend/         # Next.js App Router Client Application
│   ├── src/          # React context, hooks, Axios layers, components, pages
│   ├── public/       # Static assets (transparent brand ReclaimX logo)
│   └── package.json  # NPM scripts and external dependencies
│
└── README.md         # Platforms overview & system guide
```

---

## 🛠️ Technology Stack

### Backend (REST APIs)
* **Core Language:** Java 21 (LTS)
* **Framework:** Spring Boot 3.5.3 (Web, Security, Data-JPA, Validation)
* **Authentication:** Stateless JWT Token Issuance & Verification
* **Database:** MySQL Database Engine
* **Build Automation:** Gradle Wrapper

### Frontend (User Interface)
* **Core Framework:** Next.js 14+ (App Router, React 18, Strict Mode)
* **Styling Engine:** Tailwind CSS & Modern PostCSS (Harmonious green scales)
* **HTTP Library:** Axios (configured with automated JWT request interceptors)
* **Icon Set:** Lucide React icons
* **Data Visualization:** Chart.js & React-Chartjs-2 (Doughnut category spreads & linear timelines)
* **Security:** Context-driven Protected Route role authorization guards

---

## 🌟 Multi-Role Feature Breakdown

ReclaimX implements a robust **Role-Based Access Control (RBAC)** architecture that alters dashboard views, menus, and item cards dynamically:

### 1. Eco-Citizens (`USER`)
* **Request Dispatch:** A step-by-step scheduling form with material selection categories, interactive weight range sliders, preferred date picker, and address fields.
* **CO2 Offset Estimator:** A live visualizer displaying estimated carbon savings (in kg CO2 offset) matching EPA standards in real-time as weight sliders move.
* **Dispatch History:** Searchable and filterable summaries of past schedules categorized by pickup status (Pending, Assigned, Accepted, Collected, Recycled).
* **EcoPoints:** Earn carbon credit points (12 pts per kg recycled) redeemable for environmental offsets.

### 2. Certified Recycling Facilities (`RECYCLER`)
* **Facility Register:** First-time profile configuration setup to verify company name, phone contact, and regional service area.
* **Operational Dashboard:** Monitors active jobs, processed weights, and verified carbon counts.
* **Task Pipelines:** A dedicated work hub allowing plants to review assigned dispatches, update transaction states (`Accept Assignment` ➡️ `Mark Collected` ➡️ `Mark Recycled`), and process unassigned items.

### 3. System Administrators (`ADMIN`)
* **Central Control Room:** Reviews overall platform health metrics (total database listings, pending items, active facilities, registered citizens).
* **Smart Matching:** An assignment dropdown under pending pickups. Admins can select any registered plant, automatically linking the facility and advancing the dispatch state to `Assigned`.
* **Database Directories:** Complete directory directory listings of all registered recycler plants and citizen profiles.

---

## 📈 Impact & Analytics Dashboard
* **Dynamic Parsers:** An advanced text parser in the client decodes raw Spring Boot analytics strings into high-fidelity data arrays.
* **Material Doughnut Breakdown:** Interactive visualizations illustrating e-waste volume breakdowns (Monitors, Telecom/Laptops, Batteries, Small/Large Home appliances).
* **timeline Offset Curves:** Renders month-over-month growth of carbon reductions.

---

## 🚀 Local Deployment Guide

### Prerequisites
Make sure you have the following installed on your machine:
* [Java Development Kit (JDK) 21](https://www.oracle.com/java/technologies/downloads/)
* [Node.js 18+](https://nodejs.org/en)
* [MySQL Server 8.0+](https://dev.mysql.com/downloads/installer/)

---

### Step 1: Backend Setup (Spring Boot)

1. Open your MySQL terminal and create the application schema:
   ```sql
   CREATE DATABASE ewaste_db;
   ```
2. Navigate to [application.properties](file:///d:/ReclaimX/backend/src/main/resources/application.properties) and update your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ewaste_db
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
3. Open a terminal in the `backend/` directory, compile the resources, and boot the server:
   * **Linux/macOS:**
     ```bash
     ./gradlew bootRun
     ```
   * **Windows (CMD/PowerShell):**
     ```cmd
     gradlew.bat bootRun
     ```
4. The REST API server will startup on `http://localhost:8080`.

---

### Step 2: Frontend Setup (Next.js)

1. Open a new terminal in the `frontend/` directory.
2. Install the clean, lightweight NPM dependencies:
   ```bash
   npm install
   ```
3. Boot up the local Next.js hot-reload development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

## 🛡️ Security & Privacy
* **CORS Policies:** Global CORS filters configured in [SecurityConfig.java](file:///d:/ReclaimX/backend/src/main/java/org/example/config/SecurityConfig.java) block unauthorized cross-site scripting while allowing preflight operations from `localhost:3000` and `localhost:3001`.
* **Media Destruction Compliance:** All files on storage media (HDDs, SSDs, cellular cards) are wiped utilizing NIST SP 800-88 guidelines before components separation.
* **Stateless Sessions:** User login validation is verified via cryptographically signed JWT strings.

---

## 📝 License
ReclaimX is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
