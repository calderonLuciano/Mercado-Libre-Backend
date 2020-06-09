"use strict";

const CategoryModel = require("../models/category.model");
const ItemModel = require("../models/item.model");
const AuthorModel = require("../models/author.model");

class ItemRepository {
  responseData;
  constructor({ CategoryService }) {
    this.responseData = {};
    this._categoryService = CategoryService;
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

  async makeCategories(categoryId) {
    let categories = [];
    const responseCategories = await this._categoryService.getCategories(
      categoryId
    );
    if (responseCategories) {
      const response = responseCategories.path_from_root;
      for (const category of response) {
        const { name } = category;
        categories.push(name);
      }
    }
    return categories;
  }

  makeItems(
    id,
    title,
    currency,
    price,
    picture,
    condition,
    free_shipping,
    location
  ) {
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
      free_shipping,
      location || ""
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
    let itemsList = [];
    const { category_id } = results[0];
    const categories = await this.makeCategories(category_id);

    for (const data of results) {
      const itemModel = this.makeItems(
        data.id,
        data.title,
        data.currency_id,
        data.price,
        data.thumbnail,
        data.condition,
        data.shipping.free_shipping,
        data.address.state_name
      );
      itemsList.push(itemModel);
    }
    return { author, categories, items: itemsList };
  }

  async makeResponseItems({ item, description }) {
    const author = await this.makeAuthor(item);

    const itemModel = await this.makeItems(
      item.id,
      item.title,
      item.currency_id,
      item.price,
      item.pictures[0].url,
      item.condition,
      item.shipping.free_shipping
    );
    itemModel.sold_quantity = item.sold_quantity;
    itemModel.description = description.plain_text;
    return { author, item: itemModel };
  }
}

module.exports = ItemRepository;
