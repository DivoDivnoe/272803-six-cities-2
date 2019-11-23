import React from 'react';
import renderer from 'react-test-renderer';
import CommentForm from './comment-form.jsx';

describe(`CommentForm component`, () => {
  it(`is rendered correctly`, () => {
    const id = 1;
    const rating = `3`;
    const review = `sweeet`;
    const serverStatus = 200;
    const onChangeServerStatus = jest.fn();
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onResetForm = jest.fn();


    const tree = renderer
      .create(
          <CommentForm
            id={id}
            rating={rating}
            review={review}
            serverStatus={serverStatus}
            onChange={onChange}
            onSubmit={onSubmit}
            onResetForm={onResetForm}
            onChangeServerStatus={onChangeServerStatus}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
