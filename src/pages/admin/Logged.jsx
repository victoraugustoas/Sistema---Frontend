import React from 'react';

export default props => (
    <div className="logged d-flex justify-content-center align-items-center container-fluid"
        style={{
            height: '100vh',
        }}>
        <div className="alert alert-success">
            <h1>Você está logado no sistema!</h1>
            <iframe
                title="Video abertura"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Uvmx94cUVEY"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
    </div>
)
