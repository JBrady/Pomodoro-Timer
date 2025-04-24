import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Timer from './Timer';

describe('Timer Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial time based on initialMinutes', () => {
    render(<Timer initialMinutes={1} />);
    expect(screen.getByText('01:00')).toBeInTheDocument();
  });

  it('starts and counts down after clicking Start', () => {
    render(<Timer initialMinutes={1} />);
    const startBtn = screen.getByText('Start');
    act(() => {
      fireEvent.click(startBtn);
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:59')).toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('resets timer when Reset is clicked', () => {
    render(<Timer initialMinutes={1} />);
    const startBtn = screen.getByText('Start');
    act(() => {
      fireEvent.click(startBtn);
      jest.advanceTimersByTime(2000);
    });
    const resetBtn = screen.getByText('Reset');
    act(() => fireEvent.click(resetBtn));
    expect(screen.getByText('01:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
