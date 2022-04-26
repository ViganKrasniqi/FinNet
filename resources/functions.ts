export const functions = {
  functionName: {
    handler: './src/actions/example.loginAction',
    events: [
      {
        httpApi: {
          method: 'POST',
          path: '/loginaction',
        },
      },
    ],
  },
  functionName1: {
    handler: './src/actions/example.sumAction',
    events: [
      {
        httpApi: {
          method: 'POST',
          path: '/sumaction',
        },
      },
    ],
  },
};
