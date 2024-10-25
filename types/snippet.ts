import { SelectSnippet } from '@/lib/db/schema';

export type SnippetCardItem = {
  id: string; 
  title: string; 
  description?: string; 
  language: string; 
  code: string; 
  tags?: Tag[]; 
};

export interface Tag {
  id: string;
  name: string;
}

export interface Snippet extends SelectSnippet {
  tags: Tag[];
}
