import React, { useState } from 'react'
import { ChevronLeft } from 'react-feather'
import { Card, Col, Collapse, Row } from 'reactstrap'

const CollapseContainer = ({
    children
}) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggleColapse = () => setIsOpen(!isOpen)
    return (
        <Row>
            <Col sm="2" className={`pe-0 d-flex justify-content-center align-items-center ${!isOpen ? "active-open-draw-left" : "active-not-open-draw"}`}>
                <Card  className=" p-0 fix-height w-100" style={{ minHeight: "100vh", overflowY: 'scroll', scrollbarWidth: "none" }}>
                    <Collapse horizontal isOpen={isOpen}>
                        {children[0] && children[0]}
                    </Collapse>
                </Card>
                <div className="h-100 d-flex align-items-center" onClick={toggleColapse}>
                    <span className={isOpen ? 'chevre-left' : 'chevre-right'}>
                        <ChevronLeft size={16} />
                    </span>
                </div>
            </Col>
            <Col sm="10" className={`ps-0 ${!isOpen ? "active-open-draw-right" : "active-not-open-draw"}`}>
                {children[1] && children[1]}
            </Col>
        </Row>
    )
}

export default CollapseContainer