import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const MenuStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: var(--color-red);
  z-index: 555;
  padding: 1.5rem 3rem 3rem 1.5rem;
  border-bottom-right-radius: 8rem;
  box-shadow: 4px 4px 10px var(--color-black);
  position: fixed;
  width: 2rem;
  height: 1rem;
  transition: 0.35s all ease-in-out;
  &[data-menu-toggled="true"] {
    padding: 0.5rem 0 0 0.5rem;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: rgba(29, 29, 29, 0.97);
    .menu-content {
      display: flex;
      opacity: 1;
    }
  }
  .menu-toggle {
    cursor: pointer;
  }
`

const MenuContent = styled.div`
  height: 100%;
  width: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.25s all ease;
`
const MenuList = styled.ul`
  width: 100%;
  list-style-type: none;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  & li {
    padding: 1rem 0;
  }
`

const Menu = () => {
  const [toggled, setToggled] = React.useState(false)

  return (
    <MenuStyled className="menu" data-menu-toggled={toggled}>
      <div
        className="menu-toggle"
        onClick={() => {
          setToggled(!toggled)
        }}
      >
        Menu
      </div>
      <MenuContent className="menu-content">
        <MenuList>
          <li>
            <Link
              to="/"
              onClick={() => {
                setToggled(!toggled)
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/episodes"
              onClick={() => {
                setToggled(!toggled)
              }}
            >
              All Episodes
            </Link>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          {/* <li>Sponsor the Show</li> */}
        </MenuList>
      </MenuContent>
    </MenuStyled>
  )
}

export default Menu
