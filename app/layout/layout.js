
import React from 'react'
import Nadp from '../../public/nadp.svg'

const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <div className="wr">
                    <div className="left"><img src="/logo.png" /></div>
                    <div className="center"><Nadp /></div>
                    <div className="right"><img src="/logo.png" /></div>

                    <div></div>
                    <div>
                    <ul className="menu">
                        <li>ГЛАВНАЯ</li>
                        <li>КАТАЛОГ</li>
                        <li>ИСТОРИЯ КОЛЛЕКЦИИ</li>
                        <li>О ПРОЕКТЕ</li>
                    </ul>
                    </div>
                    <div></div>
                </div>
            </header>
            <main>
                <div className="wr">

                    <div className="content">
                        {props.children}
                    </div>

                </div>
            </main>

            <footer>
                <div className="wr">
                    <div className="left"></div>
                    <div className="center">Copyright, 2020</div>
                    <div className="right"></div>
                </div>
            </footer>

        </React.Fragment>
    )
}

export default Layout