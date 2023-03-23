import React, {useState, useEffect} from 'react'
import CallContainer from './CallContainer'
import EmailContainer from './EmailContainer'
import SMSContainer from './SMSContainer'

const CommunicationContainer = (props) => {

    const { 
        commType = null,
        handleModalOpen,
        handleModalClose, 
        handleSubmit,
        caseNo,
    } = props

    switch (commType) {
        case 'email':
            return (
                <EmailContainer 
                    handleModalOpen={handleModalOpen} 
                    handleModalClose={handleModalClose}
                    handleSubmit={handleSubmit}
                    caseNo={caseNo}
                />
            )
        case 'call':
            return (
                <CallContainer 
                    handleModalOpen={handleModalOpen} 
                    handleModalClose={handleModalClose}
                />
            )
        case 'sms':
            return (
                <SMSContainer 
                    handleModalOpen={handleModalOpen} 
                    handleModalClose={handleModalClose}
                />
            )
    
        default:
            return (
                <>Invalid Communication Type</>
            )
    }
}

export default CommunicationContainer;