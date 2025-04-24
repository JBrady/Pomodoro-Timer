import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  beforeEach(() => { localStorage.clear(); });

  it('adds a new task when Add is clicked', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('New task');
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('toggles task completion', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('New task');
    fireEvent.change(input, { target: { value: 'Another Task' } });
    fireEvent.click(screen.getByText('Add'));
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('edits a task', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('New task');
    fireEvent.change(input, { target: { value: 'Edit Me' } });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Edit'));
    const editInput = screen.getByDisplayValue('Edit Me');
    fireEvent.change(editInput, { target: { value: 'Edited' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('Edited')).toBeInTheDocument();
  });

  it('deletes a task', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('New task');
    fireEvent.change(input, { target: { value: 'Delete Me' } });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });
});
