import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true // Por defecto, el producto está disponible
  },
  stock: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    unique: true,  // Asegura que el código del producto sea único
    required: true
  },
  thumbnail: {
    type: String, // URL o path de la imagen
    required: false
  }
}, {
  timestamps: true  // Crea campos 'createdAt' y 'updatedAt' automáticamente
});

// Crea un modelo basado en el esquema
const Product = mongoose.model('Product', productSchema);

export default Product;
