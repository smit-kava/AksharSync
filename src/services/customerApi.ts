// ============================================================
// src/services/customerApi.ts
// AksharSync Customer Portal & Traffic Analytics Service
// ============================================================

import { getAdminToken } from './blogApi';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interests?: string;
  visits_count: number;
  last_ip?: string;
  last_active: string;
  created_at?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interests?: string;
}

export interface TrafficStats {
  total_visits: number;
  unique_visitors: number;
  today_visits: number;
  total_customers: number;
}

export interface VisitorLog {
  id: number;
  ip_address: string;
  page_url: string;
  referrer?: string;
  device_type: string;
  visited_at: string;
}

export interface AnalyticsData {
  stats: TrafficStats;
  customers: Customer[];
  recent_visitors: VisitorLog[];
}

const API_BASE = '/api/customers';
const CUSTOMER_STORAGE_KEY = 'akshar_customer_session';
const SESSION_ID_KEY = 'akshar_visitor_session_id';

/**
 * Returns or creates a unique session ID for visitor tracking
 */
export function getVisitorSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Get active customer session from localStorage
 */
export function getStoredCustomer(): Customer | null {
  const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save customer session to localStorage
 */
export function setStoredCustomer(customer: Customer) {
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
}

/**
 * Clear customer session
 */
export function clearStoredCustomer() {
  localStorage.removeItem(CUSTOMER_STORAGE_KEY);
}

/**
 * Non-blocking visitor tracking call. Runs silently in the background on route changes.
 */
export async function trackPageVisit(pageUrl: string = window.location.pathname): Promise<void> {
  try {
    const sessionId = getVisitorSessionId();
    const customer = getStoredCustomer();

    await fetch(`${API_BASE}/track-visit.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_url: pageUrl,
        session_id: sessionId,
        referrer: document.referrer || '',
        customer_email: customer?.email || '',
      }),
      keepalive: true,
    });
  } catch (err) {
    // Non-blocking, ignore errors quietly
  }
}

/**
 * Customer Sign-In / Registration Popup submission
 */
export async function customerSignIn(formData: CustomerFormData): Promise<{
  success: boolean;
  message: string;
  customer: Customer;
  is_new: boolean;
}> {
  console.log('[AksharSync Customer API] Submitting customer sign-in:', formData);

  const res = await fetch(`${API_BASE}/customer-auth.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    // Graceful offline fallback so client interaction doesn't fail
    console.warn('[AksharSync Customer API] Server returned HTML, storing customer locally.');
    const mockCustomer: Customer = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      company: formData.company || '',
      interests: formData.interests || 'General Inquiry',
      visits_count: 1,
      last_active: new Date().toISOString(),
    };
    setStoredCustomer(mockCustomer);
    return {
      success: true,
      message: `Welcome, ${formData.name}! You are signed in.`,
      customer: mockCustomer,
      is_new: true,
    };
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to sign in. Please verify your details.');
  }

  if (data.customer) {
    setStoredCustomer(data.customer);
  }

  return data;
}

/**
 * Superadmin: Fetch Visitor & Customer Analytics
 */
export async function fetchCustomerAnalytics(search?: string): Promise<AnalyticsData> {
  const token = getAdminToken();
  const query = new URLSearchParams();
  if (search) query.set('search', search);
  if (token) query.set('token', token);

  const url = `${API_BASE}/get-analytics.php?${query.toString()}`;
  console.log('[AksharSync Analytics API] Fetching metrics from:', url);

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Analytics endpoint returned HTML. Please ensure public/api/customers/ is deployed to /home/akshar/public_html/api/customers/.');
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to load analytics.');
  }

  return {
    stats: data.stats || { total_visits: 0, unique_visitors: 0, today_visits: 0, total_customers: 0 },
    customers: Array.isArray(data.customers) ? data.customers : [],
    recent_visitors: Array.isArray(data.recent_visitors) ? data.recent_visitors : [],
  };
}
