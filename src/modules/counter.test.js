import countComments from './countComments.js';

describe('Count comments of a movie viewer', () => {
  test('No comments', () => {
    const arr = [];
    expect(countComments(arr)).toBe(0);
  });
  test('Expect to get 2 comments', () => {
    const comments = [{
      creation_date: '2022-12-2',
      username: 'ernest',
      comment: 'what a nice movie',
    }, {
      creation_date: '2022-12-2',
      username: 'alelign',
      comment: 'nice movie',
    }];
    expect(countComments(comments)).toBe(2);
  });
});
