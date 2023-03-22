import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NoQuestionPreview from '../components/QuestionPreview/NoQuestionPreview';

let documentBody: RenderResult;

describe('<NotFound />', () => {
  beforeEach(() => {
    documentBody = render(<NoQuestionPreview />);
  });

  it('shows not found message', () => {
    expect(documentBody.getByText('No question selected.')).toBeInTheDocument();
  });
});  
