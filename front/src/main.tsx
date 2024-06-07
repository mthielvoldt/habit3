import React from "react";
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import { mockRoles } from "../mockData.ts";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App initialRoles={mockRoles}/>
  </React.StrictMode>
);