const countComments = (comment) => {
  let countComment = 0;
  for (let i = 0; i < comment.length; i += 1) {
    countComment += 1;
  }
  return countComment;
};

export default countComments;