import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'cmp-icons',
  templateUrl: './icons.component.html',
  styles: [
  ]
})
export class IconsComponent implements OnInit {

  public selectedIcon: string;
  public icons: any;
  public page: number = 0;
  public data: any;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.selectedIcon = config.data.icon;
  }

  ngOnInit(): void {


    this.data = [
      {
        "icon": "fab fa-500px",
        "name": "500px"
      },
      {
        "icon": "fab fa-accessible-icon",
        "name": "accessible-icon"
      },
      {
        "icon": "fab fa-accusoft",
        "name": "accusoft"
      },
      {
        "icon": "fab fa-acquisitions-incorporated",
        "name": "acquisitions-incorporated"
      },
      {
        "icon": "fas fa-address-book",
        "name": "address-book"
      },

      {
        "icon": "far fa-address-card",
        "name": "address-card"
      },
      {
        "icon": "fas fa-adjust",
        "name": "adjust"
      },
      {
        "icon": "fab fa-adn",
        "name": "adn"
      },
      {
        "icon": "fab fa-adversal",
        "name": "adversal"
      },
      {
        "icon": "fab fa-affiliatetheme",
        "name": "affiliatetheme"
      },
      {
        "icon": "fas fa-air-freshener",
        "name": "air-freshener"
      },
      {
        "icon": "fab fa-airbnb",
        "name": "airbnb"
      },
      {
        "icon": "fab fa-algolia",
        "name": "algolia"
      },
      {
        "icon": "fas fa-align-center",
        "name": "align-center"
      },
      {
        "icon": "fas fa-align-justify",
        "name": "align-justify"
      },
      {
        "icon": "fas fa-align-left",
        "name": "align-left"
      },
      {
        "icon": "fas fa-align-right",
        "name": "align-right"
      },
      {
        "icon": "fab fa-alipay",
        "name": "alipay"
      },
      {
        "icon": "fas fa-allergies",
        "name": "allergies"
      },
      {
        "icon": "fab fa-amazon",
        "name": "amazon"
      },
      {
        "icon": "fab fa-amazon-pay",
        "name": "amazon-pay"
      },
      {
        "icon": "fas fa-ambulance",
        "name": "ambulance"
      },
      {
        "icon": "fas fa-american-sign-language-interpreting",
        "name": "american-sign-language-interpreting"
      },
      {
        "icon": "fab fa-amilia",
        "name": "amilia"
      },
      {
        "icon": "fas fa-anchor",
        "name": "anchor"
      },
      {
        "icon": "fab fa-android",
        "name": "android"
      },
      {
        "icon": "fab fa-angellist",
        "name": "angellist"
      },
      {
        "icon": "fas fa-angle-double-down",
        "name": "angle-double-down"
      },
      {
        "icon": "fas fa-angle-double-left",
        "name": "angle-double-left"
      },
      {
        "icon": "fas fa-angle-double-right",
        "name": "angle-double-right"
      },
      {
        "icon": "fas fa-angle-double-up",
        "name": "angle-double-up"
      },
      {
        "icon": "fas fa-angle-down",
        "name": "angle-down"
      },
      {
        "icon": "fas fa-angle-left",
        "name": "angle-left"
      },
      {
        "icon": "fas fa-angle-right",
        "name": "angle-right"
      },
      {
        "icon": "fas fa-angle-up",
        "name": "angle-up"
      },
      {
        "icon": "fas fa-angry",
        "name": "angry"
      },
      {
        "icon": "far fa-angry",
        "name": "angry"
      },
      {
        "icon": "fab fa-angrycreative",
        "name": "angrycreative"
      },
      {
        "icon": "fab fa-angular",
        "name": "angular"
      },
      {
        "icon": "fas fa-ankh",
        "name": "ankh"
      },
      {
        "icon": "fab fa-app-store",
        "name": "app-store"
      },
      {
        "icon": "fab fa-app-store-ios",
        "name": "app-store-ios"
      },
      {
        "icon": "fab fa-apper",
        "name": "apper"
      },
      {
        "icon": "fab fa-apple",
        "name": "apple"
      },
      {
        "icon": "fas fa-apple-alt",
        "name": "apple-alt"
      },
      {
        "icon": "fab fa-apple-pay",
        "name": "apple-pay"
      },
      {
        "icon": "fas fa-archive",
        "name": "archive"
      },
      {
        "icon": "fas fa-archway",
        "name": "archway"
      },
      {
        "icon": "fas fa-arrow-alt-circle-down",
        "name": "arrow-alt-circle-down"
      },
      {
        "icon": "far fa-arrow-alt-circle-down",
        "name": "arrow-alt-circle-down"
      },
      {
        "icon": "fas fa-arrow-alt-circle-left",
        "name": "arrow-alt-circle-left"
      },
      {
        "icon": "far fa-arrow-alt-circle-left",
        "name": "arrow-alt-circle-left"
      },
      {
        "icon": "fas fa-arrow-alt-circle-right",
        "name": "arrow-alt-circle-right"
      },
      {
        "icon": "far fa-arrow-alt-circle-right",
        "name": "arrow-alt-circle-right"
      },
      {
        "icon": "fas fa-arrow-alt-circle-up",
        "name": "arrow-alt-circle-up"
      },
      {
        "icon": "far fa-arrow-alt-circle-up",
        "name": "arrow-alt-circle-up"
      },
      {
        "icon": "fas fa-arrow-circle-down",
        "name": "arrow-circle-down"
      },
      {
        "icon": "fas fa-arrow-circle-left",
        "name": "arrow-circle-left"
      },
      {
        "icon": "fas fa-arrow-circle-right",
        "name": "arrow-circle-right"
      },
      {
        "icon": "fas fa-arrow-circle-up",
        "name": "arrow-circle-up"
      },
      {
        "icon": "fas fa-arrow-down",
        "name": "arrow-down"
      },
      {
        "icon": "fas fa-arrow-left",
        "name": "arrow-left"
      },
      {
        "icon": "fas fa-arrow-right",
        "name": "arrow-right"
      },
      {
        "icon": "fas fa-arrow-up",
        "name": "arrow-up"
      },
      {
        "icon": "fas fa-arrows-alt",
        "name": "arrows-alt"
      },
      {
        "icon": "fas fa-arrows-alt-h",
        "name": "arrows-alt-h"
      },
      {
        "icon": "fas fa-arrows-alt-v",
        "name": "arrows-alt-v"
      },
      {
        "icon": "fab fa-artstation",
        "name": "artstation"
      },
      {
        "icon": "fas fa-assistive-listening-systems",
        "name": "assistive-listening-systems"
      },
      {
        "icon": "fas fa-asterisk",
        "name": "asterisk"
      },
      {
        "icon": "fab fa-asymmetrik",
        "name": "asymmetrik"
      },
      {
        "icon": "fas fa-at",
        "name": "at"
      },
      {
        "icon": "fas fa-atlas",
        "name": "atlas"
      },
      {
        "icon": "fab fa-atlassian",
        "name": "atlassian"
      },
      {
        "icon": "fas fa-atom",
        "name": "atom"
      },
      {
        "icon": "fab fa-audible",
        "name": "audible"
      },
      {
        "icon": "fas fa-audio-description",
        "name": "audio-description"
      },
      {
        "icon": "fab fa-autoprefixer",
        "name": "autoprefixer"
      },
      {
        "icon": "fab fa-avianex",
        "name": "avianex"
      },
      {
        "icon": "fab fa-aviato",
        "name": "aviato"
      },
      {
        "icon": "fas fa-award",
        "name": "award"
      },
      {
        "icon": "fab fa-aws",
        "name": "aws"
      },
      {
        "icon": "fas fa-baby",
        "name": "baby"
      },
      {
        "icon": "fas fa-baby-carriage",
        "name": "baby-carriage"
      },
      {
        "icon": "fas fa-backspace",
        "name": "backspace"
      },
      {
        "icon": "fas fa-backward",
        "name": "backward"
      },
      {
        "icon": "fas fa-bacon",
        "name": "bacon"
      },
      {
        "icon": "fas fa-bacteria",
        "name": "bacteria"
      },
      {
        "icon": "fas fa-bacterium",
        "name": "bacterium"
      },
      {
        "icon": "fas fa-bahai",
        "name": "bahai"
      },
      {
        "icon": "fas fa-balance-scale",
        "name": "balance-scale"
      },
      {
        "icon": "fas fa-balance-scale-left",
        "name": "balance-scale-left"
      },
      {
        "icon": "fas fa-balance-scale-right",
        "name": "balance-scale-right"
      },
      {
        "icon": "fas fa-ban",
        "name": "ban"
      },
      {
        "icon": "fas fa-band-aid",
        "name": "band-aid"
      },
      {
        "icon": "fab fa-bandcamp",
        "name": "bandcamp"
      },
      {
        "icon": "fas fa-barcode",
        "name": "barcode"
      },
      {
        "icon": "fas fa-bars",
        "name": "bars"
      },
      {
        "icon": "fas fa-baseball-ball",
        "name": "baseball-ball"
      },
      {
        "icon": "fas fa-basketball-ball",
        "name": "basketball-ball"
      },
      {
        "icon": "fas fa-bath",
        "name": "bath"
      },
      {
        "icon": "fas fa-battery-empty",
        "name": "battery-empty"
      },
      {
        "icon": "fas fa-battery-full",
        "name": "battery-full"
      },
      {
        "icon": "fas fa-battery-half",
        "name": "battery-half"
      },
      {
        "icon": "fas fa-battery-quarter",
        "name": "battery-quarter"
      },
      {
        "icon": "fas fa-battery-three-quarters",
        "name": "battery-three-quarters"
      },
      {
        "icon": "fab fa-battle-net",
        "name": "battle-net"
      },
      {
        "icon": "fas fa-bed",
        "name": "bed"
      },
      {
        "icon": "fas fa-beer",
        "name": "beer"
      },
      {
        "icon": "fab fa-behance",
        "name": "behance"
      },
      {
        "icon": "fab fa-behance-square",
        "name": "behance-square"
      },
      {
        "icon": "fas fa-bell",
        "name": "bell"
      },
      {
        "icon": "afar fa-bell",
        "name": "afar fa-bell"
      },
      {
        "icon": "fas fa-bell-slash",
        "name": "bell-slash"
      },
      {
        "icon": "far fa-bell-slash",
        "name": "bell-slash"
      },
      {
        "icon": "fas fa-bezier-curve",
        "name": "bezier-curve"
      },
      {
        "icon": "fas fa-bible",
        "name": "bible"
      },
      {
        "icon": "fas fa-bicycle",
        "name": "bicycle"
      },
      {
        "icon": "fas fa-biking",
        "name": "biking"
      },
      {
        "icon": "fab fa-bimobject",
        "name": "bimobject"
      },
      {
        "icon": "fas fa-binoculars",
        "name": "binoculars"
      },
      {
        "icon": "fas fa-biohazard",
        "name": "biohazard"
      },
      {
        "icon": "fas fa-birthday-cake",
        "name": "birthday-cake"
      },
      {
        "icon": "fab fa-bitbucket",
        "name": "bitbucket"
      },
      {
        "icon": "fab fa-bitcoin",
        "name": "bitcoin"
      },
      {
        "icon": "fab fa-bity",
        "name": "bity"
      },
      {
        "icon": "fab fa-black-tie",
        "name": "black-tie"
      },
      {
        "icon": "fab fa-blackberry",
        "name": "blackberry"
      },
      {
        "icon": "fas fa-blender",
        "name": "blender"
      },
      {
        "icon": "fas fa-blender-phone",
        "name": "blender-phone"
      },
      {
        "icon": "fas fa-blind",
        "name": "blind"
      },
      {
        "icon": "fas fa-blog",
        "name": "blog"
      },
      {
        "icon": "fab fa-blogger",
        "name": "blogger"
      },
      {
        "icon": "fab fa-blogger-b",
        "name": "blogger-b"
      },
      {
        "icon": "fab fa-bluetooth",
        "name": "bluetooth"
      },
      {
        "icon": "fab fa-bluetooth-b",
        "name": "bluetooth-b"
      },
      {
        "icon": "fas fa-bold",
        "name": "bold"
      },
      {
        "icon": "fas fa-bolt",
        "name": "bolt"
      },
      {
        "icon": "fas fa-bomb",
        "name": "bomb"
      },
      {
        "icon": "fas fa-bone",
        "name": "bone"
      },
      {
        "icon": "fas fa-bong",
        "name": "bong"
      },
      {
        "icon": "fas fa-book",
        "name": "book"
      },
      {
        "icon": "fas fa-book-dead",
        "name": "book-dead"
      },
      {
        "icon": "fas fa-book-medical",
        "name": "book-medical"
      },
      {
        "icon": "fas fa-book-open",
        "name": "book-open"
      },
      {
        "icon": "fas fa-book-reader",
        "name": "book-reader"
      },
      {
        "icon": "fas fa-bookmark",
        "name": "bookmark"
      },
      {
        "icon": "far fa-bookmark",
        "name": "bookmark"
      },
      {
        "icon": "fab fa-bootstrap",
        "name": "bootstrap"
      },
      {
        "icon": "fas fa-border-all",
        "name": "border-all"
      },
      {
        "icon": "fas fa-border-none",
        "name": "border-none"
      },
      {
        "icon": "fas fa-border-style",
        "name": "border-style"
      },
      {
        "icon": "fas fa-bowling-ball",
        "name": "bowling-ball"
      },
      {
        "icon": "fas fa-box",
        "name": "box"
      },
      {
        "icon": "fas fa-box-open",
        "name": "box-open"
      },
      {
        "icon": "fas fa-box-tissue",
        "name": "box-tissue"
      },
      {
        "icon": "fas fa-boxes",
        "name": "boxes"
      },
      {
        "icon": "fas fa-braille",
        "name": "braille"
      },
      {
        "icon": "fas fa-brain",
        "name": "brain"
      },
      {
        "icon": "fas fa-bread-slice",
        "name": "bread-slice"
      },
      {
        "icon": "fas fa-briefcase",
        "name": "briefcase"
      },
      {
        "icon": "fas fa-briefcase-medical",
        "name": "briefcase-medical"
      },
      {
        "icon": "fas fa-broadcast-tower",
        "name": "broadcast-tower"
      },
      {
        "icon": "fas fa-broom",
        "name": "broom"
      },
      {
        "icon": "fas fa-brush",
        "name": "brush"
      },
      {
        "icon": "fab fa-btc",
        "name": "btc"
      },
      {
        "icon": "fab fa-buffer",
        "name": "buffer"
      },
      {
        "icon": "fas fa-bug",
        "name": "bug"
      },
      {
        "icon": "fas fa-building",
        "name": "building"
      },
      {
        "icon": "far fa-building",
        "name": "building"
      },
      {
        "icon": "fas fa-bullhorn",
        "name": "bullhorn"
      },
      {
        "icon": "fas fa-bullseye",
        "name": "bullseye"
      },
      {
        "icon": "fas fa-burn",
        "name": "burn"
      },
      {
        "icon": "fab fa-buromobelexperte",
        "name": "buromobelexperte"
      },
      {
        "icon": "fas fa-bus",
        "name": "bus"
      },
      {
        "icon": "fas fa-bus-alt",
        "name": "bus-alt"
      },
      {
        "icon": "fas fa-business-time",
        "name": "business-time"
      },
      {
        "icon": "fab fa-buy-n-large",
        "name": "buy-n-large"
      },
      {
        "icon": "fab fa-buysellads",
        "name": "buysellads"
      },
      {
        "icon": "fas fa-calculator",
        "name": "calculator"
      },
      {
        "icon": "fas fa-calendar",
        "name": "calendar"
      },
      {
        "icon": "far fa-calendar",
        "name": "calendar"
      },
      {
        "icon": "fas fa-calendar-alt",
        "name": "calendar-alt"
      },
      {
        "icon": "far fa-calendar-alt",
        "name": "calendar-alt"
      },
      {
        "icon": "fas fa-calendar-check",
        "name": "calendar-check"
      },
      {
        "icon": "far fa-calendar-check",
        "name": "calendar-check"
      },
      {
        "icon": "fas fa-calendar-day",
        "name": "calendar-day"
      },
      {
        "icon": "fas fa-calendar-minus",
        "name": "calendar-minus"
      },
      {
        "icon": "far fa-calendar-minus",
        "name": "calendar-minus"
      },
      {
        "icon": "fas fa-calendar-plus",
        "name": "calendar-plus"
      },
      {
        "icon": "far fa-calendar-plus",
        "name": "calendar-plus"
      },
      {
        "icon": "fas fa-calendar-times",
        "name": "calendar-times"
      },
      {
        "icon": "far fa-calendar-times",
        "name": "calendar-times"
      },
      {
        "icon": "fas fa-calendar-week",
        "name": "calendar-week"
      },
      {
        "icon": "fas fa-camera",
        "name": "camera"
      },
      {
        "icon": "fas fa-camera-retro",
        "name": "camera-retro"
      },
      {
        "icon": "fas fa-campground",
        "name": "campground"
      },
      {
        "icon": "fab fa-canadian-maple-leaf",
        "name": "canadian-maple-leaf"
      },
      {
        "icon": "fas fa-candy-cane",
        "name": "candy-cane"
      },
      {
        "icon": "fas fa-cannabis",
        "name": "cannabis"
      },
      {
        "icon": "fas fa-capsules",
        "name": "capsules"
      },
      {
        "icon": "fas fa-car",
        "name": "car"
      },
      {
        "icon": "fas fa-car-alt",
        "name": "car-alt"
      },
      {
        "icon": "fas fa-car-battery",
        "name": "car-battery"
      },
      {
        "icon": "fas fa-car-crash",
        "name": "car-crash"
      },
      {
        "icon": "fas fa-car-side",
        "name": "car-side"
      },
      {
        "icon": "fas fa-caravan",
        "name": "caravan"
      },
      {
        "icon": "fas fa-caret-down",
        "name": "caret-down"
      },
      {
        "icon": "fas fa-caret-left",
        "name": "caret-left"
      },
      {
        "icon": "fas fa-caret-right",
        "name": "caret-right"
      },
      {
        "icon": "fas fa-caret-square-down",
        "name": "caret-square-down"
      },
      {
        "icon": "far fa-caret-square-down",
        "name": "caret-square-down"
      },
      {
        "icon": "fas fa-caret-square-left",
        "name": "caret-square-left"
      },
      {
        "icon": "far fa-caret-square-left",
        "name": "caret-square-left"
      },
      {
        "icon": "fas fa-caret-square-right",
        "name": "caret-square-right"
      },
      {
        "icon": "far fa-caret-square-right",
        "name": "caret-square-right"
      },
      {
        "icon": "fas fa-caret-square-up",
        "name": "caret-square-up"
      },
      {
        "icon": "far fa-caret-square-up",
        "name": "caret-square-up"
      },
      {
        "icon": "fas fa-caret-up",
        "name": "caret-up"
      },
      {
        "icon": "fas fa-carrot",
        "name": "carrot"
      },
      {
        "icon": "fas fa-cart-arrow-down",
        "name": "cart-arrow-down"
      },
      {
        "icon": "fas fa-cart-plus",
        "name": "cart-plus"
      },
      {
        "icon": "fas fa-cash-register",
        "name": "cash-register"
      },
      {
        "icon": "fas fa-cat",
        "name": "cat"
      },
      {
        "icon": "fab fa-cc-amazon-pay",
        "name": "cc-amazon-pay"
      },
      {
        "icon": "fab fa-cc-amex",
        "name": "cc-amex"
      },
      {
        "icon": "fab fa-cc-apple-pay",
        "name": "cc-apple-pay"
      },
      {
        "icon": "fab fa-cc-diners-club",
        "name": "cc-diners-club"
      },
      {
        "icon": "fab fa-cc-discover",
        "name": "cc-discover"
      },
      {
        "icon": "fab fa-cc-jcb",
        "name": "cc-jcb"
      },
      {
        "icon": "fab fa-cc-mastercard",
        "name": "cc-mastercard"
      },
      {
        "icon": "fab fa-cc-paypal",
        "name": "cc-paypal"
      },
      {
        "icon": "fab fa-cc-stripe",
        "name": "cc-stripe"
      },
      {
        "icon": "fab fa-cc-visa",
        "name": "cc-visa"
      },
      {
        "icon": "fab fa-centercode",
        "name": "centercode"
      },
      {
        "icon": "fab fa-centos",
        "name": "centos"
      },
      {
        "icon": "fas fa-certificate",
        "name": "certificate"
      },
      {
        "icon": "fas fa-chair",
        "name": "chair"
      },
      {
        "icon": "fas fa-chalkboard",
        "name": "chalkboard"
      },
      {
        "icon": "fas fa-chalkboard-teacher",
        "name": "chalkboard-teacher"
      },
      {
        "icon": "fas fa-charging-station",
        "name": "charging-station"
      },
      {
        "icon": "fas fa-chart-area",
        "name": "chart-area"
      },
      {
        "icon": "fas fa-chart-bar",
        "name": "chart-bar"
      },
      {
        "icon": "far fa-chart-bar",
        "name": "chart-bar"
      },
      {
        "icon": "fas fa-chart-line",
        "name": "chart-line"
      },
      {
        "icon": "fas fa-chart-pie",
        "name": "chart-pie"
      },
      {
        "icon": "fas fa-check",
        "name": "check"
      },
      {
        "icon": "fas fa-check-circle",
        "name": "check-circle"
      },
      {
        "icon": "far fa-check-circle",
        "name": "check-circle"
      },
      {
        "icon": "fas fa-check-double",
        "name": "check-double"
      },
      {
        "icon": "fas fa-check-square",
        "name": "check-square"
      },
      {
        "icon": "far fa-check-square",
        "name": "check-square"
      },
      {
        "icon": "fas fa-cheese",
        "name": "cheese"
      },
      {
        "icon": "fas fa-chess",
        "name": "chess"
      },
      {
        "icon": "fas fa-chess-bishop",
        "name": "chess-bishop"
      },
      {
        "icon": "fas fa-chess-board",
        "name": "chess-board"
      },
      {
        "icon": "fas fa-chess-king",
        "name": "chess-king"
      },
      {
        "icon": "fas fa-chess-knight",
        "name": "chess-knight"
      },
      {
        "icon": "fas fa-chess-pawn",
        "name": "chess-pawn"
      },
      {
        "icon": "fas fa-chess-queen",
        "name": "chess-queen"
      },
      {
        "icon": "fas fa-chess-rook",
        "name": "chess-rook"
      },
      {
        "icon": "fas fa-chevron-circle-down",
        "name": "chevron-circle-down"
      },
      {
        "icon": "fas fa-chevron-circle-left",
        "name": "chevron-circle-left"
      },
      {
        "icon": "fas fa-chevron-circle-right",
        "name": "chevron-circle-right"
      },
      {
        "icon": "fas fa-chevron-circle-up",
        "name": "chevron-circle-up"
      },
      {
        "icon": "fas fa-chevron-down",
        "name": "chevron-down"
      },
      {
        "icon": "fas fa-chevron-left",
        "name": "chevron-left"
      },
      {
        "icon": "fas fa-chevron-right",
        "name": "chevron-right"
      },
      {
        "icon": "fas fa-chevron-up",
        "name": "chevron-up"
      },
      {
        "icon": "fas fa-child",
        "name": "child"
      },
      {
        "icon": "fab fa-chrome",
        "name": "chrome"
      },
      {
        "icon": "fab fa-chromecast",
        "name": "chromecast"
      },
      {
        "icon": "fas fa-church",
        "name": "church"
      },
      {
        "icon": "fas fa-circle",
        "name": "circle"
      },
      {
        "icon": "far fa-circle",
        "name": "circle"
      },
      {
        "icon": "fas fa-circle-notch",
        "name": "circle-notch"
      },
      {
        "icon": "fas fa-city",
        "name": "city"
      },
      {
        "icon": "fas fa-clinic-medical",
        "name": "clinic-medical"
      },
      {
        "icon": "fas fa-clipboard",
        "name": "clipboard"
      },
      {
        "icon": "far fa-clipboard",
        "name": "clipboard"
      },
      {
        "icon": "fas fa-clipboard-check",
        "name": "clipboard-check"
      },
      {
        "icon": "fas fa-clipboard-list",
        "name": "clipboard-list"
      },
      {
        "icon": "fas fa-clock",
        "name": "clock"
      },
      {
        "icon": "far fa-clock",
        "name": "clock"
      },
      {
        "icon": "fas fa-clone",
        "name": "clone"
      },
      {
        "icon": "far fa-clone",
        "name": "clone"
      },
      {
        "icon": "fas fa-closed-captioning",
        "name": "closed-captioning"
      },
      {
        "icon": "far fa-closed-captioning",
        "name": "closed-captioning"
      },
      {
        "icon": "fas fa-cloud",
        "name": "cloud"
      },
      {
        "icon": "fas fa-cloud-download-alt",
        "name": "cloud-download-alt"
      },
      {
        "icon": "fas fa-cloud-meatball",
        "name": "cloud-meatball"
      },
      {
        "icon": "fas fa-cloud-moon",
        "name": "cloud-moon"
      },
      {
        "icon": "fas fa-cloud-moon-rain",
        "name": "cloud-moon-rain"
      },
      {
        "icon": "fas fa-cloud-rain",
        "name": "cloud-rain"
      },
      {
        "icon": "fas fa-cloud-showers-heavy",
        "name": "cloud-showers-heavy"
      },
      {
        "icon": "fas fa-cloud-sun",
        "name": "cloud-sun"
      },
      {
        "icon": "fas fa-cloud-sun-rain",
        "name": "cloud-sun-rain"
      },
      {
        "icon": "fas fa-cloud-upload-alt",
        "name": "cloud-upload-alt"
      },
      {
        "icon": "fab fa-cloudflare",
        "name": "cloudflare"
      },
      {
        "icon": "fab fa-cloudscale",
        "name": "cloudscale"
      },
      {
        "icon": "fab fa-cloudsmith",
        "name": "cloudsmith"
      },
      {
        "icon": "fab fa-cloudversify",
        "name": "cloudversify"
      },
      {
        "icon": "fas fa-cocktail",
        "name": "cocktail"
      },
      {
        "icon": "fas fa-code",
        "name": "code"
      },
      {
        "icon": "fas fa-code-branch",
        "name": "code-branch"
      },
      {
        "icon": "fab fa-codepen",
        "name": "codepen"
      },
      {
        "icon": "fab fa-codiepie",
        "name": "codiepie"
      },
      {
        "icon": "fas fa-coffee",
        "name": "coffee"
      },
      {
        "icon": "fas fa-cog",
        "name": "cog"
      },
      {
        "icon": "fas fa-cogs",
        "name": "cogs"
      },
      {
        "icon": "fas fa-coins",
        "name": "coins"
      },
      {
        "icon": "fas fa-columns",
        "name": "columns"
      },
      {
        "icon": "fas fa-comment",
        "name": "comment"
      },
      {
        "icon": "far fa-comment",
        "name": "comment"
      },
      {
        "icon": "fas fa-comment-alt",
        "name": "comment-alt"
      },
      {
        "icon": "far fa-comment-alt",
        "name": "comment-alt"
      },
      {
        "icon": "fas fa-comment-dollar",
        "name": "comment-dollar"
      },
      {
        "icon": "fas fa-comment-dots",
        "name": "comment-dots"
      },
      {
        "icon": "far fa-comment-dots",
        "name": "comment-dots"
      },
      {
        "icon": "fas fa-comment-medical",
        "name": "comment-medical"
      },
      {
        "icon": "fas fa-comment-slash",
        "name": "comment-slash"
      },
      {
        "icon": "fas fa-comments",
        "name": "comments"
      },
      {
        "icon": "far fa-comments",
        "name": "comments"
      },
      {
        "icon": "fas fa-comments-dollar",
        "name": "comments-dollar"
      },
      {
        "icon": "fas fa-compact-disc",
        "name": "compact-disc"
      },
      {
        "icon": "fas fa-compass",
        "name": "compass"
      },
      {
        "icon": "far fa-compass",
        "name": "compass"
      },
      {
        "icon": "fas fa-compress",
        "name": "compress"
      },
      {
        "icon": "fas fa-compress-alt",
        "name": "compress-alt"
      },
      {
        "icon": "fas fa-compress-arrows-alt",
        "name": "compress-arrows-alt"
      },
      {
        "icon": "fas fa-concierge-bell",
        "name": "concierge-bell"
      },
      {
        "icon": "fab fa-confluence",
        "name": "confluence"
      },
      {
        "icon": "fab fa-connectdevelop",
        "name": "connectdevelop"
      },
      {
        "icon": "fab fa-contao",
        "name": "contao"
      },
      {
        "icon": "fas fa-cookie",
        "name": "cookie"
      },
      {
        "icon": "fas fa-cookie-bite",
        "name": "cookie-bite"
      },
      {
        "icon": "fas fa-copy",
        "name": "copy"
      },
      {
        "icon": "afar fa-copy",
        "name": "afar fa-copy"
      },
      {
        "icon": "fas fa-copyright",
        "name": "copyright"
      },
      {
        "icon": "far fa-copyright",
        "name": "copyright"
      },
      {
        "icon": "fab fa-cotton-bureau",
        "name": "cotton-bureau"
      },
      {
        "icon": "fas fa-couch",
        "name": "couch"
      },
      {
        "icon": "fab fa-cpanel",
        "name": "cpanel"
      },
      {
        "icon": "fab fa-creative-commons",
        "name": "creative-commons"
      },
      {
        "icon": "fab fa-creative-commons-by",
        "name": "creative-commons-by"
      },
      {
        "icon": "fab fa-creative-commons-nc",
        "name": "creative-commons-nc"
      },
      {
        "icon": "fab fa-creative-commons-nc-eu",
        "name": "creative-commons-nc-eu"
      },
      {
        "icon": "fab fa-creative-commons-nc-jp",
        "name": "creative-commons-nc-jp"
      },
      {
        "icon": "fab fa-creative-commons-nd",
        "name": "creative-commons-nd"
      },
      {
        "icon": "fab fa-creative-commons-pd",
        "name": "creative-commons-pd"
      },
      {
        "icon": "fab fa-creative-commons-pd-alt",
        "name": "creative-commons-pd-alt"
      },
      {
        "icon": "fab fa-creative-commons-remix",
        "name": "creative-commons-remix"
      },
      {
        "icon": "fab fa-creative-commons-sa",
        "name": "creative-commons-sa"
      },
      {
        "icon": "fab fa-creative-commons-sampling",
        "name": "creative-commons-sampling"
      },
      {
        "icon": "fab fa-creative-commons-sampling-plus",
        "name": "creative-commons-sampling-plus"
      },
      {
        "icon": "fab fa-creative-commons-share",
        "name": "creative-commons-share"
      },
      {
        "icon": "fab fa-creative-commons-zero",
        "name": "creative-commons-zero"
      },
      {
        "icon": "fas fa-credit-card",
        "name": "credit-card"
      },
      {
        "icon": "far fa-credit-card",
        "name": "credit-card"
      },
      {
        "icon": "fab fa-critical-role",
        "name": "critical-role"
      },
      {
        "icon": "fas fa-crop",
        "name": "crop"
      },
      {
        "icon": "fas fa-crop-alt",
        "name": "crop-alt"
      },
      {
        "icon": "fas fa-cross",
        "name": "cross"
      },
      {
        "icon": "fas fa-crosshairs",
        "name": "crosshairs"
      },
      {
        "icon": "fas fa-crow",
        "name": "crow"
      },
      {
        "icon": "fas fa-crown",
        "name": "crown"
      },
      {
        "icon": "fas fa-crutch",
        "name": "crutch"
      },
      {
        "icon": "fab fa-css3",
        "name": "css3"
      },
      {
        "icon": "fab fa-css3-alt",
        "name": "css3-alt"
      },
      {
        "icon": "fas fa-cube",
        "name": "cube"
      },
      {
        "icon": "fas fa-cubes",
        "name": "cubes"
      },
      {
        "icon": "fas fa-cut",
        "name": "cut"
      },
      {
        "icon": "fab fa-cuttlefish",
        "name": "cuttlefish"
      },
      {
        "icon": "fab fa-d-and-d",
        "name": "d-and-d"
      },
      {
        "icon": "fab fa-d-and-d-beyond",
        "name": "d-and-d-beyond"
      },
      {
        "icon": "fab fa-dailymotion",
        "name": "dailymotion"
      },
      {
        "icon": "fab fa-dashcube",
        "name": "dashcube"
      },
      {
        "icon": "fas fa-database",
        "name": "database"
      },
      {
        "icon": "fas fa-deaf",
        "name": "deaf"
      },
      {
        "icon": "fab fa-deezer",
        "name": "deezer"
      },
      {
        "icon": "fab fa-delicious",
        "name": "delicious"
      },
      {
        "icon": "fas fa-democrat",
        "name": "democrat"
      },
      {
        "icon": "fab fa-deploydog",
        "name": "deploydog"
      },
      {
        "icon": "fab fa-deskpro",
        "name": "deskpro"
      },
      {
        "icon": "fas fa-desktop",
        "name": "desktop"
      },
      {
        "icon": "fab fa-dev",
        "name": "dev"
      },
      {
        "icon": "fab fa-deviantart",
        "name": "deviantart"
      },
      {
        "icon": "fas fa-dharmachakra",
        "name": "dharmachakra"
      },
      {
        "icon": "fab fa-dhl",
        "name": "dhl"
      },
      {
        "icon": "fas fa-diagnoses",
        "name": "diagnoses"
      },
      {
        "icon": "fab fa-diaspora",
        "name": "diaspora"
      },
      {
        "icon": "fas fa-dice",
        "name": "dice"
      },
      {
        "icon": "fas fa-dice-d20",
        "name": "dice-d20"
      },
      {
        "icon": "fas fa-dice-d6",
        "name": "dice-d6"
      },
      {
        "icon": "fas fa-dice-five",
        "name": "dice-five"
      },
      {
        "icon": "fas fa-dice-four",
        "name": "dice-four"
      },
      {
        "icon": "fas fa-dice-one",
        "name": "dice-one"
      },
      {
        "icon": "fas fa-dice-six",
        "name": "dice-six"
      },
      {
        "icon": "fas fa-dice-three",
        "name": "dice-three"
      },
      {
        "icon": "fas fa-dice-two",
        "name": "dice-two"
      },
      {
        "icon": "fab fa-digg",
        "name": "digg"
      },
      {
        "icon": "fab fa-digital-ocean",
        "name": "digital-ocean"
      },
      {
        "icon": "fas fa-digital-tachograph",
        "name": "digital-tachograph"
      },
      {
        "icon": "fas fa-directions",
        "name": "directions"
      },
      {
        "icon": "fab fa-discord",
        "name": "discord"
      },
      {
        "icon": "fab fa-discourse",
        "name": "discourse"
      },
      {
        "icon": "fas fa-disease",
        "name": "disease"
      },
      {
        "icon": "fas fa-divide",
        "name": "divide"
      },
      {
        "icon": "fas fa-dizzy",
        "name": "dizzy"
      },
      {
        "icon": "far fa-dizzy",
        "name": "dizzy"
      },
      {
        "icon": "fas fa-dna",
        "name": "dna"
      },
      {
        "icon": "fab fa-dochub",
        "name": "dochub"
      },
      {
        "icon": "fab fa-docker",
        "name": "docker"
      },
      {
        "icon": "fas fa-dog",
        "name": "dog"
      },
      {
        "icon": "fas fa-dollar-sign",
        "name": "dollar-sign"
      },
      {
        "icon": "fas fa-dolly",
        "name": "dolly"
      },
      {
        "icon": "fas fa-dolly-flatbed",
        "name": "dolly-flatbed"
      },
      {
        "icon": "fas fa-donate",
        "name": "donate"
      },
      {
        "icon": "fas fa-door-closed",
        "name": "door-closed"
      },
      {
        "icon": "fas fa-door-open",
        "name": "door-open"
      },
      {
        "icon": "fas fa-dot-circle",
        "name": "dot-circle"
      },
      {
        "icon": "far fa-dot-circle",
        "name": "dot-circle"
      },
      {
        "icon": "fas fa-dove",
        "name": "dove"
      },
      {
        "icon": "fas fa-download",
        "name": "download"
      },
      {
        "icon": "fab fa-draft2digital",
        "name": "draft2digital"
      },
      {
        "icon": "fas fa-drafting-compass",
        "name": "drafting-compass"
      },
      {
        "icon": "fas fa-dragon",
        "name": "dragon"
      },
      {
        "icon": "fas fa-draw-polygon",
        "name": "draw-polygon"
      },
      {
        "icon": "fab fa-dribbble",
        "name": "dribbble"
      },
      {
        "icon": "fab fa-dribbble-square",
        "name": "dribbble-square"
      },
      {
        "icon": "fab fa-dropbox",
        "name": "dropbox"
      },
      {
        "icon": "fas fa-drum",
        "name": "drum"
      },
      {
        "icon": "fas fa-drum-steelpan",
        "name": "drum-steelpan"
      },
      {
        "icon": "fas fa-drumstick-bite",
        "name": "drumstick-bite"
      },
      {
        "icon": "fab fa-drupal",
        "name": "drupal"
      },
      {
        "icon": "fas fa-dumbbell",
        "name": "dumbbell"
      },
      {
        "icon": "fas fa-dumpster",
        "name": "dumpster"
      },
      {
        "icon": "fas fa-dumpster-fire",
        "name": "dumpster-fire"
      },
      {
        "icon": "fas fa-dungeon",
        "name": "dungeon"
      },
      {
        "icon": "fab fa-dyalog",
        "name": "dyalog"
      },
      {
        "icon": "fab fa-earlybirds",
        "name": "earlybirds"
      },
      {
        "icon": "fab fa-ebay",
        "name": "ebay"
      },
      {
        "icon": "fab fa-edge",
        "name": "edge"
      },
      {
        "icon": "fab fa-edge-legacy",
        "name": "edge-legacy"
      },
      {
        "icon": "fas fa-edit",
        "name": "edit"
      },
      {
        "icon": "afar fa-edit",
        "name": "afar fa-edit"
      },
      {
        "icon": "fas fa-egg",
        "name": "egg"
      },
      {
        "icon": "fas fa-eject",
        "name": "eject"
      },
      {
        "icon": "fab fa-elementor",
        "name": "elementor"
      },
      {
        "icon": "fas fa-ellipsis-h",
        "name": "ellipsis-h"
      },
      {
        "icon": "fas fa-ellipsis-v",
        "name": "ellipsis-v"
      },
      {
        "icon": "fab fa-ello",
        "name": "ello"
      },
      {
        "icon": "fab fa-ember",
        "name": "ember"
      },
      {
        "icon": "fab fa-empire",
        "name": "empire"
      },
      {
        "icon": "fas fa-envelope",
        "name": "envelope"
      },
      {
        "icon": "far fa-envelope",
        "name": "envelope"
      },
      {
        "icon": "fas fa-envelope-open",
        "name": "envelope-open"
      },
      {
        "icon": "far fa-envelope-open",
        "name": "envelope-open"
      },
      {
        "icon": "fas fa-envelope-open-text",
        "name": "envelope-open-text"
      },
      {
        "icon": "fas fa-envelope-square",
        "name": "envelope-square"
      },
      {
        "icon": "fab fa-envira",
        "name": "envira"
      },
      {
        "icon": "fas fa-equals",
        "name": "equals"
      },
      {
        "icon": "fas fa-eraser",
        "name": "eraser"
      },
      {
        "icon": "fab fa-erlang",
        "name": "erlang"
      },
      {
        "icon": "fab fa-ethereum",
        "name": "ethereum"
      },
      {
        "icon": "fas fa-ethernet",
        "name": "ethernet"
      },
      {
        "icon": "fab fa-etsy",
        "name": "etsy"
      },
      {
        "icon": "fas fa-euro-sign",
        "name": "euro-sign"
      },
      {
        "icon": "fab fa-evernote",
        "name": "evernote"
      },
      {
        "icon": "fas fa-exchange-alt",
        "name": "exchange-alt"
      },
      {
        "icon": "fas fa-exclamation",
        "name": "exclamation"
      },
      {
        "icon": "fas fa-exclamation-circle",
        "name": "exclamation-circle"
      },
      {
        "icon": "fas fa-exclamation-triangle",
        "name": "exclamation-triangle"
      },
      {
        "icon": "afas fa-expand",
        "name": "afas fa-expand"
      },
      {
        "icon": "fas fa-expand-alt",
        "name": "expand-alt"
      },
      {
        "icon": "fas fa-expand-arrows-alt",
        "name": "expand-arrows-alt"
      },
      {
        "icon": "fab fa-expeditedssl",
        "name": "expeditedssl"
      },
      {
        "icon": "fas fa-external-link-alt",
        "name": "external-link-alt"
      },
      {
        "icon": "fas fa-external-link-square-alt",
        "name": "external-link-square-alt"
      },
      {
        "icon": "fas fa-eye",
        "name": "eye"
      },
      {
        "icon": "far fa-eye",
        "name": "eye"
      },
      {
        "icon": "fas fa-eye-dropper",
        "name": "eye-dropper"
      },
      {
        "icon": "fas fa-eye-slash",
        "name": "eye-slash"
      },
      {
        "icon": "far fa-eye-slash",
        "name": "eye-slash"
      },
      {
        "icon": "fab fa-facebook",
        "name": "facebook"
      },
      {
        "icon": "fab fa-facebook-f",
        "name": "facebook-f"
      },
      {
        "icon": "fab fa-facebook-messenger",
        "name": "facebook-messenger"
      },
      {
        "icon": "fab fa-facebook-square",
        "name": "facebook-square"
      },
      {
        "icon": "fas fa-fan",
        "name": "fan"
      },
      {
        "icon": "fab fa-fantasy-flight-games",
        "name": "fantasy-flight-games"
      },
      {
        "icon": "fas fa-fast-backward",
        "name": "fast-backward"
      },
      {
        "icon": "fas fa-fast-forward",
        "name": "fast-forward"
      },
      {
        "icon": "fas fa-faucet",
        "name": "faucet"
      },
      {
        "icon": "fas fa-fax",
        "name": "fax"
      },
      {
        "icon": "fas fa-feather",
        "name": "feather"
      },
      {
        "icon": "fas fa-feather-alt",
        "name": "feather-alt"
      },
      {
        "icon": "fab fa-fedex",
        "name": "fedex"
      },
      {
        "icon": "fab fa-fedora",
        "name": "fedora"
      },
      {
        "icon": "fas fa-female",
        "name": "female"
      },
      {
        "icon": "fas fa-fighter-jet",
        "name": "fighter-jet"
      },
      {
        "icon": "fab fa-figma",
        "name": "figma"
      },
      {
        "icon": "fas fa-file",
        "name": "file"
      },
      {
        "icon": "afar fa-file",
        "name": "afar fa-file"
      },
      {
        "icon": "fas fa-file-alt",
        "name": "file-alt"
      },
      {
        "icon": "far fa-file-alt",
        "name": "file-alt"
      },
      {
        "icon": "fas fa-file-archive",
        "name": "file-archive"
      },
      {
        "icon": "far fa-file-archive",
        "name": "file-archive"
      },
      {
        "icon": "fas fa-file-audio",
        "name": "file-audio"
      },
      {
        "icon": "far fa-file-audio",
        "name": "file-audio"
      },
      {
        "icon": "fas fa-file-code",
        "name": "file-code"
      },
      {
        "icon": "far fa-file-code",
        "name": "file-code"
      },
      {
        "icon": "fas fa-file-contract",
        "name": "file-contract"
      },
      {
        "icon": "fas fa-file-csv",
        "name": "file-csv"
      },
      {
        "icon": "fas fa-file-download",
        "name": "file-download"
      },
      {
        "icon": "fas fa-file-excel",
        "name": "file-excel"
      },
      {
        "icon": "far fa-file-excel",
        "name": "file-excel"
      },
      {
        "icon": "fas fa-file-export",
        "name": "file-export"
      },
      {
        "icon": "fas fa-file-image",
        "name": "file-image"
      },
      {
        "icon": "far fa-file-image",
        "name": "file-image"
      },
      {
        "icon": "fas fa-file-import",
        "name": "file-import"
      },
      {
        "icon": "fas fa-file-invoice",
        "name": "file-invoice"
      },
      {
        "icon": "fas fa-file-invoice-dollar",
        "name": "file-invoice-dollar"
      },
      {
        "icon": "fas fa-file-medical",
        "name": "file-medical"
      },
      {
        "icon": "fas fa-file-medical-alt",
        "name": "file-medical-alt"
      },
      {
        "icon": "fas fa-file-pdf",
        "name": "file-pdf"
      },
      {
        "icon": "far fa-file-pdf",
        "name": "file-pdf"
      },
      {
        "icon": "fas fa-file-powerpoint",
        "name": "file-powerpoint"
      },
      {
        "icon": "far fa-file-powerpoint",
        "name": "file-powerpoint"
      },
      {
        "icon": "fas fa-file-prescription",
        "name": "file-prescription"
      },
      {
        "icon": "fas fa-file-signature",
        "name": "file-signature"
      },
      {
        "icon": "fas fa-file-upload",
        "name": "file-upload"
      },
      {
        "icon": "fas fa-file-video",
        "name": "file-video"
      },
      {
        "icon": "far fa-file-video",
        "name": "file-video"
      },
      {
        "icon": "fas fa-file-word",
        "name": "file-word"
      },
      {
        "icon": "far fa-file-word",
        "name": "file-word"
      },
      {
        "icon": "fas fa-fill",
        "name": "fill"
      },
      {
        "icon": "fas fa-fill-drip",
        "name": "fill-drip"
      },
      {
        "icon": "fas fa-film",
        "name": "film"
      },
      {
        "icon": "afas fa-filter",
        "name": "afas fa-filter"
      },
      {
        "icon": "fas fa-fingerprint",
        "name": "fingerprint"
      },
      {
        "icon": "fas fa-fire",
        "name": "fire"
      },
      {
        "icon": "fas fa-fire-alt",
        "name": "fire-alt"
      },
      {
        "icon": "fas fa-fire-extinguisher",
        "name": "fire-extinguisher"
      },
      {
        "icon": "fab fa-firefox",
        "name": "firefox"
      },
      {
        "icon": "fab fa-firefox-browser",
        "name": "firefox-browser"
      },
      {
        "icon": "fas fa-first-aid",
        "name": "first-aid"
      },
      {
        "icon": "fab fa-first-order",
        "name": "first-order"
      },
      {
        "icon": "fab fa-first-order-alt",
        "name": "first-order-alt"
      },
      {
        "icon": "fab fa-firstdraft",
        "name": "firstdraft"
      },
      {
        "icon": "fas fa-fish",
        "name": "fish"
      },
      {
        "icon": "fas fa-fist-raised",
        "name": "fist-raised"
      },
      {
        "icon": "fas fa-flag",
        "name": "flag"
      },
      {
        "icon": "afar fa-flag",
        "name": "afar fa-flag"
      },
      {
        "icon": "fas fa-flag-checkered",
        "name": "flag-checkered"
      },
      {
        "icon": "fas fa-flag-usa",
        "name": "flag-usa"
      },
      {
        "icon": "fas fa-flask",
        "name": "flask"
      },
      {
        "icon": "fab fa-flickr",
        "name": "flickr"
      },
      {
        "icon": "fab fa-flipboard",
        "name": "flipboard"
      },
      {
        "icon": "fas fa-flushed",
        "name": "flushed"
      },
      {
        "icon": "far fa-flushed",
        "name": "flushed"
      },
      {
        "icon": "fab fa-fly",
        "name": "fly"
      },
      {
        "icon": "afas fa-folder",
        "name": "afas fa-folder"
      },
      {
        "icon": "far fa-folder",
        "name": "folder"
      },
      {
        "icon": "fas fa-folder-minus",
        "name": "folder-minus"
      },
      {
        "icon": "fas fa-folder-open",
        "name": "folder-open"
      },
      {
        "icon": "far fa-folder-open",
        "name": "folder-open"
      },
      {
        "icon": "fas fa-folder-plus",
        "name": "folder-plus"
      },
      {
        "icon": "fas fa-font",
        "name": "font"
      },
      {
        "icon": "fab fa-font-awesome",
        "name": "font-awesome"
      },
      {
        "icon": "fab fa-font-awesome-alt",
        "name": "font-awesome-alt"
      },
      {
        "icon": "fab fa-font-awesome-flag",
        "name": "font-awesome-flag"
      },
      {
        "icon": "fab fa-fonticons",
        "name": "fonticons"
      },
      {
        "icon": "fab fa-fonticons-fi",
        "name": "fonticons-fi"
      },
      {
        "icon": "fas fa-football-ball",
        "name": "football-ball"
      },
      {
        "icon": "fab fa-fort-awesome",
        "name": "fort-awesome"
      },
      {
        "icon": "fab fa-fort-awesome-alt",
        "name": "fort-awesome-alt"
      },
      {
        "icon": "fab fa-forumbee",
        "name": "forumbee"
      },
      {
        "icon": "fas fa-forward",
        "name": "forward"
      },
      {
        "icon": "fab fa-foursquare",
        "name": "foursquare"
      },
      {
        "icon": "fab fa-free-code-camp",
        "name": "free-code-camp"
      },
      {
        "icon": "fab fa-freebsd",
        "name": "freebsd"
      },
      {
        "icon": "fas fa-frog",
        "name": "frog"
      },
      {
        "icon": "fas fa-frown",
        "name": "frown"
      },
      {
        "icon": "far fa-frown",
        "name": "frown"
      },
      {
        "icon": "fas fa-frown-open",
        "name": "frown-open"
      },
      {
        "icon": "far fa-frown-open",
        "name": "frown-open"
      },
      {
        "icon": "fab fa-fulcrum",
        "name": "fulcrum"
      },
      {
        "icon": "fas fa-funnel-dollar",
        "name": "funnel-dollar"
      },
      {
        "icon": "fas fa-futbol",
        "name": "futbol"
      },
      {
        "icon": "far fa-futbol",
        "name": "futbol"
      },
      {
        "icon": "fab fa-galactic-republic",
        "name": "galactic-republic"
      },
      {
        "icon": "fab fa-galactic-senate",
        "name": "galactic-senate"
      },
      {
        "icon": "fas fa-gamepad",
        "name": "gamepad"
      },
      {
        "icon": "fas fa-gas-pump",
        "name": "gas-pump"
      },
      {
        "icon": "fas fa-gavel",
        "name": "gavel"
      },
      {
        "icon": "fas fa-gem",
        "name": "gem"
      },
      {
        "icon": "far fa-gem",
        "name": "gem"
      },
      {
        "icon": "fas fa-genderless",
        "name": "genderless"
      },
      {
        "icon": "fab fa-get-pocket",
        "name": "get-pocket"
      },
      {
        "icon": "fab fa-gg",
        "name": "gg"
      },
      {
        "icon": "fab fa-gg-circle",
        "name": "gg-circle"
      },
      {
        "icon": "fas fa-ghost",
        "name": "ghost"
      },
      {
        "icon": "fas fa-gift",
        "name": "gift"
      },
      {
        "icon": "fas fa-gifts",
        "name": "gifts"
      },
      {
        "icon": "fab fa-git",
        "name": "git"
      },
      {
        "icon": "fab fa-git-alt",
        "name": "git-alt"
      },
      {
        "icon": "fab fa-git-square",
        "name": "git-square"
      },
      {
        "icon": "fab fa-github",
        "name": "github"
      },
      {
        "icon": "fab fa-github-alt",
        "name": "github-alt"
      },
      {
        "icon": "fab fa-github-square",
        "name": "github-square"
      },
      {
        "icon": "fab fa-gitkraken",
        "name": "gitkraken"
      },
      {
        "icon": "fab fa-gitlab",
        "name": "gitlab"
      },
      {
        "icon": "fab fa-gitter",
        "name": "gitter"
      },
      {
        "icon": "fas fa-glass-cheers",
        "name": "glass-cheers"
      },
      {
        "icon": "fas fa-glass-martini",
        "name": "glass-martini"
      },
      {
        "icon": "fas fa-glass-martini-alt",
        "name": "glass-martini-alt"
      },
      {
        "icon": "fas fa-glass-whiskey",
        "name": "glass-whiskey"
      },
      {
        "icon": "fas fa-glasses",
        "name": "glasses"
      },
      {
        "icon": "fab fa-glide",
        "name": "glide"
      },
      {
        "icon": "fab fa-glide-g",
        "name": "glide-g"
      },
      {
        "icon": "fas fa-globe",
        "name": "globe"
      },
      {
        "icon": "fas fa-globe-africa",
        "name": "globe-africa"
      },
      {
        "icon": "fas fa-globe-americas",
        "name": "globe-americas"
      },
      {
        "icon": "fas fa-globe-asia",
        "name": "globe-asia"
      },
      {
        "icon": "fas fa-globe-europe",
        "name": "globe-europe"
      },
      {
        "icon": "fab fa-gofore",
        "name": "gofore"
      },
      {
        "icon": "fas fa-golf-ball",
        "name": "golf-ball"
      },
      {
        "icon": "fab fa-goodreads",
        "name": "goodreads"
      },
      {
        "icon": "fab fa-goodreads-g",
        "name": "goodreads-g"
      },
      {
        "icon": "fab fa-google",
        "name": "google"
      },
      {
        "icon": "fab fa-google-drive",
        "name": "google-drive"
      },
      {
        "icon": "fab fa-google-pay",
        "name": "google-pay"
      },
      {
        "icon": "fab fa-google-play",
        "name": "google-play"
      },
      {
        "icon": "fab fa-google-plus",
        "name": "google-plus"
      },
      {
        "icon": "fab fa-google-plus-g",
        "name": "google-plus-g"
      },
      {
        "icon": "fab fa-google-plus-square",
        "name": "google-plus-square"
      },
      {
        "icon": "fab fa-google-wallet",
        "name": "google-wallet"
      },
      {
        "icon": "fas fa-gopuram",
        "name": "gopuram"
      },
      {
        "icon": "fas fa-graduation-cap",
        "name": "graduation-cap"
      },
      {
        "icon": "fab fa-gratipay",
        "name": "gratipay"
      },
      {
        "icon": "fab fa-grav",
        "name": "grav"
      },
      {
        "icon": "fas fa-greater-than",
        "name": "greater-than"
      },
      {
        "icon": "fas fa-greater-than-equal",
        "name": "greater-than-equal"
      },
      {
        "icon": "fas fa-grimace",
        "name": "grimace"
      },
      {
        "icon": "far fa-grimace",
        "name": "grimace"
      },
      {
        "icon": "fas fa-grin",
        "name": "grin"
      },
      {
        "icon": "afar fa-grin",
        "name": "afar fa-grin"
      },
      {
        "icon": "fas fa-grin-alt",
        "name": "grin-alt"
      },
      {
        "icon": "far fa-grin-alt",
        "name": "grin-alt"
      },
      {
        "icon": "fas fa-grin-beam",
        "name": "grin-beam"
      },
      {
        "icon": "far fa-grin-beam",
        "name": "grin-beam"
      },
      {
        "icon": "fas fa-grin-beam-sweat",
        "name": "grin-beam-sweat"
      },
      {
        "icon": "far fa-grin-beam-sweat",
        "name": "grin-beam-sweat"
      },
      {
        "icon": "fas fa-grin-hearts",
        "name": "grin-hearts"
      },
      {
        "icon": "far fa-grin-hearts",
        "name": "grin-hearts"
      },
      {
        "icon": "fas fa-grin-squint",
        "name": "grin-squint"
      },
      {
        "icon": "far fa-grin-squint",
        "name": "grin-squint"
      },
      {
        "icon": "fas fa-grin-squint-tears",
        "name": "grin-squint-tears"
      },
      {
        "icon": "far fa-grin-squint-tears",
        "name": "grin-squint-tears"
      },
      {
        "icon": "fas fa-grin-stars",
        "name": "grin-stars"
      },
      {
        "icon": "far fa-grin-stars",
        "name": "grin-stars"
      },
      {
        "icon": "fas fa-grin-tears",
        "name": "grin-tears"
      },
      {
        "icon": "far fa-grin-tears",
        "name": "grin-tears"
      },
      {
        "icon": "fas fa-grin-tongue",
        "name": "grin-tongue"
      },
      {
        "icon": "far fa-grin-tongue",
        "name": "grin-tongue"
      },
      {
        "icon": "fas fa-grin-tongue-squint",
        "name": "grin-tongue-squint"
      },
      {
        "icon": "far fa-grin-tongue-squint",
        "name": "grin-tongue-squint"
      },
      {
        "icon": "fas fa-grin-tongue-wink",
        "name": "grin-tongue-wink"
      },
      {
        "icon": "far fa-grin-tongue-wink",
        "name": "grin-tongue-wink"
      },
      {
        "icon": "fas fa-grin-wink",
        "name": "grin-wink"
      },
      {
        "icon": "far fa-grin-wink",
        "name": "grin-wink"
      },
      {
        "icon": "fas fa-grip-horizontal",
        "name": "grip-horizontal"
      },
      {
        "icon": "fas fa-grip-lines",
        "name": "grip-lines"
      },
      {
        "icon": "fas fa-grip-lines-vertical",
        "name": "grip-lines-vertical"
      },
      {
        "icon": "fas fa-grip-vertical",
        "name": "grip-vertical"
      },
      {
        "icon": "fab fa-gripfire",
        "name": "gripfire"
      },
      {
        "icon": "fab fa-grunt",
        "name": "grunt"
      },
      {
        "icon": "fab fa-guilded",
        "name": "guilded"
      },
      {
        "icon": "fas fa-guitar",
        "name": "guitar"
      },
      {
        "icon": "fab fa-gulp",
        "name": "gulp"
      },
      {
        "icon": "fas fa-h-square",
        "name": "h-square"
      },
      {
        "icon": "fab fa-hacker-news",
        "name": "hacker-news"
      },
      {
        "icon": "fab fa-hacker-news-square",
        "name": "hacker-news-square"
      },
      {
        "icon": "fab fa-hackerrank",
        "name": "hackerrank"
      },
      {
        "icon": "fas fa-hamburger",
        "name": "hamburger"
      },
      {
        "icon": "fas fa-hammer",
        "name": "hammer"
      },
      {
        "icon": "fas fa-hamsa",
        "name": "hamsa"
      },
      {
        "icon": "fas fa-hand-holding",
        "name": "hand-holding"
      },
      {
        "icon": "fas fa-hand-holding-heart",
        "name": "hand-holding-heart"
      },
      {
        "icon": "fas fa-hand-holding-medical",
        "name": "hand-holding-medical"
      },
      {
        "icon": "fas fa-hand-holding-usd",
        "name": "hand-holding-usd"
      },
      {
        "icon": "fas fa-hand-holding-water",
        "name": "hand-holding-water"
      },
      {
        "icon": "fas fa-hand-lizard",
        "name": "hand-lizard"
      },
      {
        "icon": "far fa-hand-lizard",
        "name": "hand-lizard"
      },
      {
        "icon": "fas fa-hand-middle-finger",
        "name": "hand-middle-finger"
      },
      {
        "icon": "fas fa-hand-paper",
        "name": "hand-paper"
      },
      {
        "icon": "far fa-hand-paper",
        "name": "hand-paper"
      },
      {
        "icon": "fas fa-hand-peace",
        "name": "hand-peace"
      },
      {
        "icon": "far fa-hand-peace",
        "name": "hand-peace"
      },
      {
        "icon": "fas fa-hand-point-down",
        "name": "hand-point-down"
      },
      {
        "icon": "far fa-hand-point-down",
        "name": "hand-point-down"
      },
      {
        "icon": "fas fa-hand-point-left",
        "name": "hand-point-left"
      },
      {
        "icon": "far fa-hand-point-left",
        "name": "hand-point-left"
      },
      {
        "icon": "fas fa-hand-point-right",
        "name": "hand-point-right"
      },
      {
        "icon": "far fa-hand-point-right",
        "name": "hand-point-right"
      },
      {
        "icon": "fas fa-hand-point-up",
        "name": "hand-point-up"
      },
      {
        "icon": "far fa-hand-point-up",
        "name": "hand-point-up"
      },
      {
        "icon": "fas fa-hand-pointer",
        "name": "hand-pointer"
      },
      {
        "icon": "far fa-hand-pointer",
        "name": "hand-pointer"
      },
      {
        "icon": "fas fa-hand-rock",
        "name": "hand-rock"
      },
      {
        "icon": "far fa-hand-rock",
        "name": "hand-rock"
      },
      {
        "icon": "fas fa-hand-scissors",
        "name": "hand-scissors"
      },
      {
        "icon": "far fa-hand-scissors",
        "name": "hand-scissors"
      },
      {
        "icon": "fas fa-hand-sparkles",
        "name": "hand-sparkles"
      },
      {
        "icon": "fas fa-hand-spock",
        "name": "hand-spock"
      },
      {
        "icon": "far fa-hand-spock",
        "name": "hand-spock"
      },
      {
        "icon": "fas fa-hands",
        "name": "hands"
      },
      {
        "icon": "fas fa-hands-helping",
        "name": "hands-helping"
      },
      {
        "icon": "fas fa-hands-wash",
        "name": "hands-wash"
      },
      {
        "icon": "fas fa-handshake",
        "name": "handshake"
      },
      {
        "icon": "far fa-handshake",
        "name": "handshake"
      },
      {
        "icon": "fas fa-handshake-alt-slash",
        "name": "handshake-alt-slash"
      },
      {
        "icon": "fas fa-handshake-slash",
        "name": "handshake-slash"
      },
      {
        "icon": "fas fa-hanukiah",
        "name": "hanukiah"
      },
      {
        "icon": "fas fa-hard-hat",
        "name": "hard-hat"
      },
      {
        "icon": "fas fa-hashtag",
        "name": "hashtag"
      },
      {
        "icon": "fas fa-hat-cowboy",
        "name": "hat-cowboy"
      },
      {
        "icon": "fas fa-hat-cowboy-side",
        "name": "hat-cowboy-side"
      },
      {
        "icon": "fas fa-hat-wizard",
        "name": "hat-wizard"
      },
      {
        "icon": "fas fa-hdd",
        "name": "hdd"
      },
      {
        "icon": "far fa-hdd",
        "name": "hdd"
      },
      {
        "icon": "fas fa-head-side-cough",
        "name": "head-side-cough"
      },
      {
        "icon": "fas fa-head-side-cough-slash",
        "name": "head-side-cough-slash"
      },
      {
        "icon": "fas fa-head-side-mask",
        "name": "head-side-mask"
      },
      {
        "icon": "fas fa-head-side-virus",
        "name": "head-side-virus"
      },
      {
        "icon": "fas fa-heading",
        "name": "heading"
      },
      {
        "icon": "fas fa-headphones",
        "name": "headphones"
      },
      {
        "icon": "fas fa-headphones-alt",
        "name": "headphones-alt"
      },
      {
        "icon": "fas fa-headset",
        "name": "headset"
      },
      {
        "icon": "fas fa-heart",
        "name": "heart"
      },
      {
        "icon": "far fa-heart",
        "name": "heart"
      },
      {
        "icon": "fas fa-heart-broken",
        "name": "heart-broken"
      },
      {
        "icon": "fas fa-heartbeat",
        "name": "heartbeat"
      },
      {
        "icon": "fas fa-helicopter",
        "name": "helicopter"
      },
      {
        "icon": "fas fa-highlighter",
        "name": "highlighter"
      },
      {
        "icon": "fas fa-hiking",
        "name": "hiking"
      },
      {
        "icon": "fas fa-hippo",
        "name": "hippo"
      },
      {
        "icon": "fab fa-hips",
        "name": "hips"
      },
      {
        "icon": "fab fa-hire-a-helper",
        "name": "hire-a-helper"
      },
      {
        "icon": "fas fa-history",
        "name": "history"
      },
      {
        "icon": "fab fa-hive",
        "name": "hive"
      },
      {
        "icon": "fas fa-hockey-puck",
        "name": "hockey-puck"
      },
      {
        "icon": "fas fa-holly-berry",
        "name": "holly-berry"
      },
      {
        "icon": "fas fa-home",
        "name": "home"
      },
      {
        "icon": "afab fa-hooli",
        "name": "afab fa-hooli"
      },
      {
        "icon": "fab fa-hornbill",
        "name": "hornbill"
      },
      {
        "icon": "fas fa-horse",
        "name": "horse"
      },
      {
        "icon": "fas fa-horse-head",
        "name": "horse-head"
      },
      {
        "icon": "fas fa-hospital",
        "name": "hospital"
      },
      {
        "icon": "far fa-hospital",
        "name": "hospital"
      },
      {
        "icon": "fas fa-hospital-alt",
        "name": "hospital-alt"
      },
      {
        "icon": "fas fa-hospital-symbol",
        "name": "hospital-symbol"
      },
      {
        "icon": "fas fa-hospital-user",
        "name": "hospital-user"
      },
      {
        "icon": "fas fa-hot-tub",
        "name": "hot-tub"
      },
      {
        "icon": "fas fa-hotdog",
        "name": "hotdog"
      },
      {
        "icon": "fas fa-hotel",
        "name": "hotel"
      },
      {
        "icon": "fab fa-hotjar",
        "name": "hotjar"
      },
      {
        "icon": "fas fa-hourglass",
        "name": "hourglass"
      },
      {
        "icon": "far fa-hourglass",
        "name": "hourglass"
      },
      {
        "icon": "fas fa-hourglass-end",
        "name": "hourglass-end"
      },
      {
        "icon": "fas fa-hourglass-half",
        "name": "hourglass-half"
      },
      {
        "icon": "fas fa-hourglass-start",
        "name": "hourglass-start"
      },
      {
        "icon": "fas fa-house-damage",
        "name": "house-damage"
      },
      {
        "icon": "fas fa-house-user",
        "name": "house-user"
      },
      {
        "icon": "fab fa-houzz",
        "name": "houzz"
      },
      {
        "icon": "fas fa-hryvnia",
        "name": "hryvnia"
      },
      {
        "icon": "fab fa-html5",
        "name": "html5"
      },
      {
        "icon": "fab fa-hubspot",
        "name": "hubspot"
      },
      {
        "icon": "fas fa-i-cursor",
        "name": "i-cursor"
      },
      {
        "icon": "fas fa-ice-cream",
        "name": "ice-cream"
      },
      {
        "icon": "fas fa-icicles",
        "name": "icicles"
      },
      {
        "icon": "fas fa-icons",
        "name": "icons"
      },
      {
        "icon": "fas fa-id-badge",
        "name": "id-badge"
      },
      {
        "icon": "far fa-id-badge",
        "name": "id-badge"
      },
      {
        "icon": "fas fa-id-card",
        "name": "id-card"
      },
      {
        "icon": "far fa-id-card",
        "name": "id-card"
      },
      {
        "icon": "fas fa-id-card-alt",
        "name": "id-card-alt"
      },
      {
        "icon": "fab fa-ideal",
        "name": "ideal"
      },
      {
        "icon": "fas fa-igloo",
        "name": "igloo"
      },
      {
        "icon": "fas fa-image",
        "name": "image"
      },
      {
        "icon": "far fa-image",
        "name": "image"
      },
      {
        "icon": "fas fa-images",
        "name": "images"
      },
      {
        "icon": "far fa-images",
        "name": "images"
      },
      {
        "icon": "fab fa-imdb",
        "name": "imdb"
      },
      {
        "icon": "fas fa-inbox",
        "name": "inbox"
      },
      {
        "icon": "fas fa-indent",
        "name": "indent"
      },
      {
        "icon": "fas fa-industry",
        "name": "industry"
      },
      {
        "icon": "fas fa-infinity",
        "name": "infinity"
      },
      {
        "icon": "fas fa-info",
        "name": "info"
      },
      {
        "icon": "fas fa-info-circle",
        "name": "info-circle"
      },
      {
        "icon": "fab fa-innosoft",
        "name": "innosoft"
      },
      {
        "icon": "fab fa-instagram",
        "name": "instagram"
      },
      {
        "icon": "fab fa-instagram-square",
        "name": "instagram-square"
      },
      {
        "icon": "fab fa-instalod",
        "name": "instalod"
      },
      {
        "icon": "fab fa-intercom",
        "name": "intercom"
      },
      {
        "icon": "fab fa-internet-explorer",
        "name": "internet-explorer"
      },
      {
        "icon": "fab fa-invision",
        "name": "invision"
      },
      {
        "icon": "fab fa-ioxhost",
        "name": "ioxhost"
      },
      {
        "icon": "fas fa-italic",
        "name": "italic"
      },
      {
        "icon": "fab fa-itch-io",
        "name": "itch-io"
      },
      {
        "icon": "fab fa-itunes",
        "name": "itunes"
      },
      {
        "icon": "fab fa-itunes-note",
        "name": "itunes-note"
      },
      {
        "icon": "fab fa-java",
        "name": "java"
      },
      {
        "icon": "fas fa-jedi",
        "name": "jedi"
      },
      {
        "icon": "fab fa-jedi-order",
        "name": "jedi-order"
      },
      {
        "icon": "fab fa-jenkins",
        "name": "jenkins"
      },
      {
        "icon": "fab fa-jira",
        "name": "jira"
      },
      {
        "icon": "fab fa-joget",
        "name": "joget"
      },
      {
        "icon": "fas fa-joint",
        "name": "joint"
      },
      {
        "icon": "fab fa-joomla",
        "name": "joomla"
      },
      {
        "icon": "fas fa-journal-whills",
        "name": "journal-whills"
      },
      {
        "icon": "fab fa-js",
        "name": "js"
      },
      {
        "icon": "fab fa-js-square",
        "name": "js-square"
      },
      {
        "icon": "fab fa-jsfiddle",
        "name": "jsfiddle"
      },
      {
        "icon": "fas fa-kaaba",
        "name": "kaaba"
      },
      {
        "icon": "fab fa-kaggle",
        "name": "kaggle"
      },
      {
        "icon": "fas fa-key",
        "name": "key"
      },
      {
        "icon": "fab fa-keybase",
        "name": "keybase"
      },
      {
        "icon": "fas fa-keyboard",
        "name": "keyboard"
      },
      {
        "icon": "far fa-keyboard",
        "name": "keyboard"
      },
      {
        "icon": "fab fa-keycdn",
        "name": "keycdn"
      },
      {
        "icon": "fas fa-khanda",
        "name": "khanda"
      },
      {
        "icon": "fab fa-kickstarter",
        "name": "kickstarter"
      },
      {
        "icon": "fab fa-kickstarter-k",
        "name": "kickstarter-k"
      },
      {
        "icon": "fas fa-kiss",
        "name": "kiss"
      },
      {
        "icon": "afar fa-kiss",
        "name": "afar fa-kiss"
      },
      {
        "icon": "fas fa-kiss-beam",
        "name": "kiss-beam"
      },
      {
        "icon": "far fa-kiss-beam",
        "name": "kiss-beam"
      },
      {
        "icon": "fas fa-kiss-wink-heart",
        "name": "kiss-wink-heart"
      },
      {
        "icon": "far fa-kiss-wink-heart",
        "name": "kiss-wink-heart"
      },
      {
        "icon": "fas fa-kiwi-bird",
        "name": "kiwi-bird"
      },
      {
        "icon": "fab fa-korvue",
        "name": "korvue"
      },
      {
        "icon": "fas fa-landmark",
        "name": "landmark"
      },
      {
        "icon": "fas fa-language",
        "name": "language"
      },
      {
        "icon": "fas fa-laptop",
        "name": "laptop"
      },
      {
        "icon": "fas fa-laptop-code",
        "name": "laptop-code"
      },
      {
        "icon": "fas fa-laptop-house",
        "name": "laptop-house"
      },
      {
        "icon": "fas fa-laptop-medical",
        "name": "laptop-medical"
      },
      {
        "icon": "fab fa-laravel",
        "name": "laravel"
      },
      {
        "icon": "fab fa-lastfm",
        "name": "lastfm"
      },
      {
        "icon": "fab fa-lastfm-square",
        "name": "lastfm-square"
      },
      {
        "icon": "fas fa-laugh",
        "name": "laugh"
      },
      {
        "icon": "far fa-laugh",
        "name": "laugh"
      },
      {
        "icon": "fas fa-laugh-beam",
        "name": "laugh-beam"
      },
      {
        "icon": "far fa-laugh-beam",
        "name": "laugh-beam"
      },
      {
        "icon": "fas fa-laugh-squint",
        "name": "laugh-squint"
      },
      {
        "icon": "far fa-laugh-squint",
        "name": "laugh-squint"
      },
      {
        "icon": "fas fa-laugh-wink",
        "name": "laugh-wink"
      },
      {
        "icon": "far fa-laugh-wink",
        "name": "laugh-wink"
      },
      {
        "icon": "fas fa-layer-group",
        "name": "layer-group"
      },
      {
        "icon": "fas fa-leaf",
        "name": "leaf"
      },
      {
        "icon": "fab fa-leanpub",
        "name": "leanpub"
      },
      {
        "icon": "fas fa-lemon",
        "name": "lemon"
      },
      {
        "icon": "far fa-lemon",
        "name": "lemon"
      },
      {
        "icon": "fab fa-less",
        "name": "less"
      },
      {
        "icon": "fas fa-less-than",
        "name": "less-than"
      },
      {
        "icon": "fas fa-less-than-equal",
        "name": "less-than-equal"
      },
      {
        "icon": "fas fa-level-down-alt",
        "name": "level-down-alt"
      },
      {
        "icon": "fas fa-level-up-alt",
        "name": "level-up-alt"
      },
      {
        "icon": "fas fa-life-ring",
        "name": "life-ring"
      },
      {
        "icon": "far fa-life-ring",
        "name": "life-ring"
      },
      {
        "icon": "fas fa-lightbulb",
        "name": "lightbulb"
      },
      {
        "icon": "far fa-lightbulb",
        "name": "lightbulb"
      },
      {
        "icon": "fab fa-line",
        "name": "line"
      },
      {
        "icon": "fas fa-link",
        "name": "link"
      },
      {
        "icon": "fab fa-linkedin",
        "name": "linkedin"
      },
      {
        "icon": "fab fa-linkedin-in",
        "name": "linkedin-in"
      },
      {
        "icon": "fab fa-linode",
        "name": "linode"
      },
      {
        "icon": "fab fa-linux",
        "name": "linux"
      },
      {
        "icon": "fas fa-lira-sign",
        "name": "lira-sign"
      },
      {
        "icon": "fas fa-list",
        "name": "list"
      },
      {
        "icon": "fas fa-list-alt",
        "name": "list-alt"
      },
      {
        "icon": "far fa-list-alt",
        "name": "list-alt"
      },
      {
        "icon": "fas fa-list-ol",
        "name": "list-ol"
      },
      {
        "icon": "fas fa-list-ul",
        "name": "list-ul"
      },
      {
        "icon": "fas fa-location-arrow",
        "name": "location-arrow"
      },
      {
        "icon": "fas fa-lock",
        "name": "lock"
      },
      {
        "icon": "fas fa-lock-open",
        "name": "lock-open"
      },
      {
        "icon": "fas fa-long-arrow-alt-down",
        "name": "long-arrow-alt-down"
      },
      {
        "icon": "fas fa-long-arrow-alt-left",
        "name": "long-arrow-alt-left"
      },
      {
        "icon": "fas fa-long-arrow-alt-right",
        "name": "long-arrow-alt-right"
      },
      {
        "icon": "fas fa-long-arrow-alt-up",
        "name": "long-arrow-alt-up"
      },
      {
        "icon": "fas fa-low-vision",
        "name": "low-vision"
      },
      {
        "icon": "fas fa-luggage-cart",
        "name": "luggage-cart"
      },
      {
        "icon": "fas fa-lungs",
        "name": "lungs"
      },
      {
        "icon": "fas fa-lungs-virus",
        "name": "lungs-virus"
      },
      {
        "icon": "fab fa-lyft",
        "name": "lyft"
      },
      {
        "icon": "fab fa-magento",
        "name": "magento"
      },
      {
        "icon": "fas fa-magic",
        "name": "magic"
      },
      {
        "icon": "fas fa-magnet",
        "name": "magnet"
      },
      {
        "icon": "fas fa-mail-bulk",
        "name": "mail-bulk"
      },
      {
        "icon": "fab fa-mailchimp",
        "name": "mailchimp"
      },
      {
        "icon": "fas fa-male",
        "name": "male"
      },
      {
        "icon": "fab fa-mandalorian",
        "name": "mandalorian"
      },
      {
        "icon": "fas fa-map",
        "name": "map"
      },
      {
        "icon": "far fa-map",
        "name": "map"
      },
      {
        "icon": "fas fa-map-marked",
        "name": "map-marked"
      },
      {
        "icon": "fas fa-map-marked-alt",
        "name": "map-marked-alt"
      },
      {
        "icon": "fas fa-map-marker",
        "name": "map-marker"
      },
      {
        "icon": "fas fa-map-marker-alt",
        "name": "map-marker-alt"
      },
      {
        "icon": "fas fa-map-pin",
        "name": "map-pin"
      },
      {
        "icon": "fas fa-map-signs",
        "name": "map-signs"
      },
      {
        "icon": "fab fa-markdown",
        "name": "markdown"
      },
      {
        "icon": "fas fa-marker",
        "name": "marker"
      },
      {
        "icon": "fas fa-mars",
        "name": "mars"
      },
      {
        "icon": "fas fa-mars-double",
        "name": "mars-double"
      },
      {
        "icon": "fas fa-mars-stroke",
        "name": "mars-stroke"
      },
      {
        "icon": "fas fa-mars-stroke-h",
        "name": "mars-stroke-h"
      },
      {
        "icon": "fas fa-mars-stroke-v",
        "name": "mars-stroke-v"
      },
      {
        "icon": "fas fa-mask",
        "name": "mask"
      },
      {
        "icon": "fab fa-mastodon",
        "name": "mastodon"
      },
      {
        "icon": "fab fa-maxcdn",
        "name": "maxcdn"
      },
      {
        "icon": "fab fa-mdb",
        "name": "mdb"
      },
      {
        "icon": "fas fa-medal",
        "name": "medal"
      },
      {
        "icon": "fab fa-medapps",
        "name": "medapps"
      },
      {
        "icon": "fab fa-medium",
        "name": "medium"
      },
      {
        "icon": "fab fa-medium-m",
        "name": "medium-m"
      },
      {
        "icon": "fas fa-medkit",
        "name": "medkit"
      },
      {
        "icon": "fab fa-medrt",
        "name": "medrt"
      },
      {
        "icon": "fab fa-meetup",
        "name": "meetup"
      },
      {
        "icon": "fab fa-megaport",
        "name": "megaport"
      },
      {
        "icon": "fas fa-meh",
        "name": "meh"
      },
      {
        "icon": "far fa-meh",
        "name": "meh"
      },
      {
        "icon": "fas fa-meh-blank",
        "name": "meh-blank"
      },
      {
        "icon": "far fa-meh-blank",
        "name": "meh-blank"
      },
      {
        "icon": "fas fa-meh-rolling-eyes",
        "name": "meh-rolling-eyes"
      },
      {
        "icon": "far fa-meh-rolling-eyes",
        "name": "meh-rolling-eyes"
      },
      {
        "icon": "fas fa-memory",
        "name": "memory"
      },
      {
        "icon": "fab fa-mendeley",
        "name": "mendeley"
      },
      {
        "icon": "fas fa-menorah",
        "name": "menorah"
      },
      {
        "icon": "fas fa-mercury",
        "name": "mercury"
      },
      {
        "icon": "fas fa-meteor",
        "name": "meteor"
      },
      {
        "icon": "fab fa-microblog",
        "name": "microblog"
      },
      {
        "icon": "fas fa-microchip",
        "name": "microchip"
      },
      {
        "icon": "fas fa-microphone",
        "name": "microphone"
      },
      {
        "icon": "fas fa-microphone-alt",
        "name": "microphone-alt"
      },
      {
        "icon": "fas fa-microphone-alt-slash",
        "name": "microphone-alt-slash"
      },
      {
        "icon": "fas fa-microphone-slash",
        "name": "microphone-slash"
      },
      {
        "icon": "fas fa-microscope",
        "name": "microscope"
      },
      {
        "icon": "fab fa-microsoft",
        "name": "microsoft"
      },
      {
        "icon": "fas fa-minus",
        "name": "minus"
      },
      {
        "icon": "fas fa-minus-circle",
        "name": "minus-circle"
      },
      {
        "icon": "fas fa-minus-square",
        "name": "minus-square"
      },
      {
        "icon": "far fa-minus-square",
        "name": "minus-square"
      },
      {
        "icon": "fas fa-mitten",
        "name": "mitten"
      },
      {
        "icon": "fab fa-mix",
        "name": "mix"
      },
      {
        "icon": "fab fa-mixcloud",
        "name": "mixcloud"
      },
      {
        "icon": "fab fa-mixer",
        "name": "mixer"
      },
      {
        "icon": "fab fa-mizuni",
        "name": "mizuni"
      },
      {
        "icon": "fas fa-mobile",
        "name": "mobile"
      },
      {
        "icon": "fas fa-mobile-alt",
        "name": "mobile-alt"
      },
      {
        "icon": "fab fa-modx",
        "name": "modx"
      },
      {
        "icon": "fab fa-monero",
        "name": "monero"
      },
      {
        "icon": "fas fa-money-bill",
        "name": "money-bill"
      },
      {
        "icon": "fas fa-money-bill-alt",
        "name": "money-bill-alt"
      },
      {
        "icon": "far fa-money-bill-alt",
        "name": "money-bill-alt"
      },
      {
        "icon": "fas fa-money-bill-wave",
        "name": "money-bill-wave"
      },
      {
        "icon": "fas fa-money-bill-wave-alt",
        "name": "money-bill-wave-alt"
      },
      {
        "icon": "fas fa-money-check",
        "name": "money-check"
      },
      {
        "icon": "fas fa-money-check-alt",
        "name": "money-check-alt"
      },
      {
        "icon": "fas fa-monument",
        "name": "monument"
      },
      {
        "icon": "fas fa-moon",
        "name": "moon"
      },
      {
        "icon": "afar fa-moon",
        "name": "afar fa-moon"
      },
      {
        "icon": "fas fa-mortar-pestle",
        "name": "mortar-pestle"
      },
      {
        "icon": "fas fa-mosque",
        "name": "mosque"
      },
      {
        "icon": "fas fa-motorcycle",
        "name": "motorcycle"
      },
      {
        "icon": "fas fa-mountain",
        "name": "mountain"
      },
      {
        "icon": "fas fa-mouse",
        "name": "mouse"
      },
      {
        "icon": "fas fa-mouse-pointer",
        "name": "mouse-pointer"
      },
      {
        "icon": "fas fa-mug-hot",
        "name": "mug-hot"
      },
      {
        "icon": "fas fa-music",
        "name": "music"
      },
      {
        "icon": "fab fa-napster",
        "name": "napster"
      },
      {
        "icon": "fab fa-neos",
        "name": "neos"
      },
      {
        "icon": "fas fa-network-wired",
        "name": "network-wired"
      },
      {
        "icon": "fas fa-neuter",
        "name": "neuter"
      },
      {
        "icon": "fas fa-newspaper",
        "name": "newspaper"
      },
      {
        "icon": "far fa-newspaper",
        "name": "newspaper"
      },
      {
        "icon": "fab fa-nimblr",
        "name": "nimblr"
      },
      {
        "icon": "fab fa-node",
        "name": "node"
      },
      {
        "icon": "fab fa-node-js",
        "name": "node-js"
      },
      {
        "icon": "fas fa-not-equal",
        "name": "not-equal"
      },
      {
        "icon": "fas fa-notes-medical",
        "name": "notes-medical"
      },
      {
        "icon": "fab fa-npm",
        "name": "npm"
      },
      {
        "icon": "fab fa-ns8",
        "name": "ns8"
      },
      {
        "icon": "fab fa-nutritionix",
        "name": "nutritionix"
      },
      {
        "icon": "fas fa-object-group",
        "name": "object-group"
      },
      {
        "icon": "far fa-object-group",
        "name": "object-group"
      },
      {
        "icon": "fas fa-object-ungroup",
        "name": "object-ungroup"
      },
      {
        "icon": "far fa-object-ungroup",
        "name": "object-ungroup"
      },
      {
        "icon": "fab fa-octopus-deploy",
        "name": "octopus-deploy"
      },
      {
        "icon": "fab fa-odnoklassniki",
        "name": "odnoklassniki"
      },
      {
        "icon": "fab fa-odnoklassniki-square",
        "name": "odnoklassniki-square"
      },
      {
        "icon": "fas fa-oil-can",
        "name": "oil-can"
      },
      {
        "icon": "fab fa-old-republic",
        "name": "old-republic"
      },
      {
        "icon": "fas fa-om",
        "name": "om"
      },
      {
        "icon": "fab fa-opencart",
        "name": "opencart"
      },
      {
        "icon": "fab fa-openid",
        "name": "openid"
      },
      {
        "icon": "fab fa-opera",
        "name": "opera"
      },
      {
        "icon": "fab fa-optin-monster",
        "name": "optin-monster"
      },
      {
        "icon": "fab fa-orcid",
        "name": "orcid"
      },
      {
        "icon": "fab fa-osi",
        "name": "osi"
      },
      {
        "icon": "fas fa-otter",
        "name": "otter"
      },
      {
        "icon": "fas fa-outdent",
        "name": "outdent"
      },
      {
        "icon": "fab fa-page4",
        "name": "page4"
      },
      {
        "icon": "fab fa-pagelines",
        "name": "pagelines"
      },
      {
        "icon": "fas fa-pager",
        "name": "pager"
      },
      {
        "icon": "fas fa-paint-brush",
        "name": "paint-brush"
      },
      {
        "icon": "fas fa-paint-roller",
        "name": "paint-roller"
      },
      {
        "icon": "fas fa-palette",
        "name": "palette"
      },
      {
        "icon": "fab fa-palfed",
        "name": "palfed"
      },
      {
        "icon": "fas fa-pallet",
        "name": "pallet"
      },
      {
        "icon": "fas fa-paper-plane",
        "name": "paper-plane"
      },
      {
        "icon": "far fa-paper-plane",
        "name": "paper-plane"
      },
      {
        "icon": "fas fa-paperclip",
        "name": "paperclip"
      },
      {
        "icon": "fas fa-parachute-box",
        "name": "parachute-box"
      },
      {
        "icon": "fas fa-paragraph",
        "name": "paragraph"
      },
      {
        "icon": "fas fa-parking",
        "name": "parking"
      },
      {
        "icon": "fas fa-passport",
        "name": "passport"
      },
      {
        "icon": "fas fa-pastafarianism",
        "name": "pastafarianism"
      },
      {
        "icon": "fas fa-paste",
        "name": "paste"
      },
      {
        "icon": "fab fa-patreon",
        "name": "patreon"
      },
      {
        "icon": "fas fa-pause",
        "name": "pause"
      },
      {
        "icon": "fas fa-pause-circle",
        "name": "pause-circle"
      },
      {
        "icon": "far fa-pause-circle",
        "name": "pause-circle"
      },
      {
        "icon": "fas fa-paw",
        "name": "paw"
      },
      {
        "icon": "fab fa-paypal",
        "name": "paypal"
      },
      {
        "icon": "fas fa-peace",
        "name": "peace"
      },
      {
        "icon": "fas fa-pen",
        "name": "pen"
      },
      {
        "icon": "fas fa-pen-alt",
        "name": "pen-alt"
      },
      {
        "icon": "fas fa-pen-fancy",
        "name": "pen-fancy"
      },
      {
        "icon": "fas fa-pen-nib",
        "name": "pen-nib"
      },
      {
        "icon": "fas fa-pen-square",
        "name": "pen-square"
      },
      {
        "icon": "fas fa-pencil-alt",
        "name": "pencil-alt"
      },
      {
        "icon": "fas fa-pencil-ruler",
        "name": "pencil-ruler"
      },
      {
        "icon": "fab fa-penny-arcade",
        "name": "penny-arcade"
      },
      {
        "icon": "fas fa-people-arrows",
        "name": "people-arrows"
      },
      {
        "icon": "fas fa-people-carry",
        "name": "people-carry"
      },
      {
        "icon": "fas fa-pepper-hot",
        "name": "pepper-hot"
      },
      {
        "icon": "fab fa-perbyte",
        "name": "perbyte"
      },
      {
        "icon": "fas fa-percent",
        "name": "percent"
      },
      {
        "icon": "fas fa-percentage",
        "name": "percentage"
      },
      {
        "icon": "fab fa-periscope",
        "name": "periscope"
      },
      {
        "icon": "fas fa-person-booth",
        "name": "person-booth"
      },
      {
        "icon": "fab fa-phabricator",
        "name": "phabricator"
      },
      {
        "icon": "fab fa-phoenix-framework",
        "name": "phoenix-framework"
      },
      {
        "icon": "fab fa-phoenix-squadron",
        "name": "phoenix-squadron"
      },
      {
        "icon": "fas fa-phone",
        "name": "phone"
      },
      {
        "icon": "fas fa-phone-alt",
        "name": "phone-alt"
      },
      {
        "icon": "fas fa-phone-slash",
        "name": "phone-slash"
      },
      {
        "icon": "fas fa-phone-square",
        "name": "phone-square"
      },
      {
        "icon": "fas fa-phone-square-alt",
        "name": "phone-square-alt"
      },
      {
        "icon": "fas fa-phone-volume",
        "name": "phone-volume"
      },
      {
        "icon": "fas fa-photo-video",
        "name": "photo-video"
      },
      {
        "icon": "fab fa-php",
        "name": "php"
      },
      {
        "icon": "fab fa-pied-piper",
        "name": "pied-piper"
      },
      {
        "icon": "fab fa-pied-piper-alt",
        "name": "pied-piper-alt"
      },
      {
        "icon": "fab fa-pied-piper-hat",
        "name": "pied-piper-hat"
      },
      {
        "icon": "fab fa-pied-piper-pp",
        "name": "pied-piper-pp"
      },
      {
        "icon": "fab fa-pied-piper-square",
        "name": "pied-piper-square"
      },
      {
        "icon": "fas fa-piggy-bank",
        "name": "piggy-bank"
      },
      {
        "icon": "fas fa-pills",
        "name": "pills"
      },
      {
        "icon": "fab fa-pinterest",
        "name": "pinterest"
      },
      {
        "icon": "fab fa-pinterest-p",
        "name": "pinterest-p"
      },
      {
        "icon": "fab fa-pinterest-square",
        "name": "pinterest-square"
      },
      {
        "icon": "fas fa-pizza-slice",
        "name": "pizza-slice"
      },
      {
        "icon": "fas fa-place-of-worship",
        "name": "place-of-worship"
      },
      {
        "icon": "fas fa-plane",
        "name": "plane"
      },
      {
        "icon": "fas fa-plane-arrival",
        "name": "plane-arrival"
      },
      {
        "icon": "fas fa-plane-departure",
        "name": "plane-departure"
      },
      {
        "icon": "fas fa-plane-slash",
        "name": "plane-slash"
      },
      {
        "icon": "fas fa-play",
        "name": "play"
      },
      {
        "icon": "fas fa-play-circle",
        "name": "play-circle"
      },
      {
        "icon": "far fa-play-circle",
        "name": "play-circle"
      },
      {
        "icon": "fab fa-playstation",
        "name": "playstation"
      },
      {
        "icon": "fas fa-plug",
        "name": "plug"
      },
      {
        "icon": "fas fa-plus",
        "name": "plus"
      },
      {
        "icon": "fas fa-plus-circle",
        "name": "plus-circle"
      },
      {
        "icon": "fas fa-plus-square",
        "name": "plus-square"
      },
      {
        "icon": "far fa-plus-square",
        "name": "plus-square"
      },
      {
        "icon": "fas fa-podcast",
        "name": "podcast"
      },
      {
        "icon": "fas fa-poll",
        "name": "poll"
      },
      {
        "icon": "afas fa-poll-h",
        "name": "afas fa-poll-h"
      },
      {
        "icon": "fas fa-poo",
        "name": "poo"
      },
      {
        "icon": "fas fa-poo-storm",
        "name": "poo-storm"
      },
      {
        "icon": "fas fa-poop",
        "name": "poop"
      },
      {
        "icon": "fas fa-portrait",
        "name": "portrait"
      },
      {
        "icon": "fas fa-pound-sign",
        "name": "pound-sign"
      },
      {
        "icon": "fas fa-power-off",
        "name": "power-off"
      },
      {
        "icon": "fas fa-pray",
        "name": "pray"
      },
      {
        "icon": "fas fa-praying-hands",
        "name": "praying-hands"
      },
      {
        "icon": "fas fa-prescription",
        "name": "prescription"
      },
      {
        "icon": "fas fa-prescription-bottle",
        "name": "prescription-bottle"
      },
      {
        "icon": "fas fa-prescription-bottle-alt",
        "name": "prescription-bottle-alt"
      },
      {
        "icon": "fas fa-print",
        "name": "print"
      },
      {
        "icon": "fas fa-procedures",
        "name": "procedures"
      },
      {
        "icon": "fab fa-product-hunt",
        "name": "product-hunt"
      },
      {
        "icon": "fas fa-project-diagram",
        "name": "project-diagram"
      },
      {
        "icon": "fas fa-pump-medical",
        "name": "pump-medical"
      },
      {
        "icon": "fas fa-pump-soap",
        "name": "pump-soap"
      },
      {
        "icon": "fab fa-pushed",
        "name": "pushed"
      },
      {
        "icon": "fas fa-puzzle-piece",
        "name": "puzzle-piece"
      },
      {
        "icon": "fab fa-python",
        "name": "python"
      },
      {
        "icon": "fab fa-qq",
        "name": "qq"
      },
      {
        "icon": "fas fa-qrcode",
        "name": "qrcode"
      },
      {
        "icon": "fas fa-question",
        "name": "question"
      },
      {
        "icon": "fas fa-question-circle",
        "name": "question-circle"
      },
      {
        "icon": "far fa-question-circle",
        "name": "question-circle"
      },
      {
        "icon": "fas fa-quidditch",
        "name": "quidditch"
      },
      {
        "icon": "fab fa-quinscape",
        "name": "quinscape"
      },
      {
        "icon": "fab fa-quora",
        "name": "quora"
      },
      {
        "icon": "fas fa-quote-left",
        "name": "quote-left"
      },
      {
        "icon": "fas fa-quote-right",
        "name": "quote-right"
      },
      {
        "icon": "fas fa-quran",
        "name": "quran"
      },
      {
        "icon": "fab fa-r-project",
        "name": "r-project"
      },
      {
        "icon": "fas fa-radiation",
        "name": "radiation"
      },
      {
        "icon": "fas fa-radiation-alt",
        "name": "radiation-alt"
      },
      {
        "icon": "fas fa-rainbow",
        "name": "rainbow"
      },
      {
        "icon": "fas fa-random",
        "name": "random"
      },
      {
        "icon": "fab fa-raspberry-pi",
        "name": "raspberry-pi"
      },
      {
        "icon": "fab fa-ravelry",
        "name": "ravelry"
      },
      {
        "icon": "fab fa-react",
        "name": "react"
      },
      {
        "icon": "fab fa-reacteurope",
        "name": "reacteurope"
      },
      {
        "icon": "fab fa-readme",
        "name": "readme"
      },
      {
        "icon": "fab fa-rebel",
        "name": "rebel"
      },
      {
        "icon": "fas fa-receipt",
        "name": "receipt"
      },
      {
        "icon": "fas fa-record-vinyl",
        "name": "record-vinyl"
      },
      {
        "icon": "fas fa-recycle",
        "name": "recycle"
      },
      {
        "icon": "fab fa-red-river",
        "name": "red-river"
      },
      {
        "icon": "fab fa-reddit",
        "name": "reddit"
      },
      {
        "icon": "fab fa-reddit-alien",
        "name": "reddit-alien"
      },
      {
        "icon": "fab fa-reddit-square",
        "name": "reddit-square"
      },
      {
        "icon": "fab fa-redhat",
        "name": "redhat"
      },
      {
        "icon": "fas fa-redo",
        "name": "redo"
      },
      {
        "icon": "fas fa-redo-alt",
        "name": "redo-alt"
      },
      {
        "icon": "fas fa-registered",
        "name": "registered"
      },
      {
        "icon": "far fa-registered",
        "name": "registered"
      },
      {
        "icon": "fas fa-remove-format",
        "name": "remove-format"
      },
      {
        "icon": "fab fa-renren",
        "name": "renren"
      },
      {
        "icon": "fas fa-reply",
        "name": "reply"
      },
      {
        "icon": "fas fa-reply-all",
        "name": "reply-all"
      },
      {
        "icon": "fab fa-replyd",
        "name": "replyd"
      },
      {
        "icon": "fas fa-republican",
        "name": "republican"
      },
      {
        "icon": "fab fa-researchgate",
        "name": "researchgate"
      },
      {
        "icon": "fab fa-resolving",
        "name": "resolving"
      },
      {
        "icon": "fas fa-restroom",
        "name": "restroom"
      },
      {
        "icon": "fas fa-retweet",
        "name": "retweet"
      },
      {
        "icon": "fab fa-rev",
        "name": "rev"
      },
      {
        "icon": "afas fa-ribbon",
        "name": "afas fa-ribbon"
      },
      {
        "icon": "fas fa-ring",
        "name": "ring"
      },
      {
        "icon": "fas fa-road",
        "name": "road"
      },
      {
        "icon": "fas fa-robot",
        "name": "robot"
      },
      {
        "icon": "fas fa-rocket",
        "name": "rocket"
      },
      {
        "icon": "fab fa-rocketchat",
        "name": "rocketchat"
      },
      {
        "icon": "fab fa-rockrms",
        "name": "rockrms"
      },
      {
        "icon": "fas fa-route",
        "name": "route"
      },
      {
        "icon": "fas fa-rss",
        "name": "rss"
      },
      {
        "icon": "fas fa-rss-square",
        "name": "rss-square"
      },
      {
        "icon": "fas fa-ruble-sign",
        "name": "ruble-sign"
      },
      {
        "icon": "fas fa-ruler",
        "name": "ruler"
      },
      {
        "icon": "fas fa-ruler-combined",
        "name": "ruler-combined"
      },
      {
        "icon": "fas fa-ruler-horizontal",
        "name": "ruler-horizontal"
      },
      {
        "icon": "fas fa-ruler-vertical",
        "name": "ruler-vertical"
      },
      {
        "icon": "fas fa-running",
        "name": "running"
      },
      {
        "icon": "fas fa-rupee-sign",
        "name": "rupee-sign"
      },
      {
        "icon": "fab fa-rust",
        "name": "rust"
      },
      {
        "icon": "fas fa-sad-cry",
        "name": "sad-cry"
      },
      {
        "icon": "far fa-sad-cry",
        "name": "sad-cry"
      },
      {
        "icon": "fas fa-sad-tear",
        "name": "sad-tear"
      },
      {
        "icon": "far fa-sad-tear",
        "name": "sad-tear"
      },
      {
        "icon": "fab fa-safari",
        "name": "safari"
      },
      {
        "icon": "fab fa-salesforce",
        "name": "salesforce"
      },
      {
        "icon": "fab fa-sass",
        "name": "sass"
      },
      {
        "icon": "fas fa-satellite",
        "name": "satellite"
      },
      {
        "icon": "fas fa-satellite-dish",
        "name": "satellite-dish"
      },
      {
        "icon": "fas fa-save",
        "name": "save"
      },
      {
        "icon": "afar fa-save",
        "name": "afar fa-save"
      },
      {
        "icon": "fab fa-schlix",
        "name": "schlix"
      },
      {
        "icon": "fas fa-school",
        "name": "school"
      },
      {
        "icon": "fas fa-screwdriver",
        "name": "screwdriver"
      },
      {
        "icon": "fab fa-scribd",
        "name": "scribd"
      },
      {
        "icon": "fas fa-scroll",
        "name": "scroll"
      },
      {
        "icon": "fas fa-sd-card",
        "name": "sd-card"
      },
      {
        "icon": "fas fa-search",
        "name": "search"
      },
      {
        "icon": "fas fa-search-dollar",
        "name": "search-dollar"
      },
      {
        "icon": "fas fa-search-location",
        "name": "search-location"
      },
      {
        "icon": "fas fa-search-minus",
        "name": "search-minus"
      },
      {
        "icon": "fas fa-search-plus",
        "name": "search-plus"
      },
      {
        "icon": "fab fa-searchengin",
        "name": "searchengin"
      },
      {
        "icon": "fas fa-seedling",
        "name": "seedling"
      },
      {
        "icon": "fab fa-sellcast",
        "name": "sellcast"
      },
      {
        "icon": "fab fa-sellsy",
        "name": "sellsy"
      },
      {
        "icon": "fas fa-server",
        "name": "server"
      },
      {
        "icon": "fab fa-servicestack",
        "name": "servicestack"
      },
      {
        "icon": "fas fa-shapes",
        "name": "shapes"
      },
      {
        "icon": "fas fa-share",
        "name": "share"
      },
      {
        "icon": "fas fa-share-alt",
        "name": "share-alt"
      },
      {
        "icon": "fas fa-share-alt-square",
        "name": "share-alt-square"
      },
      {
        "icon": "fas fa-share-square",
        "name": "share-square"
      },
      {
        "icon": "far fa-share-square",
        "name": "share-square"
      },
      {
        "icon": "fas fa-shekel-sign",
        "name": "shekel-sign"
      },
      {
        "icon": "fas fa-shield-alt",
        "name": "shield-alt"
      },
      {
        "icon": "fas fa-shield-virus",
        "name": "shield-virus"
      },
      {
        "icon": "fas fa-ship",
        "name": "ship"
      },
      {
        "icon": "fas fa-shipping-fast",
        "name": "shipping-fast"
      },
      {
        "icon": "fab fa-shirtsinbulk",
        "name": "shirtsinbulk"
      },
      {
        "icon": "fas fa-shoe-prints",
        "name": "shoe-prints"
      },
      {
        "icon": "fab fa-shopify",
        "name": "shopify"
      },
      {
        "icon": "fas fa-shopping-bag",
        "name": "shopping-bag"
      },
      {
        "icon": "fas fa-shopping-basket",
        "name": "shopping-basket"
      },
      {
        "icon": "fas fa-shopping-cart",
        "name": "shopping-cart"
      },
      {
        "icon": "fab fa-shopware",
        "name": "shopware"
      },
      {
        "icon": "fas fa-shower",
        "name": "shower"
      },
      {
        "icon": "fas fa-shuttle-van",
        "name": "shuttle-van"
      },
      {
        "icon": "fas fa-sign",
        "name": "sign"
      },
      {
        "icon": "fas fa-sign-in-alt",
        "name": "sign-in-alt"
      },
      {
        "icon": "fas fa-sign-language",
        "name": "sign-language"
      },
      {
        "icon": "fas fa-sign-out-alt",
        "name": "sign-out-alt"
      },
      {
        "icon": "fas fa-signal",
        "name": "signal"
      },
      {
        "icon": "fas fa-signature",
        "name": "signature"
      },
      {
        "icon": "fas fa-sim-card",
        "name": "sim-card"
      },
      {
        "icon": "fab fa-simplybuilt",
        "name": "simplybuilt"
      },
      {
        "icon": "fas fa-sink",
        "name": "sink"
      },
      {
        "icon": "fab fa-sistrix",
        "name": "sistrix"
      },
      {
        "icon": "fas fa-sitemap",
        "name": "sitemap"
      },
      {
        "icon": "fab fa-sith",
        "name": "sith"
      },
      {
        "icon": "fas fa-skating",
        "name": "skating"
      },
      {
        "icon": "fab fa-sketch",
        "name": "sketch"
      },
      {
        "icon": "fas fa-skiing",
        "name": "skiing"
      },
      {
        "icon": "fas fa-skiing-nordic",
        "name": "skiing-nordic"
      },
      {
        "icon": "fas fa-skull",
        "name": "skull"
      },
      {
        "icon": "fas fa-skull-crossbones",
        "name": "skull-crossbones"
      },
      {
        "icon": "fab fa-skyatlas",
        "name": "skyatlas"
      },
      {
        "icon": "fab fa-skype",
        "name": "skype"
      },
      {
        "icon": "fab fa-slack",
        "name": "slack"
      },
      {
        "icon": "fab fa-slack-hash",
        "name": "slack-hash"
      },
      {
        "icon": "fas fa-slash",
        "name": "slash"
      },
      {
        "icon": "fas fa-sleigh",
        "name": "sleigh"
      },
      {
        "icon": "fas fa-sliders-h",
        "name": "sliders-h"
      },
      {
        "icon": "fab fa-slideshare",
        "name": "slideshare"
      },
      {
        "icon": "fas fa-smile",
        "name": "smile"
      },
      {
        "icon": "far fa-smile",
        "name": "smile"
      },
      {
        "icon": "fas fa-smile-beam",
        "name": "smile-beam"
      },
      {
        "icon": "far fa-smile-beam",
        "name": "smile-beam"
      },
      {
        "icon": "fas fa-smile-wink",
        "name": "smile-wink"
      },
      {
        "icon": "far fa-smile-wink",
        "name": "smile-wink"
      },
      {
        "icon": "fas fa-smog",
        "name": "smog"
      },
      {
        "icon": "fas fa-smoking",
        "name": "smoking"
      },
      {
        "icon": "fas fa-smoking-ban",
        "name": "smoking-ban"
      },
      {
        "icon": "fas fa-sms",
        "name": "sms"
      },
      {
        "icon": "fab fa-snapchat",
        "name": "snapchat"
      },
      {
        "icon": "fab fa-snapchat-ghost",
        "name": "snapchat-ghost"
      },
      {
        "icon": "fab fa-snapchat-square",
        "name": "snapchat-square"
      },
      {
        "icon": "fas fa-snowboarding",
        "name": "snowboarding"
      },
      {
        "icon": "fas fa-snowflake",
        "name": "snowflake"
      },
      {
        "icon": "far fa-snowflake",
        "name": "snowflake"
      },
      {
        "icon": "fas fa-snowman",
        "name": "snowman"
      },
      {
        "icon": "fas fa-snowplow",
        "name": "snowplow"
      },
      {
        "icon": "fas fa-soap",
        "name": "soap"
      },
      {
        "icon": "fas fa-socks",
        "name": "socks"
      },
      {
        "icon": "fas fa-solar-panel",
        "name": "solar-panel"
      },
      {
        "icon": "fas fa-sort",
        "name": "sort"
      },
      {
        "icon": "fas fa-sort-alpha-down",
        "name": "sort-alpha-down"
      },
      {
        "icon": "fas fa-sort-alpha-down-alt",
        "name": "sort-alpha-down-alt"
      },
      {
        "icon": "fas fa-sort-alpha-up",
        "name": "sort-alpha-up"
      },
      {
        "icon": "fas fa-sort-alpha-up-alt",
        "name": "sort-alpha-up-alt"
      },
      {
        "icon": "fas fa-sort-amount-down",
        "name": "sort-amount-down"
      },
      {
        "icon": "fas fa-sort-amount-down-alt",
        "name": "sort-amount-down-alt"
      },
      {
        "icon": "fas fa-sort-amount-up",
        "name": "sort-amount-up"
      },
      {
        "icon": "fas fa-sort-amount-up-alt",
        "name": "sort-amount-up-alt"
      },
      {
        "icon": "fas fa-sort-down",
        "name": "sort-down"
      },
      {
        "icon": "fas fa-sort-numeric-down",
        "name": "sort-numeric-down"
      },
      {
        "icon": "fas fa-sort-numeric-down-alt",
        "name": "sort-numeric-down-alt"
      },
      {
        "icon": "fas fa-sort-numeric-up",
        "name": "sort-numeric-up"
      },
      {
        "icon": "fas fa-sort-numeric-up-alt",
        "name": "sort-numeric-up-alt"
      },
      {
        "icon": "fas fa-sort-up",
        "name": "sort-up"
      },
      {
        "icon": "fab fa-soundcloud",
        "name": "soundcloud"
      },
      {
        "icon": "fab fa-sourcetree",
        "name": "sourcetree"
      },
      {
        "icon": "fas fa-spa",
        "name": "spa"
      },
      {
        "icon": "fas fa-space-shuttle",
        "name": "space-shuttle"
      },
      {
        "icon": "fab fa-speakap",
        "name": "speakap"
      },
      {
        "icon": "fab fa-speaker-deck",
        "name": "speaker-deck"
      },
      {
        "icon": "fas fa-spell-check",
        "name": "spell-check"
      },
      {
        "icon": "fas fa-spider",
        "name": "spider"
      },
      {
        "icon": "fas fa-spinner",
        "name": "spinner"
      },
      {
        "icon": "fas fa-splotch",
        "name": "splotch"
      },
      {
        "icon": "fab fa-spotify",
        "name": "spotify"
      },
      {
        "icon": "fas fa-spray-can",
        "name": "spray-can"
      },
      {
        "icon": "fas fa-square",
        "name": "square"
      },
      {
        "icon": "far fa-square",
        "name": "square"
      },
      {
        "icon": "fas fa-square-full",
        "name": "square-full"
      },
      {
        "icon": "fas fa-square-root-alt",
        "name": "square-root-alt"
      },
      {
        "icon": "fab fa-squarespace",
        "name": "squarespace"
      },
      {
        "icon": "fab fa-stack-exchange",
        "name": "stack-exchange"
      },
      {
        "icon": "fab fa-stack-overflow",
        "name": "stack-overflow"
      },
      {
        "icon": "fab fa-stackpath",
        "name": "stackpath"
      },
      {
        "icon": "fas fa-stamp",
        "name": "stamp"
      },
      {
        "icon": "fas fa-star",
        "name": "star"
      },
      {
        "icon": "afar fa-star",
        "name": "afar fa-star"
      },
      {
        "icon": "fas fa-star-and-crescent",
        "name": "star-and-crescent"
      },
      {
        "icon": "fas fa-star-half",
        "name": "star-half"
      },
      {
        "icon": "far fa-star-half",
        "name": "star-half"
      },
      {
        "icon": "fas fa-star-half-alt",
        "name": "star-half-alt"
      },
      {
        "icon": "fas fa-star-of-david",
        "name": "star-of-david"
      },
      {
        "icon": "fas fa-star-of-life",
        "name": "star-of-life"
      },
      {
        "icon": "fab fa-staylinked",
        "name": "staylinked"
      },
      {
        "icon": "fab fa-steam",
        "name": "steam"
      },
      {
        "icon": "fab fa-steam-square",
        "name": "steam-square"
      },
      {
        "icon": "fab fa-steam-symbol",
        "name": "steam-symbol"
      },
      {
        "icon": "fas fa-step-backward",
        "name": "step-backward"
      },
      {
        "icon": "fas fa-step-forward",
        "name": "step-forward"
      },
      {
        "icon": "fas fa-stethoscope",
        "name": "stethoscope"
      },
      {
        "icon": "fab fa-sticker-mule",
        "name": "sticker-mule"
      },
      {
        "icon": "fas fa-sticky-note",
        "name": "sticky-note"
      },
      {
        "icon": "far fa-sticky-note",
        "name": "sticky-note"
      },
      {
        "icon": "fas fa-stop",
        "name": "stop"
      },
      {
        "icon": "fas fa-stop-circle",
        "name": "stop-circle"
      },
      {
        "icon": "far fa-stop-circle",
        "name": "stop-circle"
      },
      {
        "icon": "fas fa-stopwatch",
        "name": "stopwatch"
      },
      {
        "icon": "fas fa-stopwatch-20",
        "name": "stopwatch-20"
      },
      {
        "icon": "fas fa-store",
        "name": "store"
      },
      {
        "icon": "fas fa-store-alt",
        "name": "store-alt"
      },
      {
        "icon": "fas fa-store-alt-slash",
        "name": "store-alt-slash"
      },
      {
        "icon": "fas fa-store-slash",
        "name": "store-slash"
      },
      {
        "icon": "fab fa-strava",
        "name": "strava"
      },
      {
        "icon": "fas fa-stream",
        "name": "stream"
      },
      {
        "icon": "fas fa-street-view",
        "name": "street-view"
      },
      {
        "icon": "fas fa-strikethrough",
        "name": "strikethrough"
      },
      {
        "icon": "fab fa-stripe",
        "name": "stripe"
      },
      {
        "icon": "fab fa-stripe-s",
        "name": "stripe-s"
      },
      {
        "icon": "fas fa-stroopwafel",
        "name": "stroopwafel"
      },
      {
        "icon": "fab fa-studiovinari",
        "name": "studiovinari"
      },
      {
        "icon": "fab fa-stumbleupon",
        "name": "stumbleupon"
      },
      {
        "icon": "fab fa-stumbleupon-circle",
        "name": "stumbleupon-circle"
      },
      {
        "icon": "fas fa-subscript",
        "name": "subscript"
      },
      {
        "icon": "fas fa-subway",
        "name": "subway"
      },
      {
        "icon": "fas fa-suitcase",
        "name": "suitcase"
      },
      {
        "icon": "fas fa-suitcase-rolling",
        "name": "suitcase-rolling"
      },
      {
        "icon": "fas fa-sun",
        "name": "sun"
      },
      {
        "icon": "far fa-sun",
        "name": "sun"
      },
      {
        "icon": "fab fa-superpowers",
        "name": "superpowers"
      },
      {
        "icon": "fas fa-superscript",
        "name": "superscript"
      },
      {
        "icon": "fab fa-supple",
        "name": "supple"
      },
      {
        "icon": "fas fa-surprise",
        "name": "surprise"
      },
      {
        "icon": "far fa-surprise",
        "name": "surprise"
      },
      {
        "icon": "fab fa-suse",
        "name": "suse"
      },
      {
        "icon": "fas fa-swatchbook",
        "name": "swatchbook"
      },
      {
        "icon": "fab fa-swift",
        "name": "swift"
      },
      {
        "icon": "fas fa-swimmer",
        "name": "swimmer"
      },
      {
        "icon": "fas fa-swimming-pool",
        "name": "swimming-pool"
      },
      {
        "icon": "fab fa-symfony",
        "name": "symfony"
      },
      {
        "icon": "fas fa-synagogue",
        "name": "synagogue"
      },
      {
        "icon": "fas fa-sync",
        "name": "sync"
      },
      {
        "icon": "fas fa-sync-alt",
        "name": "sync-alt"
      },
      {
        "icon": "fas fa-syringe",
        "name": "syringe"
      },
      {
        "icon": "fas fa-table",
        "name": "table"
      },
      {
        "icon": "fas fa-table-tennis",
        "name": "table-tennis"
      },
      {
        "icon": "fas fa-tablet",
        "name": "tablet"
      },
      {
        "icon": "fas fa-tablet-alt",
        "name": "tablet-alt"
      },
      {
        "icon": "fas fa-tablets",
        "name": "tablets"
      },
      {
        "icon": "fas fa-tachometer-alt",
        "name": "tachometer-alt"
      },
      {
        "icon": "fas fa-tag",
        "name": "tag"
      },
      {
        "icon": "fas fa-tags",
        "name": "tags"
      },
      {
        "icon": "fas fa-tape",
        "name": "tape"
      },
      {
        "icon": "fas fa-tasks",
        "name": "tasks"
      },
      {
        "icon": "fas fa-taxi",
        "name": "taxi"
      },
      {
        "icon": "fab fa-teamspeak",
        "name": "teamspeak"
      },
      {
        "icon": "fas fa-teeth",
        "name": "teeth"
      },
      {
        "icon": "fas fa-teeth-open",
        "name": "teeth-open"
      },
      {
        "icon": "fab fa-telegram",
        "name": "telegram"
      },
      {
        "icon": "fab fa-telegram-plane",
        "name": "telegram-plane"
      },
      {
        "icon": "fas fa-temperature-high",
        "name": "temperature-high"
      },
      {
        "icon": "fas fa-temperature-low",
        "name": "temperature-low"
      },
      {
        "icon": "fab fa-tencent-weibo",
        "name": "tencent-weibo"
      },
      {
        "icon": "fas fa-tenge",
        "name": "tenge"
      },
      {
        "icon": "fas fa-terminal",
        "name": "terminal"
      },
      {
        "icon": "fas fa-text-height",
        "name": "text-height"
      },
      {
        "icon": "fas fa-text-width",
        "name": "text-width"
      },
      {
        "icon": "fas fa-th",
        "name": "th"
      },
      {
        "icon": "fas fa-th-large",
        "name": "th-large"
      },
      {
        "icon": "fas fa-th-list",
        "name": "th-list"
      },
      {
        "icon": "fab fa-the-red-yeti",
        "name": "the-red-yeti"
      },
      {
        "icon": "fas fa-theater-masks",
        "name": "theater-masks"
      },
      {
        "icon": "fab fa-themeco",
        "name": "themeco"
      },
      {
        "icon": "fab fa-themeisle",
        "name": "themeisle"
      },
      {
        "icon": "fas fa-thermometer",
        "name": "thermometer"
      },
      {
        "icon": "fas fa-thermometer-empty",
        "name": "thermometer-empty"
      },
      {
        "icon": "fas fa-thermometer-full",
        "name": "thermometer-full"
      },
      {
        "icon": "fas fa-thermometer-half",
        "name": "thermometer-half"
      },
      {
        "icon": "fas fa-thermometer-quarter",
        "name": "thermometer-quarter"
      },
      {
        "icon": "fas fa-thermometer-three-quarters",
        "name": "thermometer-three-quarters"
      },
      {
        "icon": "fab fa-think-peaks",
        "name": "think-peaks"
      },
      {
        "icon": "fas fa-thumbs-down",
        "name": "thumbs-down"
      },
      {
        "icon": "far fa-thumbs-down",
        "name": "thumbs-down"
      },
      {
        "icon": "fas fa-thumbs-up",
        "name": "thumbs-up"
      },
      {
        "icon": "far fa-thumbs-up",
        "name": "thumbs-up"
      },
      {
        "icon": "fas fa-thumbtack",
        "name": "thumbtack"
      },
      {
        "icon": "fas fa-ticket-alt",
        "name": "ticket-alt"
      },
      {
        "icon": "fab fa-tiktok",
        "name": "tiktok"
      },
      {
        "icon": "fas fa-times",
        "name": "times"
      },
      {
        "icon": "fas fa-times-circle",
        "name": "times-circle"
      },
      {
        "icon": "far fa-times-circle",
        "name": "times-circle"
      },
      {
        "icon": "fas fa-tint",
        "name": "tint"
      },
      {
        "icon": "fas fa-tint-slash",
        "name": "tint-slash"
      },
      {
        "icon": "fas fa-tired",
        "name": "tired"
      },
      {
        "icon": "far fa-tired",
        "name": "tired"
      },
      {
        "icon": "fas fa-toggle-off",
        "name": "toggle-off"
      },
      {
        "icon": "fas fa-toggle-on",
        "name": "toggle-on"
      },
      {
        "icon": "fas fa-toilet",
        "name": "toilet"
      },
      {
        "icon": "fas fa-toilet-paper",
        "name": "toilet-paper"
      },
      {
        "icon": "fas fa-toilet-paper-slash",
        "name": "toilet-paper-slash"
      },
      {
        "icon": "fas fa-toolbox",
        "name": "toolbox"
      },
      {
        "icon": "fas fa-tools",
        "name": "tools"
      },
      {
        "icon": "fas fa-tooth",
        "name": "tooth"
      },
      {
        "icon": "fas fa-torah",
        "name": "torah"
      },
      {
        "icon": "fas fa-torii-gate",
        "name": "torii-gate"
      },
      {
        "icon": "fas fa-tractor",
        "name": "tractor"
      },
      {
        "icon": "fab fa-trade-federation",
        "name": "trade-federation"
      },
      {
        "icon": "fas fa-trademark",
        "name": "trademark"
      },
      {
        "icon": "fas fa-traffic-light",
        "name": "traffic-light"
      },
      {
        "icon": "fas fa-trailer",
        "name": "trailer"
      },
      {
        "icon": "fas fa-train",
        "name": "train"
      },
      {
        "icon": "fas fa-tram",
        "name": "tram"
      },
      {
        "icon": "fas fa-transgender",
        "name": "transgender"
      },
      {
        "icon": "fas fa-transgender-alt",
        "name": "transgender-alt"
      },
      {
        "icon": "fas fa-trash",
        "name": "trash"
      },
      {
        "icon": "fas fa-trash-alt",
        "name": "trash-alt"
      },
      {
        "icon": "far fa-trash-alt",
        "name": "trash-alt"
      },
      {
        "icon": "fas fa-trash-restore",
        "name": "trash-restore"
      },
      {
        "icon": "fas fa-trash-restore-alt",
        "name": "trash-restore-alt"
      },
      {
        "icon": "fas fa-tree",
        "name": "tree"
      },
      {
        "icon": "fab fa-trello",
        "name": "trello"
      },
      {
        "icon": "fab fa-tripadvisor",
        "name": "tripadvisor"
      },
      {
        "icon": "fas fa-trophy",
        "name": "trophy"
      },
      {
        "icon": "fas fa-truck",
        "name": "truck"
      },
      {
        "icon": "fas fa-truck-loading",
        "name": "truck-loading"
      },
      {
        "icon": "fas fa-truck-monster",
        "name": "truck-monster"
      },
      {
        "icon": "fas fa-truck-moving",
        "name": "truck-moving"
      },
      {
        "icon": "fas fa-truck-pickup",
        "name": "truck-pickup"
      },
      {
        "icon": "fas fa-tshirt",
        "name": "tshirt"
      },
      {
        "icon": "fas fa-tty",
        "name": "tty"
      },
      {
        "icon": "fab fa-tumblr",
        "name": "tumblr"
      },
      {
        "icon": "fab fa-tumblr-square",
        "name": "tumblr-square"
      },
      {
        "icon": "fas fa-tv",
        "name": "tv"
      },
      {
        "icon": "fab fa-twitch",
        "name": "twitch"
      },
      {
        "icon": "fab fa-twitter",
        "name": "twitter"
      },
      {
        "icon": "fab fa-twitter-square",
        "name": "twitter-square"
      },
      {
        "icon": "fab fa-typo3",
        "name": "typo3"
      },
      {
        "icon": "fab fa-uber",
        "name": "uber"
      },
      {
        "icon": "fab fa-ubuntu",
        "name": "ubuntu"
      },
      {
        "icon": "fab fa-uikit",
        "name": "uikit"
      },
      {
        "icon": "fab fa-umbraco",
        "name": "umbraco"
      },
      {
        "icon": "fas fa-umbrella",
        "name": "umbrella"
      },
      {
        "icon": "fas fa-umbrella-beach",
        "name": "umbrella-beach"
      },
      {
        "icon": "fab fa-uncharted",
        "name": "uncharted"
      },
      {
        "icon": "fas fa-underline",
        "name": "underline"
      },
      {
        "icon": "fas fa-undo",
        "name": "undo"
      },
      {
        "icon": "fas fa-undo-alt",
        "name": "undo-alt"
      },
      {
        "icon": "fab fa-uniregistry",
        "name": "uniregistry"
      },
      {
        "icon": "fab fa-unity",
        "name": "unity"
      },
      {
        "icon": "fas fa-universal-access",
        "name": "universal-access"
      },
      {
        "icon": "fas fa-university",
        "name": "university"
      },
      {
        "icon": "fas fa-unlink",
        "name": "unlink"
      },
      {
        "icon": "fas fa-unlock",
        "name": "unlock"
      },
      {
        "icon": "fas fa-unlock-alt",
        "name": "unlock-alt"
      },
      {
        "icon": "fab fa-unsplash",
        "name": "unsplash"
      },
      {
        "icon": "fab fa-untappd",
        "name": "untappd"
      },
      {
        "icon": "fas fa-upload",
        "name": "upload"
      },
      {
        "icon": "fab fa-ups",
        "name": "ups"
      },
      {
        "icon": "fab fa-usb",
        "name": "usb"
      },
      {
        "icon": "fas fa-user",
        "name": "user"
      },
      {
        "icon": "afar fa-user",
        "name": "afar fa-user"
      },
      {
        "icon": "fas fa-user-alt",
        "name": "user-alt"
      },
      {
        "icon": "fas fa-user-alt-slash",
        "name": "user-alt-slash"
      },
      {
        "icon": "fas fa-user-astronaut",
        "name": "user-astronaut"
      },
      {
        "icon": "fas fa-user-check",
        "name": "user-check"
      },
      {
        "icon": "fas fa-user-circle",
        "name": "user-circle"
      },
      {
        "icon": "far fa-user-circle",
        "name": "user-circle"
      },
      {
        "icon": "fas fa-user-clock",
        "name": "user-clock"
      },
      {
        "icon": "fas fa-user-cog",
        "name": "user-cog"
      },
      {
        "icon": "fas fa-user-edit",
        "name": "user-edit"
      },
      {
        "icon": "fas fa-user-friends",
        "name": "user-friends"
      },
      {
        "icon": "fas fa-user-graduate",
        "name": "user-graduate"
      },
      {
        "icon": "fas fa-user-injured",
        "name": "user-injured"
      },
      {
        "icon": "fas fa-user-lock",
        "name": "user-lock"
      },
      {
        "icon": "fas fa-user-md",
        "name": "user-md"
      },
      {
        "icon": "fas fa-user-minus",
        "name": "user-minus"
      },
      {
        "icon": "fas fa-user-ninja",
        "name": "user-ninja"
      },
      {
        "icon": "fas fa-user-nurse",
        "name": "user-nurse"
      },
      {
        "icon": "fas fa-user-plus",
        "name": "user-plus"
      },
      {
        "icon": "fas fa-user-secret",
        "name": "user-secret"
      },
      {
        "icon": "fas fa-user-shield",
        "name": "user-shield"
      },
      {
        "icon": "fas fa-user-slash",
        "name": "user-slash"
      },
      {
        "icon": "fas fa-user-tag",
        "name": "user-tag"
      },
      {
        "icon": "fas fa-user-tie",
        "name": "user-tie"
      },
      {
        "icon": "fas fa-user-times",
        "name": "user-times"
      },
      {
        "icon": "fas fa-users",
        "name": "users"
      },
      {
        "icon": "fas fa-users-cog",
        "name": "users-cog"
      },
      {
        "icon": "fas fa-users-slash",
        "name": "users-slash"
      },
      {
        "icon": "fab fa-usps",
        "name": "usps"
      },
      {
        "icon": "fab fa-ussunnah",
        "name": "ussunnah"
      },
      {
        "icon": "fas fa-utensil-spoon",
        "name": "utensil-spoon"
      },
      {
        "icon": "fas fa-utensils",
        "name": "utensils"
      },
      {
        "icon": "fab fa-vaadin",
        "name": "vaadin"
      },
      {
        "icon": "fas fa-vector-square",
        "name": "vector-square"
      },
      {
        "icon": "fas fa-venus",
        "name": "venus"
      },
      {
        "icon": "fas fa-venus-double",
        "name": "venus-double"
      },
      {
        "icon": "fas fa-venus-mars",
        "name": "venus-mars"
      },
      {
        "icon": "fas fa-vest",
        "name": "vest"
      },
      {
        "icon": "fas fa-vest-patches",
        "name": "vest-patches"
      },
      {
        "icon": "fab fa-viacoin",
        "name": "viacoin"
      },
      {
        "icon": "fab fa-viadeo",
        "name": "viadeo"
      },
      {
        "icon": "fab fa-viadeo-square",
        "name": "viadeo-square"
      },
      {
        "icon": "fas fa-vial",
        "name": "vial"
      },
      {
        "icon": "fas fa-vials",
        "name": "vials"
      },
      {
        "icon": "fab fa-viber",
        "name": "viber"
      },
      {
        "icon": "fas fa-video",
        "name": "video"
      },
      {
        "icon": "fas fa-video-slash",
        "name": "video-slash"
      },
      {
        "icon": "fas fa-vihara",
        "name": "vihara"
      },
      {
        "icon": "fab fa-vimeo",
        "name": "vimeo"
      },
      {
        "icon": "fab fa-vimeo-square",
        "name": "vimeo-square"
      },
      {
        "icon": "fab fa-vimeo-v",
        "name": "vimeo-v"
      },
      {
        "icon": "fab fa-vine",
        "name": "vine"
      },
      {
        "icon": "fas fa-virus",
        "name": "virus"
      },
      {
        "icon": "fas fa-virus-slash",
        "name": "virus-slash"
      },
      {
        "icon": "fas fa-viruses",
        "name": "viruses"
      },
      {
        "icon": "fab fa-vk",
        "name": "vk"
      },
      {
        "icon": "fab fa-vnv",
        "name": "vnv"
      },
      {
        "icon": "fas fa-voicemail",
        "name": "voicemail"
      },
      {
        "icon": "fas fa-volleyball-ball",
        "name": "volleyball-ball"
      },
      {
        "icon": "fas fa-volume-down",
        "name": "volume-down"
      },
      {
        "icon": "fas fa-volume-mute",
        "name": "volume-mute"
      },
      {
        "icon": "fas fa-volume-off",
        "name": "volume-off"
      },
      {
        "icon": "fas fa-volume-up",
        "name": "volume-up"
      },
      {
        "icon": "fas fa-vote-yea",
        "name": "vote-yea"
      },
      {
        "icon": "fas fa-vr-cardboard",
        "name": "vr-cardboard"
      },
      {
        "icon": "fab fa-vuejs",
        "name": "vuejs"
      },
      {
        "icon": "fas fa-walking",
        "name": "walking"
      },
      {
        "icon": "fas fa-wallet",
        "name": "wallet"
      },
      {
        "icon": "fas fa-warehouse",
        "name": "warehouse"
      },
      {
        "icon": "fab fa-watchman-monitoring",
        "name": "watchman-monitoring"
      },
      {
        "icon": "fas fa-water",
        "name": "water"
      },
      {
        "icon": "fas fa-wave-square",
        "name": "wave-square"
      },
      {
        "icon": "fab fa-waze",
        "name": "waze"
      },
      {
        "icon": "fab fa-weebly",
        "name": "weebly"
      },
      {
        "icon": "fab fa-weibo",
        "name": "weibo"
      },
      {
        "icon": "fas fa-weight",
        "name": "weight"
      },
      {
        "icon": "fas fa-weight-hanging",
        "name": "weight-hanging"
      },
      {
        "icon": "fab fa-weixin",
        "name": "weixin"
      },
      {
        "icon": "fab fa-whatsapp",
        "name": "whatsapp"
      },
      {
        "icon": "fab fa-whatsapp-square",
        "name": "whatsapp-square"
      },
      {
        "icon": "fas fa-wheelchair",
        "name": "wheelchair"
      },
      {
        "icon": "fab fa-whmcs",
        "name": "whmcs"
      },
      {
        "icon": "fas fa-wifi",
        "name": "wifi"
      },
      {
        "icon": "fab fa-wikipedia-w",
        "name": "wikipedia-w"
      },
      {
        "icon": "fas fa-wind",
        "name": "wind"
      },
      {
        "icon": "fas fa-window-close",
        "name": "window-close"
      },
      {
        "icon": "far fa-window-close",
        "name": "window-close"
      },
      {
        "icon": "fas fa-window-maximize",
        "name": "window-maximize"
      },
      {
        "icon": "far fa-window-maximize",
        "name": "window-maximize"
      },
      {
        "icon": "fas fa-window-minimize",
        "name": "window-minimize"
      },
      {
        "icon": "far fa-window-minimize",
        "name": "window-minimize"
      },
      {
        "icon": "fas fa-window-restore",
        "name": "window-restore"
      },
      {
        "icon": "far fa-window-restore",
        "name": "window-restore"
      },
      {
        "icon": "fab fa-windows",
        "name": "windows"
      },
      {
        "icon": "fas fa-wine-bottle",
        "name": "wine-bottle"
      },
      {
        "icon": "fas fa-wine-glass",
        "name": "wine-glass"
      },
      {
        "icon": "fas fa-wine-glass-alt",
        "name": "wine-glass-alt"
      },
      {
        "icon": "fab fa-wix",
        "name": "wix"
      },
      {
        "icon": "fab fa-wizards-of-the-coast",
        "name": "wizards-of-the-coast"
      },
      {
        "icon": "fab fa-wodu",
        "name": "wodu"
      },
      {
        "icon": "fab fa-wolf-pack-battalion",
        "name": "wolf-pack-battalion"
      },
      {
        "icon": "fas fa-won-sign",
        "name": "won-sign"
      },
      {
        "icon": "fab fa-wordpress",
        "name": "wordpress"
      },
      {
        "icon": "fab fa-wordpress-simple",
        "name": "wordpress-simple"
      },
      {
        "icon": "fab fa-wpbeginner",
        "name": "wpbeginner"
      },
      {
        "icon": "fab fa-wpexplorer",
        "name": "wpexplorer"
      },
      {
        "icon": "fab fa-wpforms",
        "name": "wpforms"
      },
      {
        "icon": "fab fa-wpressr",
        "name": "wpressr"
      },
      {
        "icon": "fas fa-wrench",
        "name": "wrench"
      },
      {
        "icon": "fas fa-x-ray",
        "name": "x-ray"
      },
      {
        "icon": "fab fa-xbox",
        "name": "xbox"
      },
      {
        "icon": "fab fa-xing",
        "name": "xing"
      },
      {
        "icon": "fab fa-xing-square",
        "name": "xing-square"
      },
      {
        "icon": "fab fa-y-combinator",
        "name": "y-combinator"
      },
      {
        "icon": "fab fa-yahoo",
        "name": "yahoo"
      },
      {
        "icon": "fab fa-yammer",
        "name": "yammer"
      },
      {
        "icon": "fab fa-yandex",
        "name": "yandex"
      },
      {
        "icon": "fab fa-yandex-international",
        "name": "yandex-international"
      },
      {
        "icon": "fab fa-yarn",
        "name": "yarn"
      },
      {
        "icon": "fab fa-yelp",
        "name": "yelp"
      },
      {
        "icon": "fas fa-yen-sign",
        "name": "yen-sign"
      },
      {
        "icon": "fas fa-yin-yang",
        "name": "yin-yang"
      },
      {
        "icon": "fab fa-yoast",
        "name": "yoast"
      },
      {
        "icon": "fab fa-youtube",
        "name": "youtube"
      },
      {
        "icon": "fab fa-youtube-square",
        "name": "youtube-square"
      },
      {
        "icon": "fab fa-zhihu",
        "name": "zhihu"
      },
      {
        "icon": "fa-solid fa-gears",
        "name": "gears"
      }
    ]

    this.icons = this.data;
  }


  onPageChange(event: any) {
    console.log(event);
    this.page = event.first;
  }

  searchIcos(value: string) {
    if(value){
      this.icons = this.data.filter(icon => icon.name.includes(value))
    }else{
      this.icons = this.data;
    }
  }


  select(icon: string){
    this.selectedIcon = icon;
    this.ref.close(icon);
  }

}
