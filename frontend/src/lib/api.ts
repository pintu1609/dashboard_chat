import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL

// ===== EMISSIONS =====
export async function fetchEmissions(year: number) {
  const res = await axios.get(`${API_BASE}/emissions`, {
    params: { year },
  });
  return res.data;
}

// ===== CHAT (LLM) =====
export async function chatWithLLM(payload: {
  message: string;
  year: number;
  sector: string;
  visibleData: any[];
}) {
  const res = await axios.post(`${API_BASE}/chat`, payload);
  return res.data.reply;
}
