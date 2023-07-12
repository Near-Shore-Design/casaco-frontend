export interface privateProp {
  path: string;
  element: React.ReactNode;
  children?: Array<{ path?: string; element?: React.ReactNode; index?: any }>;
}

export interface publicProp {
  path: string;
  element: React.ReactNode;
  children?: Array<{ path?: string; element?: React.ReactNode; index?: any }>;
}
