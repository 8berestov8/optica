module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/push/publish',
      handler: 'push.publish',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/push/publish',
      handler: 'push.publish',
      config: {
        policies: [],
        middlewares: []
      }
    },
  ]
}
