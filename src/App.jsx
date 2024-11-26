import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import style, { ThemeProvider } from 'styled-components'
import { AuthContextProvider, MyRoutes, Light, Dark, Sidebar, MenuHambur } from "./index"
import { createContext, useState } from 'react'
import { Device } from "./styles/breackpoints"
import { useLocation } from 'react-router-dom'
import { Login } from './pages/Login'

export const ThemeContext = createContext(null)
function App() {
  const [themeuse, setTheme] = useState("light");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyles = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {pathname} = useLocation();
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyles}>
          <AuthContextProvider>
            {pathname == "/login" ? (
              <Login/>
            ):(
              <Container className={sidebarOpen ? "active" : ""}>
                <section className="ContentSidebar">
                  <Sidebar 
                    state={sidebarOpen} 
                    setState={() => setSidebarOpen(!sidebarOpen)}>
                  </Sidebar>
                </section>
                <section className="ContentMenuambur">
                  <MenuHambur />
                </section>
                <section className="ContentRoutes">
                  <MyRoutes />
                </section>
              </Container>
            )}
            
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>

    </>
  );
}

const Container = style.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
  }
  
  .ContentRoutes {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;

export default App
