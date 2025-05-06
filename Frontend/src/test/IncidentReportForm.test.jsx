import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IncidentReportForm from '../pages/IncidentReportForm';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { useReportStore } from '../store/report.store';

// Mock GMap and Statustracking Components
vi.mock('../Components/Report/GMap', () => ({
  default: ({ onLocationSelect }) => (
    <button onClick={() => onLocationSelect(6.9271, 79.8612)}>Select Location</button>
  )
}));

vi.mock('../Components/Report/Statustracking', () => () => <div>Status Tracking</div>);

// Mock Toast
vi.mock('../Components/Toast', () => ({
  default: ({ title, description }) => (
    <div data-testid="toast">{title} - {description}</div>
  )
}));

// Mock store
vi.mock('../store/report.store', async () => {
  const original = await vi.importActual('../store/report.store');
  return {
    ...original,
    useReportStore: vi.fn(),
  };
});

describe('IncidentReportForm', () => {
  const mockCreateReport = vi.fn();

  beforeEach(() => {
    useReportStore.mockReturnValue({ createReport: mockCreateReport });
  });

  it('renders the form correctly', () => {
    render(
      <BrowserRouter>
        <IncidentReportForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/Report an Incident/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Anonymously/i)).toBeInTheDocument();
  });

  it('shows error toast on submit without required fields', async () => {
    render(
      <BrowserRouter>
        <IncidentReportForm />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('toast')).toHaveTextContent(/Missing Fields/i);
    });
  });

  it('hides personal info when anonymous toggle is enabled', () => {
    render(
      <BrowserRouter>
        <IncidentReportForm />
      </BrowserRouter>
    );

    const toggle = screen.getByRole('checkbox');
    fireEvent.click(toggle);

    expect(screen.queryByLabelText(/Name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Contact/i)).not.toBeInTheDocument();
  });

  it('submits form successfully with valid data', async () => {
    mockCreateReport.mockResolvedValue({ success: true });

    render(
      <BrowserRouter>
        <IncidentReportForm />
      </BrowserRouter>
    );

    // Fill the form
    fireEvent.change(screen.getByLabelText(/Incident Type/i), {
      target: { value: 'Poaching' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Spotted illegal activity' },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2025-05-04' },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: '12:00' },
    });
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: 'High' },
    });

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Contact/i), {
      target: { value: 'john@example.com' },
    });

    fireEvent.click(screen.getByText('Select Location'));

    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockCreateReport).toHaveBeenCalled();
      expect(screen.getByTestId('toast')).toHaveTextContent(/Report Submitted/i);
    });
  });
});
