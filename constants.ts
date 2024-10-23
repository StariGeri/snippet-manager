import { Code, Home } from "lucide-react";

export const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    isActive: true,
  },
  {
    title: "Snippets",
    url: "/snippets",
    icon: Code,
  },
];

export const initialFolders = [
  {
    id: '1',
    name: 'JavaScript',
    snippets: [
      { id: '1', name: 'Array Methods' },
      { id: '2', name: 'Promise Example' },
    ],
  },
  {
    id: '2',
    name: 'React',
    snippets: [
      { id: '3', name: 'useEffect Hook' },
      { id: '4', name: 'Custom Hook' },
    ],
  },
]