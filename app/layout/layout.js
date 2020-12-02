
import React from 'react'
import SvgSitename from '../../public/img/sitename.svg'
import SvgSearch from '../../public/img/search.svg'

const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <div id="logo"><img src="/logo.png" /></div>
                <div id="sitename"><SvgSitename/></div>
                <div id="search">
                    <span>ПОИСК</span>
                    <SvgSearch/>
                </div>
                <div id="menu">
                    <ul className="menu">
                        <li>ГЛАВНАЯ</li>
                        <li>КАТАЛОГ</li>
                        <li>ИСТОРИЯ КОЛЛЕКЦИИ</li>
                        <li>О ПРОЕКТЕ</li>
                    </ul>
                </div>

            </header>


            <main>
                {props.children}
            </main>

            <footer>
                <div className="wr">
                    <div className="txt">Copyright, 2020</div>
                </div>
            </footer>

        </React.Fragment>
    )
}

export default Layout