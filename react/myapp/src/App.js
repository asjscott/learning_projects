import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import HomePage from './Pages/HomePage/HomePage'
import CalculatorPage from "./Pages/CalculatorPage/Calculator";
import PomodoroPage from "./Pages/PomodoroPage/Pomodoro";
import DrumMachinePage from "./Pages/DrumMachinePage/DrumMachine";
import RHFPage from "./Pages/FormPage/RHFPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/calculator",
        element: <CalculatorPage />
      },
      {
        path: "/pomodoro",
        element: <PomodoroPage />
      },
      {
        path: "/drum_machine",
        element: <DrumMachinePage />
      },
      {
        path: "/form",
        element: <RHFPage />,
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;
