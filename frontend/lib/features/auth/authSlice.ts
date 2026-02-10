import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: true,
    error: null,
}

// Async Thunk to Fetch Session
export const fetchUserSession = createAsyncThunk(
    'auth/fetchSession',
    async (_, { rejectWithValue }) => {
        const supabase = createClient()
        try {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) return rejectWithValue(error.message)
            if (!session) return null

            return {
                user: session.user,
                token: session.access_token
            }
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User | null; token: string | null }>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.loading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserSession.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserSession.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.user = action.payload.user
                    state.token = action.payload.token
                } else {
                    state.user = null
                    state.token = null
                }
            })
            .addCase(fetchUserSession.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setUser, setLoading, logout } = authSlice.actions

export default authSlice.reducer
