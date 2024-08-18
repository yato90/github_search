export interface Repository {
    name: string;
    forkCount: number;
    stargazerCount: number;
    primaryLanguage: {name: string;} | null;
    languages: {name: string;}[];
    updatedAt: string;
    licenseInfo: {name: string;} | null;
}

export interface PageInfo {
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean; 
}

export interface RepoState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  pageInfo: PageInfo;
  searchTerm: string;
  cursorHistory: string[];
  initialCursor: string | null;
}

export interface RepoDetailsProps {
  repo: {
    name: string;
    stargazerCount: number;
    licenseInfo: {
      name: string;
    } | null;
    primaryLanguage: {name: string;} | null;
    languages: {
      nodes: {
        name: string;
      }[];
    };
  };
}

export interface SearchRepositoriesResponse {
  search: {
    edges: {
      node: Repository;
    }[];
    pageInfo: PageInfo;
  };
}
  
  