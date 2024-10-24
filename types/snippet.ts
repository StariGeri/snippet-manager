export type SnippetCardItem = {
  id: string; 
  title: string; 
  description?: string; 
  language: string; 
  code: string; 
  tags?: Tag[]; 
};

export type Tag = {
  id: string; 
  name: string; 
};
