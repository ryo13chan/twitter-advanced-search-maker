import { FC } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { HelmetProvider } from "react-helmet-async"
import Home from "./pages/Home"

const App: FC = () => (
  <ChakraProvider>
    <HelmetProvider>
      <Home />
    </HelmetProvider>
  </ChakraProvider>
)

export default App
