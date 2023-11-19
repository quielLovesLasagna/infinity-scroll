"use strict";

// Element/s
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API
let count = 5;
const apiKey = "Br4oCenS6afzNosSgsi-Q1CLQ9HQ6bWfNGh_X5Ip6fY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// State vairbles
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Photos array
let photosArr = [];

// Check if all images were loaded
const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
};

// Helper function for setting attributes
const setAttributes = function (el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

// Create elements for links and photos + add to DOM
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArr.length;
  photosArr.forEach((photo) => {
    // Create <a/>
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img/>
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event handler when each img is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img/> inside <a/>, then put both inside imageContainer el.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from API
const getPhotos = async function () {
  try {
    const res = await fetch(apiUrl);
    photosArr = await res.json();
    displayPhotos();
  } catch (err) {
    alert(err);
  }
};

// Scroll handler (check if user reached the bottom of the page, load more photos)
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
