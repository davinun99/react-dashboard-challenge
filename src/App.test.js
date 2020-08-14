import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';
import GraphData from './components/GraphData';

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('App test DOM', () => {
  render(<App/>, container);
  expect(container.querySelector("#title1").textContent).toBe("DATA");
  expect(container.querySelector("#subtitle1").textContent).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
});

test('GraphData test empty data', () => {
  // Usa la versión asíncrona de act para aplicar promesas resueltas
  render(<GraphData
    data={[]}
    turnOnAnimation={true}
    alertMessage={null}
  />, container);
  expect(container.querySelector("#graphData").textContent).toBe("No data, add something!");
});
test('App test simple data',async()=>{
  const fakeData = {data:[
    {firstName:"David", lastName:"Nuñez", participation:20}
  ]};
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );
  await act(async () => {
    render(<App />, container);
  });
  // elimina la simulación para asegurar que las pruebas estén completamente aisladas
  global.fetch.mockRestore();
});

