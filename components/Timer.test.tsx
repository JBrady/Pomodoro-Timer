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

  it('invokes onAudioCue prop when audio plays', () => {
    const mockOsc = { connect: jest.fn(), start: jest.fn(), stop: jest.fn(), frequency: { value: 0 } };
    const mockGainNode = { gain: { setValueAtTime: jest.fn() }, connect: jest.fn() };
    const mockCtx = {
      createOscillator: () => mockOsc,
      createGain: () => mockGainNode,
      currentTime: 0,
      destination: {},
      close: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.AudioContext = jest.fn(() => mockCtx as any);
    window.webkitAudioContext = window.AudioContext;
    const onAudioCue = jest.fn();
    act(() => {
      render(<Timer initialMinutes={0} autoStart={false} onAudioCue={onAudioCue} />);
    });
    expect(onAudioCue).toHaveBeenCalled();
  });

  // AudioContext-based audio test removed while audio functionality is disabled
});
