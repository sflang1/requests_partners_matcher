import React, { useEffect, useState } from 'react';
import { Material } from '../../models/material';
import RequestForm from './components/request-form';
import { fetchMaterials } from '../../actions/actions';
import Loader from '../../shared/components/Loader';


const NewRequest = () => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ materials, setMaterials ] = useState<Material[]>(null);

  useEffect(() => {
    fetchMaterials((success: boolean, data: Material[]) => {
      if (success) {
        setMaterials(data);
      } else {
        // should show message
      }

      setLoading(false);
    });
  }, []);


  if (loading) {
    return <Loader />;
  }

  return <RequestForm materials={materials} />
};

export default NewRequest;