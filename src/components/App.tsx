import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { RestLink } from 'apollo-link-rest'
import '@shopify/polaris/dist/styles.css'
import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider } from '@shopify/polaris'
import { theme } from '../helpers/theme'
import AppFrame from './AppFrame'

function App() {
    const restLink = new RestLink({
        uri: process.env.REACT_APP_API_BASE,
    })

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: restLink,
    })

    return (
        <ApolloProvider client={client}>
            <AppProvider i18n={enTranslations} theme={theme}>
                <AppFrame />
            </AppProvider>
        </ApolloProvider>
    )
}

export default App
