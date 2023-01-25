module.exports = {
  publishers:[{
    name: '@electron-forge/publisher-github',
    config: {
      repository: {
        owner: 'marlonbaileyjr23',
        name: 'Chat-App',
      },
      prerelease: true,
    },
  }],
  packagerConfig: {
    icon: 'assets/icons/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: 'assets/icons/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options:{
          icon: 'assets/icons/icon.png',
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
