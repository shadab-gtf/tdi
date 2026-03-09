import { logout } from "@/features/slices/authSlice";
import { getTokenExpiryTime } from "./tokenUtils";
import type { AppDispatch } from "@/redux/store";

let logoutTimer: ReturnType<typeof setTimeout> | null = null;

export const setupAutoLogout = (
  token: string | null | undefined,
  dispatch: AppDispatch,
) => {
  if (!token) return;

  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return;

  const remainingTime = expiryTime - Date.now();

  if (remainingTime <= 0) {
    dispatch(logout());
    return;
  }

  if (logoutTimer) clearTimeout(logoutTimer);

  logoutTimer = setTimeout(() => {
    dispatch(logout());
    window.location.replace("/admin/login");
  }, remainingTime);
};
