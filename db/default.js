module.exports = {
  warmup_setting: {
    post: {
      from: 15,
      to: 30,
      delay: { from: 5, to: 45 },
    },
    up_vote: {
      from: 5,
      to: 12,
      delay: { from: 5, to: 60 },
    },
    down_vote: {
      from: 3,
      to: 6,
      delay: { from: 5, to: 60 },
    },
    comment: {
      from: 5,
      to: 10,
      delay: { from: 5, to: 60 },
    },
  },
  task_setting: {
    up_vote: {
      from: 3,
      to: 5,
      delay: { from: 5, to: 60 },
    },
    down_vote: {
      from: 2,
      to: 4,
      delay: { from: 5, to: 60 },
    },
    comment: {
      from: 2,
      to: 3,
      delay: { from: 5, to: 60 },
    },
  },
};
