export function renderHome() {
  const container = document.createElement("div");
  container.innerHTML = `
      <h1>Welcome Home! Te esperabamos...</h1>
      <p>Esta es una pagina de Home, para recibirte de la mejor manera 😎</p>
    `;
  return container;
}
