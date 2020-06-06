"use strict";

const CategoryModel = require("../models/category.model");
const ItemModel = require("../models/item.model");
const AuthorModel = require("../models/author.model");

class ItemRepository {
  responseData;
  constructor() {
    this.responseData = {};
  }

  async makeResponseSearch(data) {
    let res = {};
    const response = await this.makeResponseSearchs(data);
    res.author = response.author;
    res.categories = response.categories;
    res.items = response.items;
    return res;
  }

  async makeResponseItem(item, description) {
    let res = {};
    let data = { item, description };
    const response = await this.makeResponseItems(data);
    res.author = response.author;
    res.item = response.item;
    return response;
  }

  makeAuthor(data) {
    const authorModel = new AuthorModel("Luciano", "Calderon");
    return authorModel;
  }

  makeCategories(category) {
    return new CategoryModel(category);
  }

  makeItems(id, title, currency, price, picture, condition, free_shipping) {
    const priceGen = {
      currency,
      amount: price,
      decimals: this.calculateDecimals(price),
    };
    const itemModel = new ItemModel(
      id,
      title,
      priceGen,
      picture,
      condition,
      free_shipping
    );
    return itemModel;
  }

  calculateDecimals(number) {
    const numberStr = number.toString();
    const numberSplit = numberStr.split("." || ",");
    if (numberSplit.length > 1) {
      return numberSplit[1].length;
    } else {
      return 0;
    }
  }

  async makeResponseSearchs({ results }) {
    const author = await this.makeAuthor(results);
    let categories = [];
    let items = [];

    for (const data of results) {
      const categoryModel = this.makeCategories(data.category_id);
      categories.push(categoryModel.category);

      const itemModel = this.makeItems(
        data.id,
        data.title,
        data.currency_id,
        data.price,
        data.thumbnail,
        data.condition,
        data.shipping.free_shipping
      );
      items.push(itemModel);
    }
    return { author, categories, items };
  }

  async makeResponseItems({ item, description }) {
    const author = await this.makeAuthor(item);
   
    const itemModel = await this.makeItems(
      item.id,
      item.title,
      item.currency_id,
      item.price,
      item.thumbnail,
      item.condition,
      item.shipping.free_shipping
    );
    itemModel.sold_quantity = item.sold_quantity;
    itemModel.description = description.plain_text;
    return { author, item: itemModel };
  }
}

module.exports = ItemRepository;
