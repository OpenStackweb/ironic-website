import React from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import content from '../content/top-bar.json'

const TopBar = () => {
  if (!content.bar || !content.bar.display)
    return null;

  return (
    <div className="bar is-dark-gray">
      <div className="container">
        <div className="bar-inner">
          {content.bar.logo &&
            <div className="bar-logo">
              <img src={content.bar.logo} alt="Meet the Community"></img>
            </div>}
          <div className="bar-entry">
            <p>{content.bar.text}</p>
          </div>
          {content.bar.link.match(/^https?:\/\//) ?
            <OutboundLink className="bar-btn" href={content.bar.link} target="_blank" rel="noopener noreferrer">{content.bar.button}</OutboundLink>
            :
            <Link className="bar-btn" to={content.bar.link}>
              {content.bar.button}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default TopBar
