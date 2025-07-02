// Supabase đã bị loại bỏ hoàn toàn khỏi file này
import { Scholarship, ScholarshipFilters, ScholarshipFormData, PaginatedResponse } from '../types/scholarship';

// Hàm chuyển đổi row giả định thành dạng interface Scholarship
export const transformScholarship = (row: any): Scholarship => {
  return {
    id: row.id,
    title: row.title,
    provider: row.provider,
    amount: row.amount,
    currency: row.currency,
    deadline: new Date(row.deadline),
    country: row.country,
    fieldOfStudy: row.field_of_study,
    academicLevel: row.academic_level,
    requirements: row.requirements,
    description: row.description,
    applicationUrl: row.application_url,
    tags: row.tags || [],
    featured: row.featured || false,
    createdAt: new Date(row.created_at),
    createdBy: row.created_by,
    isSaved: false
  };
};

// Các hàm giả định để tránh lỗi khi import
export const getScholarships = async (_filters?: ScholarshipFilters): Promise<PaginatedResponse<Scholarship>> => {
  console.warn('getScholarships: No backend connected');
  return { data: [], total: 0, page: 1, limit: 12 };
};

export const getScholarshipById = async (_id: string): Promise<Scholarship> => {
  console.warn('getScholarshipById: No backend connected');
  throw new Error('No backend connected');
};

export const createScholarship = async (_data: ScholarshipFormData): Promise<Scholarship> => {
  console.warn('createScholarship: No backend connected');
  throw new Error('No backend connected');
};

export const updateScholarship = async (_id: string, _data: Partial<ScholarshipFormData>): Promise<Scholarship> => {
  console.warn('updateScholarship: No backend connected');
  throw new Error('No backend connected');
};

export const deleteScholarship = async (_id: string): Promise<boolean> => {
  console.warn('deleteScholarship: No backend connected');
  throw new Error('No backend connected');
};

export const saveScholarship = async (_scholarshipId: string, _userId: string): Promise<boolean> => {
  console.warn('saveScholarship: No backend connected');
  throw new Error('No backend connected');
};

export const unsaveScholarship = async (_scholarshipId: string, _userId: string): Promise<boolean> => {
  console.warn('unsaveScholarship: No backend connected');
  throw new Error('No backend connected');
};

export const isScholarshipSaved = async (_scholarshipId: string, _userId: string): Promise<boolean> => {
  console.warn('isScholarshipSaved: No backend connected');
  return false;
};

export const getSavedScholarships = async (_userId: string): Promise<Scholarship[]> => {
  console.warn('getSavedScholarships: No backend connected');
  return [];
};

export const getScholarshipsByCreator = async (_creatorId: string): Promise<Scholarship[]> => {
  console.warn('getScholarshipsByCreator: No backend connected');
  return [];
};
