import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { useTraitementImageContext } from '../contexts/TraitementImage.context'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getImagePhysic } from '../../../../services/imagesApi'
import ColumnImage from '../../../common/materialTable/ColumnImage'

const GridView = ({
    renderTopToolbarCustomActions = () => <></>
}) => {
    const [page, setPage] = useState(1)
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const { dossier } = useSelector(({ filtre }) => filtre)
    const {
        filter,
        fetchImages
    } = useTraitementImageContext()
   
    const LazyLoadedPdf = ({
        image = {}
    }) => {
        const { ref } = useInView({
            triggerOnce: true // Charge seulement une fois
        })
        return (
            <Card>
                <CardBody ref={ref}>
                    <div style={{
                        height: "400px"
                    }}>
                        <object data={image.physic_url} width="100%" height={"100%"}></object>
                    </div>
                </CardBody>
                <CardFooter>
                    <div>
                        <div>
                            <ColumnImage image={image} />
                        </div>  
                    </div>
                </CardFooter>
            </Card>

        )
    }
    const handleFetchImages = async () => {
        fetchImages({
            take: 8,
            page
        }, async (response) => {
            const dataResponse = []
            for (const image of response) {
                const data = await getImagePhysic(image)
                const url = window.URL.createObjectURL(data)
                dataResponse.push({
                    ...image,
                    physic_url: url
                })
            }
            setImages(images => [...images, ...dataResponse])
            setPage((p) => p + 1)
            setHasMore(response.length > 0)
        })
    }
    useEffect(() => {
        if (dossier) {
            handleFetchImages()
        }
    }, [dossier, filter.status.value])
    return (
        <Card>
            <CardHeader>
                {renderTopToolbarCustomActions()}
            </CardHeader>

            <div>
                <InfiniteScroll
                    dataLength={images.length}
                    next={handleFetchImages}
                    hasMore={hasMore}
                    loader={<div className="w-100 d-flex justify-content-center">
                        <h4>Loading...</h4>
                    </div>}
                >
                    <Row>
                        {
                            images.map((data, key) => (
                                <Col md="3" key={key}>
                                    <LazyLoadedPdf image={data} />
                                </Col>
                            ))
                        }
                    </Row>
                </InfiniteScroll>
            </div>
        </Card>
    )
}

export default GridView