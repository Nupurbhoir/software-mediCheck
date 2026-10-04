// MediTrack Enterprise EMR - Core Interactive Controller
// Standard Institutional Healthcare System
// Zero emojis, zero em dashes, zero AI colors, zero pill buttons

document.addEventListener('DOMContentLoaded', () => {
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      if (target) switchTab(target);
    });
  });

  // Facility selector change
  const facilitySelect = document.getElementById('facilitySelect');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      const activeFacility = document.getElementById('activeFacilityTag');
      if (activeFacility) activeFacility.innerText = e.target.value;
      showToast('Facility switched to: ' + e.target.value);
    });
  }

  // Patient search filter
  const patientSearch = document.getElementById('patientSearchInput');
  if (patientSearch) {
    patientSearch.addEventListener('input', (e) => {
      filterPatientTable(e.target.value);
    });
  }

  // Dosage BVA validation
  const rxDose = document.getElementById('rxDoseInput');
  if (rxDose) {
    rxDose.addEventListener('input', (e) => {
      validateDosageBva(parseFloat(e.target.value));
    });
  }
});

// Current session state
let currentUser = {
  name: "Dr. Priya Sharma",
  role: "Attending Physician",
  license: "MH-MED-2018-0914",
  dept: "Cardiology & Emergency",
  facility: "Hospital #01 (Mumbai Central Hub)",
  badge: "STAFF-9021",
  mfa: "Verified (Hardware Key)",
  sessionToken: "JWT-SEC-9982410-EXP15M"
};

// Tab Switcher
function switchTab(screenId) {
  // Update sidebar active classes
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-target') === screenId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Switch screen visibility
  document.querySelectorAll('.content-view').forEach(view => {
    if (view.id === screenId) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Update header title
  const titleEl = document.getElementById('currentHeaderTitle');
  if (titleEl) {
    const titles = {
      'view-dashboard': 'Enterprise Clinical Dashboard',
      'view-patients': 'Master Patient Directory & Longitudinal EMR',
      'view-patient-reg': 'New Patient Registration (Mandatory Allergy Gate)',
      'view-opd': 'Outpatient Clinical Consultation (SOAP Notes)',
      'view-prescription': 'CPOE Prescribing & Allergy Interlock',
      'view-ipd': 'Inpatient Bed Census & Ward Occupancy',
      'view-lab': 'Laboratory Information System (LIS)',
      'view-pharmacy': 'Pharmacy Barcode Dispensing Station',
      'view-discharge': 'Inpatient Discharge Coordination Protocol',
      'view-audit': 'Cryptographically Chained Audit Ledger (SHA-256)',
      'view-migration': 'Legacy Data Migration & Quarantine Workspace (2.4M Rows)',
      'view-risk-center': 'Clinical Risk & Safety Governance Center',
      'view-account': 'User Account Profile & Credentials',
      'view-docs': 'Engineering Deliverables & Case Study Documents Hub',
      'view-login': 'Secure Clinical Authentication Gateway'
    };
    titleEl.innerText = titles[screenId] || 'MediTrack EMR';
  }

  // Scroll main container to top
  const mainContent = document.getElementById('mainScrollContainer');
  if (mainContent) mainContent.scrollTop = 0;
}

// User Authentication: Login & Logout
function loginAs(role) {
  if (role === 'doctor') {
    currentUser = {
      name: "Dr. Priya Sharma",
      role: "Attending Physician",
      license: "MH-MED-2018-0914",
      dept: "Cardiology & Emergency",
      facility: "Hospital #01 (Mumbai Central Hub)",
      badge: "STAFF-9021",
      mfa: "Verified (Hardware Key)",
      sessionToken: "JWT-SEC-9982410-EXP15M"
    };
  } else if (role === 'nurse') {
    currentUser = {
      name: "Nurse Anjali Patil",
      role: "Staff Nurse (Triage)",
      license: "MH-NUR-2021-4412",
      dept: "Emergency Triage & Ward 3",
      facility: "Hospital #01 (Mumbai Central Hub)",
      badge: "NURSE-4412",
      mfa: "Verified (SMS OTP)",
      sessionToken: "JWT-SEC-3321884-EXP15M"
    };
  } else if (role === 'pharmacist') {
    currentUser = {
      name: "Rohan Mehta",
      role: "Chief Pharmacist",
      license: "MH-PHARM-2015-8812",
      dept: "Central Dispensary",
      facility: "Hospital #01 (Mumbai Central Hub)",
      badge: "PHARM-8812",
      mfa: "Verified (App Authenticator)",
      sessionToken: "JWT-SEC-7712391-EXP15M"
    };
  } else if (role === 'admin') {
    currentUser = {
      name: "Dr. Suresh Deshmukh",
      role: "Chief Medical Officer",
      license: "MH-DIR-2004-0012",
      dept: "Clinical Governance & Quality",
      facility: "Aarogya Central Headquarters",
      badge: "ADMIN-0001",
      mfa: "Verified (Hardware Key + Biometric)",
      sessionToken: "JWT-SEC-0001924-EXP15M"
    };
  }

  // Update UI Elements
  updateAccountUI();
  showToast("Authenticated as: " + currentUser.name + " (" + currentUser.role + ")");
  switchTab('view-dashboard');
}

function userLogout() {
  showToast("Logged out securely. Session destroyed.");
  switchTab('view-login');
}

function updateAccountUI() {
  const nameDisplay = document.getElementById('sidebarUserName');
  const roleDisplay = document.getElementById('sidebarUserRole');
  const headerName = document.getElementById('headerUserName');
  const acctName = document.getElementById('acctName');
  const acctRole = document.getElementById('acctRole');
  const acctLic = document.getElementById('acctLicense');
  const acctDept = document.getElementById('acctDept');
  const acctFac = document.getElementById('acctFacility');
  const acctToken = document.getElementById('acctToken');

  if (nameDisplay) nameDisplay.innerText = currentUser.name;
  if (roleDisplay) roleDisplay.innerText = currentUser.role;
  if (headerName) headerName.innerText = currentUser.name;
  if (acctName) acctName.innerText = currentUser.name;
  if (acctRole) acctRole.innerText = currentUser.role;
  if (acctLic) acctLic.innerText = currentUser.license;
  if (acctDept) acctDept.innerText = currentUser.dept;
  if (acctFac) acctFac.innerText = currentUser.facility;
  if (acctToken) acctToken.innerText = currentUser.sessionToken;
}

// Patient Directory Search Filter
function filterPatientTable(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('#patientTableBody tr');
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(q)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Longitudinal Patient Medical History Viewer
function selectPatient(uhid, name, age, gender, allergy, condition) {
  // Update banner
  const nameEl = document.getElementById('activePatientName');
  const uhidEl = document.getElementById('activePatientUhid');
  const ageEl = document.getElementById('activePatientAge');
  const allergyEl = document.getElementById('activePatientAllergy');
  const diagEl = document.getElementById('activePatientDiag');

  if (nameEl) nameEl.innerText = name;
  if (uhidEl) uhidEl.innerText = uhid;
  if (ageEl) ageEl.innerText = age + ' Y / ' + gender;
  if (allergyEl) {
    allergyEl.innerText = allergy;
    if (allergy.toLowerCase().includes('penicillin') || allergy.toLowerCase().includes('anaphylaxis')) {
      allergyEl.className = 'badge badge-danger';
    } else if (allergy.toLowerCase().includes('nkda')) {
      allergyEl.className = 'badge badge-success';
    } else {
      allergyEl.className = 'badge badge-warning';
    }
  }
  if (diagEl) diagEl.innerText = condition;

  // Also sync with prescription patient header
  const rxUhid = document.getElementById('rxPatientUhid');
  const rxName = document.getElementById('rxPatientName');
  const rxAllergy = document.getElementById('rxPatientAllergyBadge');
  if (rxUhid) rxUhid.innerText = uhid;
  if (rxName) rxName.innerText = name;
  if (rxAllergy) rxAllergy.innerText = allergy;

  showToast("Selected patient chart: " + name + " (" + uhid + ")");
  switchTab('view-patients');
}

// CPOE Allergy Safety Interlock Simulation
function triggerAllergyConflict() {
  const drugSelect = document.getElementById('rxDrugSelect');
  const doseInput = document.getElementById('rxDoseInput');
  const safetyBanner = document.getElementById('rxSafetyStatusBanner');
  const submitBtn = document.getElementById('rxSubmitBtn');
  const modal = document.getElementById('allergyHardStopModal');

  if (drugSelect) drugSelect.value = "Amoxicillin 500mg IV (Beta-Lactam)";
  if (doseInput) doseInput.value = "500";

  if (safetyBanner) {
    safetyBanner.className = "alert-banner alert-banner-danger";
    safetyBanner.innerHTML = `
      <div style="font-weight:700; font-size:0.9rem; margin-bottom:0.25rem;">
        FATAL CONTRAINDICATION DETECTED: Amoxicillin
      </div>
      <div>
        Patient Rajesh Kumar (AH-2026-0982) has a verified clinical record of <strong>Penicillin Anaphylaxis</strong> recorded at Clinic #14.<br>
        <strong>HARD STOP SAFETY INTERLOCK ENFORCED:</strong> Direct cross-reactivity risk. Automated safety interlock prevents prescription submission.
      </div>
    `;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.className = "btn btn-secondary";
    submitBtn.style.opacity = "0.5";
    submitBtn.style.cursor = "not-allowed";
    submitBtn.innerText = "Blocked by Clinical Safety Gate";
  }

  if (modal) modal.classList.add('active');
}

function applySafeAlternative() {
  const modal = document.getElementById('allergyHardStopModal');
  if (modal) modal.classList.remove('active');

  const drugSelect = document.getElementById('rxDrugSelect');
  const doseInput = document.getElementById('rxDoseInput');
  const safetyBanner = document.getElementById('rxSafetyStatusBanner');
  const submitBtn = document.getElementById('rxSubmitBtn');

  if (drugSelect) drugSelect.value = "Azithromycin 500mg Oral (Macrolide)";
  if (doseInput) doseInput.value = "500";

  if (safetyBanner) {
    safetyBanner.className = "alert-banner alert-banner-success";
    safetyBanner.innerHTML = `
      <div style="font-weight:700; font-size:0.9rem; margin-bottom:0.25rem;">
        Safety Gate Cleared: No Allergy or Drug Interaction Detected
      </div>
      <div>
        Selected drug class (Macrolide: Azithromycin) has 0% Beta-Lactam ring cross-reactivity with documented Penicillin sensitivity. Order is safe to proceed.
      </div>
    `;
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.className = "btn btn-primary";
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
    submitBtn.innerText = "Sign & Authorize E-Prescription";
  }

  showToast("Substituted safe alternative: Azithromycin 500mg Oral Tablet.");
}

function closeAllergyModal() {
  const modal = document.getElementById('allergyHardStopModal');
  if (modal) modal.classList.remove('active');
}

// Boundary Value Analysis (BVA) on Dosage Input
function validateDosageBva(value) {
  const feedback = document.getElementById('bvaDosageFeedback');
  const submitBtn = document.getElementById('rxSubmitBtn');
  if (!feedback) return;

  if (isNaN(value) || value <= 0) {
    feedback.innerText = "Invalid numeric dosage: Must be greater than 0 mg.";
    feedback.style.color = "var(--color-danger)";
    if (submitBtn) submitBtn.disabled = true;
  } else if (value < 125) {
    feedback.innerText = "BVA Alert: Sub-therapeutic dose (Minimum clinical boundary is 125 mg).";
    feedback.style.color = "var(--color-warning)";
    if (submitBtn) submitBtn.disabled = false;
  } else if (value > 1000) {
    feedback.innerText = "BVA Critical: Maximum therapeutic dose exceeded (Toxic boundary: 1000 mg/dose). Hard Stop.";
    feedback.style.color = "var(--color-danger)";
    if (submitBtn) submitBtn.disabled = true;
  } else {
    feedback.innerText = "BVA Verified: Therapeutic window valid (125 mg to 1000 mg).";
    feedback.style.color = "var(--color-success)";
    if (submitBtn) submitBtn.disabled = false;
  }
}

// Sign E-Prescription
function signPrescription() {
  const drug = document.getElementById('rxDrugSelect').value;
  const dose = document.getElementById('rxDoseInput').value;
  const freq = document.getElementById('rxFrequencySelect').value;
  const duration = document.getElementById('rxDurationInput').value;

  const table = document.getElementById('activePrescriptionsTable');
  if (table) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><strong>RX-2026-${Math.floor(1000 + Math.random() * 9000)}</strong></td>
      <td>${drug}</td>
      <td>${dose} mg</td>
      <td>${freq}</td>
      <td>${duration} Days</td>
      <td><span class="badge badge-success">Active / Signed</span></td>
      <td>${currentUser.name}</td>
    `;
    table.prepend(newRow);
  }

  showToast("Prescription issued successfully. PrescriptionIssuedEvent emitted to AMQP message broker for decoupled billing.");
}

// Save OPD SOAP Note
function saveSoapNote() {
  const subjective = document.getElementById('soapSubjective').value;
  const assessment = document.getElementById('soapAssessment').value;
  const plan = document.getElementById('soapPlan').value;

  if (!subjective || !assessment) {
    alert("Please fill in Chief Complaint / Subjective and Assessment before saving note.");
    return;
  }

  const timeline = document.getElementById('patientEncounterTimeline');
  if (timeline) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-date">Today at ${new Date().toLocaleTimeString()} - Signed by ${currentUser.name}</div>
      <div class="timeline-title">OPD Progress Consultation (SOAP)</div>
      <div class="timeline-body">
        <strong>Assessment:</strong> ${assessment}<br>
        <strong>Plan:</strong> ${plan || 'Routine follow-up'}<br>
        <span class="badge badge-neutral">Cryptographic Hash Logged</span>
      </div>
    `;
    timeline.prepend(item);
  }

  showToast("Clinical SOAP note signed and saved as an immutable encounter addendum.");
  switchTab('view-patients');
}

// Register New Patient
function submitPatientRegistration() {
  const first = document.getElementById('regFirstName').value;
  const last = document.getElementById('regLastName').value;
  const dob = document.getElementById('regDob').value;
  const gender = document.getElementById('regGender').value;
  const allergyStatus = document.getElementById('regAllergyStatus').value;
  const specificAllergy = document.getElementById('regSpecificAllergen').value;

  if (!first || !last || !dob) {
    alert("Mandatory fields missing: First Name, Last Name, and Date of Birth are required.");
    return;
  }

  const newUhid = "AH-2026-" + Math.floor(1000 + Math.random() * 9000);
  const allergyText = allergyStatus === 'nkda' ? 'NKDA (Verified)' : (specificAllergy || 'Documented Allergy');

  const tableBody = document.getElementById('patientTableBody');
  if (tableBody) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${newUhid}</strong></td>
      <td>${first} ${last}</td>
      <td>${dob} / ${gender}</td>
      <td><span class="badge ${allergyStatus === 'nkda' ? 'badge-success' : 'badge-danger'}">${allergyText}</span></td>
      <td>Hospital #01 (Mumbai)</td>
      <td><span class="badge badge-neutral">New Admission</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="selectPatient('${newUhid}', '${first} ${last}', '32', '${gender}', '${allergyText}', 'New Admission Triage')">Open Chart</button>
      </td>
    `;
    tableBody.prepend(row);
  }

  showToast("Registered new patient: " + first + " " + last + " (UHID: " + newUhid + ")");
  selectPatient(newUhid, first + " " + last, '32', gender, allergyText, 'New Admission Triage');
}

function handleAllergyStatusChange() {
  const status = document.getElementById('regAllergyStatus').value;
  const specificBox = document.getElementById('regSpecificAllergenGroup');
  if (specificBox) {
    specificBox.style.display = (status === 'allergic') ? 'block' : 'none';
  }
}

// Pharmacy Barcode Verification
function scanPharmacyBarcode() {
  const statusEl = document.getElementById('pharmacyScanStatus');
  const dispenseBtn = document.getElementById('pharmacyDispenseBtn');
  if (statusEl) {
    statusEl.innerHTML = `
      <div style="font-weight:700; color:var(--color-success); margin-bottom:0.25rem;">
        Barcode Verified: GTIN-890123456789 - Azithromycin 500mg
      </div>
      <div>Match confirmed against electronic prescription Rx-2026-7841. Batch #AZ-9914 (Expiry: 2028-09). Zero drug-allergy hazard detected.</div>
    `;
    statusEl.className = "alert-banner alert-banner-success";
  }
  if (dispenseBtn) {
    dispenseBtn.disabled = false;
    dispenseBtn.className = "btn btn-primary";
  }
  showToast("Barcode scan matched prescription. Safety gate cleared for dispensing.");
}

function completeDispense() {
  showToast("Medication dispensed. Central pharmacy inventory depleted by 1 unit. Signed by " + currentUser.name);
  const row = document.getElementById('pharmacyQueueRow1');
  if (row) {
    row.innerHTML = `
      <td><strong>RX-2026-7841</strong></td>
      <td>AH-2026-0982 (Rajesh Kumar)</td>
      <td>Azithromycin 500mg Oral</td>
      <td><span class="badge badge-success">Dispensed & Verified</span></td>
      <td>Verified by ${currentUser.name}</td>
    `;
  }
}

// Cryptographic Audit Ledger Verification
function verifyAuditIntegrity() {
  const modal = document.getElementById('auditVerificationModal');
  if (modal) modal.classList.add('active');
}

function closeAuditModal() {
  const modal = document.getElementById('auditVerificationModal');
  if (modal) modal.classList.remove('active');
}

// Legacy Data Quarantine Reconciliation
function openReconciliationModal(id, patientName, legacyId, errCode, rawVal) {
  const modal = document.getElementById('quarantineReconcileModal');
  const targetId = document.getElementById('modalQuarantineId');
  const targetName = document.getElementById('modalQuarantineName');
  const targetErr = document.getElementById('modalQuarantineErr');
  const targetRaw = document.getElementById('modalQuarantineRaw');

  if (targetId) targetId.innerText = id;
  if (targetName) targetName.innerText = patientName + " (" + legacyId + ")";
  if (targetErr) targetErr.innerText = errCode;
  if (targetRaw) targetRaw.value = rawVal;

  if (modal) modal.classList.add('active');
}

function closeReconciliationModal() {
  const modal = document.getElementById('quarantineReconcileModal');
  if (modal) modal.classList.remove('active');
}

function saveReconciledRecord() {
  closeReconciliationModal();
  const counter = document.getElementById('quarantinePendingCounter');
  if (counter) {
    const current = parseInt(counter.innerText.replace(/,/g, '')) || 168000;
    counter.innerText = (current - 1).toLocaleString();
  }
  showToast("Record reconciled and approved by Clinical Data Custodian. Ingested into active patient index.");
}

// Embedded Engineering Deliverables Document Tab Switcher
function showDoc(docId) {
  document.querySelectorAll('.doc-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-doc') === docId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.doc-article').forEach(art => {
    if (art.id === 'doc-' + docId) {
      art.style.display = 'block';
    } else {
      art.style.display = 'none';
    }
  });
}

// Notification Toast
function showToast(message) {
  let toast = document.getElementById('systemToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'systemToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#0f2232';
    toast.style.color = '#ffffff';
    toast.style.padding = '0.75rem 1.25rem';
    toast.style.borderRadius = '4px';
    toast.style.border = '1px solid #334155';
    toast.style.fontSize = '0.825rem';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 4000);
}
