import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Plus, Eye, Edit, Trash2, Calendar, Globe, Users
} from 'lucide-react';
import { AdminScholarship } from './types';
import { getStatusColor, formatCurrency } from './utils';

const ScholarshipManagement: React.FC = () => {
  const [scholarships, setScholarships] = useState<AdminScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScholarships, setSelectedScholarships] = useState<string[]>([]);
  const scholarshipsPerPage = 10;

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        console.warn('⚠️ No backend connected. Using mock data.');
        const mockData: AdminScholarship[] = [
          {
            id: '1',
            title: 'Global Leaders Scholarship',
            provider: 'Oxford University',
            amount: 15000,
            currency: 'USD',
            deadline: new Date('2025-12-31'),
            country: 'UK',
            status: 'active',
            applications: 24,
            createdBy: 'admin1',
            createdAt: new Date('2024-07-01'),
            featured: true
          }
        ];
        setScholarships(mockData);
      } catch (err) {
        console.error('Error fetching scholarships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [searchQuery, filterStatus, filterCountry]);

  const filteredScholarships = scholarships.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchCountry = filterCountry === 'all' || s.country === filterCountry;
    return matchSearch && matchStatus && matchCountry;
  });

  const totalPages = Math.ceil(filteredScholarships.length / scholarshipsPerPage);
  const startIndex = (currentPage - 1) * scholarshipsPerPage;
  const paginatedScholarships = filteredScholarships.slice(startIndex, startIndex + scholarshipsPerPage);

  const handleScholarshipAction = (id: string, action: 'activate' | 'deactivate' | 'delete') => {
    console.warn(`${action} scholarship ${id}`);
    if (action === 'delete') {
      setScholarships(prev => prev.filter(s => s.id !== id));
    } else {
      setScholarships(prev =>
        prev.map(s => s.id === id ? { ...s, status: action === 'activate' ? 'active' : 'inactive' } : s)
      );
    }
  };

  const handleBulkAction = (action: string) => {
    console.warn(`Bulk ${action} on:`, selectedScholarships);
    if (action === 'delete') {
      setScholarships(prev => prev.filter(s => !selectedScholarships.includes(s.id)));
    } else {
      setScholarships(prev =>
        prev.map(s =>
          selectedScholarships.includes(s.id)
            ? { ...s, status: action === 'activate' ? 'active' : 'inactive' }
            : s
        )
      );
    }
    setSelectedScholarships([]);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date().getTime();
    const end = deadline.getTime();
    return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Scholarship Management</h2>
            <p className="text-gray-500">Manage opportunities</p>
          </div>
          <Link to="/create-scholarship" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded-lg">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
          <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className="border p-2 rounded-lg">
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
          </select>
          {selectedScholarships.length > 0 && (
            <select onChange={(e) => { if (e.target.value) handleBulkAction(e.target.value); }} className="border p-2 rounded-lg">
              <option value="">Bulk Actions ({selectedScholarships.length})</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              <option value="delete">Delete</option>
            </select>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th><input type="checkbox" onChange={(e) => {
                  setSelectedScholarships(e.target.checked ? paginatedScholarships.map(s => s.id) : []);
                }} /></th>
                <th>Title</th>
                <th>Amount</th>
                <th>Country</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Apps</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedScholarships.map(s => {
                const daysLeft = getDaysUntilDeadline(s.deadline);
                return (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td>
                      <input type="checkbox"
                        checked={selectedScholarships.includes(s.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedScholarships([...selectedScholarships, s.id]);
                          else setSelectedScholarships(selectedScholarships.filter(id => id !== s.id));
                        }}
                      />
                    </td>
                    <td>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-gray-500">{s.provider}</div>
                    </td>
                    <td>{formatCurrency(s.amount, s.currency)}</td>
                    <td><Globe className="inline h-4 w-4 mr-1 text-gray-400" />{s.country}</td>
                    <td>
                      <div className={`text-sm ${daysLeft <= 0 ? 'text-red-600' : daysLeft <= 30 ? 'text-orange-600' : ''}`}>
                        <Calendar className="inline h-4 w-4 mr-1" /> {s.deadline.toLocaleDateString()}
                        <div className="text-xs">{daysLeft <= 0 ? 'Expired' : `${daysLeft} days left`}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td><Users className="inline h-4 w-4 mr-1 text-gray-400" /> {s.applications}</td>
                    <td className="flex gap-2">
                      <Link to={`/admin/scholarships/${s.id}`}><Eye className="h-4 w-4 text-blue-600" /></Link>
                      <button><Edit className="h-4 w-4 text-gray-600" /></button>
                      <button onClick={() => handleScholarshipAction(s.id, 'delete')}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + scholarshipsPerPage, filteredScholarships.length)} of {filteredScholarships.length}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'font-bold' : ''}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipManagement;
