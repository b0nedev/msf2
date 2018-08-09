module.exports = {
  url: "http://localhost:3000",
//  uploadLimit: 209715200
  accessFilePath: "a4sg32cvf/pqk8dj1ed/",
  uploadLImit: 209715200,
  expirePeriod: 259200000,
  comAccessPermit: ['/users/signIn', '/test'],
  accessPermit:{
    admin: '*',
    expert: [
      '/download/expert/profile', '/download/expert/image', '/download/expert/file',
      '/download/expert/video', '/download/user/profile', '/download/user/file',
      '/download/user/category', '/download/culturit/profile', '/download/culturit/image',
      '/download/culturit/file'
    ],
    user: [
      '/download/expert/profile', '/download/expert/image', '/download/expert/file',
      '/download/expert/video', '/download/user/profile', '/download/user/file',
      '/download/user/category'
    ]
  },
  writePermit: {
    admin: '*',
    expert: [
      '/upload/expert/profile', '/upload/expert/image', '/upload/expert/file',
      '/upload/expert/video', '/upload/user/file'
    ],
    user: [
      '/upload/user/profile', '/upload/user/file'
    ]
  },
  dangerExt: [
    'jsp', 'php', 'asp', 'exe', 'aspx', 'htaccess', 'cer', 'cdx', 'asa',
    'php3', 'html', 'htm', 'war'
  ],
  logLevel: 0 //0:debug, 1:info, 2: warn 3: err
}
