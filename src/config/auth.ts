const authConfig = {
  jwt: {
    expiresIn: '1d',
    secret: `${process.env.SECRET}`,
  },
  config_path: `${__dirname}`,
};

export { authConfig };
