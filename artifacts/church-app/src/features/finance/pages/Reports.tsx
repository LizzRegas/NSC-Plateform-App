import { useState } from "react";
import { motion } from "framer-motion";
import { Download, BarChart3, FileText, TrendingUp, PieChart, Calendar } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoToast } from "@/hooks/useDemoToast";

const reports = [
  { title: "Annual Giving Report", desc: "Complete giving summary for the year, by donor and fund", icon: BarChart3, color: "from-blue-500 to-blue-600", period: "2025 Full Year", format: "PDF, Excel" },
  { title: "Budget Variance Report", desc: "Budget vs. actual spending analysis by category", icon: PieChart, color: "from-violet-500 to-violet-600", period: "Q1 2026", format: "PDF" },
  { title: "Monthly Financial Summary", desc: "Income, expenses, and net balance for the month", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", period: "May 2026", format: "PDF, Excel" },
  { title: "Donor Statements", desc: "Individual giving statements for tax purposes", icon: FileText, color: "from-amber-500 to-amber-600", period: "Q1 2026", format: "PDF (bulk)" },
  { title: "Fund Breakdown Report", desc: "Detailed analysis of each fund and restricted gift", icon: BarChart3, color: "from-teal-500 to-teal-600", period: "May 2026", format: "Excel" },
  { title: "Year-to-Date Comparison", desc: "This year vs. last year income/expense comparison", icon: Calendar, color: "from-rose-500 to-rose-600", period: "Jan–May 2026 vs 2025", format: "PDF" },
];

const REPORT_TABLES: Record<string, { headers: string[]; rows: string[][] }> = {
  "Annual Giving Report": {
    headers: ["Fund", "Total", "Donors", "Avg Gift"],
    rows: [
      ["General Tithe", "$142,400", "284", "$501"],
      ["Missions", "$38,200", "89", "$429"],
      ["Building Campaign", "$81,600", "142", "$575"],
    ],
  },
  "Budget Variance Report": {
    headers: ["Category", "Budget", "Actual", "Variance"],
    rows: [
      ["Staff Salaries", "$220,000", "$92,500", "-58%"],
      ["Facilities", "$48,000", "$19,200", "-60%"],
      ["Events & Hospitality", "$18,000", "$16,400", "-9%"],
    ],
  },
  "Monthly Financial Summary": {
    headers: ["Line", "Amount"],
    rows: [
      ["Total Income", "$21,370"],
      ["Total Expenses", "$23,960"],
      ["Net", "-$2,590"],
    ],
  },
  "Donor Statements": {
    headers: ["Donor", "Total", "Gifts", "Status"],
    rows: [
      ["James Moreau", "$3,250", "12", "Sent"],
      ["Marie Dubois", "$2,100", "12", "Ready"],
      ["Sarah Jenkins", "$4,800", "12", "Sent"],
    ],
  },
  "Fund Breakdown Report": {
    headers: ["Fund", "Balance", "% of Total"],
    rows: [
      ["General Fund", "$42,300", "28%"],
      ["Building Fund", "$81,600", "54%"],
      ["Missions Fund", "$14,200", "9%"],
    ],
  },
  "Year-to-Date Comparison": {
    headers: ["Metric", "2026 YTD", "2025 YTD", "Change"],
    rows: [
      ["Income", "$115,240", "$98,400", "+17%"],
      ["Expenses", "$92,100", "$88,200", "+4%"],
      ["Net", "$23,140", "$10,200", "+127%"],
    ],
  },
};

const recent = [
  { name: "Q4 2025 Financial Summary", date: "Jan 15, 2026", size: "2.4 MB" },
  { name: "Annual Giving Report 2025", date: "Jan 12, 2026", size: "5.1 MB" },
  { name: "Budget Report Q4 2025", date: "Jan 10, 2026", size: "1.8 MB" },
  { name: "Donor Statements — Q4 2025", date: "Jan 8, 2026", size: "12.3 MB" },
];

export default function Reports() {
  const { success } = useDemoToast();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [customForm, setCustomForm] = useState({ name: "", period: "Q1 2026", format: "PDF" });

  const openPreview = (title: string) => {
    setPreviewTitle(title);
    setPreviewOpen(true);
  };

  const previewData = REPORT_TABLES[previewTitle] ?? { headers: ["Column A", "Column B"], rows: [["—", "—"]] };

  const handleCustomGenerate = () => {
    if (!customForm.name.trim()) return;
    success("Report queued", `${customForm.name} (${customForm.period})`);
    setCustomOpen(false);
    setCustomForm({ name: "", period: "Q1 2026", format: "PDF" });
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Reports"
          subtitle="Generate and download financial reports"
          section="Finance"
          action={
            <button type="button" onClick={() => setCustomOpen(true)} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <BarChart3 className="w-4 h-4" /> Custom Report
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {reports.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              className="card-lumina card-lumina-interactive p-5 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center`}
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
                  <r.icon className="w-5 h-5 text-white" />
                </div>
                <button
                  type="button"
                  onClick={() => openPreview(r.title)}
                  className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Download className="w-3 h-3" /> Generate
                </button>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {r.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{r.desc}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="badge badge-gray">{r.period}</span>
                <span>{r.format}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="px-5 sm:px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Recent Downloads
            </h3>
          </div>
          <div className="divide-y divide-border/40">
            {recent.map((r) => (
              <div key={r.name} className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-accent/30 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.date} · {r.size}
                    </p>
                  </div>
                </div>
                <button type="button" className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <FormDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          title={`Report Preview — ${previewTitle}`}
          description="Sample data for this report type."
          className="sm:max-w-2xl"
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setPreviewOpen(false)}>
                Close
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2 rounded-xl text-sm"
                onClick={() => {
                  success("Report generated", previewTitle);
                  setPreviewOpen(false);
                }}
              >
                Download PDF
              </button>
            </>
          }
        >
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[320px] text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {previewData.headers.map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {previewData.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FormDialog>

        <FormDialog
          open={customOpen}
          onOpenChange={setCustomOpen}
          title="Custom Report"
          description="Configure a one-off financial report."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setCustomOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleCustomGenerate}>
                Generate
              </button>
            </>
          }
        >
          <FormField label="Report name" htmlFor="custom-name">
            <input id="custom-name" value={customForm.name} onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })} className={inputClass} placeholder="e.g. Board Summary" />
          </FormField>
          <FormField label="Period" htmlFor="custom-period">
            <select id="custom-period" value={customForm.period} onChange={(e) => setCustomForm({ ...customForm, period: e.target.value })} className={selectClass}>
              <option>Q1 2026</option>
              <option>Q2 2026</option>
              <option>YTD 2026</option>
              <option>Full Year 2025</option>
            </select>
          </FormField>
          <FormField label="Format" htmlFor="custom-format">
            <select id="custom-format" value={customForm.format} onChange={(e) => setCustomForm({ ...customForm, format: e.target.value })} className={selectClass}>
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
