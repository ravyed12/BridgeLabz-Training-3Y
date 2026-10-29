class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  applyDiscount(percent) {
    this.price = this.price - (this.price * percent / 100);
  }

  displayDetails() {
    return `[ID: ${this.id}] ${this.name} | Category: ${this.category} | Price: ₹${this.price.toFixed(2)}`;
  }
}

const products = [
  new Product(1, "Laptop",        55000, "Electronics"),
  new Product(2, "Notebook",        150, "Stationery"),
  new Product(3, "Headphones",     2999, "Electronics"),
  new Product(4, "Pen",              50, "Stationery"),
  new Product(5, "Smartphone",    18000, "Electronics"),
  new Product(6, "Desk Chair",     8500, "Furniture"),
];

products[0].applyDiscount(10);
products[2].applyDiscount(5);
products[5].applyDiscount(15);

const expensiveProducts = products.filter(p => p.price > 1000);

console.log("Products with price > ₹1000:\n");
expensiveProducts.forEach(p => console.log(p.displayDetails()));
