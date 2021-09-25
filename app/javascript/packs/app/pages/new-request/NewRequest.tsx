import React, { useEffect, useState } from 'react';
import { Material } from '../../models/material';
import { Card, CardContent, Container, LinearProgress } from '@mui/material';
import RequestForm from './components/request-form';
import { fetchMaterials } from '../../actions/actions';


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


  return (
    <Container fixed>
      <Card>
        <CardContent>
          {
            loading ? (
              <LinearProgress />
            ): (
              <RequestForm materials={materials} />
            )
          }
        </CardContent>
      </Card>
    </Container>
  )
};

export default NewRequest;