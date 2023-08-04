module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/import-status',
    handler: 'myController.status',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/sync',
    handler: 'myController.sync',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/delete',
    handler: 'myController.delete',
    config: {
      policies: [],
      auth: false
    },
  },
];
