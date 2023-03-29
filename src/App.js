import React, { useState, useEffect } from 'react';
import FeatureHolder from 'components/common/FeatureHolder';
import ComponentHolder from './components/common/componentHolder/ComponentHolder';
import { CircularProgress } from '@mui/material';
import {
  useSelector,
  // useDispatch
} from 'react-redux';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const newFeatures = useSelector(state => state.features.features.features);
  const selectedFeature = useSelector(state => state.features.features.featureCode);
  // const [features, setFeatures] = useState(newFeatures);

  useEffect(() => {
    if( newFeatures !== null && newFeatures !== undefined && newFeatures.length > 0 ){
      setIsLoading(false);
    }
    else{
      setIsLoading(true);
    }

    console.log("Features Object", newFeatures)

  },[newFeatures])

  return (
    <div className="text-center overflow-hidden" style={{transition: 'all 0.1s ease-in-out' }} >
      {isLoading===true ? (<CircularProgress size={24} sx={{color: '#052a4f', marginTop: '350px'}} />) : (
        <>
          {newFeatures.map((item)=>( 
            <ComponentHolder 
              key={item.featureCode?item.featureCode:item.featureMapping_Id} 
              index={item.featureCode?item.featureCode:item.featureMapping_Id} 
              value={selectedFeature}
              >
              <FeatureHolder feature={item} />
            </ComponentHolder>
          ))}
        </>
      )}
      
    </div>
  );
}

export default App;