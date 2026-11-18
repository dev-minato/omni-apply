# 🚀 OmniApply AI
### Autonomous Off-Campus Job Hunting & ATS Resume Tailoring Platform for College Students & Fresh Graduates

OmniApply AI is a full-stack autonomous career platform built for students and engineering graduates. It pairs an **Octupie-inspired dark luxury frontend** with a **multi-tier AI backend**, continuously scraping verified job feeds, tailoring ATS-friendly resumes in real-time, drafting personalized cold outreach emails, and dispatching applications 24/7.

---

## 🎨 Design & Aesthetic
- **Monochrome Theme**: Minimalist deep black (`#000000`, `#09090b`), slate grays, and crisp white typography.
- **Bento Grids & Micro-Interactions**: Ambient border glows, glassmorphism panels, and reactive status indicators inspired by **[octupie.com](https://www.octupie.com/)**.
- **Live Preview Architecture**: Real-time dual-pane editor rendering ATS-compliant resume formatting instantaneously as user inputs change.

---

## 🌟 Complete User Journey & Screens

1. **Universal Landing Page (`LandingPage.jsx`)**
   - Universal navigation with *Product*, *Use Cases*, *How It Works*, *Metrics*, and *Start Free* CTA.
   - Hero section with live radar matrix visual, pill badges, and key conversion statistics (50K+ candidates, 98.4% average ATS score, 60% application time saved).
   - Bento-grid product highlights, tailored student use cases, 4-step workflow guide, and footer.

2. **Auth & Email OTP Verification (`AuthModal.jsx`)**
   - Single-click OAuth with **Google** and **GitHub**.
   - Email & password signup with interactive 6-digit **Email OTP Verification** (auto-advancing input boxes, resend timer, and test auto-fill).

3. **Resume Builder with Real-Time Live Preview (`ResumeBuilder.jsx`)**
   - **Personal Info**: Full Name, Job Title / Role, Phone, Email, LinkedIn, GitHub, Website/Portfolio, and Coding Profiles (*LeetCode, Codeforces, HackerRank, CodeChef*).
   - **Summary**: Professional engineering bio.
   - **Work Experience**: Job Title, Company, Duration, Location, and dynamic responsibilities with default bullets and bullet addition/removal.
   - **Education**: Degree, Institution, Duration, Grade / CGPA.
   - **Skills**: Comma-separated or free-form paragraph input with interactive chip visualization.
   - **Projects**: Project Name, Technologies, Live Link, Description.
   - **Achievements**: Certifications and awards.
   - **Live ATS Preview (Right Column)**: Real-time updated resume sheet with clean ATS layout, print/PDF export, and theme switcher (*Paper White* vs. *Dark Matrix*).

4. **Target Companies Selection (`TargetCompaniesStep.jsx`)**
   - Quick selection grid of tier-1 recruiters (*Google, Microsoft, Amazon, Uber, Stripe, Atlassian, Meta, Apple, Netflix, Nvidia, Snowflake, Salesforce*, etc.).
   - Live search bar to search and add any custom company worldwide to the radar.

5. **Target Roles Selection (`TargetRolesStep.jsx`)**
   - High-demand roles (*Full Stack Engineer, Backend Engineer, Frontend, AI/ML, DevOps, Data Engineer, Mobile, SDET, APM*).
   - Custom role addition input with active selection tracker.

6. **Location Preference (`LocationPreferenceStep.jsx`)**
   - 3 interactive choices:
     * **Specific Locations Only** (Bangalore, Hyderabad, Pune, SF, NYC, London, Remote, etc.).
     * **Open to Relocate** (worldwide / domestic).
     * **Both** (Preferred tech hubs + Open to relocate for the right opportunity).

7. **LinkedIn Data Import (`LinkedInImportStep.jsx`)**
   - Drag & drop zone (*"Upload your archive ... drop your zip here"*).
   - Instant extraction preview simulating `Profile.csv`, `Positions.csv`, `Education.csv`, and `Skills.csv` ingestion.
   - Step-by-step instructions on downloading archives from LinkedIn data privacy settings.

8. **Loading & Processing Screen (`ProcessingStep.jsx`)**
   - Smooth animated progress bar (0% -> 100%) with radar scanning animation.
   - Real-time sequential checklist verifying ATS encryption, company indexing, and career endpoint query before launching the dashboard.

9. **Command Dashboard (`Dashboard.jsx`)**
   - **Top Navigation Bar**: Brand logo, main tabs, and the **Account Menu Icon**:
     * Profile identity and target role summary.
     * **"Update Resume"**: Opens the full Live Resume Editor modal at any time to revise details.
     * **"Target Preferences"**: Quick access to change companies, roles, and locations.
     * **"Sign Out"**: Clean session exit back to the landing page.
   - **Open Positions Tab**: High-match jobs filtered by targeted companies and roles, displaying match scores (e.g. `98% ATS Match`), matched skill tags, and **1-Click Apply**.
   - **Companies Tab**: Active target companies with scraper status and a **"+ Add Target Company"** modal.
   - **Applications Tab**: Real-time pipeline tracker (*Applied*, *Under Review*, *Interview Scheduled*).

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS 3.4, Lucide Icons, Plus Jakarta Sans |
| **Backend** | Python 3.14, FastAPI, Uvicorn, APScheduler |
| **AI LLM Engine** | Groq (`openai/gpt-oss-120b`, `llama`), Google Gemini (`gemini-3.8-flash`), Ollama DeepSeek |
| **Database** | Supabase Cloud (PostgreSQL) + Local SQLite fallback (`app_data.db`) |
| **PDF Generation** | FPDF2 (ATS-optimized layout) |
| **Scrapers** | BeautifulSoup4, HTTPX, Requests, Public Career Endpoints |
| **Outreach** | Python smtplib (SSL Port 465) |

---

## 📁 Repository Structure

```text
my-project/
├── .gitignore                   # Comprehensive ignores (secrets, node_modules, dist, DBs, caches)
├── README.md                    # Project documentation & setup guide
├── start.bat                    # Windows one-click start script
├── n8n_workflow_template.json   # External webhook automation workflow
│
├── frontend/                    # React + Vite Frontend
│   ├── package.json
│   ├── tailwind.config.js       # Custom dark palette & typography extensions
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx              # State machine orchestrating screens & session persistence
│   │   ├── index.css            # Dark mode styles, glassmorphism, scrollbars, print rules
│   │   ├── components/
│   │   │   ├── LandingPage.jsx              # Universal Octupie-style landing page
│   │   │   ├── AuthModal.jsx                # OAuth + Email OTP verification
│   │   │   ├── ResumeBuilder.jsx            # Resume form + Live ATS Preview
│   │   │   ├── TargetCompaniesStep.jsx      # Company selection & live search
│   │   │   ├── TargetRolesStep.jsx          # Role focus selector
│   │   │   ├── LocationPreferenceStep.jsx   # Specific / Relocate / Both
│   │   │   ├── LinkedInImportStep.jsx       # Zip archive dropzone & parsing
│   │   │   ├── ProcessingStep.jsx           # Animated transition screen
│   │   │   ├── Dashboard.jsx                # Open Positions, Companies, Applications + Account menu
│   │   │   ├── ...
│   │   └── services/
│   │       └── api.js                       # Backend integration & HTTP client
│
└── backend/                     # FastAPI Backend
    ├── .env.example             # Clean template for environment variables (NO SECRETS)
    ├── requirements.txt         # Python dependencies
    ├── run_worker.py            # Standalone background scraper worker
    ├── supabase_schema.sql      # Database schema
    └── app/
        ├── main.py              # FastAPI app & routing
        ├── config.py            # Configuration loader
        ├── database.py          # Dual Supabase / SQLite layer
        ├── ai/                  # Resume tailoring, email drafting & LLM routing
        ├── scrapers/            # LinkedIn, Naukri, Remote career scrapers
        └── services/            # Pipeline orchestration, PDF builder, SMTP mailer
```

---

## 🚀 Quick Setup & Local Development

### 1. Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (3.10+)

### 2. Configure Environment Variables
Copy the example environment template in `backend/`:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and insert your API keys (Gemini, Groq, or Ollama) and email credentials.

> ⚠️ **Important**: Never commit your `.env` file with live keys to GitHub. It is already safely listed in `.gitignore`.

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Run the Backend API Server
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Open API documentation at `http://localhost:8000/docs`.

### 5. Production Build
```bash
cd frontend
npm run build
```
Builds optimized production assets to `frontend/dist/`.

---

## 🔒 Security & GitHub Publishing Checklist
- [x] `.env` files with API keys and SMTP credentials excluded via `.gitignore`.
- [x] Clean `.env.example` template provided.
- [x] `node_modules/` excluded from repository.
- [x] Build output (`dist/`) excluded from repository.
- [x] Local SQLite databases (`*.db`) and generated PDFs excluded.
- [x] Python `__pycache__/` and `*.pyc` bytecode excluded.
- [x] Frontend compiles with **0 build errors** and **0 warnings**.

---

## 📄 License
MIT License &copy; 2026 OmniApply AI. Built for college students and developers worldwide.
