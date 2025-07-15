import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  data: {
    user: {
      id: string;
    };
  };
}

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Invalid token', error);
    return null;
  }
};
