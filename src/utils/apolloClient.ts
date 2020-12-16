// Packages
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { accessToken } from './accessToken';

// Http link
const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
});

// Token refresh link

// Auth link
const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({
        headers: {
            ...headers,
            authorization: accessToken.value ? `Bearer ${accessToken.value}` : "",
        }
    }));

    return forward(operation);
});

// Apollo client
const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: 'newToken',
            isTokenValidOrUndefined: () => {
                const token = accessToken.value
                if (!token) {
                    return true;
                }

                try {
                    const { exp }: any = jwtDecode(token);
                    if (Date.now() >= exp * 1000) {
                        return false;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch("http://localhost:4000/api/auth/refresh_token", {
                    method: "GET",
                    credentials: "include",
                });
            },
            handleFetch: (newToken: string) => {
                accessToken.setAccessToken(newToken.accessToken);
            },
            handleError: (err: any) => {
                console.log(err);
            }
        }),
        authLink, 
        httpLink
    ]),
});

// Exports
export default client;