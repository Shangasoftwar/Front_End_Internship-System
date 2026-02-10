import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <h1 className=" text-red-700 text-6xl font-bold">
        helllooo
      </h1>
      <h1 className="text-5xl font-bold text-blue-600">
  Tailwind is working 🎉
</h1>

    </div>
  </StrictMode>,
)
    