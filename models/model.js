const { sequelize } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
});

const Item = sequelize.define("Item", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
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
  location: {
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
  ticket: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Image = sequelize.define("Image", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isHeader: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Rooster = sequelize.define("Rooster", {
  nameBand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
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
  genre: {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const News = sequelize.define("News", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
});

const Merchandise = sequelize.define("Merchandise", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isSold: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const imageMerchandise = sequelize.define("imageMerchandise", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// const Gallery = sequelize.define("Gallery", {
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       max: 150,
//     },
//   },
// });

// const imageGallery = sequelize.define("imageGallery", {
//   imageUrl: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       max: 150,
//     },
//   },
// });

const Artist = sequelize.define("Artist", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
});

const Author = sequelize.define("Author", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 150,
    },
  },
});

Item.hasMany(Image, {
  foreignKey: "itemId",
});

Item.belongsTo(Category, {
  foreignKey: "categoryId",
});

Image.belongsTo(Item, {
  foreignKey: "itemId",
});

Image.belongsTo(Artist, {
  foreignKey: "artistId",
});

Artist.hasMany(Image, {
  foreignKey: "artistId",
});

Category.hasMany(Item, {
  foreignKey: "categoryId",
});

Merchandise.hasMany(imageMerchandise, {
  foreignKey: "merchandiseId",
});

imageMerchandise.belongsTo(Merchandise, {
  foreignKey: "merchandiseId",
});

// Gallery.hasMany(imageGallery, {
//   foreignKey: "galleryId",
// });

// imageGallery.belongsTo(Gallery, {
//   foreignKey: "galleryId",
// });

// Artist.hasMany(Gallery, {
//   foreignKey: "artistId",
// });

// Gallery.belongsTo(Artist, {
//   foreignKey: "artistId",
// });

Author.hasMany(News, {
  foreignKey: "authorId",
});

News.belongsTo(Author, {
  foreignKey: "authorId",
});

module.exports = {
  Category,
  Item,
  Image,
  Rooster,
  News,
  Merchandise,
  imageMerchandise,
  // Gallery,
  // imageGallery,
  Artist,
  Author,
};

// Sinkronisasi model dengan database

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Tabel berhasil dibuat");
//   })
//   .catch((error) => {
//     console.error("Tidak dapat membuat tabel:", error);
//   });
