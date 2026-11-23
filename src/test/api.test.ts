import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/copilot/route';
import { 
  generateSmartSuggestions, 
  generateExpertFallbackResponse 
} from '../utils/copilotFallback';

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
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('X-Frame-Options')).toBe('DENY');
  });

  it('rejects malformed JSON payloads with 400 status', async () => {
    const req = new NextRequest('http://localhost:3000/api/copilot', {
      method: 'POST',
      body: 'invalid-json{{{'
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toContain('Malformed JSON');
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
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

  it('generates context-aware smart suggestions based on query intent', () => {
    const infantSuggestions = generateSmartSuggestions('How to protect my baby from smog', 350);
    expect(infantSuggestions.some(s => s.toLowerCase().includes('nursery'))).toBe(true);

    const maskSuggestions = generateSmartSuggestions('Which N95 mask to buy', 280);
    expect(maskSuggestions.some(s => s.toLowerCase().includes('n95'))).toBe(true);

    const cookingSuggestions = generateSmartSuggestions('Gas stove vs induction', 310);
    expect(cookingSuggestions.some(s => s.toLowerCase().includes('induction'))).toBe(true);
  });

  it('generates domain-accurate fallback responses for ventilation, pets, and induction', () => {
    const ventResponse = generateExpertFallbackResponse('When should I ventilate?');
    expect(ventResponse).toContain('Thermal Inversion Ventilation');
    expect(ventResponse).toContain('12:30 PM');

    const petResponse = generateExpertFallbackResponse('How to protect my dog?');
    expect(petResponse).toContain('Pet Respiratory Protection');

    const kitchenResponse = generateExpertFallbackResponse('Is induction stove better?');
    expect(kitchenResponse).toContain('Kitchen Air Defense');
    expect(kitchenResponse).toContain('Induction');
  });
});

