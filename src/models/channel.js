'use strict';

module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    tvgName: DataTypes.STRING,
    tvgLogo: DataTypes.STRING,
    aspectRatio: DataTypes.STRING,
    color: DataTypes.STRING,
    name: DataTypes.STRING,
    streamUrl: DataTypes.STRING,
    country: DataTypes.STRING,
    continent: DataTypes.STRING
  }, {});

  return Channel;
};
