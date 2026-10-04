# MediTrack — Electronic Medical Record (EMR) for a Multi-Speciality Hospital
## Academic Software Engineering & Project Management (SEPM) Master Repository

**Organization:** Aarogya Healthcare (6 Hospitals, 21 Clinics across 3 States)  
**Course:** Software Engineering & Project Management (B.Tech CSE 2025–29, Semester III)  
**Academic Institution:** School of Future Tech, ITM Skills University  
**Case Study Reference:** Case Study No. 1 — MediTrack  
**Evaluation Standard:** IEEE Std 830-1998, ISO/IEC 12207, PMI PMBOK, Basic COCOMO  

> [!IMPORTANT]
> **ACADEMIC HONESTY & SCOPE ATTESTATION**  
> *"This repository represents a Software Engineering & Project Management documentation and UI prototype for MediTrack. It is not a production EMR implementation."*  
> In direct accordance with faculty guidance, this project focuses strictly on **software engineering documentation, architectural models, formal verification designs, project management mathematics, and high-fidelity UI representation**. No real database, real backend, or production deployment infrastructure has been constructed.

---

## 1. Executive Summary & Case Study Baseline

Aarogya Healthcare operates **6 hospitals and 21 clinics across three states**. The enterprise currently suffers from severe digital fragmentation:
- **Two sites** run a 14-year-old Microsoft FoxPro desktop application.
- **Three sites** maintain records in unencrypted Microsoft Excel workbooks.
- **One site** operates with zero digital footprint, relying entirely on physical paper files.
- Patients referred from clinics to main hospitals carry paper transit folders.
- **Historical Safety Incident:** In **2024 alone, the chain recorded 310 prescribing incidents directly traced to missing allergy history**.
- Management mandate: One centralized, legally auditable EMR system.
- **Chief Medical Officer (CMO) Requirement:** System must never lose a record and must be usable by a staff nurse with **20 minutes of training**.
- **Chief Financial Officer (CFO) Requirement:** Project duration cannot exceed **18 months**, defended with rigorous engineering justification.

### Given Project Data (Faculty Mandated — Exactly Preserved):
1. **Estimated Project Size:** **46 KLOC**
2. **Development Team:** **Medium-experienced**
3. **Application Domain:** **Regulated clinical workflow**
4. **Legacy Data Volume:** **2.4 million patient rows**
5. **Legacy Data Quality:** **~7% (168,000 records) have malformed dates or duplicate IDs**
6. **Acceptance Quality Gate:** **Defect Removal Efficiency (DRE) $\ge 92\%$ before go-live**
7. **System Reliability Target:** **MTBF = 1,400 hours**
8. **System Recovery Target:** **MTTR = 2 hours**
9. **Schedule Ceiling:** **Maximum 18 months**
10. **Historical Safety Incident Precedent:** **310 prescribing incidents in 2024**

---

## 2. Central Engineering Thread: The 310 Allergy Incidents

To ensure structural cohesion across all academic deliverables, the **310 prescribing incidents** serve as the unifying engineering thread throughout this repository:

$$\begin{matrix}
\text{310 Historical Incidents} & \longrightarrow & \text{Root Cause Failure Modes} & \longrightarrow & \text{FR-03 \& FR-07 Safety Requirements} \\
\downarrow & & \downarrow & & \downarrow \\
\text{CPOE Sequence Diagram} & \longleftarrow & \text{14-Rule Decision Table} & \longleftarrow & \text{Hard Stop UI Safety Interlock} \\
\downarrow & & \downarrow & & \downarrow \\
\text{8 Safety Test Cases} & \longrightarrow & \text{CI/CD Clinical Safety Gate} & \longrightarrow & \text{RMMM Risk Plan R-01}
\end{matrix}$$

---

## 3. Comprehensive Repository Navigation & Deliverables Index

```
/MediTrack-SEPM
│
├── README.md                                  <- Master Project Overview & Executive Briefing
│
├── diagrams/                                  <- Complete Architecture, UML & Process Mermaid Models
│   ├── use_case_diagram.mmd                   <- Complete System Use Case Model (12 Scenarios)
│   ├── class_diagram.mmd                      <- Domain Class Diagram (Entities, Attributes, Methods)
│   ├── sequence_diagram_allergy_check.mmd     <- CPOE Allergy Check & Safety Interlock Sequence Model
│   ├── activity_diagram_prescription.mmd      <- Clinical Prescription Activity & Exception Flow
│   ├── deployment_diagram.mmd                 <- Enterprise Tiered Deployment Topology & Network Zones
│   ├── er_data_model.mmd                      <- Relational Data Model & Immutability Trigger Rules
│   ├── software_architecture.mmd              <- N-Tier SAD & Prescription/Billing Decoupling Bus
│   ├── network_diagram_cpm.mmd                <- CPM Network Diagram (AON, 16.5m Critical Path)
│   ├── gantt_chart.mmd                        <- Master 18-Month Schedule Gantt Chart
│   ├── cicd_pipeline.mmd                      <- 11-Stage Pipeline & Staged Clinical Safety Gate
│   └── migration_workflow.mmd                 <- 12-Stage Legacy ETL Migration & Quarantine Pipeline
│
├── docs/                                      <- Complete Software Engineering Documentation
│   ├── 01-BRD/
│   │   └── BRD_MediTrack.md                   <- Business Requirements Document (Current vs Future State, ROI)
│   ├── 02-SRS/
│   │   └── IEEE830_SRS_MediTrack.md           <- IEEE Std 830 SRS (12 Primary FRs, 8 Measurable NFRs)
│   ├── 03-Requirements/
│   │   └── Traceability_and_MoSCoW.md         <- 100% Forward/Backward RTM & MoSCoW Prioritization
│   ├── 04-SDLC/
│   │   └── SDLC_Process_Model_Justification.md <- V-Model Defense vs Spiral, Waterfall & Scrum
│   ├── 05-Architecture/
│   │   └── Software_Architecture_Document.md  <- N-Tier SAD, Prescription/Billing Decoupling, Audit Store
│   ├── 06-UML/
│   │   ├── Use_Case_Diagram.md                <- Complete System Use Case Model (12 Scenarios)
│   │   ├── Class_Diagram.md                   <- Domain Class Diagram (Attributes, Methods, Multiplicities)
│   │   ├── Sequence_Diagram_Allergy_Check.md  <- Detailed CPOE Allergy Check Sequence Model
│   │   ├── Activity_Diagram_Prescription.md   <- Clinical Prescription Activity & Exception Flow
│   │   ├── Deployment_Diagram.md              <- Enterprise Tiered Deployment Topology & Network Zones
│   │   └── ER_Data_Model.md                   <- Relational Data Model & Immutability Trigger Rules
│   ├── 07-Estimation/
│   │   └── COCOMO_and_Brooks_Law.md           <- Semi-Detached Basic COCOMO, Brooks's Law, Limitations
│   ├── 08-Project-Management/
│   │   ├── WBS_4_Level.md                     <- 4-Level Work Breakdown Structure (1.0 to 1.9)
│   │   ├── Network_Diagram_Critical_Path.md   <- CPM Network Diagram (ES, EF, LS, LF, Float, 16.5m Path)
│   │   ├── Gantt_Chart.md                     <- Master 18-Month Schedule Gantt Chart
│   │   └── Resource_Histogram.md              <- Monthly Staff Loading Profile (13.3 FTE Average)
│   ├── 09-Risk-Management/
│   │   └── Risk_Register_and_RMMM.md          <- 10 Risk Matrix, 5x5 Grid, Top 3 Detailed RMMM Plans
│   ├── 10-Testing-QA/
│   │   ├── Test_Plan.md                       <- Master Test Plan (10 Testing Levels, Entry/Exit Gates)
│   │   └── Test_Cases_and_Evidence_310_Incidents.md <- BVA Dosage, Decision Table, 310 Proof, DRE, MTBF
│   ├── 11-DevOps/
│   │   └── CICD_Clinical_Safety_Gate.md       <- 11-Stage Pipeline, Safety Gate, Human Approval Boundaries
│   ├── 12-Migration/
│   │   └── Legacy_Data_Migration_Strategy.md  <- 2.4M Rows, 168k (7%) Quarantine, 12-Stage ETL
│   └── 13-Closure/
│       └── Lessons_Learned_and_Project_Closure.md <- Project Retrospective, Tradeoffs & Viva Defense
│
└── ui/                                        <- High-Fidelity Static UI Prototype
    ├── index.html                             <- Standalone Single-Page Application (18 Clinical Screens)
    ├── styles.css                             <- Clean Healthcare Design System (#123047 Navy, #0F766E Teal)
    └── app.js                                 <- Interactive Simulation Controller & Allergy Hard Stop Demo
```

---

## 4. Key Engineering Deliverables Summary

### 4.1 Process Model Defense (The V-Model)
- **Selected Model:** **Regulated V-Model (Verification & Validation Lifecycle)**.
- **Why Pure Waterfall Fails:** Late integration trap; discovering FoxPro date schema incompatibilities in Month 15 would collapse the 18-month deadline.
- **Why Pure Scrum Fails:** "Working software over documentation" violates medical software compliance (ISO 62304 / HIPAA); incremental slicing leaves clinical safety gates partially implemented.
- **Why the V-Model Excels:** Enforces test case authoring (including the 310 incident test suite) **concurrently with requirements specification**, guaranteeing bidirectional traceability.

### 4.2 IEEE 830 SRS: Exactly 12 Primary FRs & 8 Measurable NFRs
- **12 Primary FRs:** EMPI Patient Search (`FR-01`), Longitudinal History (`FR-02`), Mandatory Allergy Profiling (`FR-03`), Outpatient SOAP Notes (`FR-04`), Inpatient Bed Census (`FR-05`), CPOE Prescribing (`FR-06`), Drug-Allergy Safety Interlock (`FR-07`), Laboratory LIS (`FR-08`), Pharmacy Barcode Dispensing (`FR-09`), Inpatient Discharge Summary (`FR-10`), Immutable Audit Trail (`FR-11`), Legacy Migration & Quarantine (`FR-12`).
- **8 Measurable NFRs:** Security (`NFR-01`, TLS 1.3/AES-256), Auditability (`NFR-02`, 100% chained SHA-256 logging), Availability (`NFR-03`, $\ge 99.857\%$), Usability (`NFR-04`, 95% of nurses competent in $\le 20$ min), Reliability (`NFR-05`, MTBF $\ge 1,400$ hours), Performance (`NFR-06`, Search $\le 1.5$s under 1,200 users), Maintainability (`NFR-07`, MTTR $\le 2$ hours, Decoupled modules), Data Integrity (`NFR-08`, DRE $\ge 92\%$, 2.4M rows 100% reconciled).

### 4.3 Software Architecture: Prescription & Billing Decoupling
- **Architectural Pattern:** Port-and-Adapter (Hexagonal) Architecture with Asynchronous Domain Events.
- **Mechanism:** When a doctor authorizes an e-prescription, the `Prescription Service` commits the clinical record locally and emits a `PrescriptionIssuedEvent` to an AMQP Message Broker. An external `BillingAdapter` subscribes asynchronously to charge patient accounts.
- **Safety Benefit:** If the hospital billing or insurance gateway crashes, **clinical prescribing continues with 0% disruption**.

### 4.4 Basic COCOMO Calculation (Defended Against 18-Month Ceiling)
- **Parameters:** Size = **46 KLOC**, Mode = **Semi-Detached** ($a_b=3.0, b_b=1.12, c_b=2.5, d_b=0.35$).
- **Effort Calculation:**
  $$E = 3.0 \times (46)^{1.12} = 3.0 \times 72.825 = \mathbf{218.48 \text{ Person-Months (PM)}}$$
- **Development Schedule Duration:**
  $$T_{dev} = 2.5 \times (218.48)^{0.35} = 2.5 \times 6.5886 = \mathbf{16.47 \text{ Months}}$$
- **Average Staffing Level:**
  $$SS = \frac{E}{T_{dev}} = \frac{218.48}{16.47} = \mathbf{13.26 \approx 13 \text{ to } 14 \text{ Full-Time Engineers}}$$
- **CFO Ceiling Defense:** **$16.47 \text{ Months} \le 18.00 \text{ Months}$**. The estimated schedule complies with the CFO ceiling with a **1.53-month regulatory contingency buffer**.
- **Brooks's Law Check:** Demonstrates that communication channels grow quadratically ($C = \frac{n(n-1)}{2}$; 13 developers = 78 channels vs 20 developers = 190 channels), proving that adding manpower to a delayed clinical milestone guarantees schedule collapse.
- **Model Limitations:** COCOMO fails to capture the ETL effort for **2.4M legacy records (168k dirty rows)** and multi-site clinical training for hundreds of nurses across 27 facilities.

### 4.5 Project Management: WBS, Critical Path & Schedule
- **WBS:** Complete 4-level decomposition covering 1.0 to 1.9 down to discrete work packages.
- **Critical Path Method (CPM):** Identifies the 13-activity critical chain ($A01 \rightarrow A02 \rightarrow A03 \rightarrow A04 \rightarrow A05 \rightarrow A09 \rightarrow A10 \rightarrow A18 \rightarrow A19 \rightarrow A21 \rightarrow A22 \rightarrow A23 \rightarrow A24$) with a total duration of **16.5 months**, exactly confirming COCOMO.
- **Resource Histogram:** Phased resource loading profile peaking at 18 specialists during construction and averaging 13.3 FTEs.

### 4.6 Risk Management & Top 3 RMMM Plans
- **Risk R-01 (Fatal Prescribing Allergy Incident, Exposure 20):** Hard-stop interlocks, mandatory allergy check gates, 100% audit logging.
- **Risk R-02 (Legacy Migration Data Corruption, Exposure 20):** 12-stage ETL, heuristic date parsing, strict 168k quarantine queue.
- **Risk R-03 (Audit Tampering / Legal Admissibility Failure, Exposure 15):** Append-only cryptographically chained SHA-256 Merkle ledger.

### 4.7 Testing & Quality Mathematics
- **Boundary Value Analysis (BVA):** Evaluates adult oral Amoxicillin dosage boundary ($Min=125$mg, $Max=1000$mg) across $Min-1$, $Min$, $Min+1$, $Nominal$, $Max-1$, $Max$, $Max+1$.
- **Decision Table:** 14-rule exhaustive matrix enforcing Hard Stops on fatal allergens and class cross-sensitivities.
- **Defect Removal Efficiency (DRE):**
  $$\text{DRE} = \frac{184}{184 + 12} = \mathbf{93.88\%} \quad (\text{Target } \ge 92.0\%)$$
- **Defect Density:**
  $$\text{Defect Density} = \frac{184 \text{ Defects}}{46 \text{ KLOC}} = \mathbf{4.00 \text{ Defects / KLOC}}$$
- **Operational Availability:**
  $$\text{Availability} = \frac{1,400}{1,400 + 2} = \frac{1,400}{1,402} = \mathbf{99.857\%}$$

### 4.8 Legacy Migration Mathematics (2.4M Records)
- Total Patient Rows: **2,400,000**
- Problematic Records (~7%): **$2,400,000 \times 0.07 = \mathbf{168,000 \text{ Records}}$**
- Clean Direct Ingestion (93%): **2,232,000 Records**
- Isolation Protocol: Exactly 0% of unverified records enter live tables; all 168,000 rows route to the `MIGRATION_QUARANTINE_QUEUE`.

---

## 5. High-Fidelity Static UI Prototype

A standalone, interactive single-page application prototype is provided in `ui/index.html`. It incorporates all **18 clinical and governance screens** requested:

### How to Launch the Prototype:
Double-click `ui/index.html` or open it directly in any modern web browser:
```bash
open /Users/nupurbhoir/Desktop/MediTrack-SEPM/ui/index.html
```

### Aesthetic Standards Enforced:
- **Palette:** Deep Navy (`#123047`), Medical Teal (`#0F766E`), Accent Teal (`#14B8A6`), Neutral Background (`#F7FAFC`), Card Background (`#FFFFFF`), Text (`#1F2937`), Critical Red (`#DC2626`).
- **Typography:** Modern sans-serif (Inter), 8px spatial grid, high-contrast accessible layouts.
- **Interactive Demonstrations:**
  - Real-time simulation of the **Penicillin Hard-Stop Allergy Conflict** (replicating the 2024 failure mode).
  - Rapid Bedside Triage Vitals entry designed for the **20-minute nurse onboarding mandate**.
  - Visual Bed Census Map, Barcode Dispensing, and Cryptographic Hash Audit Inspector.

---

## 6. Academic Defense & Viva Quick Reference

1. **Why Semi-Detached COCOMO?** The 46 KLOC system balances standard enterprise forms and data storage with specialized clinical safety rules, developed by a medium-experienced team.
2. **How is Billing Decoupled?** Via asynchronous AMQP domain events (`PrescriptionIssuedEvent`), ensuring clinical care never halts due to accounting software downtime.
3. **How are the 310 Incidents Addressed?** Through global allergy synchronization across all 27 sites, mandatory allergy elicitation before prescribing, and an automated Hard Stop interlock for contraindicated chemical classes.
4. **Why the V-Model?** Healthcare systems require bidirectional traceability and concurrent test design to ensure regulatory compliance and eliminate clinical hazards before coding.
# software-mediCheck
