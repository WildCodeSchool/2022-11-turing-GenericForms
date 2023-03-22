import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NoQuestionPreview from '../components/QuestionPreview/NoQuestionPreview';

let documentBody: RenderResult;

describe('<NoQuestionPreview />', () => {
  beforeEach(() => {
    documentBody = render(<NoQuestionPreview />);
  });

  it('Correct text is shown', () => {
    expect(documentBody.getByText('No question selected.')).toBeInTheDocument();
  });
});  
