import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6fuj4etd',
    dataset: 'production'
  },
  deployment: {
    appId: 'rpah87t2klt2f51e0adhh80b',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
