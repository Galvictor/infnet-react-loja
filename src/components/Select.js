import React, { useState, useEffect } from "react";
import {FormGroup, Input, Label} from "reactstrap";

function Select({ name, label, value, onChange }) {
    const [options, setOptions] = useState([]); // Estado para armazenar as opções
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    // Busca os dados da API ao montar o componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Ativa o estado de carregamento
                const response = await fetch("https://api.npoint.io/894b71dcf430f831f121"); // URL da API
                const data = await response.json();
                setOptions(data.options); // Define as opções no estado
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            } finally {
                setLoading(false); // Desativa o estado de carregamento
            }
        };

        fetchData();
    }, []);

    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type="select"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                disabled={loading} // Desabilita o select enquanto os dados estão sendo carregados
            >
                {loading ? (
                    <option value="" disabled>Loading...</option> // Exibe "Loading..." enquanto os dados estão sendo carregados
                ) : (
                    <>
                        <option value="">Selecione um cargo</option> {/* Placeholder exibido apenas quando loading = false */}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </>
                )}
            </Input>
        </FormGroup>
    );
}

export default Select;