"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        admin: DataTypes.BOOLEAN,
        password: DataTypes.STRING
    },{
        instanceMethods: {
            to_dict: function() {
                return {
                    id: this.id,
                    admin: this.admin,
                    email: this.email
                };
            }
        },
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return User;
};