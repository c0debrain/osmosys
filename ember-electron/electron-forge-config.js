const path = require('path');

module.exports = {
  make_targets: {
    win32: ['squirrel', 'zip'],
    darwin: ['dmg', 'zip']
  },
  electronPackagerConfig: {
    /* all: true, */
    appCategoryType: 'public.app-category.medical-software',
    appCopyright: 'Copyright (c) 2017 OsmoSys Foundation',
    icon: 'assets/icons/icon',
    name: 'OsmoSys',
    osxSign: true,
    overwrite: true,
    versionString: {
      CompanyName: 'OsmoSys Foundation',
      FileDescription: 'OsmoSys Desktop',
      ProductName: 'OsmoSys',
      InternalName: 'OsmoSys'
    }
  },
  electronInstallerDMG: {
    background: 'assets/icons/bg-img-patients.png',
    debug: true,
    icon: 'assets/icons/favicon.icns',
    iconsize: 100,
    overwrite: true,
    title: 'OsmoSys',
    window: {
      size: {
        width: 400,
        height: 400
      }
    }
  },
  electronWinstallerConfig: {
    authors: 'OsmoSys Foundation',
    exe: 'OsmoSys.exe',
    icon: 'assets/icons/favicon',
    name: 'OsmoSys',
    noMSI: true,
    setupIcon: path.join(__dirname, '../assets/icons/favicon.ico'),
    setupExe: 'OsmoSys.exe',
    title: 'OsmoSys'/* ,
     certificateFile: '',
    certificatePassword: '' */
  }
};
