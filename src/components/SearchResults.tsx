import { Banner, Card, Icon, Image, Loading, MediaCard, Toast } from '@shopify/polaris'
import { ImageMajor } from '@shopify/polaris-icons'
import React, { useCallback, useState } from 'react'
import { SearchProps } from '../helpers/types'

function SearchResults({
    searchValue,
    data,
    loading,
    error,
    setNominationList,
    nominations,
}: SearchProps) {
    const [active, setActive] = useState(false)
    const toggleActive = useCallback(() => setActive((active) => !active), [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return active ? <Toast content="Server error" error onDismiss={toggleActive} /> : null
    }

    const movieData = data?.movies.Search
    const movieResults = movieData?.map((m, index) => {
        const primaryAction = () => {
            return nominations.find((n) => n.imdbID === m.imdbID) !== undefined
        }

        return (
            <MediaCard
                key={index}
                title={m.Title}
                description={m.Year}
                primaryAction={
                    primaryAction()
                        ? {
                              content: 'Nominated',
                          }
                        : {
                              content: 'Add',
                              onAction: () => {
                                  setNominationList([...nominations, m])
                              },
                          }
                }
                secondaryAction={{
                    content: 'Learn more',
                    onAction: () => {
                        window.open(`https://www.imdb.com/title/${m.imdbID}`)
                    },
                }}
            >
                {m.Poster !== 'N/A' ? (
                    <Image
                        alt={m.Title}
                        source={m.Poster}
                        width="100%"
                        height="100%"
                        style={{
                            padding: '1rem',
                            borderRadius: '15px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignContent: 'center',
                        }}
                    >
                        <Icon source={ImageMajor} accessibilityLabel="Image N/A" />
                    </div>
                )}
            </MediaCard>
        )
    })

    const warning = (
        <Banner status="warning">Too many movie results, please be more specific.</Banner>
    )

    const critical = <Banner status="critical">No movie found.</Banner>

    const results =
        searchValue?.length <= 2 && movieData?.length === undefined
            ? warning
            : movieData?.length === undefined
            ? critical
            : movieResults

    return <Card.Section>{results}</Card.Section>
}

export default SearchResults
