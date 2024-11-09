"use client"

import { useState, useCallback } from 'react';
import { Issue, FilterOptions } from '@/types';

const MOCK_ISSUES: Issue[] = [
  {
    id: 'TP-8782',
    sentiment: 'Positive',
    source: 'Trust Pilot',
    description: 'The SAS interface is down, bypass the open-source pixel so we can back up the PN',
    critical: true,
    team: 'Finance',
    priority: 'Medium'
  },
  {
    id: 'LC-7878',
    sentiment: 'Negative',
    source: 'Live Chat',
    description: 'The SAS interface is down, bypass the open-source pixel so we can back up the PN',
    team: 'Engineering',
    priority: 'Medium'
  },
  {
    id: 'TP-7839',
    sentiment: 'Negative',
    source: 'Trust Pilot',
    description: 'The SAS interface is down, bypass the open-source pixel so we can back up the PN',
    critical: true,
    team: 'Finance',
    priority: 'High'
  },
  // Add 7 more similar entries with varied data
];

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [filters, setFilters] = useState<FilterOptions>({});

  const filteredIssues = useCallback(() => {
    return issues.filter(issue => {
      if (filters.status && issue.sentiment !== filters.status) return false;
      if (filters.priority && issue.priority !== filters.priority) return false;
      return true;
    });
  }, [issues, filters]);

  const exportToCSV = useCallback(() => {
    const filtered = filteredIssues();
    const headers = ['ID', 'Sentiment', 'Source', 'Description', 'Team', 'Priority', 'Critical'];
    const csvContent = filtered.map(issue => 
      [issue.id, issue.sentiment, issue.source, issue.description, issue.team, issue.priority, issue.critical].join(',')
    );
    
    const csv = [headers.join(','), ...csvContent].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer-issues.csv';
    a.click();
  }, [filteredIssues]);

  return { issues, filteredIssues, setFilters, exportToCSV };
} 