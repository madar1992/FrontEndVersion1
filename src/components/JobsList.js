import React from 'react';

import Grid from '@mui/material/Grid';

import CustomJobCard from './CustomJobCard';

 

function JobsList({ jobs }) {

  return (

    <Grid container spacing={2}>

      {jobs.map((job) => (

        <Grid item key={job.id} xs={12} sm={jobs.length > 1 ? 6 : 12}>

          <CustomJobCard job={job} />

        </Grid>

      ))}

    </Grid>

  );

}

 

export default JobsList;