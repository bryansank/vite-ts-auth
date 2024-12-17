export function renderAbout() {
  const container = document.createElement("div");
  container.innerHTML = `
      <h1>About Page</h1>
      <p>This is the about page.</p>
    `;
  return container;
}
