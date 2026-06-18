export type EventCategory = {
  id: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export type Service = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  coverImage?: string | null;
  isActive: boolean;
  category?: EventCategory;
};

export type CreateServicePayload = {
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  coverImage?: string;
  isActive: boolean;
};

export type UpdateServicePayload = Partial<CreateServicePayload>;

export type ServiceFormValues = {
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  image?: File | null;
  coverImage?: string;
  isActive: boolean;
};

export type ServiceFormInitialValues = Partial<ServiceFormValues>;

export type CreateCategoryPayload = {
  name: string;
  description?: string;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload> & {
  isActive?: boolean;
};