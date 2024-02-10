import { setCartSuperscriptHTML } from "./productDetails.mjs";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(product) {
  /* First line retrieves the entire query string portion of the URL using window.location.search. The query string is everything in the URL after the ? character. */
  const queryString = window.location.search;
  /*   We then create a new URLSearchParams object called urlParams using the query string obtained in the previous step. Usage: Once you have a URLSearchParams object, you can use its methods to work with query parameters. These methods include append(), delete(), get(), getAll(), has(), set(), and more. */
  const urlParams = new URLSearchParams(queryString);
  // Return the value obtained from the URL parameter
  return urlParams.get(product);
}

// set a listener for both touchend and click
/* The setClick function serves as a utility function that simplifies the process of setting up click event handlers for DOM elements. You can use it to attach click event handlers to any elements on your webpage by passing in the CSS selector of the element(s) you want to target and the function you want to execute when the click event occurs. 
ie. setClick('.button', () => {
  console.log('Button clicked!');
});*/
export function setClick(selector, callback) {
  selector.addEventListener("touchend", (event) => {
    event.preventDefault(); //prevents defaults like scrolling, etc. on device
    callback(); // then calls the passed in function
  });
  selector.addEventListener("click", callback);
}

export function renderListWithTemplate(
  templateFunction,
  parentHtmlElement,
  itemList,
  position = "afterbegin",
  clear = true,
) {
  // If clear is true empty parent element
  if (clear) {
    console.log(parentHtmlElement);
    parentHtmlElement.innerHTML = "<div></div>";
  }

  // Run templateFunction on each list item
  const htmlString = itemList.map(templateFunction);
  // Send the HTML string to the document.
  parentHtmlElement.insertAdjacentHTML(position, htmlString.join(""));
}

//Week 4 Team assignment
export async function renderWithTemplate(
  templateFunction,
  parentHtmlElement,
  data,
  callback,
  position = "afterbegin",
  clear = true,
) {
  // If clear is true empty parent element
  if (clear) {
    parentHtmlElement.innerHTML = "";
  }
  // Send the HTML string to the document.
  // Run templateFunction on item
  const htmlString = await templateFunction(data);

  parentHtmlElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  renderWithTemplate(headerTemplateFn, qs("#header__primary"));
  renderWithTemplate(footerTemplateFn, qs("#footer__primary"));
}
