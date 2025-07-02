import { useState } from 'react';
import { ScholarshipFilters } from '../types/scholarship';

export const useScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [currentScholarship, setCurrentScholarship] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ScholarshipFilters>({
    page: 1,
    limit: 12,
    sortBy: 'deadline'
  });

  const updateFilters = (newFilters: Partial<ScholarshipFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    scholarships,
    totalScholarships,
    currentScholarship,
    loading,
    error,
    filters,
    updateFilters,
    // Các hàm fetch/add/edit/remove đã bị xoá do không còn Supabase
  };
};