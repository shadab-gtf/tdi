import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export const getTokenExpiryTime = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000;
  } catch {
    return null;
  }
};
