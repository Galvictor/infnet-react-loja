import React, {useState, useEffect} from 'react';

function Timer({isRunning}) {
    const [seconds, setSeconds] = useState(0); // Segundos do cronômetro
    const [milliseconds, setMilliseconds] = useState(0); // Milésimos de segundo do cronômetro
    const [currentTime, setCurrentTime] = useState(new Date()); // Hora atual

    // Atualiza a hora atual a cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    // Atualiza o cronômetro (segundos e milésimos de segundo)
    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setMilliseconds(prevMilliseconds => {
                    if (prevMilliseconds >= 990) {
                        setSeconds(prevSeconds => prevSeconds + 1); // Incrementa os segundos
                        return 0; // Reinicia os milésimos de segundo
                    }
                    return prevMilliseconds + 10; // Incrementa os milésimos de segundo
                });
            }, 10); // Intervalo de 10 milissegundos
        } else if (!isRunning && seconds !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
    }, [isRunning, seconds]);

    // Formata o tempo do cronômetro (minutos:segundos.milésimos)
    const formatTimer = (seconds, milliseconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}.${milliseconds < 100 ? '0' : ''}${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    };

    // Formata a hora atual (horas:minutos:segundos)
    const formatCurrentTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const secs = date.getSeconds();
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="text-center mb-4">
            <h2>Hora Atual: {formatCurrentTime(currentTime)}</h2>
            <h2>Cronometro: {formatTimer(seconds, milliseconds)}</h2>
        </div>
    );
}

export default Timer;