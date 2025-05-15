const csv = require("csvtojson");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db/DB.Connect");
const Book = require("./models/book.model");

dotenv.config();

const seedBooks = async () => {
  try {
    await connectDB();

    const booksRaw = await csv({
      trim: true,
      ignoreEmpty: true
    }).fromFile(path.join(__dirname, "book-details (1).csv"));

    const formattedBooks = booksRaw.map((book, index) => {
      const name = book["Name"]?.trim();
      const author = book["Author"]?.trim();
      const genre = book["Genre"]?.trim();

      const userRating = parseFloat(book["User Rating"]);
      const reviews = parseInt(book["Reviews"]);
      const price = parseFloat(book["Price"]);
      const year = parseInt(book["Year"]);

      if (
        !name || !author || !genre ||
        isNaN(userRating) || isNaN(reviews) || isNaN(price) || isNaN(year)
      ) {
        console.warn(`⚠️ Skipping invalid book at row ${index + 2}:`, book);
        return null;
      }

      return {
        name,
        author,
        userRating,
        reviews,
        price,
        year,
        genre
      };
    }).filter(Boolean);

    let insertedCount = 0;
    for (const book of formattedBooks) {
      const exists = await Book.findOne({ name: book.name, author: book.author });
      if (!exists) {
        await Book.create(book);
        insertedCount++;
      } else {
        console.log(`⚠️ Book already exists: "${book.name}" by ${book.author}`);
      }
    }

    console.log(`✅ Books seeded successfully! New books added: ${insertedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding books:", error);
    process.exit(1);
  }
};

seedBooks();
