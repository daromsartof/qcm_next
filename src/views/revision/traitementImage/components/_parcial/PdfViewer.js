import * as React from 'react'
import { Viewer } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'


const PdfViewer = ({ fileUrl }) => {
    const renderPage = (props) => (
        <>
            {props.canvasLayer.children}
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%'
                }}
            >
                <div
                    style={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        fontSize: `${8 * props.scale}rem`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transform: 'rotate(-45deg)',
                        userSelect: 'none'
                    }}
                >
                    Draft
                </div>
            </div>
            {props.annotationLayer.children}
            {props.textLayer.children}
        </>
    )
    return <Viewer fileUrl={fileUrl} renderPage={renderPage} />
}

export default PdfViewer