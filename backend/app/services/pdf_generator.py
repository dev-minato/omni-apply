import os
import re
from fpdf import FPDF
from app.models import CandidateProfile, JobPosting

RESUMES_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data", "resumes")
os.makedirs(RESUMES_DIR, exist_ok=True)

class ATSResumePDF(FPDF):
    def header(self):
        pass  # Clean ATS header handled in body

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

def generate_ats_resume_pdf(candidate: CandidateProfile, job: JobPosting, tailored_text: str, app_id: str) -> str:
    filename = f"resume_{app_id}.pdf"
    filepath = os.path.join(RESUMES_DIR, filename)

    pdf = ATSResumePDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_margins(15, 15, 15)

    # Name Header
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(20, 30, 45)
    pdf.cell(0, 8, candidate.name.upper(), ln=True, align="C")

    # Sub-header / Contact
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(70, 80, 95)
    contact_parts = [
        candidate.location or "India",
        candidate.phone or "",
        candidate.email,
        candidate.portfolio_url or candidate.github_url or ""
    ]
    contact_line = " | ".join([p for p in contact_parts if p])
    pdf.cell(0, 6, contact_line, ln=True, align="C")
    pdf.ln(3)

    # Divider line
    pdf.set_draw_color(200, 205, 215)
    pdf.set_line_width(0.5)
    pdf.line(15, pdf.get_y(), 195, pdf.get_y())
    pdf.ln(4)

    # Process Sections from tailored text
    lines = tailored_text.split("\n")
    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            pdf.ln(2)
            continue

        # Check if section header (all caps or starts with ##)
        clean_header = line.replace("#", "").strip()
        is_header = False
        if clean_header.isupper() and len(clean_header) > 3 and len(clean_header) < 35:
            is_header = True
        elif line.startswith("# "):
            is_header = True
            clean_header = line.replace("#", "").strip()

        if is_header:
            pdf.ln(3)
            pdf.set_font("Helvetica", "B", 11)
            pdf.set_text_color(30, 58, 138)  # Deep Navy Blue
            pdf.cell(0, 6, clean_header, ln=True)
            pdf.set_draw_color(210, 220, 240)
            pdf.line(15, pdf.get_y(), 195, pdf.get_y())
            pdf.ln(2)
        elif line.startswith("-") or line.startswith("•") or line.startswith("*"):
            bullet_text = line.lstrip("-•* ").strip()
            bullet_text = bullet_text.encode('latin-1', 'replace').decode('latin-1')
            pdf.set_font("Helvetica", "", 9.5)
            pdf.set_text_color(40, 45, 55)
            
            # Safe bullet point with proper indentation
            x_before = pdf.get_x()
            pdf.cell(6, 5, "-", ln=0)
            pdf.multi_cell(174, 5, bullet_text)
            pdf.set_x(15)  # Reset x to left margin
        else:
            safe_text = line.encode('latin-1', 'replace').decode('latin-1')
            pdf.set_font("Helvetica", "", 9.5)
            pdf.set_text_color(40, 45, 55)
            pdf.multi_cell(180, 5, safe_text)
            pdf.set_x(15)

    pdf.output(filepath)
    return filepath
