import React from 'react';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type UncertainObjectType = {
  [key: string]: any;
};

export type UserType = {
  id: number;
  titles: string;
  names: string;
  address: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  status: string;
  dept: string;
  d_unit: string;
  fname: string;
  lname: string;
  marital: string;
  pastors: string;
  hods: string;
  hous: string;
  dcns: string;
  flagz: string;
  subscribed: string;
  churchCenter: string;
  member: string;
  registrationSource: string;
  password: string;
  verificationCode: string;
  isPasswordSet: string;
  createdAt: string;
  updatedAt: string;
};

export type FeedbackType = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  content: string;
  status: 'read' | 'unread';
  source: 'web' | 'mobile';
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResultType = {
  data: UserType[];
  meta: PageMetaType;
};

export type PageMetaType = {
  totalResults: number;
  resultsPerPage: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type DevotionalType = {
  dish_id: number;
  titles: string;
  scripture1: string;
  scripture2: string;
  main_text: string;
  contents: string;
  ditto: Date; // Date
  years: string;
  months: string;
  days: string;
  nu_url: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

export type EventType = {
  _id: string;
  name: string;
  theme: string;
  mainText: string;
  date: string;
  time: string;
  allowRegistration: boolean;
  registrationEntries: UncertainObjectType[];
  gallery: string[];
  limitedNumberRegistration: boolean;
  registrationNumberLimit: number;
  limitedDateRegistration: boolean;
  registrationDateLimit: string;
  requiredRegistrationDetails: {
    id: string;
    name: string;
    type: string;
    options?: string;
  }[];
  poster: string;
  location: string;
  eventType: 'offline' | 'online';
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
};

export type AdminType = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  active: boolean;
  avatar?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export interface RegistrationDetailType {
  [id: string]: {
    id: string;
    name: string;
    type: string;
    options?: string;
  };
}

export interface TestimonyType {
  test_id: number;
  names: string;
  email: string;
  phoneNumber: string;
  titles: string;
  main_gist: string;
  ditto: Date;
  status: 'pending' | 'approved' | 'declined' | 'archived';
  source: 'web' | 'mobile';
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionType {
  reference: string;
  status: string;
  source: string;
  createdAt: Date;
  _id: string;
}

export interface AnnouncementType {
  id: number;
  title: string;
  details: string;
  priority: number;
  image: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TFCCType {
  address: string;
  cellLeader: string;
  phoneNumber: string;
  zone: string;
  createdBy: string;
  _id: string;
  updatedBy: string;
}
export interface TFCCZoneType {
  name: string;
  createdBy: string;
  _id: string;
  updatedBy: string;
}
