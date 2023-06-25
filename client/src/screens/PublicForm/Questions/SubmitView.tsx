import { Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { PublicFormData, PublicFormDataArray, SubmitFormAnswers } from '../../../types/publicForm';
import { useMutation } from '@apollo/client';
import { CREATE_ANSWER } from '../../../services/answers.mutation';
import { CreateAnswerInput, CreateAnswerResponse } from '../../../types/answer';
import { CreateQuestionInput } from '../../../types/question';

interface Props {
  formId: number;
}

const SubmitView = ({formId}: Props) => {
  const {handleSubmit, formState: {errors, isSubmitting, isValid}, reset} = useFormContext();
  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const isPreview = Boolean(queryParams.get('preview'));
  const navigate = useNavigate();

  const [createAnswer, {data, loading, error} ] = useMutation<CreateAnswerResponse>(CREATE_ANSWER, {
    onCompleted(data) {
      console.log("createAnswer completed =>", data);
    },
    onError(error: any) {
      console.log(error);
    }
  });

  //TODO Create a promise that will resolve when all answers are created => then redirect to success page
  const onSubmit = async (data: FieldValues) => {
    const answers: SubmitFormAnswers = Object.entries(data).map(([key, value]) => {
      return {
        questionId: Number(key),
        answer: value
      }
    });
    console.log("answers =>", answers);

      await new Promise((resolve) => {
        answers.forEach(async (answer) => {
          await createAnswer({
            variables: {
              createAnswerInput: {
                questionId: answer.questionId,
                answerText: answer.answer,
                userId: 1,
              }
            }
          });
        });
        resolve(undefined);
        //? If need to test a loading state use setTimeout
        // setTimeout(() => {
        //   console.log("formState errors", errors);
        //   resolve(undefined);
        // }, 3000);
      })
      .then(() => {
        navigate("/submit/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = () => {
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