export interface EmailTemplateProduct {
  templateStoreId?: number;
  name: string;
  preview?: string;
  raw: string;
  author: string;
  thumbnailUrl?: string;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableTemplateProducts {
  content: EmailTemplateProduct[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
