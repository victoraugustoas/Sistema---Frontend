import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo_bf2.png'

export default props => {
    const imgLogo = {
        eaStarWars: {
            logo: "https://media.contentapi.ea.com/content/walrus/pt-br/games/starwars/battlefront/_global_/_jcr_content/ccm/componentwrapper_1622549321/components/localfooter/studioLinks/studiolink/logo.img.png",
            to: "https://www.ea.com/pt-br/games/starwars"
        },
        dice: {
            logo: "https://media.contentapi.ea.com/content/walrus/pt-br/games/starwars/battlefront/_global_/_jcr_content/ccm/componentwrapper_1622549321/components/localfooter/studioLinks/studiolink_0/logo.img.png",
            to: 'http://www.dice.se/'
        },
        motive: {
            logo: "https://media.contentapi.ea.com/content/walrus/pt-br/games/starwars/battlefront/_global_/_jcr_content/ccm/componentwrapper_1622549321/components/localfooter/studioLinks/studiolink_3/logo.img.png",
            to: 'https://www.ea.com/motivestudios'
        },
        criterion: {
            logo: "https://media.contentapi.ea.com/content/walrus/pt-br/games/starwars/battlefront/_global_/_jcr_content/ccm/componentwrapper_1622549321/components/localfooter/studioLinks/studiolink_2/logo.img.png",
            to: 'http://criteriongames.com/'
        },
        lucasFilm: {
            logo: "https://media.contentapi.ea.com/content/walrus/pt-br/games/starwars/battlefront/_global_/_jcr_content/ccm/componentwrapper_1622549321/components/localfooter/studioLinks/studiolink_1/logo.img.png",
            to: 'http://lucasfilm.com/'
        }
    }

    return (
        <footer className='container-fluid mt-3'>
            <div className="row">
                <hr className='col' />
            </div>

            <div className="row justify-content-around">

                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt={"Logo"} />
                    </Link>
                </div>

                <div className="">
                    <form className='form-inline'>
                        <h5 className='mr-3'>Assine nossa newsletter:</h5>
                        <label class="sr-only" for="inlineFormInputName2">Name</label>
                        <input type="email" class="input-form button form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Insira seu email" />

                        <button type="submit" class="btn button mb-2">Enviar</button>
                    </form>
                </div>
            </div>

            <div className="row mt-3 justify-content-center">
                <div className="col text-center">
                    <a href={imgLogo.eaStarWars.to} target='_blank'>
                        <img src={imgLogo.eaStarWars.logo} className="img-fluid" alt="" />
                    </a>
                </div>
                <div className="col text-center">
                    <a href={imgLogo.dice.to} target='_blank'>
                        <img src={imgLogo.dice.logo} className="img-fluid" alt="" />
                    </a>
                </div>
                <div className="col text-center">
                    <a href={imgLogo.motive.to} target='_blank'>
                        <img src={imgLogo.motive.logo} className="img-fluid" alt="" />
                    </a>
                </div>
                <div className="col text-center">
                    <a href={imgLogo.criterion.to} target='_blank'>
                        <img src={imgLogo.criterion.logo} className="img-fluid" alt="" />
                    </a>
                </div>
                <div className="col text-center">
                    <a href={imgLogo.lucasFilm.to} target='_blank'>
                        <img src={imgLogo.lucasFilm.logo} className="img-fluid" alt="" />
                    </a>
                </div>
            </div>

            <div className="row">
                <hr className='col' />
            </div>

        </footer>
    )
}
