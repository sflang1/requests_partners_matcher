import React, { useEffect, useState } from 'react';
import { Material } from '../../models/material';
import { Card, CardContent, Container, LinearProgress } from '@mui/material';
import RequestForm from './components/request-form';


const NewRequest = () => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ materials, setMaterials ] = useState<Material[]>(null);

  const fetchMaterials = async () => {
    const response = await fetch('/api/materials.json');

    if (response.status === 200) {
      const responseJson = await response.json();
      if (responseJson.success) {
        setMaterials(responseJson.data);
        setLoading(false);
      }
    } else {
      console.error("an error presented");
    }
  }

  useEffect(() => {
    fetchMaterials();
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