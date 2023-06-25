import { Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  formId: number;
};

const SubmitView = ({formId}: Props) => {
  const {handleSubmit, formState: {errors, isSubmitting, isValid}, reset} = useFormContext();
  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const isPreview = Boolean(queryParams.get('preview'));
  const navigate = useNavigate();

  //TODO Send form answers from there ?
  // - 1 - access to form answers with questionId and log them
  // - 2 - save one form answer in the backend 
  // - 3 - check if ok with the backend
  // - 4 - create a loop to save all form answers in the backend
  const onSubmit = async (data: any) => {
      await new Promise(async (resolve) => {
        await setTimeout(() => {
          console.log("sending form", data);
          console.log("formState errors", errors);
          resolve(undefined);
        }, 3000);
      })




      .then(() => {
        navigate("/submit/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = async (data: any) => {
    reset();
    navigate(`/form/${formId}`);
  };

  useEffect(() => {
      console.log("formState.errors =>", errors);
  }, [errors]);

  return (
    <Grid container sx={{minHeight: '20vh'}} direction={'column'} justifyContent='space-around' alignContent='center'>
      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Merci d'avoir complété ce formulaire !</Typography>
      </Grid>
      <Grid item xs={8} sx={{margin: 'auto'}}>
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isPreview || isSubmitting}
        >
            Envoyer le formulaire
        </Button>
      </Grid>
      <Grid item xs={8} sx={{margin: 'auto'}}>
        <Button
            variant="contained"
            color="info"
            type="submit"
            onClick={handleReset}
            disabled={isPreview}
        >
            Effacer ce formulaire
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* show a generic error message if any of the fields is invalid */}
        {Object.keys(errors).length > 0 && (
          <Typography>Error</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        {/* loader to style + we should disabled the sending button while sending the form */}
        {isSubmitting && (
            <Typography>
                Envoi du formulaire...
            </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default SubmitView