import {createContext, useContext, useState, useEffect} from 'react';

const TemaContext = createContext();

export const TemaProvider = ({children}) => {
    const [temaEscuro, setTemaEscuro] = useState(() => {
        // Verifica o localStorage ou prefere dark por padrão
        const savedTheme = localStorage.getItem('temaEscuro');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Aplica o tema ao body e salva no localStorage
    useEffect(() => {
        document.body.className = temaEscuro ? 'bg-dark text-white' : 'bg-light text-dark';
        localStorage.setItem('temaEscuro', JSON.stringify(temaEscuro));
    }, [temaEscuro]);

    const toggleTema = () => {
        setTemaEscuro(!temaEscuro);
    };

    return (
        <TemaContext.Provider value={{temaEscuro, toggleTema}}>
            {children}
        </TemaContext.Provider>
    );
};

export const useTema = () => useContext(TemaContext);