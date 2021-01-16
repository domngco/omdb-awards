import { useQuery } from '@apollo/client'
import {
    Banner,
    Card,
    Frame,
    Icon,
    Layout,
    Page,
    ProgressBar,
    Scrollable,
    TopBar,
    VisuallyHidden,
    Button,
    ButtonGroup,
    FooterHelp,
    Link,
} from '@shopify/polaris'
import { QuestionMarkMajor } from '@shopify/polaris-icons'
import React, { useCallback, useState } from 'react'
import { GET_MOVIE_SEARCH } from '../graphql/GetMovieSearch'
import { MovieData } from '../helpers/types'
import Nominations from './Nominations'
import SearchResults from './SearchResults'

function AppFrame() {
    const [searchValue, setSearchValue] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [nominationList, setNominationList] = useState<MovieData[] | []>([])

    const { loading, error, data, refetch } = useQuery(GET_MOVIE_SEARCH, {
        variables: { search: searchValue },
    })

    const handleSearchChange = useCallback(
        (input) => {
            setSearchValue(input)
            setIsSearchActive(input.length > 0)
            refetch(input)
        },
        [setSearchValue, refetch]
    )

    const handleSearchDismiss = useCallback(() => {
        setSearchValue('')
        setIsSearchActive(false)
    }, [])
    const handleMenuOpen = useCallback(() => {
        setMenuOpen((isMenuOpen) => !isMenuOpen)
    }, [])

    const handleRemoveMovie = useCallback((movieID) => {
        setNominationList((list) => list.filter((l) => l.imdbID !== movieID))
    }, [])

    const handleClear = useCallback(() => {
        setNominationList([])
        setIsSearchActive(false)
    }, [])

    const searchField = (
        <TopBar.SearchField
            onChange={handleSearchChange}
            value={searchValue}
            placeholder="Search"
            showFocusBorder
        />
    )

    const menuMarkUp = (
        <TopBar.Menu
            activatorContent={
                <>
                    <Icon source={QuestionMarkMajor} />
                    <VisuallyHidden>Menu Mark Up</VisuallyHidden>
                </>
            }
            open={isMenuOpen}
            onOpen={handleMenuOpen}
            onClose={handleMenuOpen}
            actions={[
                {
                    items: [
                        {
                            content: 'Project Instructions',
                            onAction: () => {
                                window.open(
                                    'https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit'
                                )
                            },
                        },
                    ],
                },
            ]}
        />
    )

    const topBar = (
        <TopBar
            searchField={searchField}
            searchResultsVisible={isSearchActive}
            onSearchResultsDismiss={handleSearchDismiss}
            secondaryMenu={menuMarkUp}
        />
    )

    const noSearch = (
        <Card sectioned>
            <Banner status="info">Search for a movie</Banner>
        </Card>
    )

    const noNominations = (
        <Card sectioned>
            <Banner status="info">Nominate a movie</Banner>
        </Card>
    )

    const incompleteList = isSearchActive ? (
        <Card title="Results">
            <Scrollable shadow style={{ height: '70vh' }}>
                <SearchResults
                    data={data}
                    loading={loading}
                    error={error}
                    searchValue={searchValue}
                    setNominationList={setNominationList}
                    nominations={nominationList}
                />
            </Scrollable>
        </Card>
    ) : (
            noSearch
        )

    const results =
        nominationList.length === 5 ? (
            <Banner title="5 movie nominations have been added" status="success" />
        ) : (
                incompleteList
            )

    const nominations =
        nominationList.length > 0 ? (
            <Card title="Nomination List">
                <Scrollable shadow style={{ height: '70vh' }}>
                    <Nominations nominations={nominationList} onHandleRemove={handleRemoveMovie} />
                </Scrollable>
                <Card.Section>
                    <Card.Subsection>
                        {!(nominationList.length === 5) ? (
                            <ProgressBar progress={(nominationList.length / 5) * 100} />
                        ) : (
                                <ButtonGroup>
                                    <Button
                                        onClick={() => {
                                            handleClear()
                                        }}
                                    >
                                        Clear
                                </Button>
                                    <Button
                                        primary
                                        onClick={() => {
                                            handleClear()
                                        }}
                                    >
                                        Save
                                </Button>
                                </ButtonGroup>
                            )}
                    </Card.Subsection>
                </Card.Section>
            </Card>
        ) : (
                noNominations
            )

    return (
        <div style={{ height: '2rem' }}>
            <Frame topBar={topBar}>
                <Page>
                    <Layout>
                        <Layout.Section oneHalf>{results}</Layout.Section>
                        <Layout.Section oneHalf>{nominations}</Layout.Section>
                    </Layout>
                </Page>
                <FooterHelp>
                    Learn more about{' '}
                    <Link url="https://github.com/domngco" external>
                        the code.
                    </Link>
                </FooterHelp>
            </Frame>
        </div>
    )
}

export default AppFrame
