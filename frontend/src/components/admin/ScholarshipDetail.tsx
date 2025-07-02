import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Globe,
  Users,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Star
} from 'lucide-react';
import { AdminScholarship, RouteParams } from './types';
import { validateId, formatDate, formatCurrency, getStatusColor } from './utils';

const ScholarshipDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [scholarship, setScholarship] = useState<AdminScholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validation = validateId(id);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid scholarship ID');
      setLoading(false);
      return;
    }

    const mockData: AdminScholarship[] = [
      {
        id: '1',
        title: 'Microsoft Scholarship Program',
        provider: 'Microsoft Corporation',
        amount: 5000,
        currency: 'USD',
        deadline: new Date('2024-12-31'),
        country: 'USA',
        status: 'active',
        applications: 123,
        createdBy: 'admin@scholarhub.com',
        createdAt: new Date('2024-01-01'),
        featured: true
      },
      {
        id: '2',
        title: 'Google Developer Scholarship',
        provider: 'Google',
        amount: 3000,
        currency: 'USD',
        deadline: new Date('2024-11-01'),
        country: 'USA',
        status: 'draft',
        applications: 98,
        createdBy: 'admin@scholarhub.com',
        createdAt: new Date('2024-03-15'),
        featured: false
      }
    ];

    const found = mockData.find(item => item.id === id);
    if (!found) {
      setError('Scholarship not found');
    } else {
      setScholarship(found);
    }

    setLoading(false);
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!scholarship) return;
    try {
      console.log(`Changing scholarship ${scholarship.id} status to ${newStatus}`);
      setScholarship({ ...scholarship, status: newStatus as any });
    } catch (error) {
      console.error('Error updating scholarship status:', error);
    }
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link
          to="/admin/scholarships"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Scholarships</span>
        </Link>
      </div>
    );
  }

  if (!scholarship) {
    return <Navigate to="/admin/scholarships" replace />;
  }

  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
  const isExpired = daysLeft <= 0;
  const isUrgent = daysLeft <= 30 && daysLeft > 0;

  // You can keep the rest of the component (header, description, sidebar, etc.) as in your provided code.
  return (
    <div className="space-y-6">
      {/* Your detailed JSX content continues here */}
      <p className="text-gray-500 text-center">Scholarship page rendering...</p>
    </div>
  );
};

export default ScholarshipDetail;