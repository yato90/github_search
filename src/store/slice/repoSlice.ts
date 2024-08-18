import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'graphql-request';
import { SEARCH_REPOSITORIES_QUERY } from '../queries';
import { RepoState, Repository, PageInfo, SearchRepositoriesResponse } from '../../types/type.ts';

const GITHUB_TOKEN: string = import.meta.env.VITE_APP_API_GITHUB_TOKEN;
const GITHUB_API_URL: string = import.meta.env.VITE_APP_API_GITHUB_API_URL;


const initialState: RepoState = {
  repositories: [],
  loading: false,
  error: null,
  pageInfo: {
    endCursor: null,
    startCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  searchTerm: '',
  cursorHistory: [],
  initialCursor: null
};

export const fetchRepositories = createAsyncThunk<
  { repositories: Repository[], pageInfo: PageInfo },
  { searchTerm: string, after?: string | null, before?: string | null }
>(
  'repos/fetchRepositories',
  async ({ searchTerm, after, before  }) => {
    const variables = { query: searchTerm, after, before };
    const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` };

    const response: SearchRepositoriesResponse = await request(GITHUB_API_URL, SEARCH_REPOSITORIES_QUERY, variables, headers);
    const { edges, pageInfo } = response.search;

    return {
      repositories: edges.map((edge: any) => edge.node),
      pageInfo
    };
  }
);

const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.loading = false;
      state.repositories = action.payload.repositories;
      state.pageInfo = action.payload.pageInfo;

      if (action.meta.arg.after) {
        state.cursorHistory = [...state.cursorHistory, state.pageInfo.startCursor || ''];
      } else if (action.meta.arg.before) {
        state.cursorHistory = state.cursorHistory.slice(0, -1);
      }
      if (state.initialCursor === null) {
        state.initialCursor = state.pageInfo.startCursor || null;
      }

      state.searchTerm = action.meta.arg.searchTerm;
    });
    builder.addCase(fetchRepositories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Что-то пошло не так';
    });
  },
});
  
export default repoSlice.reducer;
