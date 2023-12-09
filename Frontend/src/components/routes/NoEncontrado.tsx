import { useEffect, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { gsap, Linear } from "gsap";
import './scss/404.scss';
import './scss/Espacios.scss';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoEncontrado() {
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };

    function irAProductos() {
        navigate('/productos');
    }

    gsap.config({
        nullTargetWarn: false
    })


    const handleMouseOver = () => {
        let t1 = gsap.timeline();
        let t2 = gsap.timeline();
        let t3 = gsap.timeline();   

        t1.to(".cog1",
        {
        transformOrigin:"50% 50%",
        rotation:"+=360",
        repeat:-1,
        ease:Linear.easeNone,
        duration:8
        });

        t2.to(".cog2",
        {
        transformOrigin:"50% 50%",
        rotation:"-=360",
        repeat:-1,
        ease:Linear.easeNone,
        duration:8
        });

        t3.fromTo(".wrong-para",
        {
        opacity:0
        },
        {
        opacity:1,
        duration:1,
        stagger:{
            repeat:-1,
            yoyo:true
        }
        });
    };

    return (
        <>
            <Container onMouseOver={handleMouseOver} className="container404">
                <h1 className="first-four">4</h1>
                <div className="cog-wheel1">
                    <div className="cog1">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                
                <div className="cog-wheel2"> 
                    <div className="cog2">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <h1 className="second-four">4</h1>
                <p className="wrong-para">¡Uh, oh! ¡Producto no encontrado!</p>
            </Container>

            <div className="text-center" style={{marginTop:'-15%',paddingLeft: '4%'}}>
                <Button className='btn shadow ' type="submit"  onClick={irAProductos}onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}>Llévame de vuelta</Button>
            </div>
        </>
    );
}