import { redirect } from "@tanstack/react-router";
import { getTokenUserAPI } from "../api/user.api";
import { loginSuccess } from "../store/slices/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getTokenUserAPI,
      retry: false,
    });
    if (!user) return false;
    store.dispatch(loginSuccess(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;
    return true;
  } catch (error) {
    return redirect({ to: "/auth" });
  }
};
