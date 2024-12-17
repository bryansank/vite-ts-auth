import { navOptionsURL } from "./utils/constants/navOptions";
import { Utils } from "./utils/utilsFn";

const utils = new Utils();

const navValue: (pathval: string) => string = (pathval: string) => {
  switch (pathval) {
    case "/":
      return "Home";

    case "spotify-data":
      return "Data en Spotify";

    default:
      return utils.capitalizeFirstLetter(pathval);
  }
};

export function renderNavContainer(): HTMLElement {
  const navOptions: string[] = navOptionsURL || [];

  const divContainer: HTMLElement = utils.createdContainerFunc("div");
  divContainer.className = "divContainerNav";

  const navContainer: HTMLElement = utils.createdContainerFunc("nav");

  const navigationOptions: HTMLElement[] =
    navOptions.length > 0
      ? navOptions
          .filter((f: string) => f !== "notfound")
          .map((path: string) => {
            // "target", "_blank"

            //hacer unas rutas privadas TODO
            const element: HTMLElement = utils.createdContainerFunc("a"); //aContainer;
            const currentPath: string = path === "/" ? "/" : "/" + path;
            element.textContent = navValue(path);

            element.setAttribute("href", currentPath);
            element.id = "id_" + (path === "/" ? "root" : path);

            if (window.location.pathname === currentPath) {
              element.className = "noSelect";
            } else {
              element.removeAttribute("class");
            }

            return element;
          })
      : [];

  navigationOptions.length > 0 &&
    navigationOptions.map((opt: HTMLElement) => {
      navContainer.appendChild(opt);
    });

  navigationOptions.length > 0 ? divContainer.appendChild(navContainer) : null;

  return divContainer;
}
