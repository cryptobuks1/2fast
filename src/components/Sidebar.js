import React, { Component } from 'react'
import { slide as Menu } from "react-burger-menu";

export default class Sidebar extends Component {
    render() {
        return (
            <div>
            <Menu>
            <a className="menu-item" href="/">
              Home
            </a>
      
            <a className="menu-item" href="/about">
              About
            </a>
      
            <a className="menu-item" href="/services">
              Services
            </a>
      
            <a className="menu-item" href="/contact">
              Contact us
            </a>
          </Menu>
            </div>
        )
    }
}
