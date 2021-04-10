// Packages
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { AccessToken } from './accessToken';
import { isTokenValid } from './isTokenValid';
import { IsLogin } from './isLogin';

// Types
type RefreshTokenResponseObject = {
    accessToken?: string;
    message?: string;
    status?: boolean;
}

// Http link
const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
});

// Refresh link
const refreshLink = new ApolloLink((operation, forward) => {
    return new Observable(observer => {
        if (!isTokenValid(AccessToken.value) && IsLogin.value()) {
            fetch("http://localhost:4000/api/auth/refresh_token", {
                method: "GET",
                credentials: "include",
            }).then(async res => {
                const { accessToken }: RefreshTokenResponseObject = await res.json();
                AccessToken.setAccessToken(accessToken);

                operation.setContext(({ headers }: any) => ({
                    headers: {
                        ...headers,
                        authorization: `Bearer ${accessToken}`,
                    }
                }));

                return forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer)
                });
            });
        } else {
            return forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
            });
        }
    });
});

// Auth link
const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({
        headers: {
            ...headers,
            authorization: AccessToken.value ? `Bearer ${AccessToken.value}` : "",
        }
    }));
    return forward(operation);
});

// Error link
const errorLink = onError(({ graphQLErrors, networkError }) => {

    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            console.log("[GraphQL error]: ", err);
        }
    }

    if (networkError) {
        console.log("[GraphQL error]: ", networkError);
    }

});

// Apollo client
const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        errorLink,
        refreshLink,
        authLink, 
        httpLink
    ]),
});

// Exports
export default client;