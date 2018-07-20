import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  filters: any = [];
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.filters.push({
      name: "Stadiu", expand: true, isParent: true, id: "stadiu",
      items: [
        {
          name: "Neatribuit"
          , id: "status_Neatribuit"
        },
        {
          name: "Deschis"
          , id: "status_Deschis"
        },
        {
          name: "Rezolvat"
          , id: "status_Rezolvat"
        },
        {
          name: "Inchis"
          , id: "status_Inchis"
        }
      ]
    });


    this.filters.push({
      name: "Severitate", expand: true, isParent: true, id: "severitate",
      items: [
        { name: "Scazut", id: "severitate_Scazut" },
        { name: "Normal", id: "severitate_Normal" },
        { name: "Urgent", id: "severitate_Urgent" },
        { name: "Critic", id: "severitate_Critic" }
      ]
    });
    this.filters.push({
      name: "Unitate", expand: true, isParent: true, id: "unitate",
      items: [
        { name: "US Project", id: "unitate_UsProject" },
        { name: "Development", id: "unitate_Development" },
        { name: "Vanzari", id: "unitate_Vanzari" }
      ]
    });

    this.filters.push({
      "name": "Categories",
      expand: true,
      isParent: true,
      id: "Categories",
      "items": [
        {
          "name": "Category1",
          "expand": true,
          "isParent": true,
          "id": "cat1_stadiu",
          "items": [
            {
              "name": "Neatribuit",
              "id": "sub1_status_Neatribuit"
            },
            {
              "name": "Deschis",
              "id": "sub1_status_Deschis"
            },
            {
              "name": "Rezolvat",
              "id": "sub1_status_Rezolvat"
            },
            {
              "name": "Inchis",
              "id": "sub1_status_Inchis"
            }
          ]
        },
        {
          "name": "Category2",
          "expand": true,
          "isParent": true,
          "id": "cat2_stadiu",
          "items": [
            {
              "name": "Neatribuit",
              "id": "sub2_status_Neatribuit"
            },
            {
              "name": "Deschis",
              "id": "sub2_status_Deschis"
            },
            {
              "name": "Rezolvat",
              "id": "sub2_status_Rezolvat"
            },
            {
              "name": "Inchis",
              "id": "sub2_status_Inchis"
            }
          ]
        }]
    });

  }

  isChecked(element) {
    return element.checked;
  }

  Check(element) {
    //self
    element.checked = !element.checked;

    //parent
    let myParent = this.GetMyParent(element);
    if (element.checked === false) {
      if (myParent != false)
        myParent.checked = element.checked;
      else
        console.log("parent is false");
    }
    //children
    this.CheckChildren(element);

    if (this.ChildrensAreChecked(myParent))
      myParent.checked = true;

    let GrandPa = this.GetMyParent(myParent);
    GrandPa.checked = this.ChildrensAreChecked(GrandPa);

  }

  ChildrensAreChecked(parent) {
    if (!parent.hasOwnProperty("items"))
      return;
    let result = true;
    for (let item of parent.items) {
      if (item.checked === false || item.checked == undefined)
        result = false;
      let res = this.ChildrensAreChecked(item);
      if (res == false)
        result = res;
    }
    return result;
  }

  GetMyParent(element) {
    let parent = null;

    for (let i of this.filters) {
      parent = this.CheckParent(i, element);
      if (parent != false)
        break;
    }

    return parent;
  }
  CheckParent(currentParent, toFind) {

    if (currentParent.id == toFind.id) {
      return currentParent;
    }

    if (!currentParent.hasOwnProperty("items"))
      return false;

    for (let item of currentParent.items) {
      if (item.id == toFind.id) {
        return currentParent;
      }
      let result = this.CheckParent(item, toFind);
      if (result != false)
        return result;
    }
    return false;
  }
  CheckChildren(parent) {
    if (!parent.hasOwnProperty("items"))
      return;
    for (let item of parent.items) {
      item.checked = parent.checked;
      this.CheckChildren(item);
    }
  }

  GetSelected() {
    let selected = [];

    for (let itemLv1 of this.filters) {
      if (itemLv1.checked && (itemLv1.isParent==false || itemLv1.isParent == undefined))
        selected.push(itemLv1);

      if (itemLv1.hasOwnProperty("items")){

        for (let itemLv2 of itemLv1.items) {
          if (itemLv2.checked && (itemLv2.isParent==false || itemLv2.isParent == undefined))
            selected.push(itemLv2);

          if (itemLv2.hasOwnProperty("items")){
            for (let itemLv3 of itemLv2.items)
            if (itemLv3.checked && (itemLv3.isParent==false || itemLv3.isParent == undefined))
              selected.push(itemLv3);
          }
        }

      }
    }

    console.log(selected);
  }
}