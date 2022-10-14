const mongoose = require("mongoose");
const slug = require("slug");
const CategorySchema = mongoose.Schema(
  {
    title: { type: String, unique: true, index: true },
    description: { type: String },
    slug: { type: String, unique: true, lowercase: true },
    image: { type: String },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  },
  { timestamps: true }
);
CategorySchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

CategorySchema.methods.slugify = function () {
  this.slug =
    slug(this.title) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

module.exports = mongoose.model("Category", CategorySchema);
