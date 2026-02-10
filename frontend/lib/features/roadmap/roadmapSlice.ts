import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { progressService } from '@/services/progress'

interface RoadmapState {
    list: any[]
    currentRoadmap: any | null
    stats: any | null
    loading: boolean
    error: string | null
}

const initialState: RoadmapState = {
    list: [],
    currentRoadmap: null,
    stats: null,
    loading: false,
    error: null,
}

export const fetchRoadmaps = createAsyncThunk(
    'roadmap/fetchList',
    async (token: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/roadmap/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!res.ok) throw new Error('Failed to fetch roadmaps')
            return await res.json()
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchUserStats = createAsyncThunk(
    'roadmap/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            // progressService handles auth internally via creating its own client/token? 
            // Wait, progressService.getUserStats() does: const { data: { session } } = await supabase.auth.getSession()
            // So we don't need to pass token explicitly if we use the service.
            // BUT, for consistency and performance, we should probably pass token from state if possible.
            // For now, let's rely on the service's internal auth check which is robust.
            return await progressService.getUserStats()
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const roadmapSlice = createSlice({
    name: 'roadmap',
    initialState,
    reducers: {
        setCurrentRoadmap: (state, action: PayloadAction<any>) => {
            state.currentRoadmap = action.payload
        },
        clearRoadmaps: (state) => {
            state.list = []
            state.currentRoadmap = null
            state.stats = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch List
            .addCase(fetchRoadmaps.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRoadmaps.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchRoadmaps.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch Stats
            .addCase(fetchUserStats.fulfilled, (state, action) => {
                state.stats = action.payload
            })
    }
})

export const { setCurrentRoadmap, clearRoadmaps } = roadmapSlice.actions
export default roadmapSlice.reducer
