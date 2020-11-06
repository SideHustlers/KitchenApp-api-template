'use strict'

// An example model

module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
    template_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  });

  return Template;
}