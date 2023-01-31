import { SiCircle } from 'react-icons/si'
import { GrTree } from 'react-icons/gr'
import { BsCashCoin } from 'react-icons/bs'
import { RiScan2Line } from 'react-icons/ri'
import { TiFlowMerge } from 'react-icons/ti'
import { BiListUl } from 'react-icons/bi'
import { FaUserShield } from 'react-icons/fa'

const iconsMap = {
    customer360: SiCircle,
    transactionDashboard: BsCashCoin,
    entityLinkAnalysis: TiFlowMerge,
    onlineScanning: RiScan2Line,
    realTimeScanning: RiScan2Line,
    userAction: FaUserShield,
    featureAction: BiListUl, 
}

const buttonIconMapping = (moduleCode) => {
    if (iconsMap[moduleCode]) {
        return iconsMap[moduleCode]
    } else {
        return null
    }
}

export default buttonIconMapping;

