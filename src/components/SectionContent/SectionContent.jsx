import React from 'react'
import './SectionContent.css'
import parser from 'html-react-parser'

export default props => {
    let style = {
        backgroundImage: `url("${props.urlImg}")`
    }
    return <section className="container-fluid sobre-o-jogo py-5" style={style}>
        <div className="row content-section">
            <div className="text-section col-xs-4 col-md-4">
                <h4 className='h4'>{props.headTitle}</h4>
                <h1 className='h1'>{parser(props.title)}</h1>
                <p>{props.description}</p>
                <a className='btn button' href={`${props.url}`}>Saiba mais</a>
            </div>
        </div>
    </section>
}