const { sequelize } = require("../config/dbConnection")
const { DataTypes } = require("sequelize")

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
})

const Item = sequelize.define("Item", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150
    }
  },
  location: {
    type : DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Indonesia",
    validate: {
      max: 150,
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startHour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endHour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

const Image = sequelize.define("Image", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

const Rooster = sequelize.define("Rooster", {
  nameBand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Indonesia",
    validate: {
      max: 150,
    },
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  spotify: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

const News = sequelize.define("News", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
})

const Merchandise = sequelize.define("Merchandise", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  shopeeUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  tokopediaUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
})

const imageMerchandise = sequelize.define("imageMerchandise", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
})

Item.hasMany(Image, {
  foreignKey: "itemId",
})

Item.belongsTo(Category, {
  foreignKey: "categoryId",
})

Image.belongsTo(Item, {
  foreignKey: "itemId",
})

Category.hasMany(Item, {
  foreignKey: "categoryId",
})

Merchandise.hasMany(imageMerchandise, {
  foreignKey: "merchandiseId",
})

imageMerchandise.belongsTo(Merchandise, {
  foreignKey: "merchandiseId",
})

module.exports = {
  Category,
  Item,
  Image,
  Rooster,
  News,
  Merchandise,
  imageMerchandise,
}

// Sinkronisasi model dengan database
sequelize
.sync()
.then(() => {
  console.log("Tabel berhasil dibuat")
})
.catch((error) => {
  console.error("Tidak dapat membuat tabel:", error)
})
