import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

const COUNTRY_CODES = [
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCalendar(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

// ─── Shared input styles ──────────────────────────────────────────────────────

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    bgcolor: "rgba(255,255,255,0.02)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.18)" },
    "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.4)", borderWidth: "1px" },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.38)",
    fontSize: "0.82rem",
    "&.Mui-focused": { color: "rgba(255,255,255,0.7)" },
  },
  "& .MuiInputBase-input": { color: "#fff", fontSize: "0.85rem", py: "10px" },
  "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function RetentionAuditBooking() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selDate, setSelDate] = useState<Date | null>(null);
  const [selTime, setSelTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", countryCode: "+91", phone: "", website: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const cells = buildCalendar(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today || d.getDay() === 0 || d.getDay() === 6;
  };

  const isSelected = (day: number) =>
    selDate?.getFullYear() === viewYear &&
    selDate?.getMonth() === viewMonth &&
    selDate?.getDate() === day;

  const isToday = (day: number) => {
    const t = new Date();
    return t.getFullYear() === viewYear && t.getMonth() === viewMonth && t.getDate() === day;
  };

  const handleDayClick = (day: number) => {
    if (!isDisabled(day)) {
      setSelDate(new Date(viewYear, viewMonth, day));
      setSelTime(null);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const ready = !!selDate && !!selTime;

  const dateStr = selDate
    ? `${WDAYS[selDate.getDay()]}, ${selDate.getDate()} ${MONTHS[selDate.getMonth()]} ${selDate.getFullYear()}`
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    if (!form.name.trim() || !form.email.trim()) {
      setErrMsg("Name and email are required.");
      return;
    }
    setErrMsg("");
    setLoading(true);

    const payload = {
      ...form,
      subject: "Free Retention Audit Booking Request",
      bookingDate: dateStr,
      bookingTime: selTime,
      message: `Booking: ${dateStr} at ${selTime}\nWebsite: ${form.website}\nNotes: ${form.notes}`,
    };

    try {
      const res = await fetch("https://aksharsync.com/api/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setBooked(true);
      } else {
        setErrMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setErrMsg("Connection failed. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── shared card surface ──
  const cardSx = {
    bgcolor: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
  };

  return (
    <Box
      sx={{
        bgcolor: "#060e1a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 8 },
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glows */}
      <Box sx={{ position: "absolute", top: "10%", right: "5%", width: 480, height: 480, background: "radial-gradient(circle, rgba(127,208,255,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <Box sx={{ width: "100%", maxWidth: 720, px: { xs: 2, md: 3 }, position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontSize: { xs: "1.9rem", md: "2.5rem" },
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #fff 0%, rgba(127,208,255,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Book Your Free Retention Audit
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", maxWidth: 420, mx: "auto", lineHeight: 1.7 }}>
              Pick a slot and we'll show you exactly where you're leaving money on the table.
            </Typography>
          </Box>
        </motion.div>

        <AnimatePresence mode="wait">
          {booked ? (
            /* ── Success ── */
            <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Paper elevation={0} sx={{ ...cardSx, p: { xs: 4, md: 6 }, textAlign: "center" }}>
                <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "rgba(127,208,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2.5 }}>
                  <EventAvailableIcon sx={{ color: "#7fd0ff", fontSize: 28 }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", mb: 1 }}>You're booked!</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", mb: 3, lineHeight: 1.7 }}>
                  Confirmation has been sent to <strong style={{ color: "#fff" }}>{form.email}</strong>
                </Typography>
                <Box sx={{ display: "inline-block", px: 3, py: 1.5, borderRadius: "10px", bgcolor: "rgba(127,208,255,0.08)", border: "0.5px solid rgba(127,208,255,0.2)" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#7fd0ff" }}>{dateStr}</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", mt: 0.3 }}>{selTime}</Typography>
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", mt: 3 }}>
                  We look forward to speaking with you, {form.name.split(" ")[0]}.
                </Typography>
              </Paper>
            </motion.div>
          ) : (
            /* ── Main booking card ── */
            <motion.div key="booking" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <Paper
                elevation={0}
                sx={{
                  ...cardSx,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  overflow: "hidden",
                }}
              >
                {/* ────── LEFT: Calendar + Time ────── */}
                <Box
                  sx={{
                    p: { xs: 3, md: 3 },
                    borderRight: { xs: "none", md: "0.5px solid rgba(255,255,255,0.07)" },
                    borderBottom: { xs: "0.5px solid rgba(255,255,255,0.07)", md: "none" },
                  }}
                >
                  {/* Section label */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }} />
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Pick a date
                    </Typography>
                  </Box>

                  {/* Month nav */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box
                      component="button"
                      onClick={prevMonth}
                      aria-label="Previous month"
                      sx={{ background: "none", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "7px", color: "#fff", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}
                    >
                      <ChevronLeftIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                      {MONTHS[viewMonth]} {viewYear}
                    </Typography>
                    <Box
                      component="button"
                      onClick={nextMonth}
                      aria-label="Next month"
                      sx={{ background: "none", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "7px", color: "#fff", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>

                  {/* Weekday headers */}
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mb: 0.5 }}>
                    {WDAYS.map(d => (
                      <Typography key={d} sx={{ textAlign: "center", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.28)", py: "4px" }}>
                        {d}
                      </Typography>
                    ))}
                  </Box>

                  {/* Day grid */}
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
                    {cells.map((day, i) => {
                      if (day === null) return <Box key={i} />;
                      const disabled = isDisabled(day);
                      const selected = isSelected(day);
                      const todayCell = isToday(day);
                      return (
                        <Box
                          key={i}
                          onClick={() => handleDayClick(day)}
                          sx={{
                            height: { xs: 30, md: 32 },
                            display: "flex", alignItems: "center", justifyContent: "center",
                            borderRadius: "7px",
                            cursor: disabled ? "not-allowed" : "pointer",
                            fontSize: "0.8rem",
                            fontWeight: selected ? 700 : 400,
                            color: disabled ? "rgba(255,255,255,0.2)" : selected ? "#060e1a" : "#fff",
                            bgcolor: selected ? "#7fd0ff" : "transparent",
                            outline: todayCell && !selected ? "1px solid rgba(255,255,255,0.2)" : "none",
                            outlineOffset: "-1px",
                            transition: "all 0.15s ease",
                            "&:hover": disabled ? {} : {
                              bgcolor: selected ? "#7fd0ff" : "rgba(255,255,255,0.07)",
                            },
                          }}
                        >
                          {day}
                        </Box>
                      );
                    })}
                  </Box>

                  <Typography sx={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", mt: 1.5 }}>
                    Weekends unavailable · Times in IST (UTC+5:30)
                  </Typography>

                  {/* Time slots */}
                  <AnimatePresence>
                    {selDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{ mt: 2.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }} />
                            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                              {selDate.getDate()} {MONTHS[selDate.getMonth()]}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                            {TIME_SLOTS.map(slot => (
                              <Box
                                key={slot}
                                onClick={() => setSelTime(slot)}
                                sx={{
                                  py: "6px", px: "2px", textAlign: "center",
                                  borderRadius: "7px", fontSize: "0.75rem",
                                  fontWeight: selTime === slot ? 700 : 400,
                                  cursor: "pointer",
                                  color: selTime === slot ? "#060e1a" : "rgba(255,255,255,0.6)",
                                  bgcolor: selTime === slot ? "#7fd0ff" : "rgba(255,255,255,0.03)",
                                  border: `0.5px solid ${selTime === slot ? "#7fd0ff" : "rgba(255,255,255,0.08)"}`,
                                  transition: "all 0.15s ease",
                                  "&:hover": { bgcolor: selTime === slot ? "#7fd0ff" : "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.18)" },
                                }}
                              >
                                {slot}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Summary pill */}
                  <AnimatePresence>
                    {selDate && selTime && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        <Box sx={{ mt: 2, p: "8px 12px", borderRadius: "9px", bgcolor: "rgba(127,208,255,0.07)", border: "0.5px solid rgba(127,208,255,0.2)", display: "flex", alignItems: "center", gap: 1 }}>
                          {/* <CheckCircleOutlineIcon sx={{ color: "#7fd0ff", fontSize: 15, flexShrink: 0 }} /> */}
                          <Typography sx={{ fontSize: "0.78rem", fontWeight: 500 }}>
                            <span style={{ color: "#7fd0ff" }}>{WDAYS[selDate.getDay()]}, {selDate.getDate()} {MONTHS[selDate.getMonth()]}</span>
                            {" at "}
                            <span style={{ color: "#7fd0ff" }}>{selTime}</span>
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>

                {/* ────── RIGHT: Form ────── */}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ p: { xs: 3, md: 3 }, display: "flex", flexDirection: "column", gap: "14px" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    {/* <PersonOutlineIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }} /> */}
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Your details
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth label="Full name" name="name"
                    value={form.name} onChange={handleInput}
                    required placeholder="Jane Smith"
                    size="small" sx={inputSx}
                  />
                  <TextField
                    fullWidth label="Business email" name="email" type="email"
                    value={form.email} onChange={handleInput}
                    required placeholder="jane@company.com"
                    size="small" sx={inputSx}
                  />

                  <Stack direction="row" spacing={1}>
                    <TextField
                      select label="Code" name="countryCode"
                      value={form.countryCode} onChange={handleInput}
                      size="small" sx={{ ...inputSx, minWidth: 100 }}
                    >
                      {COUNTRY_CODES.map(c => (
                        <MenuItem key={c.code} value={c.code}>
                          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <span>{c.flag}</span>
                            <span style={{ fontSize: "0.82rem" }}>{c.code}</span>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth label="Phone" name="phone"
                      value={form.phone} onChange={handleInput}
                      placeholder="9876543210"
                      size="small" sx={inputSx}
                    />
                  </Stack>

                  <TextField
                    fullWidth label="Website URL" name="website"
                    value={form.website} onChange={handleInput}
                    placeholder="yourbrand.com"
                    size="small" sx={inputSx}
                  />
                  <TextField
                    fullWidth label="Anything to share?" name="notes"
                    value={form.notes} onChange={handleInput}
                    multiline rows={3}
                    placeholder="Current Klaviyo setup, main challenge…"
                    sx={inputSx}
                  />

                  {/* Inline error */}
                  {errMsg && (
                    <Typography sx={{ fontSize: "0.78rem", color: "#ff6b6b" }}>{errMsg}</Typography>
                  )}

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading || !ready}
                    endIcon={loading ? undefined : <ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      mt: "auto",
                      py: 1.4,
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      background: ready
                        ? "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)"
                        : "rgba(255,255,255,0.06)",
                      color: ready ? "#060e1a" : "rgba(255,255,255,0.35)",
                      borderRadius: "10px",
                      textTransform: "none",
                      boxShadow: ready ? "0 8px 24px rgba(127,208,255,0.2)" : "none",
                      border: ready ? "none" : "0.5px solid rgba(255,255,255,0.08)",
                      "&:hover": ready
                        ? { transform: "translateY(-1px)", boxShadow: "0 12px 32px rgba(127,208,255,0.3)" }
                        : {},
                      "&.Mui-disabled": {
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.35)",
                      },
                      transition: "all 0.25s ease",
                    }}
                  >
                    {loading
                      ? <CircularProgress size={18} sx={{ color: "#fff" }} />
                      : !ready
                        ? "Select a date & time first"
                        : "Confirm my booking"
                    }
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}