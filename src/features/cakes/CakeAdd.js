import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Typography } from '@mui/material';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { addCake } from './cakesSlice';
import { Redirect } from 'react-router';

export default function CakeAdd(props) {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [comments, setComments] = useState('');
  const [yumFactor, setYumFactor] = useState(0);
  const handleSubmit = () => {
    dispatch(addCake({ name, comments, imageUrl, yumFactor }))
    props.history.push("/")
  }

  return (
    <>
      <Typography gutterBottom variant="body2">Add new cake</Typography>

      <ValidatorForm
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}
      >
        <TextValidator
            label="Name"
            onChange={e => setName(e.target.value)}
            name="name"
            value={name}
            validators={['required', 'maxStringLength:50']}
            errorMessages={['this field is required', 'this field can only up to 50 characters']}
            variant="standard"
        />
        <TextValidator
            label="Image URL"
            onChange={e => { console.log(e.target.value, 'setImageUrl'); setImageUrl(e.target.value) }}
            name="imageUrl"
            value={imageUrl}
            validators={['required', 'matchRegexp: *.(png|jpg|jpeg|svg|gif)$']}
            errorMessages={['this field is required', 'this field should be an image url (png, jpg, jpeg, svg ,gif)']}
            variant="standard"
            sx={{ my: 2 }}
        />
        <TextValidator
            label="Comments"
            onChange={e => setComments(e.target.value)}
            name="comments"
            value={comments}
            validators={['required', 'maxStringLength:200']}
            errorMessages={['this field is required', 'this field can only up to 200 characters']}
            variant="standard"
            multiline
            rows={2}
        />
        <TextValidator
            label="Yumfactor"
            onChange={e => setYumFactor(e.target.value)}
            name="yumFactor"
            value={yumFactor}
            validators={['minNumber:1']}
            errorMessages={['this field is required']}
            variant="standard"
            select
            sx={{ pr: 10, my: 3 }}
            SelectProps={{ native: true }}
        >
          { ['Please select',1,2,3,4,5].map(id => <option key={id} value={id}>{id}</option>) }
        </TextValidator>
        <Button variant="outlined" type="submit">Save</Button>
      </ValidatorForm>
    </>
  );
}
