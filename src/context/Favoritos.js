import { createContext, useContext, useState } from "react";

export const FavoritosContext = createContext();
FavoritosContext.displayName = "Favoritos";

export default function FavoritosProvider({ children }){
    const [favorito, setFavorito] = useState([]);

    return (
        <FavoritosContext.Provider value={{favorito, setFavorito}}>
            {children}
        </FavoritosContext.Provider>
    )
}

export const useFavoritoContext = () => {
    const { favorito, setFavorito } = useContext(FavoritosContext);

    const adicionarFavorito = (favoritoParam) => {
        const favoritoRepetido = favorito.some(item => item.id === favoritoParam.id);

        let novaLista = [...favorito];
        if(!favoritoRepetido){
            novaLista.push(favoritoParam);
            return setFavorito(novaLista);
        }

        novaLista = favorito.filter((fav) => fav.id !== favoritoParam.id)
        return setFavorito(novaLista);
    }
    return {
        favorito,
        adicionarFavorito
    }
}