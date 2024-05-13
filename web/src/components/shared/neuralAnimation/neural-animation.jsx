import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { useCallback } from "react";

const NeuralAnimation = ()=>{

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);
    
    return (
        <div className="h-full w-full">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                className="h-full"
                options={{
                    "interactivity": {
                        "events": {
                            "onHover": {
                                "enable": true,
                                "mode": "bubble"
                            },
                            "onClick": {
                                "enable": true,
                                "mode": "push"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "opacity": 0.8,
                                "size": 10,
                                "color": {
                                    "value": "#ff0000"
                                }
                            }
                        }
                    },
                    "particles": {
                        "color": {
                            "value": "#fff"
                        },
                        "links": {
                            "color": {
                                "value": "#fff"
                            },
                        "enable": true,
                        "opacity": 0.5
                        },
                        "number": {
                            "density": {
                                "enable": true,
                                "area": 800,
                            },
                            "value": 500,
                        },
                        "move": {
                            "enable": true
                        },
                        "opacity": {
                            "value": 0.5
                        } ,
                        "size": {
                            "value": 2
                        }
                    },
                    "fullScreen": {
                        enable: false,
                        zIndex: 0
                    }
                }}
            />
        </div>
    )
}

export default NeuralAnimation