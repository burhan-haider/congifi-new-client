import React, { useState, useEffect } from 'react';
import FeatureHolder from 'components/common/FeatureHolder';
import ComponentHolder from './components/common/componentHolder/ComponentHolder';
import { CircularProgress } from '@mui/material';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { getDesiredLabels } from 'redux/auth/user/user.actions';
import { fetchRoleBasedModules } from 'redux/features/features.actions';

function App() {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const newFeatures = useSelector(state => state.features.features.features);
  const selectedFeature = useSelector(state => state.features.features.featureCode);
  const labels = useSelector(state => state.auth.user.labels.allLabels);
  const userData = useSelector(state => state.auth.user.data)
  const roleBasedModules = useSelector(state => state.features.features.userModules);
  // const [features, setFeatures] = useState(newFeatures);

  useEffect(() => {
    if (newFeatures !== null && newFeatures !== undefined && newFeatures.length > 0) {
      setIsLoading(false);
    }
    else {
      setIsLoading(true);
    }

    console.log("Features Object", newFeatures)

    if (Object.keys(labels).length < 1) {
      dispatch(getDesiredLabels(userData.language, userData.labelDirection));
    }

    if (roleBasedModules.length < 1) {
      dispatch(fetchRoleBasedModules());
    }

  }, [newFeatures])

  return (
    <div className="text-center overflow-hidden" style={{ transition: 'all 0.1s ease-in-out' }} >
      {isLoading === true ? (<CircularProgress size={24} sx={{ color: '#052a4f', marginTop: '350px' }} />) : (
        <>
          {newFeatures.map((item) => (
            <ComponentHolder
              key={item.featureCode ? item.featureCode : item.featureMapping_Id}
              index={item.featureCode ? item.featureCode : item.featureMapping_Id}
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