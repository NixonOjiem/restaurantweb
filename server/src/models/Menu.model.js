const mongoose = require("mongoose");
const slugify = require("slugify"); // Optional: for SEO-friendly URLs

const MenuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a dish title"],
      unique: true, // It makes sense for titles to be unique
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price must be positive"],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          // Discount price should be less than regular price
          return !val || val < this.price;
        },
        message: "Discount price ({VALUE}) should be less than regular price",
      },
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: {
        values: ["Starters", "Mains", "Desserts", "Drinks", "Sides"],
        message: "{VALUE} is not a supported category",
      },
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    ingredients: {
      type: [String], // Array of strings: ["Garlic", "Basil", "Pine Nuts"]
      default: [],
    },
    dietaryInfo: {
      type: [String],
      enum: [
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
        "Spicy",
        "Contains Nuts",
        "Halal",
        "Dairy-Free",
        "Nut-Free",
        "Kosher",
        "Organic",
      ],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true, // Use this to toggle "Sold Out" on frontend
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 1"],
      max: [5, "Rating must can not be more than 5"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    badge: {
      type: [String],
      enum: ["Bestseller", "Light Option", "Chef Choice", "Sweet Tooth", ""],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create item slug from the title (e.g. "Spicy Pasta" -> "spicy-pasta")
MenuSchema.pre("save", async function () {
  // 1. If title didn't change, stop here
  if (!this.isModified("title")) return;

  // 2. Generate slug safely (Regex handles special chars better than split/join)
  this.slug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters like "!" or "?"
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with "-"
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
});

module.exports = mongoose.model("Menu", MenuSchema);
