import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { campaignAPI } from '../../services/api';
import { Campaign } from '../../types';

interface CampaignState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
};

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchAll',
  async () => {
    const response = await campaignAPI.getCampaigns();
    return response.data;
  }
);

export const fetchCampaignById = createAsyncThunk(
  'campaigns/fetchById',
  async (id: number) => {
    const response = await campaignAPI.getCampaignById(id);
    return response.data;
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/create',
  async (campaignData: any) => {
    const response = await campaignAPI.createCampaign(campaignData);
    return response.data;
  }
);

export const updateCampaign = createAsyncThunk(
  'campaigns/update',
  async ({ id, data }: { id: number; data: any }) => {
    const response = await campaignAPI.updateCampaign(id, data);
    return response.data;
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaigns/delete',
  async (id: number) => {
    await campaignAPI.deleteCampaign(id);
    return id;
  }
);

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch campaigns';
      })
      .addCase(fetchCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch campaign';
      })
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.push(action.payload);
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create campaign';
      })
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.campaigns.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.campaigns[index] = action.payload;
        }
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update campaign';
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete campaign';
      });
  },
});

export const { clearCurrentCampaign, clearError } = campaignSlice.actions;
export default campaignSlice.reducer; 