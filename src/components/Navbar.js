import React, { useState } from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Menu from "../content/navbar.json"

const Navbar = () => {
  const [state, setState] = useState({
    active: false,
    navBarActiveClass: '',
  })

  const toggleHamburger = () => {

    setState((prev) => ({
      ...prev,
      active: !prev.active,
      navBarActiveClass: !prev.active ? 'is-active' : '',
    }))
  }

  return (
    <nav
      className="nav navbar navbar-expand-lg is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        {Menu.logo &&
          <div className="nav-brand">
            <Link to="/" title="Logo">
              <img src={Menu.logo} alt="Your logo in the Nav" />
            </Link>
          </div>
        }
        <div className="nav-inner">

          <div
            className={`navbar-burger burger ${state.navBarActiveClass}`}
            data-target="navMenu"
            role="button"
            tabIndex="0"
            onClick={toggleHamburger}
            onKeyDown={toggleHamburger}
          >
            <span />
            <span />
            <span />
          </div>
          <div
            id="navMenu"
            className={`nav-content ${state.navBarActiveClass}`}
          >
            <ul className="nav-menu nobullet navbar-start has-text-centered">
              {Menu.nav.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <li>
                      {data.link.match(/^https?:\/\//) ?
                        <OutboundLink href={data.link} target="_blank" rel="noopener noreferrer">{data.text}</OutboundLink>
                        :
                        <Link to={data.link}>
                          {data.text}
                        </Link>
                      }
                    </li>
                    {index < Menu.nav.length - 1 ? <li className="separator"> </li> : null}
                  </React.Fragment>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
