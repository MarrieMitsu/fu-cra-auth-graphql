// Packages
import jwtDecode from 'jwt-decode';

// isTokenValid
export const isTokenValid = (token: string | null | undefined): boolean => {
    if (token) {
        const { exp }: any = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }

}