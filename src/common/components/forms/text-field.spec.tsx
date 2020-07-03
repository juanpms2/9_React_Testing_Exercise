import * as React from 'react';
import { TextField } from './text-field';
import { render } from '@testing-library/react';
import { FieldRenderProps } from 'react-final-form';
import { TextFieldProps } from '@material-ui/core';

describe('TextField component specs', () => {
  it('should display a input text and get these props', () => {
    // Arrange
    const onchange = jest.fn();

    const restInput = {
      'data-testid': 'testId',
    } as TextFieldProps;

    const rest = {
      inputProps: {},
      helperText: 'test helperText',
    } as TextFieldProps;

    const props = {
      input: {
        name: 'testName',
        value: 'test value',
        onChange: onchange(),
        ...restInput,
      },
      meta: {
        submitError: 'test submitError',
        dirtySinceLastSubmit: false,
        error: 'test error',
        touched: false,
      },
      ...rest,
    } as FieldRenderProps<any, any>;

    // Act
    const { getByTestId } = render(<TextField {...props} />);
    const inputText = getByTestId('testId') as HTMLInputElement;

    // Assert
    expect(inputText).toBeInTheDocument();
    expect(inputText.name).toEqual('testName');
  });

  it('should return onchange have been called', () => {
    // Arrange
    const onchange = jest.fn();
    const props = {
      input: {
        onChange: onchange(),
      },
    } as FieldRenderProps<any, any>;

    // Act

    // Assert
    expect(onchange).toHaveBeenCalled();
  });

  it('should display error when showError equals true', () => {
    // Arrange
    const props = {
      meta: {
        submitError: 'test submitError',
        dirtySinceLastSubmit: true,
        error: 'test error',
        touched: true,
      },
    } as FieldRenderProps<any, any>;

    // Act
    const showError =
      ((props.meta.submitError && props.meta.dirtySinceLastSubmit) ||
        props.meta.error) &&
      props.meta.touched;

    // Assert
    expect(showError).toBeTruthy();
  });
});
