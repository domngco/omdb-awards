import { Card, Icon, MediaCard } from '@shopify/polaris'
import { ImageMajor } from '@shopify/polaris-icons'
import React from 'react'
import { NominationProps } from '../helpers/types'

function Nominations({ nominations, onHandleRemove }: NominationProps) {
    const list = nominations.map((m, key) => {
        return (
            <MediaCard
                key={key}
                title={m.Title}
                description={m.Year}
                primaryAction={{
                    content: 'Remove',
                    onAction: () => {
                        onHandleRemove(m.imdbID)
                    },
                }}
            >
                {m.Poster.length < 5 ? (
                    <Icon source={ImageMajor} />
                ) : (
                    <div style={{ padding: '10px' }}>
                        <img
                            src={m.Poster}
                            alt={m.Poster}
                            width="100%"
                            height="100%"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                )}
            </MediaCard>
        )
    })
    return <Card.Section>{list}</Card.Section>
}

export default Nominations
