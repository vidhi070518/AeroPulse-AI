import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/copilot/route';

const mockGenerateContent = vi.fn();

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: mockGenerateContent
      };
    }
  };
});

describe('AeroPulse Copilot API Endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GEMINI_API_KEY;
  });

  it('rejects requests with missing message body', async () => {
    const req = new NextRequest('http://localhost:3000/api/copilot', {
      method: 'POST',
      body: JSON.stringify({})
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it('rejects requests exceeding maximum character limit', async () => {
    const req = new NextRequest('http://localhost:3000/api/copilot', {
      method: 'POST',
      body: JSON.stringify({ message: 'a'.repeat(2500) })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toContain('maximum allowed length');
  });

  it('gracefully uses intelligent fallback engine when GEMINI_API_KEY is not set', async () => {
    const req = new NextRequest('http://localhost:3000/api/copilot', {
      method: 'POST',
      body: JSON.stringify({
        message: 'How do I build a Corsi-Rosenthal box for winter smog?',
        location: {
          name: 'Delhi NCR',
          neighborhood: 'Anand Vihar',
          aqi: 438,
          pm25: 395,
          inversionCeilingMeters: 130,
          primaryPollutant: 'PM2.5'
        }
      })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.source).toBe('aeropulse-expert-engine');
    expect(json.data.reply).toContain('Corsi-Rosenthal');
    expect(json.data.suggestions).toBeDefined();
    expect(json.data.suggestions.length).toBeGreaterThan(0);
  });

  it('calls GoogleGenAI generateContent when GEMINI_API_KEY is provided', async () => {
    process.env.GEMINI_API_KEY = 'test-key-123';

    mockGenerateContent.mockResolvedValueOnce({
      text: '### Customized Smog Strategy\nHere is your tailored defense.'
    });

    const req = new NextRequest('http://localhost:3000/api/copilot', {
      method: 'POST',
      body: JSON.stringify({
        message: 'When should I open windows today?',
        location: {
          name: 'Delhi NCR',
          aqi: 438,
          pm25: 395
        }
      })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.source).toBe('gemini-2.5-flash');
    expect(json.data.reply).toContain('Customized Smog Strategy');
  });
});

